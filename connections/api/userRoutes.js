const User = require('./models/User');
const Thought = require('./models/Thought');

// GET all users

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


//Get single user by ID

app.get('/api/users/:id', async (req, res) => {
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

app.post('/api/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// PUT update user by ID

app.put('/api/users/:id', async (req, res) => {
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

app.delete('/api/users/:id', async (req, res) => {
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
