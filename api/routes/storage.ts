import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fileTypeFromBuffer } from "file-type";
import { object, string } from "valibot";
import { trpcProtectedProcedure } from "~/api/config/procedure";
import { router } from "~/api/trpc";
import { storage } from "~/database/schema/storage";
import { handleAsync } from "~/utils/async";
import { base64ToArrayBuffer } from "~/utils/buffer";

const storageClient = new S3Client({
	region: process.env.AWS_S3_REGION,
	credentials: {
		accessKeyId: process.env.AWS_S3_ACCESS_KEY,
		secretAccessKey: process.env.AWS_S3_SECRET_KEY,
	},
});

export const storageTRPCRouter = router({
	upload: trpcProtectedProcedure
		.input(object({ content: string() }))
		.mutation(async ({ ctx, input }) => {
			const fileId = crypto.randomUUID();
			const fileBuffer = Buffer.from(base64ToArrayBuffer(input.content));
			const fileType = await fileTypeFromBuffer(fileBuffer);

			const [clientError] = await handleAsync(
				storageClient.send(
					new PutObjectCommand({
						ACL: "public-read",
						Bucket: process.env.AWS_S3_BUCKET_NAME,
						ContentType: fileType?.mime,
						Body: fileBuffer,
						Key: fileId,
					}),
				),
			);

			if (clientError) {
				throw new Error(clientError.message);
			}

			const [insertError] = await handleAsync(
				ctx.db.insert(storage).values({
					id: fileId,
					bucket: process.env.AWS_S3_BUCKET_NAME,
					region: process.env.AWS_S3_REGION,
					accountId: ctx.current?.accountId as string,
				}),
			);

			if (insertError) {
				throw new Error("Failed to insert file");
			}

			return ctx.db.query.storage.findFirst({
				where: (storage, { eq }) => eq(storage.id, fileId),
			});
		}),
});
