import { createHmac } from "node:crypto";

export function createAuthHmac(value: string) {
	return createHmac("sha256", process.env.AUTH_HMAC_SECRET).update(value).digest("hex");
}
