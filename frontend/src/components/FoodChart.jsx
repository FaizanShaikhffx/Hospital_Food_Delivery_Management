import React, { useState, useEffect } from 'react';
import api from '../services/api';

const FoodChart = () => {
  const [mealType, setMealType] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [foodCharts, setFoodCharts] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/patients/get');
        setPatients(response.data);
      } catch (err) {
        console.error('Error fetching patients');
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchFoodCharts = async (patientId) => {
      if (!patientId) {
        setFoodCharts([]);
        return;
      }
      try {
        const response = await api.get(`http://localhost:5000/api/foodcharts/get?patientId=${patientId}`);
        setFoodCharts(response.data);
      } catch (err) {
        console.error('Error fetching food charts');
      }
    };

    fetchFoodCharts(selectedPatientId);
  }, [selectedPatientId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPatientId) {
      alert('Please select a patient before creating a food chart.');
      return;
    }
    try {
      await api.post('http://localhost:5000/api/foodcharts/create', {
        mealType,
        ingredients,
        instructions,
        patientId: selectedPatientId,
      });
      setMealType('');
      setIngredients('');
      setInstructions('');
      setSelectedPatientId('');
      alert('Food chart created successfully!');
    } catch (err) {
      console.error('Error creating food chart');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-[#40b1cc]">Food Chart Management</h1>
      {patients.length > 0 ? (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Patient</label>
            <select
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select a patient</option>
              {patients.map((patient) => (
                <option key={patient._id} value={patient._id}>
                  {patient.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Meal Type</label>
            <input
              type="text"
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Ingredients</label>
            <input
              type="text"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Instructions</label>
            <input
              type="text"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2  bg-[#40b1cc] text-white rounded-md hover:bg-[#41c8e9] focus:outline-none focus:ring-2 "
          >
            Create Food Chart
          </button>
        </form>
      ) : (
        <p className="text-center text-gray-500">No patients available. Please add a patient first.</p>
      )}

      {foodCharts.length > 0 && (
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl mb-4 text-[#40b1cc]">Existing Food Charts</h2>
          {foodCharts.map((chart) => (
            <div key={chart._id} className="mb-4 border-b pb-4">
              <p className="text-sm"><strong>Meal Type:</strong> {chart.mealType}</p>
              <p className="text-sm"><strong>Ingredients:</strong> {chart.ingredients}</p>
              <p className="text-sm"><strong>Instructions:</strong> {chart.instructions}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FoodChart;
