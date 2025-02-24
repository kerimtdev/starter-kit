"use server";
import { createTRPCContext } from "~/api/config/context";
import { trpcRouter } from "~/api/config/router";

export async function createTRPCCaller() {
	return trpcRouter.createCaller(await createTRPCContext());
}
