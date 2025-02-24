import { relations } from "drizzle-orm";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { account } from "~/database/schema/account";
import { createTimestamp } from "~/utils/schema";

export const storage = mysqlTable("storage", {
	id: varchar({ length: 36 }).primaryKey().$defaultFn(crypto.randomUUID),
	bucket: varchar({ length: 32 }),
	region: varchar({ length: 32 }),
	accountId: varchar({ length: 36 }).references(() => account.id),
	...createTimestamp(),
});

export const storageRelations = relations(storage, ({ one }) => ({
	account: one(account, {
		fields: [storage.accountId],
		references: [account.id],
	}),
}));
