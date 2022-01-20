import { Router } from "express";
const router = new Router();
import Team from "../mongo/models/Team.js";
import User from "../mongo/models/User.js";

router.post('/add_team', async (req, res) => {
    try {
        const { name, maxNum } = req.body;
        const team = new Team({ name, maxNumMembers: maxNum });
        await team.save();
        res.status(200).json({ message: `'${req.body.name}' team has been created`, team });
    } catch (err) {
        res.status(400).json({ message: 'User error' });
    }
});

router.get('/get_teams', async (req, res) => {
    try {
        const teams = await Team.find({});
        res.status(200).json({ teams });
    } catch (err) {
        res.status(400).json({ err })
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const team = await Team.findByIdAndDelete(req.params.id);
        res.status(200).json({ team, message: 'Team has been deleted' });
    } catch (err) {
        res.status(400).json({ err });
    }
});

router.patch('/:id', async (req, res) => {
    const validUpdates = ['name', 'maxNumMembers'];
    const updates = Object.keys(req.body);
    const isValidUpdate = updates.every(value => validUpdates.includes(value));
    if (updates.length === 0 || !isValidUpdate) return res.status(400).json({ message: 'Not valid updates' });
    try {
        const { name, maxNum } = req.body;
        const team = await Team.findByIdAndUpdate(req.params.id, { name, maxNumMembers: maxNum }, { new: true, runValidators: true });
        res.status(200).json({ team, message: 'Team has been updated' });
    } catch (err) {
        res.status(400).json({ err });
    }
});

router.post('/add_user_to_team', async (req, res) => {
    try {
        const { username, teamName } = req.body;
        if (!username || !teamName) return res.status(400).json({ message: 'Enter user and team name' });
        const user = await User.findOne({ username });
        await Team.findOneAndUpdate({
            name: teamName
        }, {
            $push: {
                users: user
            }
        });
        const teams = await Team.find({});
        res.status(200).json({ teams, message: `User has been added to ${req.body.teamName}` });
    } catch (err) {
        res.status(400).json({ message: 'Something gone wrong' });
    }
});

router.delete('/delete_user_from_team', async (req, res) => {
    try {
        const { username, teamName } = req.body;
        const user = await User.findOne({ username });
        await Team.findOneAndUpdate({
            name: teamName
        }, {
            $pull: {
                users: {
                    username
                }
            }
        }, { new: true });
        res.status(200).json({ message: 'User has been removed from team' });
    } catch (err) {
        res.status(400).json({ message: 'Choose username and team name to delete user' });
    }
});

export default router;