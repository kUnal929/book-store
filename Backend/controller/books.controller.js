import { booksTable } from "../models/book.model.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { isNonEmptyString, isValidUUID, sanitizeOptionalString } from "../utils/validators.js";

export async function getAllBooks(req, res) {
  try {
    const books = await db.select().from(booksTable);
    return res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getBookById(req, res) {
  try {
    const id = req.params.id.trim();

    if (!isValidUUID(id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const books = await db
      .select()
      .from(booksTable)
      .where(eq(booksTable.id, id))
      .limit(1);

    if (books && books.length > 0) {
      return res.json(books[0]);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.error("Error fetching book:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function addBook(req, res) {
  try {
    const { title, description, authorId } = req.body;

    if (!isNonEmptyString(title)) {
      return res.status(400).json({ message: "Title is required" });
    }

    if (authorId !== undefined && authorId !== null && !isValidUUID(authorId)) {
      return res.status(400).json({ message: "Invalid author id" });
    }

    const [result] = await db
      .insert(booksTable)
      .values({
        title: title.trim(),
        description: sanitizeOptionalString(description),
        authorId: authorId ?? null
      })
      .returning();

    return res.status(201).json({
      message: "Book added successfully",
      book: result
    });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(400).json({ message: "Author does not exist" });
    }

    console.error("Error adding book:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateBook(req, res) {
  try {
    const id = req.params.id.trim();
    const { title, description, authorId } = req.body;

    if (!isValidUUID(id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const updates = {};

    if (title !== undefined) {
      if (!isNonEmptyString(title)) {
        return res.status(400).json({ message: "Title cannot be empty" });
      }
      updates.title = title.trim();
    }

    if (description !== undefined) {
      updates.description = sanitizeOptionalString(description);
    }

    if (authorId !== undefined) {
      if (authorId !== null && !isValidUUID(authorId)) {
        return res.status(400).json({ message: "Invalid author id" });
      }
      updates.authorId = authorId;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Provide at least one field to update" });
    }

    const [updatedBook] = await db
      .update(booksTable)
      .set(updates)
      .where(eq(booksTable.id, id))
      .returning();

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.json({
      message: "Book updated successfully",
      book: updatedBook
    });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(400).json({ message: "Author does not exist" });
    }

    console.error("Error updating book:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function deleteBook(req, res) {
  try {
    const id = req.params.id.trim();

    if (!isValidUUID(id)) {
      return res.status(400).json({ message: "Invalid book id" });
    }

    const [deletedBook] = await db
      .delete(booksTable)
      .where(eq(booksTable.id, id))
      .returning();

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Error deleting book:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
