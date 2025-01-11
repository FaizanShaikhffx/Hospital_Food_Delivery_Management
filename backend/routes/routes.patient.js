const express = require('express');
const Patient = require('../models/Patient');

const router = express.Router();

router.post('/create', async (req, res) => {
  const newPatient = new Patient(req.body);
  try {
    const patient = await newPatient.save();
    res.status(200).json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/get', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

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

router.put('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    Object.assign(patient, req.body); 
    await patient.save();
    res.json(patient);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

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
