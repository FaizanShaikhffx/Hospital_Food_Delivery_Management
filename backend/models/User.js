const mongoose = require('mongoose'); 
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'staff'], required: true }
});

userSchema.pre("save", async function(next) {
  const user = this; 
  if (!user.isModified('password')){
    next();
  } 
  try{
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, salt);
    user.password = hash_password; 
  }catch(error){
    next(error);
  }
});


userSchema.methods.comparePassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

