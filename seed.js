const mongoose = require('mongoose');
const User = require('./models/User');
const Thought = require('./models/Thought');

mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const seedUsers = [
    { username: 'alice123', email: 'alice123@example.com' },
    { username: 'bob456', email: 'bob456@example.com' },
    { username: 'carol789', email: 'carol789@example.com' }
];

const seedThoughts = [
    {
        thoughtText: "I love coding!",
        username: 'alice123',
        reactions: []
    },
    {
        thoughtText: "Mongoose makes MongoDB easy.",
        username: 'bob456',
        reactions: [] 
    },
    {
        thoughtText: "Remember to seed your database.",
        username: 'carol789',
        reactions: []
    }
];

const seedDB = async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.insertMany(seedUsers);
    await Thought.insertMany(seedThoughts);

    console.log("Database seeded!");
};

seedDB().then(() => {
    mongoose.connection.close();
});
