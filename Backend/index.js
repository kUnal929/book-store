import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bookRouter from './router/book.router.js';
import authorRouter from './router/author.router.js';
import loggerMiddleware from './middleware/logger.js';
import notFound from './middleware/notFound.js';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.get('/', (req, res) => {
  res.json({ message: 'Books Store API is running' });
});
app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use(notFound);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
