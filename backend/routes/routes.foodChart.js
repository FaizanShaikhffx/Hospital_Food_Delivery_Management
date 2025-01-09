const express = require("express");
const FoodChart = require("../models/FoodChart");
const Patient = require("../models/Patient");

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const foodCharts = await FoodChart.find();
    res.json(foodCharts);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.post("/", async (req, res) => {
  const { mealType, ingredients, instructions, patientId } = req.body;
  try {
    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(400).json({ message: "Patient not found" });
    }

    const foodChart = new FoodChart({
      mealType,
      ingredients,
      instructions,
      patientId,
    });

    await foodChart.save();
    res.status(201).json(foodChart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/:id', async(req, res)=>{
  try{
    const foodChart = await FoodChart.findById(req.params.id);
    if(!foodChart){
      return res.status(404).json({message: "Food Chart not Found"})
    }
    foodChart.mealType = req.body.mealType || foodChart.mealType;
    foodChart.ingredients = req.body.ingredients || foodChart.ingredients; 
    foodChart.instructions = req.body.instructions || foodChart.instructions; 

    await foodChart.save(); 
    res.json(foodChart);
  }catch(err){
    res.status(400).json({message: err.message})
  }
})


router.delete('/:id', async(req, res)=>{
  try{
    const foodChart = await FoodChart.findById(req.params.id);
    if(!foodChart){
      return res.status(404).json({message: "Food Chart not Found"})
    }

    await foodChart.remove(); 
    res.json({message: "Food Chart Deleted"});
  }catch(err){
    res.status(400).json({message: err.message})
  }
})

module.exports = router;