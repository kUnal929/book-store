// router/book.router.js

import express from 'express';
import {
  getAllBooks,
  getbookById,
  addBook,
  DeleteBook,
  CheckNumber
} from '../controller/books.controller.js';

const router = express.Router();

router.get("/books", getAllBooks);

router.get('/books/:id', getbookById);

router.post("/books", addBook);

router.delete('/books/:id', DeleteBook);

router.post("/check-number", CheckNumber);

export default router;