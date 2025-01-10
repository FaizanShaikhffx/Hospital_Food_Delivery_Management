import React, { useState, useEffect } from 'react';
import api from '../services/api';

const MealDelivery = () => {
  const [mealDeliveries, setMealDeliveries] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState('');  // For filtering meals by status
  const [deliveryNote, setDeliveryNote] = useState('');

  useEffect(() => {
    // Fetch all meal deliveries
    const fetchMealDeliveries = async () => {
      try {
        const response = await api.get('/api/mealdeliveries'); // Updated endpoint
        setMealDeliveries(response.data);
      } catch (err) {
        console.error('Error fetching meal deliveries');
      }
    };

    fetchMealDeliveries();
  }, []);

  const handleMarkAsDelivered = async (mealId) => {
    try {
      await api.post(`/api/mealdeliveries/${mealId}/complete`, { deliveryNote }); // Updated endpoint
      setDeliveryNote('');  // Clear the delivery note field
      alert('Meal marked as delivered successfully!');
      setMealDeliveries(mealDeliveries.map(meal => 
        meal._id === mealId ? { ...meal, status: 'Delivered' } : meal
      )); // Update local state to reflect delivery status
    } catch (err) {
      console.error('Error marking meal as delivered');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Meal Delivery Tracking</h1>
      
      {/* Filter by delivery status */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Filter by Status</label>
        <select
          value={deliveryStatus}
          onChange={(e) => setDeliveryStatus(e.target.value)}
          className="mt-1 p-2 border border-gray-300 rounded-md"
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
      
      <div>
        {mealDeliveries
          .filter(meal => !deliveryStatus || meal.status === deliveryStatus) // Filter meals by status
          .map((meal) => (
            <div key={meal._id} className="mb-6 p-4 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-lg">Meal for {meal.patient.name}</h3>
              <p><strong>Room:</strong> {meal.patient.roomNumber}</p>
              <p><strong>Status:</strong> {meal.status}</p>
              
              {/* Mark as delivered */}
              {meal.status === 'Pending' && (
                <>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Delivery Note</label>
                    <textarea
                      value={deliveryNote}
                      onChange={(e) => setDeliveryNote(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                      placeholder="Add an optional note for the delivery"
                    />
                  </div>
                  <button
                    onClick={() => handleMarkAsDelivered(meal._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Mark as Delivered
                  </button>
                </>
              )}

              {/* Display delivery notes if the meal is delivered */}
              {meal.status === 'Delivered' && meal.deliveryNote && (
                <p className="mt-2 text-sm text-gray-500"><strong>Delivery Note:</strong> {meal.deliveryNote}</p>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default MealDelivery;
