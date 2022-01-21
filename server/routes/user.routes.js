import { Router } from "express";
import User from "../mongo/models/User.js";
import Team from "../mongo/models/Team.js";
import { hash } from "bcrypt";
import { authMiddleware, loginMiddleware } from "../middlawares/auth.middleware.js";
import jwt from "jsonwebtoken";
const router = new Router();

router.get('/get_users', async (req, res) => {
    try {
        let users = await User.find({});
        users = users.filter(user => !user.isAdmin);
        res.status(200).json({ users });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/register', async (req, res) => {
    const { isAdmin, team: teamName, username, email, password } = req.body;
    if (!username && !email && !password) return res.status(400).json({ message: 'Enter valid username, email and password' });
    try {
        const team = await Team.findOne({ name: teamName });
        if (!team) return res.status(400).json({ message: 'There is no team with such a name' });
        const user = new User({ isAdmin, team: team._id, username, email, password });
        await Team.findOneAndUpdate({
                name: teamName
            }, {
                $push: {
                    users: user
                }
            });
        await user.save();
        res.status(200).json({ message: 'User created' });
    } catch (e) {
        res.status(400).json({ message: e.message })
    }
});

router.post('/login', loginMiddleware);

router.get('/profile/:id', async (req, res) => {
    try {
        await User.findById(req.params.id).populate('team').exec(function (err, user) {
            if (err) return res.status(400).json({ message: 'Server error' });
            res.status(200).json({ user });
        });
    } catch (err) {
        res.status(400).json({ message: 'Server error' });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const validUpdates = ['team', 'username', 'password'];
        const updates = Object.keys(req.body);
        const isValidUpdate = updates.every(value => validUpdates.includes(value));
        if (!isValidUpdate) return res.status(400).json({ message: 'Invalid update values' });
        const { team: teamName, username, password } = req.body;
        const team = await Team.findOne({ name: teamName });
        const hashedPassword = await hash(password, 8);
        const user = await User.findByIdAndUpdate(req.params.id, { team: team._id, username, password: hashedPassword }, { new: true, runValidators: true });
        res.status(200).json({ user, message: 'User has been updated' });
    } catch (err) {
        res.status(400).json({ message: 'Invalid values' });
        console.log(err)
    }
});

router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.user.id });
            const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
            res.status(200).json({ token, user });
        } catch (error) {
            res.status(400).json({ error });
        }
    }
);

export default router;