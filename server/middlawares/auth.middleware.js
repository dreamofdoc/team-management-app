import jwt from 'jsonwebtoken';
import User from "../mongo/models/User.js";
import { compare } from "bcrypt";
import dotenv from 'dotenv';
dotenv.config();

export const loginMiddleware = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'Invalid username or password' });
        const isValidPassword = await compare(password, user.password);
        if (!isValidPassword) return res.status(400).json({ message: 'Invalid username or password' });
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.status(200).json({ user, token, message: 'Logged in' });
        next();
    } catch (err) {
        res.status(400).json({ message: 'Authentication Error' });
    }
}

export const authMiddleware =  (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.status(401).json({ message: 'Auth error' });
        req.user = jwt.verify(token, process.env.SECRET_KEY);
        next();
    } catch (error) {
        res.status(500).json({ message: 'Auth error' });
    }
}