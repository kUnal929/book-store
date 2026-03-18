import { authorsTable } from "../models/author.model.js";
import { db } from "../db/index.js";
import { eq } from "drizzle-orm";
import { isNonEmptyString, isValidEmail, isValidUUID } from "../utils/validators.js";


export async function getAuthors(req, res) {
  try {
    const authors = await db.select().from(authorsTable);
    return res.json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getAuthorByID(req, res) {
  try {
    const id = req.params.id.trim();

    if (!isValidUUID(id)) {
      return res.status(400).json({ message: "Invalid author id" });
    }

    const author = await db
      .select()
      .from(authorsTable)
      .where(eq(authorsTable.id, id))
      .limit(1);

    if (author && author.length > 0) {
      return res.json(author[0]);
    }

    return res.status(404).json({ message: "Author not found" });
  } catch (error) {
    console.error("Error fetching author:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function addAuthor(req, res) {
  try {
    const { firstName, lastName, email } = req.body;

    if (!isNonEmptyString(firstName)) {
      return res.status(400).json({ message: "First name is required" });
    }

    if (!isNonEmptyString(lastName)) {
      return res.status(400).json({ message: "Last name is required" });
    }

    if (!isNonEmptyString(email)) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email address" });
    }

    const [result] = await db
      .insert(authorsTable)
      .values({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.trim().toLowerCase()
      })
      .returning();

    return res.status(201).json({
      message: "Author added successfully",
      author: result
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }

    console.error("Error adding author:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function updateAuthor(req, res) {
  try {
    const id = req.params.id.trim();
    const { firstName, lastName, email } = req.body;

    if (!isValidUUID(id)) {
      return res.status(400).json({ message: "Invalid author id" });
    }

    const updates = {};

    if (firstName !== undefined) {
      if (!isNonEmptyString(firstName)) {
        return res.status(400).json({ message: "First name cannot be empty" });
      }
      updates.firstName = firstName.trim();
    }

    if (lastName !== undefined) {
      if (!isNonEmptyString(lastName)) {
        return res.status(400).json({ message: "Last name cannot be empty" });
      }
      updates.lastName = lastName.trim();
    }

    if (email !== undefined) {
      if (!isNonEmptyString(email)) {
        return res.status(400).json({ message: "Email cannot be empty" });
      }
      if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Enter a valid email address" });
      }
      updates.email = email.trim().toLowerCase();
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "Provide at least one field to update" });
    }

    const [updatedAuthor] = await db
      .update(authorsTable)
      .set(updates)
      .where(eq(authorsTable.id, id))
      .returning();

    if (!updatedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    return res.json({
      message: "Author updated successfully",
      author: updatedAuthor
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(409).json({ message: "Email already exists" });
    }

    console.error("Error updating author:", error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function deleteAuthor(req, res) {
  try {
    const id = req.params.id.trim();

    if (!isValidUUID(id)) {
      return res.status(400).json({ message: "Invalid author id" });
    }

    const [deletedAuthor] = await db
      .delete(authorsTable)
      .where(eq(authorsTable.id, id))
      .returning();

    if (!deletedAuthor) {
      return res.status(404).json({ message: "Author not found" });
    }

    return res.json({ message: "Author deleted successfully" });
  } catch (error) {
    if (error.code === "23503") {
      return res.status(400).json({
        message: "Cannot delete author while books are assigned to that author"
      });
    }

    console.error("Error deleting author:", error);
    return res.status(500).json({ message: "Server error" });
  }
}
