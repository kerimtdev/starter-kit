import { eq } from "drizzle-orm";
import { object, string } from "valibot";
import { trpcProtectedProcedure } from "~/api/config/procedure";
import { router } from "~/api/trpc";
import { session } from "~/database/schema/session";

export const sessionTRPCRouter = router({
	getAll: trpcProtectedProcedure.query(({ ctx }) => {
		return ctx.db.query.session.findMany({
			where: (session, { eq }) =>
				eq(session.accountId, ctx.current?.account?.id as string),
		});
	}),
	getCurrent: trpcProtectedProcedure.query(async ({ ctx }) => {
		return ctx.current;
	}),
	revokeById: trpcProtectedProcedure
		.input(object({ sessionId: string() }))
		.mutation(({ ctx, input }) => {
			return ctx.db.delete(session).where(eq(session.id, input.sessionId));
		}),
});
