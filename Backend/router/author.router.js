import express from 'express';
import {
  getAuthors,
  getAuthorByID,
  addAuthor,
  updateAuthor,
  deleteAuthor
} from '../controller/author.controller.js';

const router = express.Router();

router.get('/', getAuthors);
router.get('/:id', getAuthorByID);
router.post('/', addAuthor);
router.put('/:id', updateAuthor);
router.delete('/:id', deleteAuthor);

export default router;
