import 'dotenv/config';
import express from 'express';
import { db } from './db/index.js';
import bookRouter from './router/book.router.js';
import authorRouter from './router/author.router.js';
import Loggermiddleware from './middleware/logger.js';
const app = express();
const port = 3000;

app.use(Loggermiddleware);
app.use(express.json());
app.use('/', bookRouter);
app.use('/', authorRouter);




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});