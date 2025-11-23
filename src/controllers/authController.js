import { signUp, logIn } from "../services/authService.js"

export async function signUpHandler(req, res) {
    const {name, email, password } = req.body;
    
    try {
        const newUser = await signUp(name, email, password);
        res.status(201).json({message: `New user created with an id of ${newUser.id}` });
    } catch (err) {
        res.status(err.status || 500).json({ error: err.message });
    }
}

export async function logInHandler(req, res) {
    const {email, password } = req.body;

    await logIn(email, password);
    
    res.status(200).json({ message: 'Login successful' });
}
