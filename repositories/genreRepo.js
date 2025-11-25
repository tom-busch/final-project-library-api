const prisma = require('../config/db.js');

// GET /genres
async function findAllGenres() {
  return prisma.genre.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

// Helper
async function findGenreById(id) {
  return prisma.genre.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
    },
  });
}

// POST /genres
async function createGenreRecord(name) {
  return prisma.genre.create({
    data: { name },
    select: {
      id: true,
      name: true,
    },
  });
}

// PUT /genres/:id
async function updateGenreRecord(id, name) {
  return prisma.genre.update({
    where: { id },
    data: { name },
    select: {
      id: true,
      name: true,
    },
  });
}

// DELETE /genres/:id
async function deleteGenreById(id) {
  await prisma.genre.delete({
    where: { id },
  });
}

module.exports = {
  findAllGenres,
  findGenreById,
  createGenreRecord,
  updateGenreRecord,
  deleteGenreById
};
