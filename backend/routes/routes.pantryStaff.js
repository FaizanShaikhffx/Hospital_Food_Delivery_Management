const express = require('express');
const PantryStaff = require('../models/PantryStaff');

const router = express.Router();

// Create a new pantry staff member
router.post('/create', async (req, res) => {
  const newStaff = new PantryStaff(req.body);
  try {
    const staff = await newStaff.save();
    res.status(200).json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Fetch all pantry staff members
router.get('/get', async (req, res) => {
  try {
    const staff = await PantryStaff.find();
    res.json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Fetch a single pantry staff member by ID
router.get('/:id', async (req, res) => {
  try {
    const staff = await PantryStaff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Pantry staff not found' });
    }
    res.json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a pantry staff member by ID
router.put('/:id', async (req, res) => {
  try {
    const staff = await PantryStaff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Pantry staff not found' });
    }

    Object.assign(staff, req.body); // Update staff with new data
    await staff.save();
    res.json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a pantry staff member by ID
router.delete('/:id', async (req, res) => {
  try {
    const staff = await PantryStaff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Pantry staff not found' });
    }

    await staff.remove();
    res.json({ message: 'Pantry staff deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
