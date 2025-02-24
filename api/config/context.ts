import { cookies, headers } from "next/headers";
import { UAParser } from "ua-parser-js";
import { db } from "~/database/client";

export type TRPCContext = Awaited<ReturnType<typeof createTRPCContext>>;

export async function createTRPCContext() {
	const $cookies = await cookies();
	const $headers = await headers();
	const $userAgent = UAParser($headers.get("User-Agent") ?? undefined);

	return {
		db,
		cookies: $cookies,
		headers: $headers,
		userAgent: $userAgent,
	};
}
