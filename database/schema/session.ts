import dayjs from "dayjs";
import { relations } from "drizzle-orm";
import { datetime, json, mysqlTable, varchar } from "drizzle-orm/mysql-core";
import type { IResult } from "ua-parser-js";
import { account } from "~/database/schema/account";
import { createTimestamp } from "~/utils/schema";

export const session = mysqlTable("session", {
	id: varchar({ length: 36 }).primaryKey().$defaultFn(crypto.randomUUID),
	agent: json().$type<IResult>(),
	accountId: varchar({ length: 36 }).references(() => account.id),
	expiresAt: datetime().$defaultFn(() => dayjs().add(30, "day").toDate()),
	...createTimestamp(),
});

export const sessionRelations = relations(session, ({ one }) => ({
	account: one(account, {
		fields: [session.accountId],
		references: [account.id],
	}),
}));
