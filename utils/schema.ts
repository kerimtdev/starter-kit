import { timestamp } from "drizzle-orm/mysql-core";

export function createTimestamp() {
	return {
		createdAt: timestamp().defaultNow().notNull(),
		updatedAt: timestamp().onUpdateNow(),
		deletedAt: timestamp(),
	};
}
