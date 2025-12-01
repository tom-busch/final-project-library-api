-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."authors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."genres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."books" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "authorId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,
    "isbn" TEXT,
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."loans" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "borrowedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" TIMESTAMP(3),
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "dueAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "genres_name_key" ON "public"."genres"("name");

-- CreateIndex
CREATE UNIQUE INDEX "books_isbn_key" ON "public"."books"("isbn");

-- CreateIndex
CREATE INDEX "books_authorId_idx" ON "public"."books"("authorId");

-- CreateIndex
CREATE INDEX "books_genreId_idx" ON "public"."books"("genreId");

-- CreateIndex
CREATE INDEX "loans_userId_idx" ON "public"."loans"("userId");

-- CreateIndex
CREATE INDEX "loans_bookId_idx" ON "public"."loans"("bookId");

-- AddForeignKey
ALTER TABLE "public"."books" ADD CONSTRAINT "books_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "public"."authors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."books" ADD CONSTRAINT "books_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "public"."genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."loans" ADD CONSTRAINT "loans_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "public"."books"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."loans" ADD CONSTRAINT "loans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
