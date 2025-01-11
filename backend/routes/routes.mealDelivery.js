const express = require("express")
const MealDelivery = require('../models/MealDelivery')
const PantryStaff  = require('../models/PantryStaff')
const Patient = require('../models/Patient')

const router = express.Router();

router.post('/create', async (req, res)=>{
  const { pantryStaffId, patientId, status} = req.body;

  try{
    const pantryStaff = await PantryStaff.findById(pantryStaffId);

    if(!pantryStaff){
      return res.status(404).json({message: "Pantry staff not found"})
    }

    const patient = await Patient.findById(patientId);
    if(!patient){
      return res.status(404).json({message: "Patient not found"});
    }

    const mealDelivery = new MealDelivery({
      pantryStaff, 
      patientId, 
      status
    })

    await mealDelivery.save(); 
    res.status(200).json(mealDelivery);
  }catch(err){
    res.status(400).json({ message: err.message });
  }
})


router.get('/', async (req, res) => {
  try {
    const deliveries = await MealDelivery.find().populate('patientId'); // Populate the patientId field
    res.json(deliveries);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post('/:id/complete', async (req, res) => {
  try {
    const mealDelivery = await MealDelivery.findById(req.params.id);
    if (!mealDelivery) {
      return res.status(404).json({ message: "Meal Delivery not found" });
    }
    mealDelivery.status = "Delivered";
    mealDelivery.deliveryNote = req.body.deliveryNote || '';
    await mealDelivery.save();
    res.status(200).json({ message: "Meal marked as delivered" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



module.exports = router;