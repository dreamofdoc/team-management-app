import { Router } from "express";
const router = new Router();
import Team from "../mongo/models/Team.js";
import User from "../mongo/models/User.js";
import mongoose from "mongoose";

router.post('/add_team', async (req, res) => {
    try {
        const { name, maxNum } = req.body;
        const team = new Team({ _id: new mongoose.Types.ObjectId(), name, maxNumMembers: maxNum });
        await team.save();
        res.status(200).json({ message: `'${req.body.name}' team has been created`, team });
    } catch (err) {
        res.status(400).json({ message: 'Enter team name and max number of members' });
    }
});

router.get('/get_teams', async (req, res) => {
    try {
        await Team.find({}).populate('users').exec(function (err, teams) {
            if (err) return res.status(400).json({ message: 'Something gone wrong with teams' })
            res.status(200).json({ teams });
        });
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
    // const validUpdates = ['name', 'maxNumMembers'];
    // const updates = Object.keys(req.body);
    // const isValidUpdate = updates.every(value => validUpdates.includes(value));
    // if (updates.length === 0 || !isValidUpdate) return res.status(400).json({ message: 'Not valid updates' });
    try {
        const { name, maxNum } = req.body;
        const team = await Team.findByIdAndUpdate(req.params.id, { name, maxNumMembers: maxNum }, { new: true, runValidators: true });
        res.status(200).json({ team, message: 'Team has been updated' });
    } catch (err) {
        res.status(400).json({ message: 'Something wrong while updating' });
    }
});

router.post('/operation/add_user_to_team', async (req, res) => {
    try {
        const { username, teamName } = req.body;
        if (!username || !teamName) return res.status(400).json({ message: 'Enter username' });
        const user = await User.findOne({ username });
        const team = await Team.findOne({ name: teamName });
        if ((team.users.length + 1) > team.maxNumMembers) return res.status(400).json({ message: 'Users count is overlimited' });
        await Team.findOneAndUpdate({
            name: teamName
        }, {
            $push: {
                users: user
            }
        });
        await User.findOne({ username }).populate('team').exec(async function (err, user) {
            if (err) return res.status(400).json({ message: 'Server error' });
            console.log(user)
            const prevTeam = await Team.findOne({ name: user.team });
            prevTeam.users.remove(user);
            await prevTeam.save();
        });
        await Team.find({}).populate('users').exec(function (err, teams) {
            if (err) return res.status(400).json({ message: 'Something gone wrong with teams' })
            res.status(200).json({ teams, message: `User has been added to ${req.body.teamName}` });
        });
    } catch (err) {
        res.status(400).json({ message: 'Something gone wrong' });
    }
});

router.delete('/operation/delete_user_from_team', async (req, res) => {
    try {
        const { username, teamName } = req.body;
        const user = await User.findOne({ username });
        // await Team.findOneAndUpdate({
        //     name: 'Psychos'
        // }, {
        //     $pull: {
        //         users: {
        //             _id: mongoose.Types.ObjectId(user._id)
        //         }
        //     }
        // }, { new: true });
        const team = await Team.findOne({ name: teamName });
        team.users.remove(user);
        await team.save();
        await Team.find({}).populate('users').exec(function (err, teams) {
            if (err) return res.status(400).json({ message: 'Choose username to delete user' })
            res.status(200).json({ teams, message: 'User has been removed from team' });
        });
    } catch (err) {
        res.status(400).json({ message: 'Choose username to delete user' });
    }
});

export default router;