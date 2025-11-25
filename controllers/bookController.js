import {
  listBooks,
  createBookService,
  updateBookService,
  removeBookService,
} from '../services/bookService.js';

// GET /books
export async function getBooks(req, res, next) {
  try {
    const books = await listBooks();
    res.json(books);
  } catch (err) {
    next(err);
  }
}

// POST /books
export async function postBook(req, res, next) {
  try {
    const book = await createBookService(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
}

// PUT /books/:id
export async function putBook(req, res, next) {
  try {
    const updated = await updateBookService(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// DELETE /books/:id
export async function deleteBook(req, res, next) {
  try {
    await removeBookService(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
