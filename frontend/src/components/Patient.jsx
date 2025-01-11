import React, { useState, useEffect } from 'react';
import api from '../services/api'; 

const Patient = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [formData, setFormData] = useState({
    name: '',
    disease: '',
    allergies: '',
    roomNumber: '',
    bedNumber: '',
    floorNumber: '',
    age: '',
    gender: '',
    contactInfo: '',
    emergencyContact: '',
  });
  const [patients, setPatients] = useState([]); 

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/patients/get');
        setPatients(response.data);
      } catch (err) {
        console.error('Error fetching patients:', err);
      }
    };

    fetchPatients();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('http://localhost:5000/api/patients/create', formData);
      alert('Patient created successfully!');
      setFormData({
        name: '',
        disease: '',
        allergies: '',
        roomNumber: '',
        bedNumber: '',
        floorNumber: '',
        age: '',
        gender: '',
        contactInfo: '',
        emergencyContact: '',
      });
    } catch (err) {
      console.error('Error creating patient:', err);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Patient Management</h1>

      <div className="flex space-x-4 mb-6 justify-center">
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
            activeTab === 'create'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('create')}
        >
          Create Patient
        </button>
        <button
          className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
            activeTab === 'view'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('view')}
        >
          View Patients
        </button>
      </div>

      {activeTab === 'create' && (
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 bg-blue-600">
              <img
                src="/Patient.jpg"
                alt="Patient Care"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 p-8">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Patient</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(formData).map(([key, value]) => (
                    <div key={key}>
                      <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input
                        id={key}
                        name={key}
                        value={value}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        type={key === 'age' ? 'number' : 'text'}
                      />
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300 shadow-lg"
                >
                  Create Patient
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'view' && (
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Existing Patients</h2>
          <div className="space-y-6">
            {patients.length > 0 ? (
              patients.map((patient) => (
                <div key={patient._id} className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-semibold text-gray-700">Name:</span> {patient.name}</div>
                    <div><span className="font-semibold text-gray-700">Disease:</span> {patient.disease}</div>
                    <div><span className="font-semibold text-gray-700">Allergies:</span> {patient.allergies}</div>
                    <div><span className="font-semibold text-gray-700">Room Number:</span> {patient.roomNumber}</div>
                    <div><span className="font-semibold text-gray-700">Bed Number:</span> {patient.bedNumber}</div>
                    <div><span className="font-semibold text-gray-700">Floor Number:</span> {patient.floorNumber}</div>
                    <div><span className="font-semibold text-gray-700">Age:</span> {patient.age}</div>
                    <div><span className="font-semibold text-gray-700">Gender:</span> {patient.gender}</div>
                    <div><span className="font-semibold text-gray-700">Contact Info:</span> {patient.contactInfo}</div>
                    <div><span className="font-semibold text-gray-700">Emergency Contact:</span> {patient.emergencyContact}</div>
                  </div>
                </div>
              ))
            ) : (
              <p>No patients available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Patient;
