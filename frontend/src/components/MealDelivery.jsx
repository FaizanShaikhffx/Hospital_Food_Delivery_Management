import React, { useState, useEffect } from "react";
import api from "../services/api";

const MealDelivery = () => {
  const [mealDeliveries, setMealDeliveries] = useState([]);
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [deliveryNote, setDeliveryNote] = useState("");
  const [pantryStaffId, setPantryStaffId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [status, setStatus] = useState('');
  const [pantryStaffList, setPantryStaffList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);

  useEffect(() => {
    const fetchMealDeliveries = async () => {
      try {
        const response = await api.get("https://hospital-food-delivery-management-backend-2lka.onrender.com/api/mealdeliveries/");
        setMealDeliveries(response.data);
      } catch (err) {
        console.error("Error fetching meal deliveries");
      }
    };

    const fetchData = async () => {
      try {
        const staffResponse = await api.get('https://hospital-food-delivery-management-backend-2lka.onrender.com/api/pantrystaff/get');
        setPantryStaffList(staffResponse.data);

        const patientsResponse = await api.get('https://hospital-food-delivery-management-backend-2lka.onrender.com/api/patients/get');
        setPatientsList(patientsResponse.data);
      } catch (err) {
        console.error('Error fetching data', err);
      }
    };

    fetchMealDeliveries();
    fetchData();
  }, []);

  const handleMarkAsDelivered = async (mealId) => {
    try {
      const response = await api.post(`https://hospital-food-delivery-management-backend-2lka.onrender.com/api/mealdeliveries/${mealId}/complete`, {
        deliveryNote,
      });
      if (response.status === 200) {
        setMealDeliveries(
          mealDeliveries.map((meal) =>
            meal._id === mealId
              ? { ...meal, status: "Delivered", deliveryNote }
              : meal
          )
        );
        setDeliveryNote(""); 
        alert("Meal marked as delivered successfully!");
      }
    } catch (err) {
      console.error("Error marking meal as delivered", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('https://hospital-food-delivery-management-backend-2lka.onrender.com/api/mealdeliveries/create', {
        pantryStaffId,
        patientId,
        status,
      });
      alert('Meal delivery created successfully!');
      
      const updatedDeliveries = await api.get("https://hospital-food-delivery-management-backend-2lka.onrender.com/api/mealdeliveries/");
      setMealDeliveries(updatedDeliveries.data);
  
      setPantryStaffId('');
      setPatientId('');
      setStatus('');
    } catch (err) {
      console.error('Error creating meal delivery', err);
    }
  };
  

  const handleDelete = async (mealId) => {
    try {
      await api.delete(`https://hospital-food-delivery-management-backend-2lka.onrender.com/api/mealdeliveries/${mealId}`);
      alert('Meal delivery deleted successfully!');
      setMealDeliveries(mealDeliveries.filter((meal) => meal._id !== mealId ));
    } catch (err) {
      console.error('Error deleting meal delivery', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900">Meal Delivery Tracking</h1>

      <form onSubmit={handleSubmit} className="mb-8 space-y-6">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Pantry Staff</label>
          <select
            value={pantryStaffId}
            onChange={(e) => setPantryStaffId(e.target.value)}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            required
          >
            <option value="">Select Pantry Staff</option>
            {pantryStaffList.map((staff) => (
              <option key={staff._id} value={staff._id}>
                {staff.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Patient</label>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            required
          >
            <option value="">Select Patient</option>
            {patientsList.map((patient) => (
              <option key={patient._id} value={patient._id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Status</label>
          <input 
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white text-center font-semibold rounded-lg hover:bg-blue-700"
        >
          Create Meal Delivery
        </button>
      </form>

      <div>
        {mealDeliveries.length > 0 ? (
          mealDeliveries
            .filter((meal) => !deliveryStatus || meal.status === deliveryStatus)
            .map((meal) => (
              <div key={meal._id} className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-100">
                <h3 className="font-bold text-lg text-gray-800">
                  Meal for {meal.patientId ? meal.patientId.name : "Unknown Patient"}
                </h3>
                <p className="text-sm text-gray-600"><strong>Room:</strong> {meal.patientId ? meal.patientId.roomNumber : "N/A"}</p>
                <p className="text-sm text-gray-600"><strong>Status:</strong> {meal.status}</p>

                {meal.status === "Pending" && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Delivery Note</label>
                    <textarea
                      value={deliveryNote}
                      onChange={(e) => setDeliveryNote(e.target.value)}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:border-blue-500"
                      placeholder="Add an optional note for the delivery"
                    />
                  </div>
                )}

                {meal.status === "Pending" && (
                  <button
                    onClick={() => handleMarkAsDelivered(meal._id)}
                    className="w-full py-2 bg-green-500 text-white text-center font-semibold rounded-lg hover:bg-green-600"
                  >
                    Mark as Delivered
                  </button>
                )}

                <button
                  onClick={() => handleDelete(meal._id)}
                  className="w-full py-2 bg-red-500 text-white text-center font-semibold rounded-lg hover:bg-red-600 mt-2"
                >
                  Delete Delivery
                </button>

                {meal.status === "Delivered" && meal.deliveryNote && (
                  <p className="mt-2 text-sm text-gray-500">
                    <strong>Delivery Note:</strong> {meal.deliveryNote}
                  </p>
                )}
              </div>
            ))
        ) : (
          <p className="text-center text-gray-600">No meal deliveries available.</p>
        )}
      </div>
    </div>
  );
};

export default MealDelivery;
