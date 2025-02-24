import { httpBatchLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import { getCookie, hasCookie } from "cookies-next";
import SuperJSON from "superjson";
import type { TRPCRouter } from "~/api/config/router";

export const trpc = createTRPCReact<TRPCRouter>();

export const trpcReactClient = trpc.createClient({
	links: [
		httpBatchLink({
			url: "/api/trpc",
			transformer: SuperJSON,
			async headers() {
				const headers: Record<string, string> = {};

				if (await hasCookie("authToken")) {
					headers.Authorization = `Bearer ${await getCookie("authToken")}`;
				}

				return headers;
			},
		}),
	],
});
