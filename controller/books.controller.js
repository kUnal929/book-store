import { booksTable } from "../models/book.model.js";
import { authorsTable } from "../models/author.model.js";
import { db } from "../db/index.js";
import { eq, sql } from "drizzle-orm";

export async function getAllBooks(req, res) {

  const books = await db.select().from(booksTable)
  return res.json(books);
}

export async function getbookById(req, res) {
  try {
    const id = req.params.id.trim();

    const books = await db
      .select()
      .from(booksTable)
      .where((table) => eq(table.id, id))
      // .leftJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
      .limit(1);

    if (books && books.length > 0) {
      res.json(books[0]);
    } else {
      res.status(404).json({ message: "book not found" });
    }
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ message: "server error" });
  }
}

export async function addBook(req, res) {
  const { title, description, authorId } = req.body;

  if (!title || title === "") {
    return res.status(400).json({ error: 'Title is required' });
  }
  const [result] = await db.insert(booksTable).values({
    title,
    description,
    authorId
  })
    .returning({
      id: booksTable.id,
    });

  res.status(201).json({ message: 'Book added successfully', id: result.id });
}

export async function DeleteBook(req, res) {
  const id = req.params.id;

  await db.delete(booksTable).where(eq(booksTable.id, id));

  return res.status(200).json({ message: 'Book deleted successfully' });
}

export function CheckNumber(req, res) {
  const { number } = req.body;
  let result;
  if (number > 0) {
    result = `positive`;
  } else if (number < 0) {
    result = `negative`;
  } else {
    result = `zero`;
  }
  res.json({ number, result });
}