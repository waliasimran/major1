const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Post = require('../models/Post');

// Create a post
router.post('/', auth, async (req, res) => {
  const { content, industry, region } = req.body;

  try {
    const newPost = new Post({
      user: req.user.id,
      content,
      industry,
      region,
    });

    const post = await newPost.save();

    // TODO: Integrate sentiment analysis here

    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all posts
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().populate('user', ['name', 'role']);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
