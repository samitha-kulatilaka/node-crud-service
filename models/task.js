const mongoose = require('mongoose');

// Category Schema
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Ensures that category name is provided
    trim: true, // Trims whitespace
  },
});

// Task Schema
const taskSchema = new mongoose.Schema(
  {
    categoryObjectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Models
const CategoryModel = mongoose.model('Category', categorySchema);
const TaskModel = mongoose.model('Task', taskSchema);

// Function to get tasks with populated category details
async function getTasksWithCategory() {
  try {
    const tasks = await TaskModel.find().populate('categoryObjectId');
    return tasks;
  } catch (error) {
    console.error('Error fetching tasks with category:', error);
    throw error;
  }
}

module.exports = {
  CategoryModel,
  TaskModel,
  getTasksWithCategory,
};
