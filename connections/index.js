const express = require('express');
const router = express.Router();

// Importing the specific routes
const userRoutes = require('../connections/api/userRoutes');
const thoughtRoutes = require('../connections/api/thoughtRoutes');

// Mounting the routes on their respective paths
router.use('/api/users', userRoutes);
router.use('/api/thoughts', thoughtRoutes);

module.exports = router;
