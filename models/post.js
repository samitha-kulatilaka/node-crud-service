const mongoose = require('mongoose');

// Define the schema blueprint
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true, // Trims whitespace from both ends
    },
    content: {
      type: String,
      required: true,
      trim: true, // Trims whitespace from both ends
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // Reference to the User model
    },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Post', postSchema);
