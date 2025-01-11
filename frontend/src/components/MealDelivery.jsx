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
    // Fetch all meal deliveries
    const fetchMealDeliveries = async () => {
      try {
        const response = await api.get("http://localhost:5000/api/mealdeliveries/");
        setMealDeliveries(response.data);
      } catch (err) {
        console.error("Error fetching meal deliveries");
      }
    };

    // Fetch pantry staff and patients to populate the dropdowns
    const fetchData = async () => {
      try {
        const staffResponse = await api.get('http://localhost:5000/api/pantrystaff/get');
        setPantryStaffList(staffResponse.data);

        const patientsResponse = await api.get('http://localhost:5000/api/patients/get');
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
      const response = await api.post(`http://localhost:5000/api/mealdeliveries/${mealId}/complete`, {
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
        setDeliveryNote(""); // Clear the delivery note field
        alert("Meal marked as delivered successfully!");
      }
    } catch (err) {
      console.error("Error marking meal as delivered", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('http://localhost:5000/api/mealdeliveries/create', {
        pantryStaffId,
        patientId,
        status,
      });
      alert('Meal delivery created successfully!');
      setPantryStaffId('');
      setPatientId('');
      setStatus('');
    } catch (err) {
      console.error('Error creating meal delivery', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Meal Delivery Tracking</h1>

      {/* Form to create a new meal delivery */}
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700">Pantry Staff</label>
          <select
            value={pantryStaffId}
            onChange={(e) => setPantryStaffId(e.target.value)}
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
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
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
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
            className="mt-1 block w-full bg-gray-100 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white text-center font-semibold rounded-md hover:bg-blue-700"
        >
          Create Meal Delivery
        </button>
      </form>

      {/* Existing meal deliveries */}
      <div>
        {mealDeliveries.length > 0 ? (
          mealDeliveries
            .filter((meal) => !deliveryStatus || meal.status === deliveryStatus)
            .map((meal) => (
              <div key={meal._id} className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <h3 className="font-bold text-lg text-gray-800">
                  Meal for {meal.patientId ? meal.patientId.name : "Unknown Patient"}
                </h3>
                <p className="text-sm text-gray-600"><strong>Room:</strong> {meal.patientId ? meal.patientId.roomNumber : "N/A"}</p>
                <p className="text-sm text-gray-600"><strong>Status:</strong> {meal.status}</p>

                {meal.status === "Pending" && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">Delivery Note</label>
                      <textarea
                        value={deliveryNote}
                        onChange={(e) => setDeliveryNote(e.target.value)}
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                        placeholder="Add an optional note for the delivery"
                      />
                    </div>
                    <button
                      onClick={() => handleMarkAsDelivered(meal._id)}
                      className="w-full py-2 bg-green-500 text-white text-center font-semibold rounded-md hover:bg-green-600"
                    >
                      Mark as Delivered
                    </button>
                  </>
                )}

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
