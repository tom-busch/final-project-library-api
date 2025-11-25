import prisma from '../config/db.js';

// GET /books
export async function findAllBooks() {
  return prisma.book.findMany({
    select: {
      id: true,
      title: true,
      authorId: true,
      genreId: true,
    },
  });
}

// Helper
export async function findBookById(id) {
  return prisma.book.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      authorId: true,
      genreId: true,
    },
  });
}

export async function createBookRecord({ name, authorId, genreId }) {
  return prisma.book.create({
    data: {
      title: name,
      authorId,
      genreId,
    },
    select: {
      id: true,
      title: true,
      authorId: true,
      genreId: true,
    },
  });
}

export async function updateBookRecord(id, { name, authorId, genreId }) {
  const data = {};
  if (typeof name === 'string') data.title = name;
  if (typeof authorId === 'number') data.authorId = authorId;
  if (typeof genreId === 'number') data.genreId = genreId;

  return prisma.book.update({
    where: { id },
    data,
    select: {
      id: true,
      title: true,
      authorId: true,
      genreId: true,
    },
  });
}

// DELETE /books/:id
export async function deleteBookById(id) {
  await prisma.book.delete({
    where: { id },
  });
}
