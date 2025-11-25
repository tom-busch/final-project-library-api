import prisma from '../config/db.js';

// GET /authors
export async function findAllAuthors() {
  return prisma.author.findMany({
    select: { id: true, name: true },
  });
}

// Helper
export async function findAuthorById(id) {
  return prisma.author.findUnique({
    where: { id },
    select: { id: true, name: true },
  });
}

// POST /authors
export async function createAuthorRecord(name) {
  return prisma.author.create({
    data: { name },
    select: { id: true, name: true },
  });
}

// PUT /authors/:id
export async function updateAuthorRecord(id, name) {
  return prisma.author.update({
    where: { id },
    data: { name },
    select: { id: true, name: true },
  });
}

// DELETE /authors/:id
export async function deleteAuthorById(id) {
  await prisma.author.delete({ where: { id } });
}
