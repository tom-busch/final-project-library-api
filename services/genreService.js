const {
  findAllGenres,
  findGenreById,
  createGenreRecord,
  updateGenreRecord,
  deleteGenreById,
} = require('../repositories/genreRepo.js');

// GET /genres
async function listGenres() {
  return findAllGenres();
}

// POST /genres
async function createGenreService(body) {
  const { name } = body;
  if (!name) {
    const err = new Error('Field "name" is required');
    err.status = 400;
    throw err;
  }

  return createGenreRecord(name);
}

// PUT /genres/:id
async function updateGenreService(idParam, body) {
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
async function removeGenreService(idParam) {
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

module.exports = {
  listGenres,
  createGenreService,
  updateGenreService,
  removeGenreService
};
