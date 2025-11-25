const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../repositories/userRepo.js');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

async function signUp(name, email, password) {
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

async function logIn(email, password) {
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

    const accessToken = jwt.sign({id: user.id, role: user.role}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    return accessToken;
}

module.exports = {
    signUp,
    logIn
};

