const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

// Import external routes
const postsRoutes = require('./routes/posts');
const usersRoutes = require('./routes/users');
const tasksRoutes = require('./routes/tasks');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan('dev')); // Logger
app.use(helmet()); // Security

// Database connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => {
    console.log("Database connected successfully.");
  })
  .catch((error) => {
    console.error("Error in database connection:", error);
  });

// CORS setup
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

// Custom middleware for logging
// app.use((req, res, next) => {
//   console.log('This is from express');
//   next();
// });

// Access custom routes
app.use('/api/posts', postsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/tasks', tasksRoutes);

// Health check route
app.get("/healthcheck", (req, res) => {
  res.status(200).json({ message: "Server is running..." });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
