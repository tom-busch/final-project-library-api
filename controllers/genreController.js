const {
  listGenres,
  createGenreService,
  updateGenreService,
  removeGenreService,
} = require('../services/genreService.js');

// GET /genres
async function getGenres(req, res, next) {
  try {
    const genres = await listGenres();
    res.json(genres);
  } catch (err) {
    next(err);
  }
}

// POST /genres
async function postGenre(req, res, next) {
  try {
    const genre = await createGenreService(req.body);
    res.status(201).json(genre);
  } catch (err) {
    next(err);
  }
}

// PUT /genres/:id
async function putGenre(req, res, next) {
  try {
    const updated = await updateGenreService(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// DELETE /genres/:id
async function deleteGenre(req, res, next) {
  try {
    await removeGenreService(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getGenres,
  postGenre,
  putGenre,
  deleteGenre
};
