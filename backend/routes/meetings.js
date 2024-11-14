const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Meeting = require('../models/Meeting');

// Schedule a meeting
router.post('/', auth, async (req, res) => {
  const { participants, scheduledAt, purpose } = req.body;

  try {
    const newMeeting = new Meeting({
      participants,
      scheduledAt,
      purpose,
    });

    const meeting = await newMeeting.save();
    res.json(meeting);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get all meetings for a user
router.get('/', auth, async (req, res) => {
  try {
    const meetings = await Meeting.find({ participants: req.user.id })
      .populate('participants', ['name', 'role']);
    res.json(meetings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;