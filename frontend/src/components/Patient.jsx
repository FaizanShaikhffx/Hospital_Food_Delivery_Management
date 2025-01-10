// Filepath: E:\Web Project\Hospital Food Management\frontend\src\components\Patient.jsx

import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [name, setName] = useState('');
  const [disease, setDisease] = useState('');
  const [allergies, setAllergies] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [bedNumber, setBedNumber] = useState('');
  const [floorNumber, setFloorNumber] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');

  useEffect(() => {
    // Fetch all patients
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/api/patients/create', {
        name,
        disease,
        allergies,
        roomNumber,
        bedNumber,
        floorNumber,
        age,
        gender,
        contactInfo,
        emergencyContact,
      });
      alert('Patient created successfully!');
      setName('');
      setDisease('');
      setAllergies('');
      setRoomNumber('');
      setBedNumber('');
      setFloorNumber('');
      setAge('');
      setGender('');
      setContactInfo('');
      setEmergencyContact('');
    } catch (err) {
      console.error('Error creating patient');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Patient Management</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Disease</label>
          <input
            type="text"
            value={disease}
            onChange={(e) => setDisease(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Allergies</label>
          <input
            type="text"
            value={allergies}
            onChange={(e) => setAllergies(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Room Number</label>
          <input
            type="text"
            value={roomNumber}
            onChange={(e) => setRoomNumber(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Bed Number</label>
          <input
            type="text"
            value={bedNumber}
            onChange={(e) => setBedNumber(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Floor Number</label>
          <input
            type="text"
            value={floorNumber}
            onChange={(e) => setFloorNumber(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <input
            type="text"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Contact Info</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Emergency Contact</label>
          <input
            type="text"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Patient
        </button>
      </form>

      <div>
        <h2 className="text-xl mb-4">Existing Patients</h2>
        {patients.map((patient) => (
          <div key={patient._id} className="mb-4">
            <p><strong>Name:</strong> {patient.name}</p>
            <p><strong>Disease:</strong> {patient.disease}</p>
            <p><strong>Allergies:</strong> {patient.allergies}</p>
            <p><strong>Room Number:</strong> {patient.roomNumber}</p>
            <p><strong>Bed Number:</strong> {patient.bedNumber}</p>
            <p><strong>Floor Number:</strong> {patient.floorNumber}</p>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Contact Info:</strong> {patient.contactInfo}</p>
            <p><strong>Emergency Contact:</strong> {patient.emergencyContact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Patient;
