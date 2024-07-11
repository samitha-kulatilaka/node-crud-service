const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

const Post = require('../models/post.js');

// POST /api/posts/
router.post("/", async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    });

    const createdPost = await post.save();

    res.status(201).json({
      message: "Post added successfully",
      post: createdPost
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

// GET /api/posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      message: "List all posts",
      posts: posts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

// GET /api/posts/:id
router.get('/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const post = await Post.findById(_id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

// PUT /api/posts/:id
router.put('/:id', async (req, res) => {
  const _id = req.params.id;
  const { title, content } = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      _id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost
    });
  } catch (error) {
    console.error('Error in update record:', error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
  const _id = req.params.id;

  try {
    const result = await Post.deleteOne({ _id: new ObjectId(_id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "Post not found"
      });
    }
    res.status(200).json({
      message: "Post deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

module.exports = router;
