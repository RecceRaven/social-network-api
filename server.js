const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./connections/api/userRoutes');
const thoughtRoutes = require('./connections/api/thoughtRoutes'); 

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);


mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
