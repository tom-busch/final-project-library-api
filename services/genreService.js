import {
  findAllGenres,
  findGenreById,
  createGenreRecord,
  updateGenreRecord,
  deleteGenreById,
} from '../repositories/genreRepo.js';

// GET /genres
export async function listGenres() {
  return findAllGenres();
}

// POST /genres
export async function createGenreService(body) {
  const { name } = body;
  if (!name) {
    const err = new Error('Field "name" is required');
    err.status = 400;
    throw err;
  }

  return createGenreRecord(name);
}

// PUT /genres/:id
export async function updateGenreService(idParam, body) {
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    const err = new Error('Invalid genre ID');
    err.status = 400;
    throw err;
  }

  const { name } = body;
  if (!name) {
    const err = new Error('Field "name" is required');
    err.status = 400;
    throw err;
  }

  const existing = await findGenreById(id);
  if (!existing) {
    const err = new Error('Genre not found');
    err.status = 404;
    throw err;
  }

  return updateGenreRecord(id, name);
}

// DELETE /genres/:id
export async function removeGenreService(idParam) {
  const id = Number(idParam);
  if (Number.isNaN(id)) {
    const err = new Error('Invalid genre ID');
    err.status = 400;
    throw err;
  }

  const existing = await findGenreById(id);
  if (!existing) {
    const err = new Error('Genre not found');
    err.status = 404;
    throw err;
  }

  await deleteGenreById(id);
}
