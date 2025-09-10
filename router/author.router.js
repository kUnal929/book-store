import express from 'express';
const router = express.Router();
// import { db } from '../db/index.js';
// import { authorsTable } from '../models/author.model.js';

import {getAuthors , getAuthorByID, addAuthor,  } from '../controller/author.controller.js';
  
router.get("/authors", getAuthors );

router.get('/authors/:id', getAuthorByID );

router.post('/authors', addAuthor )

// router.delete('/author/:id', DeleteAuthor);

export default router;