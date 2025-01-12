import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Auth = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(''); 
  const [error, setError] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false); 
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      navigate('/healthcare'); 
    } catch (err) {
      setError('Invalid username or password');
    }
  };
  

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password, role });
      navigate('/login');
    } catch (err) {
      setError('Registration failed');
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 flex items-center justify-center px-20">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="text-4xl font-bold mb-2">WELCOME BACK</h2>
            <p className="text-gray-600 mb-8">Welcome back! Please enter your details.</p>
          </div>
          <form onSubmit={isRegistering ? handleRegisterSubmit : handleLoginSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-900">Username</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900">Password</label>
                <input
                  type="password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </div>
              {isRegistering && (
                <div>
                  <label className="block text-sm font-medium text-gray-900">Role</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Enter role (admin/user)"
                    required
                  />
                </div>
              )}
              {error && <div className="text-red-500 text-sm">{error}</div>}
              <button
                type="submit"
                className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                {isRegistering ? 'Register' : 'Login'}
              </button>
            </div>
          </form>
          <button
            onClick={() => setIsRegistering(!isRegistering)}
            className="w-full py-3 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition-colors mt-4"
          >
            {isRegistering ? 'Switch to Login' : 'Switch to Register'}
          </button>
        </div>
      </div>
      <div className="w-1/2 bg-gray-50">
        <div className="h-full w-full relative">
          <img
            src="/login_page.jpg"
            alt="Basketball player illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Auth;
