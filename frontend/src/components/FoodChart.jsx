import React, { useState, useEffect } from 'react';
import api from '../services/api';

const FoodChart = () => {
  const [mealType, setMealType] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [foodCharts, setFoodCharts] = useState([]);

  useEffect(() => {
    // Fetch all food charts
    const fetchFoodCharts = async () => {
      try {
        const response = await api.get('/foodcharts');
        setFoodCharts(response.data);
      } catch (err) {
        console.error('Error fetching food charts');
      }
    };
    fetchFoodCharts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/foodcharts', { mealType, ingredients, instructions });
      setMealType('');
      setIngredients('');
      setInstructions('');
      alert('Food chart created successfully!');
    } catch (err) {
      console.error('Error creating food chart');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Food Chart Management</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Meal Type</label>
          <input
            type="text"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Instructions</label>
          <input
            type="text"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Food Chart
        </button>
      </form>

      <div>
        <h2 className="text-xl mb-4">Existing Food Charts</h2>
        {foodCharts.map((chart) => (
          <div key={chart._id} className="mb-4">
            <p><strong>Meal Type:</strong> {chart.mealType}</p>
            <p><strong>Ingredients:</strong> {chart.ingredients}</p>
            <p><strong>Instructions:</strong> {chart.instructions}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodChart;
