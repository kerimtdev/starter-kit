import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { relations } from "drizzle-orm/relations";
import { account } from "~/database/schema/account";
import { createTimestamp } from "~/utils/schema";

export const auth = mysqlTable("auth", {
	id: varchar({ length: 36 }).primaryKey().$defaultFn(crypto.randomUUID),
	type: varchar({ length: 24 }),
	password: varchar({ length: 128 }),
	accountId: varchar({ length: 36 }).references(() => account.id),
	...createTimestamp(),
});

export const authRelations = relations(auth, ({ one }) => ({
	account: one(account, {
		fields: [auth.accountId],
		references: [account.id],
	}),
}));
