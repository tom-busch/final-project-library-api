import prisma from '../config/db.js';

export async function createUser(data) {
    return await prisma.user.create({
        data: {
            email: data.email,
            name: data.name,
            passwordHash: data.password, // assumes password is already hashed
        }
    });
}

export async function getUserByEmail(email) {
    return await prisma.user.findUnique({where: { email }});
}