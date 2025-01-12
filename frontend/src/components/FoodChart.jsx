import React, { useState, useEffect } from 'react';
import api from '../services/api';

const FoodChart = () => {
  const [mealType, setMealType] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [foodCharts, setFoodCharts] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [selectedFoodChart, setSelectedFoodChart] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('https://hospital-food-delivery-management-backend-2lka.onrender.com/api/patients/get');
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
        const response = await api.get(`https://hospital-food-delivery-management-backend-2lka.onrender.com/api/foodcharts/get?patientId=${patientId}`);
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
      if (selectedFoodChart) {
        await api.put(`https://hospital-food-delivery-management-backend-2lka.onrender.com/api/foodcharts/${selectedFoodChart._id}`, {
          mealType,
          ingredients,
          instructions,
        });
        alert('Food chart updated successfully!');
      } else {
        await api.post('https://hospital-food-delivery-management-backend-2lka.onrender.com/api/foodcharts/create', {
          mealType,
          ingredients,
          instructions,
          patientId: selectedPatientId,
        });
        alert('Food chart created successfully!');
      }
      setMealType('');
      setIngredients('');
      setInstructions('');
      setSelectedPatientId('');
      setSelectedFoodChart(null);
    } catch (err) {
      console.error('Error creating/updating food chart');
    }
  };

  const handleEdit = (foodChart) => {
    setSelectedFoodChart(foodChart);
    setMealType(foodChart.mealType);
    setIngredients(foodChart.ingredients);
    setInstructions(foodChart.instructions);
  };

  const handleDelete = async (foodChartId) => {
    try {
      await api.delete(`https://hospital-food-delivery-management-backend-2lka.onrender.com/api/foodcharts/${foodChartId}`);
      alert('Food chart deleted successfully!');
      setFoodCharts(foodCharts.filter(chart => chart._id !== foodChartId));
    } catch (err) {
      console.error('Error deleting food chart', err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br to-teal-50 p-6 flex flex-col">
      <div className="flex items-center mb-6">
        <img src="/FoodChart.jpg" alt="Placeholder" className="w-5/12 rounded-2xl transition-transform duration-300 hover:scale-105" />
        <div className="sm:text-center p-24 justify-center lg:text-left">
          <h1 className="text-4xl pt-8 text-ce tracking-tight font-extrabold text-gray-600 sm:text-3xl md:text-5xl">
            <span className="block xl:inline">
              Personalized
            </span>{" "}
            <br />
            <span className="block text-yellow-500 xl:inline">
              Food Charts
            </span>
          </h1>
          <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
            Create and manage tailored diet plans for patients,
            ensuring they receive the right nutrition and care.
          </p>
          <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <a
                href="#food-chart-form"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 md:py-4 md:text-lg md:px-10"
              >
                Get started
              </a>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
            </div>
          </div>
        </div>
      </div>

      <div id="food-chart-form" className="p-6 flex items-center justify-center">
        <div className="bg-white bg-opacity-80 backdrop-blur-md p-8 rounded-2xl w-full shadow-xl transition-all duration-300 hover:shadow-2xl">
          <h1 className="text-4xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-400">Food Chart Management</h1>
          {patients.length > 0 ? (
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
                  <select
                    value={selectedPatientId}
                    onChange={(e) => setSelectedPatientId(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
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
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meal Type</label>
                  <input
                    type="text"
                    value={mealType}
                    onChange={(e) => setMealType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                  <input
                    type="text"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                  <input
                    type="text"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-lg hover:from-yellow-600 hover:to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-200 transform hover:scale-105"
              >
                {selectedFoodChart ? 'Update Food Chart' : 'Create Food Chart'}
              </button>
            </form>
          ) : (
            <p className="text-center text-gray-500">No patients available. Please add a patient first.</p>
          )}

          {foodCharts.length > 0 && (
            <div className="bg-white bg-opacity-80 backdrop-blur-md p-6 rounded-2xl shadow-lg mt-8 transition-all duration-300 hover:shadow-xl">
              <h2 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-400">Existing Food Charts</h2>
              {foodCharts.map((chart) => (
                <div key={chart._id} className="mb-4 border-b border-gray-200 pb-4 last:border-b-0">
                  <p className="text-sm"><span className="font-semibold text-gray-700">Meal Type:</span> {chart.mealType}</p>
                  <p className="text-sm"><span className="font-semibold text-gray-700">Ingredients:</span> {chart.ingredients}</p>
                  <p className="text-sm"><span className="font-semibold text-gray-700">Instructions:</span> {chart.instructions}</p>
                  <button
                    onClick={() => handleEdit(chart)}
                    className="mr-2 px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(chart._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodChart;
