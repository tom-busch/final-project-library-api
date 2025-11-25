import {
  findAllBooks,
  findBookById,
  createBookRecord,
  updateBookRecord,
  deleteBookById,
} from '../repositories/bookRepo.js';

// GET /books
export async function listBooks() {
  const books = await findAllBooks();
  return books.map((b) => ({
    id: b.id,
    name: b.title,
    authorId: b.authorId,
    genreId: b.genreId,
  }));
}

// POST /books
export async function createBookService(body) {
  const { name, authorId, genreId } = body;

  if (!name || authorId == null || genreId == null) {
    const err = new Error('Fields "name", "authorId", and "genreId" are required');
    err.status = 400;
    throw err;
  }

  const book = await createBookRecord({
    name,
    authorId: Number(authorId),
    genreId: Number(genreId),
  });

  return {
    id: book.id,
    name: book.title,
    authorId: book.authorId,
    genreId: book.genreId,
  };
}

// PUT /books/:id
export async function updateBookService(idParam, body) {
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    const err = new Error('Invalid book ID');
    err.status = 400;
    throw err;
  }

  const existing = await findBookById(id);
  if (!existing) {
    const err = new Error('Book not found');
    err.status = 404;
    throw err;
  }

  const updateData = {};
  if (body.name != null) updateData.name = body.name;
  if (body.authorId != null) updateData.authorId = Number(body.authorId);
  if (body.genreId != null) updateData.genreId = Number(body.genreId);

  if (Object.keys(updateData).length === 0) {
    const err = new Error('No valid fields to update');
    err.status = 400;
    throw err;
  }

  const updated = await updateBookRecord(id, updateData);

  return {
    id: updated.id,
    name: updated.title,
    authorId: updated.authorId,
    genreId: updated.genreId,
  };
}

// DELETE /books/:id
export async function removeBookService(idParam) {
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    const err = new Error('Invalid book ID');
    err.status = 400;
    throw err;
  }

  const existing = await findBookById(id);
  if (!existing) {
    const err = new Error('Book not found');
    err.status = 404;
    throw err;
  }

  await deleteBookById(id);
}
