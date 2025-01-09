const express = require('express');
const Patient = require('../models/Patient');

const router = express.Router();

router.post('/', async(req, res)=>{
  const newPatient = new Patient(req.body);
  try{
    const patient = await newPatient(req.body);
    res.status(200).json(patient);
  }catch(err){
    res.status(400).json({message: err.message});
  }
})

module.exports = router;