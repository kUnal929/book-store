# Books Store API

A simple REST API for managing authors and books using Express, PostgreSQL, and Drizzle ORM.

## Features

- Create, read, update, and delete authors
- Create, read, update, and delete books
- Input validation for ids, email addresses, and required fields
- PostgreSQL schema managed with Drizzle
- Clean JSON responses for success and error cases

## Tech Stack

- Node.js
- Express
- PostgreSQL
- Drizzle ORM

## Project Structure

```text
controller/   Request handlers
db/           Database connection
middleware/   Logger and 404 handler
models/       Drizzle schema
router/       Express routes
utils/        Shared validators
drizzle/      Generated migration files
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file using `.env.example`.

3. Update `DATABASE_URL` with your PostgreSQL connection string.

4. Run the server:

```bash
npm run dev
```

For production-style startup:

```bash
npm start
```

## Environment Variables

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/books_store
PORT=3000
```

## API Endpoints

### Health Check

- `GET /`

### Authors

- `GET /authors`
- `GET /authors/:id`
- `POST /authors`
- `PUT /authors/:id`
- `DELETE /authors/:id`

Example request body:

```json
{
  "firstName": "George",
  "lastName": "Orwell",
  "email": "george@example.com"
}
```

### Books

- `GET /books`
- `GET /books/:id`
- `POST /books`
- `PUT /books/:id`
- `DELETE /books/:id`

Example request body:

```json
{
  "title": "Animal Farm",
  "description": "Political satire novel",
  "authorId": "author-uuid-here"
}
```

## Notes

- An author cannot be deleted while books are still assigned to that author.
- `authorId` is optional while creating or updating a book.

## Future Improvements

- Add automated API tests
- Add pagination and search
- Add Docker setup
- Add authentication for protected routes
