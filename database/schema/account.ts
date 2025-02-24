import { relations } from "drizzle-orm";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { session } from "~/database/schema/session";
import { createTimestamp } from "~/utils/schema";

export const account = mysqlTable("account", {
	id: varchar({ length: 36 }).primaryKey().$defaultFn(crypto.randomUUID),
	name: varchar({ length: 50 }).notNull(),
	email: varchar({ length: 50 }).notNull().unique(),
	...createTimestamp(),
});

export const accountRelations = relations(account, ({ many }) => ({
	sessions: many(session),
}));
