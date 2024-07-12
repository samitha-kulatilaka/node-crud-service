const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define the schema blueprint
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: {
    type: String,
    enum: ['USER', 'ADMIN'],
    required: true,
    default: 'USER'
  }
}, {
  timestamps: true
});

// Middleware to hash the password before saving
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
// userSchema.methods.comparePassword = async function (candidatePassword) {
//   try {
//     return await bcrypt.compare(candidatePassword, this.password);
//   } catch (error) {
//     throw new Error('Password comparison failed');
//   }
// };

// Export the model based on the schema
module.exports = mongoose.model('User', userSchema);
