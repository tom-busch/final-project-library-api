const prisma = require('../config/db.js');

// GET /authors
async function findAllAuthors() {
  return prisma.author.findMany({
    select: { id: true, name: true },
  });
}

// Helper
async function findAuthorById(id) {
  return prisma.author.findUnique({
    where: { id },
    select: { id: true, name: true },
  });
}

// POST /authors
async function createAuthorRecord(name) {
  return prisma.author.create({
    data: { name },
    select: { id: true, name: true },
  });
}

// PUT /authors/:id
async function updateAuthorRecord(id, name) {
  return prisma.author.update({
    where: { id },
    data: { name },
    select: { id: true, name: true },
  });
}

// DELETE /authors/:id
async function deleteAuthorById(id) {
  await prisma.author.delete({ where: { id } });
}

module.exports = {
  findAllAuthors,
  findAuthorById,
  createAuthorRecord,
  updateAuthorRecord,
  deleteAuthorById
};
