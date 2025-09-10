import { authorsTable } from "../models/author.model.js";
import { booksTable } from "../models/book.model.js";
import { db } from "../db/index.js";
import { eq, sql } from "drizzle-orm";


export async function getAuthors(req, res) {
    const authors = await db.select().from(authorsTable)
    return res.json(authors);
}

export async function getAuthorByID(req, res) {
    try {
        const id = req.params.id.trim();
    const author = await db.select()
    .from(authorsTable)
    .where((table) => eq(table.id, id)) 
    // .leftJoin(booksTable, eq(booksTable.authorId, authorsTable.id))
    .limit(1);
        
        if (author && author.length > 0) {
            res.json(author[0]);
        }
        else {
            res.status(404).json({ message: "Author not found" });
        }
    } catch (error) {
        console.error("Error fetching author:", error);

    }
}

export async function addAuthor(req, res) {
    const { firstName, lastName, email } = req.body;

    if (!firstName || firstName === "") {
        return res.status(400).json({ error: 'First Name is required' });
    }
    else if (!lastName || lastName === "") {
        return res.status(400).json({ error: 'Last Name is required' });
    }
    else if (!email || email === "") {
        return res.status(400).json({ error: 'Email is required' });
    }
    const [result] = await db.insert(authorsTable).values({
        firstName,
        lastName,
        email
    })
        .returning({ id: authorsTable.id })
    return res.status(201).json({ message: 'Author added successfully', result });

}

// export async function DeleteAuthor(req, res) {
//    try {
//        const id =  req.params.id;
//        const [result] = await db.delete(authorsTable).where(eq(authorsTable.id, id));
//        return res.status(200).json({ message: 'Author deleted successfully' });
    
//    } catch (error) {
//          console.error("Error deleting author:", error);
//    }
    
// }