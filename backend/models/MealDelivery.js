const mongoose = require('mongoose');

const mealDeliverySchema = mongoose.Schema({
  status: String,
  pantryStaffId: [{type: mongoose.Schema.ObjectId, ref: 'PantryStaff'}],
  patientId: {type: mongoose.Schema.ObjectId, ref: 'Patient'},
  deliveryTime: {type: Date, default: Date.now}
})

module.exports = mongoose.model('MealDelivery', mealDeliverySchema)
