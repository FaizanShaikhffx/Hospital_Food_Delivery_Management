import React from 'react';
import { Link } from 'react-router-dom';
import FeaturePage from './FeaturePage';

const HealthcarePage = () => {
  return (
    <div className="bg-white text-gray-800 h-screen bg-cover bg-center" style={{ backgroundImage: "url('./hospital.png')" }}>
      <header className="flex justify-between items-center p-6">
        <div className="text-2xl font-bold text-blue-900">Hospital Food Delivery Management</div>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-blue-900">Home</Link>
          <Link to="/patients" className="text-gray-600 hover:text-blue-900">Patients</Link>
          <Link to="/food-charts" className="text-gray-600 hover:text-blue-900">Food Charts</Link>
          <Link to="/meal-deliveries" className="text-gray-600 hover:text-blue-900">Meal Deliveries</Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-900">Contact Us</Link>
        </nav>
      </header>
      <main className="relative flex items-center h-full">
        <div className="w-1/2 flex justify-center m-20 mb-44 items-center h-full">
          <div className="bg-white bg-opacity-75 p-12 rounded-lg">
            <h1 className="text-5xl font-bold text-gray-900">Healthcare <span className="text-blue-600">Simplified</span></h1>
            <p className="mt-4 text-gray-600">The culmination of tech, hygiene and customisation <br /> to give the perfect system to manage hospital food services.</p>
            <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">Take a Free Demo</button>
          </div>
        </div>
      </main>
      <FeaturePage />
      <footer className="p-6 bg-gray-100 text-center">
        <p className="text-gray-600">© 2025 Hospital Food Delivery Management. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HealthcarePage;
