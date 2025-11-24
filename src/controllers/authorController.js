import {
  listAuthors,
  createAuthorService,
  updateAuthorService,
  removeAuthorService,
} from '../services/authorService.js';

// GET /authors
export async function getAuthors(req, res, next) {
  try {
    const authors = await listAuthors();
    res.json(authors);
  } catch (err) {
    next(err);
  }
}

// POST /authors
export async function postAuthor(req, res, next) {
  try {
    const author = await createAuthorService(req.body);
    res.status(201).json(author);
  } catch (err) {
    next(err);
  }
}

// PUT /authors/:id
export async function putAuthor(req, res, next) {
  try {
    const updated = await updateAuthorService(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

// DELETE /authors/:id
export async function deleteAuthor(req, res, next) {
  try {
    await removeAuthorService(req.params.id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
