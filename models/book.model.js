import { uuid, varchar, text, pgTable, index, serial } from "drizzle-orm/pg-core";
import {  sql } from "drizzle-orm";
import { authorsTable } from "./author.model.js";

export const booksTable = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  authorId: uuid("authorId").references(() => authorsTable.id),
},
// (table) => {[
//     index('title_search_index').using('gin', sql`to_tsvector('english', ${table.title})`),
//   ]}
);