import { uuid, varchar, text, pgTable } from "drizzle-orm/pg-core";
import { authorsTable } from "./author.model.js";

export const booksTable = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  authorId: uuid("authorId").references(() => authorsTable.id),
});
