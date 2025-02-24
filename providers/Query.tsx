"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { trpc, trpcReactClient } from "~/api/client/react";

const TrpcProvider = trpc.Provider;

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			staleTime: 1000,
		},
	},
});

export function QueryProvider({ children }: React.PropsWithChildren) {
	return (
		<TrpcProvider client={trpcReactClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</TrpcProvider>
	);
}
