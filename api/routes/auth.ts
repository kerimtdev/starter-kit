import { and, eq, sql } from "drizzle-orm";
import { email, maxLength, minLength, object, pipe, string } from "valibot";
import { trpcProcedure } from "~/api/config/procedure";
import { router } from "~/api/trpc";
import { account } from "~/database/schema/account";
import { auth } from "~/database/schema/auth";
import { session } from "~/database/schema/session";
import { createAuthHmac } from "~/utils/crypto";
import { encodeAuthJWT } from "~/utils/token";

export const authTRPCRouter = router({
	signup: trpcProcedure
		.input(
			object({
				name: pipe(string()),
				email: pipe(string(), email()),
				password: pipe(string(), minLength(8), maxLength(24)),
			}),
		)
		.mutation(({ ctx, input }) => {
			return ctx.db.transaction(async (tx) => {
				const [{ id: accountId }] = await tx
					.insert(account)
					.values({
						name: input.name,
						email: input.email,
					})
					.$returningId();

				await tx.insert(auth).values({
					type: "Email",
					password: createAuthHmac(input.password),
					accountId,
				});

				const [{ id: sessionQueryId }] = await tx
					.insert(session)
					.values({
						agent: ctx.userAgent,
						accountId,
					})
					.$returningId();

				const sessionQuery = await tx.query.session.findFirst({
					with: { account: true },
					where: (session, { eq }) => eq(session.id, sessionQueryId),
				});

				return {
					session: sessionQuery,
					token: encodeAuthJWT({
						sessionId: sessionQuery?.id,
						accountId: sessionQuery?.accountId,
					}),
				};
			});
		}),

	login: trpcProcedure
		.input(
			object({
				email: pipe(string(), email()),
				password: pipe(string(), minLength(8), maxLength(24)),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			let sessionQuery = null;

			const [{ accountId }] = await ctx.db
				.select({ accountId: account.id })
				.from(account)
				.leftJoin(auth, eq(account.id, auth.accountId))
				.where(
					and(
						eq(account.email, input.email),
						eq(auth.password, createAuthHmac(input.password)),
					),
				);

			if (!accountId) {
				throw new Error("No account found with these credentials.");
			}

			sessionQuery = await ctx.db.query.session.findFirst({
				with: {
					account: true,
				},
				where: (session, { and, eq, gt }) =>
					and(
						eq(session.accountId, accountId),
						gt(session.expiresAt, new Date()),
						sql`JSON_CONTAINS(${session.agent}, ${JSON.stringify(ctx.userAgent)})`,
					),
			});

			if (!sessionQuery) {
				const [{ id: sessionQueryId }] = await ctx.db
					.insert(session)
					.values({
						agent: ctx.userAgent,
						accountId,
					})
					.$returningId();

				sessionQuery = await ctx.db.query.session.findFirst({
					with: { account: true },
					where: (session, { eq }) => eq(session.id, sessionQueryId),
				});
			}

			return {
				session: sessionQuery,
				token: encodeAuthJWT({
					sessionId: sessionQuery?.id,
					accountId: sessionQuery?.accountId,
				}),
			};
		}),
});
