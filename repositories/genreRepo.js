import prisma from '../config/db.js';

// GET /genres
export async function findAllGenres() {
  return prisma.genre.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}

// Helper
export async function findGenreById(id) {
  return prisma.genre.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
    },
  });
}

// POST /genres
export async function createGenreRecord(name) {
  return prisma.genre.create({
    data: { name },
    select: {
      id: true,
      name: true,
    },
  });
}

// PUT /genres/:id
export async function updateGenreRecord(id, name) {
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
export async function deleteGenreById(id) {
  await prisma.genre.delete({
    where: { id },
  });
}
