const mongoose = require('mongoose');

const foodChartSchema = mongoose.Schema({
  mealType: String,
  ingredients: String,
  instructions: String,
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' }
})

module.exports = mongoose.model('FoodChart', foodChartSchema);