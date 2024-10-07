const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

const { CategoryModel, TaskModel, getTasksWithCategory } = require('../models/task');

// Create a new category
router.post('/category', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }

    const category = new CategoryModel({ name });
    await category.save();

    res.status(201).json({
      message: 'Category created successfully',
      data: category,
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Create a new task
router.post('/add', async (req, res) => {
  try {
    const { category_id, title, content } = req.body;

    if (!category_id || !title || !content) {
      return res.status(400).json({
        message: 'Category ID, title, and content are required',
      });
    }

    const task = new TaskModel({
      categoryObjectId: new ObjectId(category_id),
      title,
      content,
    });

    await task.save();

    res.status(201).json({
      message: 'Task created successfully',
      data: task,
    });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get list of tasks with categories
router.get('/list', async (req, res) => {
  try {
    const tasks = await getTasksWithCategory();

    res.status(200).json({
      message: 'Task list retrieved successfully',
      tasks,
    });
  } catch (error) {
    console.error('Error retrieving task list:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
