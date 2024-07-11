const mongoose = require('mongoose');

// Define the schema blueprint
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Post', postSchema);
