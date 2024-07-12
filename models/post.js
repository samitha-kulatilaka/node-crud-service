const mongoose = require('mongoose');

// Define the schema blueprint
const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true } // Reference to User
}, {
  timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
