const API_URL = 'http://localhost:3000';

export const fetchBooks = async () => {
  const res = await fetch(`${API_URL}/books`);
  if (!res.ok) throw new Error('Failed to fetch books');
  return res.json();
};

export const fetchBookById = async (id) => {
  const res = await fetch(`${API_URL}/books/${id}`);
  if (!res.ok) throw new Error('Failed to fetch book');
  return res.json();
};

export const createBook = async (bookData) => {
  const res = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  if (!res.ok) throw new Error('Failed to create book');
  return res.json();
};

export const updateBook = async (id, bookData) => {
  const res = await fetch(`${API_URL}/books/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookData),
  });
  if (!res.ok) throw new Error('Failed to update book');
  return res.json();
};

export const deleteBook = async (id) => {
  const res = await fetch(`${API_URL}/books/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete book');
  return res.json();
};

export const fetchAuthors = async () => {
  const res = await fetch(`${API_URL}/authors`);
  if (!res.ok) throw new Error('Failed to fetch authors');
  return res.json();
};

export const fetchAuthorById = async (id) => {
  const res = await fetch(`${API_URL}/authors/${id}`);
  if (!res.ok) throw new Error('Failed to fetch author');
  return res.json();
};

export const createAuthor = async (authorData) => {
  const res = await fetch(`${API_URL}/authors`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(authorData),
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to create author');
  }
  return res.json();
};

export const updateAuthor = async (id, authorData) => {
  const res = await fetch(`${API_URL}/authors/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(authorData),
  });
  if (!res.ok) throw new Error('Failed to update author');
  return res.json();
};

export const deleteAuthor = async (id) => {
  const res = await fetch(`${API_URL}/authors/${id}`, { method: 'DELETE' });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.error || 'Failed to delete author');
  }
  return res.json();
};
