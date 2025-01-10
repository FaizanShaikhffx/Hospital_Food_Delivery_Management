import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const [hasPatients, setHasPatients] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRoleAndPatients = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const userResponse = await api.get('http://localhost:5000/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserRole(userResponse.data.role);

        const patientsResponse = await api.get('http://localhost:5000/api/patients/get');
        setHasPatients(patientsResponse.data.length > 0);
      } catch (error) {
        console.error('Error fetching data:', error.message);
        navigate('/login');
      }
    };

    fetchUserRoleAndPatients();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <h2 className="text-xl mb-4">Role: {userRole}</h2>
      <button
        onClick={logout}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Logout
      </button>
      <div>
        {userRole === 'admin' && (
          <>
            <button
              onClick={() => navigate('/patients')}
              className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Manage Patients
            </button>
            {hasPatients && (
              <>
                <button
                  onClick={() => navigate('/food-charts')}
                  className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Manage Food Charts
                </button>
                <button
                  onClick={() => navigate('/meal-deliveries')}
                  className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Track Meal Deliveries
                </button>
              </>
            )}
          </>
        )}
        {userRole === 'staff' && hasPatients && (
          <>
            <button
              onClick={() => navigate('/food-charts')}
              className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              View Food Charts
            </button>
            <button
              onClick={() => navigate('/meal-deliveries')}
              className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              View Meal Deliveries
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
