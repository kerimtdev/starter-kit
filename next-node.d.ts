namespace NodeJS {
	interface ProcessEnv {
		AWS_S3_BUCKET_NAME: string;
		AWS_S3_REGION: string;
		AWS_S3_ACCESS_KEY: string;
		AWS_S3_SECRET_KEY: string;

		DB_NAME: string;
		DB_HOST: string;
		DB_PORT: number;
		DB_USER: string;
		DB_PASSWORD: string;

		AUTH_JWT_SECRET: string;
		AUTH_HMAC_SECRET: string;
	}
}
