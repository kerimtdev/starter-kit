import { type SignerPayload, createDecoder, createSigner } from "fast-jwt";

const authJWTSingerSync = createSigner({
	key: process.env.AUTH_JWT_SECRET,
});

const authJWTDecoderSync = createDecoder({});

export function encodeAuthJWT<T extends SignerPayload>(payload: T) {
	return authJWTSingerSync(payload);
}

export function decodeAuthJWT<T extends string>(payload: T) {
	return authJWTDecoderSync(payload);
}
