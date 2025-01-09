const mongoose = require('mongoose');

const pantryStaffSchema = mongoose.Schema({
  name: String,
  contactInfo: String
}); 

module.exports = mongoose.model('PantryStaff', pantryStaffSchema);

