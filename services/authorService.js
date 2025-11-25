const {
  findAllAuthors,
  findAuthorById,
  createAuthorRecord,
  updateAuthorRecord,
  deleteAuthorById,
} = require('../repositories/authorRepo.js');

// GET /authors
async function listAuthors() {
  return findAllAuthors();
}

// POST /authors
async function createAuthorService(body) {
  const { name } = body;
  if (!name) {
    const err = new Error('Field "name" is required');
    err.status = 400;
    throw err;
  }
  return createAuthorRecord(name);
}

// PUT /authors/:id
async function updateAuthorService(idParam, body) {
  const id = Number(idParam);
  if (Number.isNaN(id)) throw new Error('Invalid author ID');

  const { name } = body;
  if (!name) throw new Error('Field "name" is required');

  const existing = await findAuthorById(id);
  if (!existing) throw new Error('Author not found');

  return updateAuthorRecord(id, name);
}

// DELETE /authors/:id
async function removeAuthorService(idParam) {
  const id = Number(idParam);
  if (Number.isNaN(id)) throw new Error('Invalid author ID');

  const existing = await findAuthorById(id);
  if (!existing) throw new Error('Author not found');

  await deleteAuthorById(id);
}

module.exports = {
  listAuthors,
  createAuthorService,
  updateAuthorService,
  removeAuthorService
};
