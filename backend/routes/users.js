const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Search Users
router.get('/search', auth, async (req, res) => {
  const { industry, region, role, name } = req.query;
  let filter = {};

  if (industry) filter.industry = { $in: industry.split(',') };
  if (region) filter.region = region;
  if (role) filter.role = role;
  if (name) filter.name = { $regex: name, $options: 'i' };

  try {
    const users = await User.find(filter).select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;