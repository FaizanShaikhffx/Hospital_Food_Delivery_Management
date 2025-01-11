const express = require('express');
const PantryStaff = require('../models/PantryStaff');

const router = express.Router();

router.post('/create', async (req, res) => {
  const newStaff = new PantryStaff(req.body);
  try {
    const staff = await newStaff.save();
    res.status(200).json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/get', async (req, res) => {
  try {
    const staff = await PantryStaff.find();
    res.json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

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

router.put('/:id', async (req, res) => {
  try {
    const staff = await PantryStaff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Pantry staff not found' });
    }

    Object.assign(staff, req.body); 
    await staff.save();
    res.json(staff);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

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
