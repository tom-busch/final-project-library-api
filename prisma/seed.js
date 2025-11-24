import bcrypt from 'bcrypt';
import 'dotenv/config';
import prisma from '../src/config/db.js';

async function main() {
  console.log('Starting database');
  await prisma.$queryRaw`TRUNCATE loans, books, authors, genres, users RESTART IDENTITY;`;
  console.log('Cleared existing data');

  const usersData = [
    {
      name: 'G Reader',
      email: 'g@test.com',
      passwordHash: await bcrypt.hash('ggok1234', 10),
      role: 'USER',
    },
    {
      name: 'T Customer',
      email: 'T@test.com',
      passwordHash: await bcrypt.hash('TT1234', 10),
      role: 'USER',
    },
    {
      name: 'C Admin',
      email: 'cAdmin@test.com',
      passwordHash: await bcrypt.hash('admin1234', 10),
      role: 'ADMIN',
    },
  ];

  const users = await Promise.all(
    usersData.map((user) =>
      prisma.user.create({
        data: user,
      }),
    ),
  );

  const [G, T, C] = users;

  console.log('👤 Created users:', {
    G: G.email,
    T: T.email,
    C: C.email,
  });

  const fiction = await prisma.genre.create({
    data: { name: 'Fiction' },
  });

  const mystery = await prisma.genre.create({
    data: { name: 'Mystery' },
  });

  const nonFiction = await prisma.genre.create({
    data: { name: 'Non-Fiction' },
  });

  const author1 = await prisma.author.create({
    data: { name: 'Rick Riordan' },
  });

  const author2 = await prisma.author.create({
    data: { name: 'Chetan Bhagat' },
  });

  const author3 = await prisma.author.create({
    data: { name: 'John Green' },
  });

  console.log('Created authors.');

  const book1 = await prisma.book.create({
    data: {
      title: 'The Lightning Thief',
      authorId: author1.id,
      genreId: fiction.id,
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: 'Girl in Room 105',
      authorId: author2.id,
      genreId: mystery.id,
    },
  });

  const book3 = await prisma.book.create({
    data: {
      title: 'Looking for Alaska',
      authorId: author3.id,
      genreId: nonFiction.id,
    },
  });

  console.log('Created books.');

  // G borrows book1
  await prisma.loan.create({
    data: {
      userId: G.id,
      bookId: book1.id,
      borrowedAt: new Date(),
      returned: false,
    },
  });

  // T borrows book2 and returns it
  await prisma.loan.create({
    data: {
      userId: T.id,
      bookId: book2.id,
      borrowedAt: new Date('2024-01-05'),
      returnedAt: new Date('2024-01-20'),
      returned: true,
    },
  });

  console.log('Created loan records.');

  console.log('Seed completed successfully!');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
