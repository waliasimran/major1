const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Company = require('../models/Company');

// Create a company
router.post('/', auth, async (req, res) => {
  const { name, industry, description, needs } = req.body;

  try {
    const newCompany = new Company({
      name,
      industry,
      description,
      needs,
      founder: req.user.id,
    });

    const company = await newCompany.save();
    res.json(company);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Search Companies
router.get('/search', auth, async (req, res) => {
  const { need, industry, name } = req.query;
  let filter = {};

  if (need) filter.needs = { $in: need.split(',') };
  if (industry) filter.industry = industry;
  if (name) filter.name = { $regex: name, $options: 'i' };

  try {
    const companies = await Company.find(filter).populate('founder', ['name', 'role']);
    res.json(companies);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
