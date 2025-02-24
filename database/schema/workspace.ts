import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { storage } from "~/database/schema/storage";
import { createTimestamp } from "~/utils/schema";

export const workspace = mysqlTable("workspace", {
	id: varchar({ length: 36 }).primaryKey().$defaultFn(crypto.randomUUID),
	name: varchar({ length: 16 }).notNull(),
	path: varchar({ length: 24 }).notNull().unique(),
	avatarId: varchar({ length: 36 }).references(() => storage.id),
	...createTimestamp(),
});
