import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { account } from "~/database/schema/account";
import { storage } from "~/database/schema/storage";
import { workspace } from "~/database/schema/workspace";
import { createTimestamp } from "~/utils/schema";

export const profile = mysqlTable("profile", {
	id: varchar({ length: 36 }).primaryKey().$defaultFn(crypto.randomUUID),
	name: varchar({ length: 32 }),
	avatarId: varchar({ length: 36 })
		.notNull()
		.references(() => storage.id),
	accountId: varchar({ length: 36 })
		.notNull()
		.references(() => account.id),
	workspaceId: varchar({ length: 36 })
		.notNull()
		.references(() => workspace.id),
	...createTimestamp(),
});
