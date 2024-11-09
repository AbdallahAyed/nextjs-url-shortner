import { text, pgTable } from "drizzle-orm/pg-core";

export const urls = pgTable("urls", {
  path: text("path").notNull().primaryKey(),
  code: text("code").notNull(),
});
