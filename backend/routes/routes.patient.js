const express = require('express');
const Patient = require('../models/Patient');

const router = express.Router();

// Create a new patient
router.post('/create', async (req, res) => {
  const newPatient = new Patient(req.body);
  try {
    const patient = await newPatient.save();
    res.status(200).json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Fetch all patients
router.get('/get', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Fetch a single patient by ID
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a patient by ID
router.put('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    Object.assign(patient, req.body); // Update patient with new data
    await patient.save();
    res.json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a patient by ID
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    await patient.remove();
    res.json({ message: 'Patient deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
