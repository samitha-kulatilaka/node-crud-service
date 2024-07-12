const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // For password hashing
const User = require('../models/user.js');

// POST /api/users/register
router.post("/register", async (req, res) => {
  const { email, username, password, type } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // Hash the password - (Not necessary - done at the model level)
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      username,
      password,
      type
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: {
        username: newUser.username,
        email: newUser.email,
        type: newUser.type,
        id: newUser._id
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to create user, please try again later"
    });
  }
});

// POST /api/users/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid username or password"
      });
    }

    // Login successful
    res.status(200).json({
      message: "Login successful",
      user: {
        username: user.username,
        email: user.email,
        type: user.type,
        id: user._id
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Unable to login, please try again later"
    });
  }
});

module.exports = router;
