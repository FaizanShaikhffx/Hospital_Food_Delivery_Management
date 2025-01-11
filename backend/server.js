const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const authRoutes = require('./routes/routes.auth')
const patientRoutes = require('./routes/routes.patient');
const foodChartRoutes = require('./routes/routes.foodChart');
const pantryStaffRoutes = require('./routes/routes.pantryStaff');
const mealDeliveryRoutes = require('./routes/routes.mealDelivery');

dotenv.config(); 

const app = express(); 
app.use(cors()); 
app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/foodcharts', foodChartRoutes);
app.use('/api/pantrystaff', pantryStaffRoutes);
app.use('/api/mealdeliveries', mealDeliveryRoutes);


mongoose.connect(process.env.MONGO_URI)
.then(()=> console.log("Database connected"))
.catch((err)=> console.log("Database connection error"+err))

const port = process.env.PORT || 5000; 
app.listen(port, ()=>{
  console.log(`App listening on port ${port}`);
})