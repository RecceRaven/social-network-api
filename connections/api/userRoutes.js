const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Thought = require('../../models/Thought');

// GET all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Get single user by ID
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
                              .populate('thoughts')
                              .populate('friends');
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// POST new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// PUT update user by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedUser) {
            return res.status(404).send('User not found');
        }
        res.json(updatedUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// DELETE user by ID and also delete associated thoughts
router.delete('/:id', async (req, res) => {
    try {
        await Thought.deleteMany({ username: req.params.id });

        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).send('User not found');
        }
        res.send('User deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

module.exports = router;

// DELETE a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        // Find the user who is removing the friend
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Check if the friend to be removed exists in the user's friend list
        const friendIndex = user.friends.indexOf(req.params.friendId);
        if (friendIndex === -1) {
            return res.status(404).send('Friend not found in user\'s friend list');
        }

        // Remove the friend from the user's friend list
        user.friends.splice(friendIndex, 1);
        await user.save(); // Save the updated user document

        res.json({ message: 'Friend removed successfully', user });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

