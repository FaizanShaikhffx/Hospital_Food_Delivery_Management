import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Dashboard = () => {
  const [userRole, setUserRole] = useState('');
  const history = useNavigate();

  useEffect(() => {
    // Fetch user role from the backend or decode from JWT
    const fetchUserRole = async () => {
      try {
        const response = await api.get('/auth/me'); // Assuming you have a route to get user info
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user role');
      }
    };
    fetchUserRole();
  }, []);

  const logout = () => {
    localStorage.removeItem('token');
    history.push('/login');
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
              onClick={() => history.push('/food-charts')}
              className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Manage Food Charts
            </button>
            <button
              onClick={() => history.push('/meal-deliveries')}
              className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Track Meal Deliveries
            </button>
          </>
        )}
        {userRole === 'staff' && (
          <>
            <button
              onClick={() => history.push('/food-charts')}
              className="mr-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              View Food Charts
            </button>
            <button
              onClick={() => history.push('/meal-deliveries')}
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
