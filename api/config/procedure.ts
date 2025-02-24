import { procedure } from "~/api/trpc";
import { decodeAuthJWT } from "~/utils/token";

export const trpcProcedure = procedure;

export const trpcProtectedProcedure = procedure.use(async ({ ctx, next }) => {
	const authHeader = ctx.headers.get("Authorization")?.split(" ").at(-1);
	const authCookie = ctx.cookies.get("authToken")?.value;
	const authToken = authHeader || authCookie;

	if (!authToken) {
		throw new Error("Authorized token not found");
	}

	const decodedToken = decodeAuthJWT(authToken);

	if (!decodedToken) {
		throw new Error("An error occured while decoding the token");
	}

	const current = await ctx.db.query.session.findFirst({
		with: { account: true },
		where: (session, { eq }) => eq(session.id, decodedToken.payload.sessionId),
	});

	return next({
		ctx: { ...ctx, current },
	});
});
