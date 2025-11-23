import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../repositories/userRepo.js';

export async function signUp(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await createUser({name, email, password: hashedPassword});
        return newUser;
    } catch (error) {
        if (error.code === 'P2002') {
            const err = new Error('Email already in use');
            err.status = 409;
            throw err;
        }
        throw error;
    }
}

export async function logIn(email, password) {
    const user = await getUserByEmail(email);
    if(!user) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        throw err;
    }
    
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if(!isMatch) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        throw err;
    }

    return;

}