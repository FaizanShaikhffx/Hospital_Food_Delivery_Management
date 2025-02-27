import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import FoodChart from './components/FoodChart';
import Patient from './components/Patient';
import ProtectedRoute from './components/ProtectedRoute';
import MealDelivery from './components/MealDelivery';
import HealthcarePage from './components/HealthcarePage';
import Contact from './components/Contact';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/healthcare" element={<ProtectedRoute element={HealthcarePage} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
        <Route path="/patients" element={<ProtectedRoute element={Patient} />} />
        <Route path="/food-charts" element={<ProtectedRoute element={FoodChart} />} />
        <Route path="/meal-deliveries" element={<ProtectedRoute element={MealDelivery} />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
