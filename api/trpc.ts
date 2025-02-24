import { initTRPC } from "@trpc/server";
import SuperJSON from "superjson";
import type { TRPCContext } from "~/api/config/context";

const t = initTRPC.context<TRPCContext>().create({
	transformer: SuperJSON,
});

export const procedure = t.procedure;
export const router = t.router;
export const createCallerFactory = t.createCallerFactory;
