import prisma from '../config/db.js';
import bcrypt from 'bcrypt';

export async function createUser(data) {
    return await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            passwordHash: data.password,
        }
    });
}

export async function getUserByEmail(email) {
    return await prisma.user.findUnique({where: { email }});
}

export async function findAllUsers() {
    return await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        }
    });
}

export async function createUserFromName(name) {
    const email = `placeholder@example.com`;
    const passwordHash = await bcrypt.hash('placeholder', 10);
    return await prisma.user.create({
        data: {
            name,
            email,
            passwordHash,
            role: 'USER',
        },
    });
}

export async function deleteUserById(userId) {
    return await prisma.user.delete({
        where: { id: userId },
    });
}

export async function findUserById(userId) {
    return await prisma.user.findUnique({
        where: { id: userId },
    });
}

export async function getActiveLoansForUser(userId) {
    const userWithLoans = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            loans: {
                where: { returnedAt: null },
                select: { bookId: true },
            },
        },
    });
    return userWithLoans.loans.map((loan) => loan.bookId);
}

export async function replaceUserLoans(userId, bookIds) {
    const id = Number(userId);

    await prisma.loan.deleteMany({ where: { userId: id } });

    const uniqueBookIds = Array.from(new Set((bookIds || []).map(b => Number(b)).filter(b => !Number.isNaN(b))));

    const createdLoans = await Promise.all(
        uniqueBookIds.map(bookId =>
            prisma.loan.create({
                data: {
                    userId: id,
                    bookId,
                    borrowedAt: new Date(),
                    returned: false,
                }
            })
        )
    );

    return createdLoans.map(loan => loan.bookId);
}

export async function updateUserRoleById(userId, role) {
    return await prisma.user.update({
        where: { id: userId },
        data: { role },
    });
}