const prisma = require('../config/db.js');
const bcrypt = require('bcrypt');

async function createUser(data) {
    return await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            passwordHash: data.password,
        }
    });
}

async function getUserByEmail(email) {
    return await prisma.user.findUnique({where: { email }});
}

async function findAllUsers() {
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

async function createUserFromName(name) {
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

async function deleteUserById(userId) {
    return await prisma.user.delete({
        where: { id: userId },
    });
}

async function findUserById(userId) {
    return await prisma.user.findUnique({
        where: { id: userId },
    });
}

async function getActiveLoansForUser(userId) {
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

async function replaceUserLoans(userId, bookIds) {
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

async function updateUserRoleById(userId, role) {
    return await prisma.user.update({
        where: { id: userId },
        data: { role },
    });
}

module.exports = {
    createUser,
    getUserByEmail,
    findAllUsers,
    createUserFromName,
    deleteUserById,
    findUserById,
    getActiveLoansForUser,
    replaceUserLoans,
    updateUserRoleById
};