const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Thought = require('../../models/Thought');

// GET all thoughts
router.get('/', async (req, res) => {
    try {
        const thoughts = await Thought.find({});
        res.json(thoughts);
    } catch (err) {
        res.status(500).send(err.message);
    }
    
});

//GET a single thought by ID
router.get('/:id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.id);
        if (!thought) {
            return res.status(404).send('Thought not found');
        }
        res.json(thought);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// POST a new thought
router.post('/', async (req, res) => {
    try {
        const newThought = new Thought(req.body);
        const thought = await newThought.save();

        // Also update the user's thoughts array
        await User.findByIdAndUpdate(req.body.userId, {
            $push: { thoughts: thought._id }
        });

        res.status(201).json(thought);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// PUT a thought
router.put('/:id', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedThought) {
            return res.status(404).send('Thought not found');
        }
        res.json(updatedThought);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// DELETE thought by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.id);
        if (!deletedThought) {
            return res.status(404).send('Thought not found');
        }
        res.send('Thought deleted successfully');
    } catch (err) {
        res.status(500).send(err.message);
    }
});



module.exports = router;
