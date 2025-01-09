const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: String,
  disease: String,
  allergies: String,
  roomNumber: String,
  bedNumber: String,
  floorNumber: String,
  age: Number,
  gender: String,
  contactInfo: String,
  emergencyContact: String,
  dietCharts: [{type: mongoose.Schema.ObjectId, ref: "FoodChart"}]
})

module.exports = mongoose.model('Patient', patientSchema)