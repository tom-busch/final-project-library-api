const {
  listBooks,
  createBookService,
  updateBookService,
  removeBookService,
} = require('../services/bookService.js');

// GET /books
async function getBooks(req, res, next) {
  try {
    const books = await listBooks();
    res.json(books);
  } catch (err) {
    next(err);
  }
}

// POST /books
async function postBook(req, res, next) {
  try {
    const book = await createBookService(req.body);
    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
}

// PUT /books/:id
async function putBook(req, res, next) {
  try {
    const updated = await updateBookService(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// DELETE /books/:id
async function deleteBook(req, res, next) {
  try {
    await removeBookService(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getBooks,
  postBook,
  putBook,
  deleteBook
};
