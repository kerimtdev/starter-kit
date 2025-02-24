import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createTRPCContext } from "~/api/config/context";
import { trpcRouter } from "~/api/config/router";

function handler(req: Request) {
	return fetchRequestHandler({
		req,
		endpoint: "/api/trpc",
		router: trpcRouter,
		createContext: createTRPCContext,
	});
}

export { handler as GET, handler as POST };
