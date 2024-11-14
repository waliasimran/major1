const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// Get recommendations
router.get('/', auth, async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);
    if (!currentUser) return res.status(404).json({ msg: 'User not found' });

    // Simple recommendation: users in the same industry or region
    const recommendations = await User.find({
      _id: { $ne: currentUser.id },
      $or: [
        { industry: { $in: currentUser.industry } },
        { region: currentUser.region }
      ]
    }).select('-password').limit(10);

    res.json(recommendations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
