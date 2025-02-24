import { authTRPCRouter } from "~/api/routes/auth";
import { sessionTRPCRouter } from "~/api/routes/session";
import { storageTRPCRouter } from "~/api/routes/storage";
import { router } from "~/api/trpc";

export type TRPCRouter = typeof trpcRouter;

export const trpcRouter = router({
	auth: authTRPCRouter,
	session: sessionTRPCRouter,
	storage: storageTRPCRouter,
});
