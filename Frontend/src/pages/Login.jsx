import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import API_BASE_URL from '../config';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const [error, setError] = useState(''); 
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    setError(''); 

    try {
      // Log the request payload for debugging
      // console.log('Login Request Payload:', { username, password, role });

      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, role }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role);

        // Redirect based on user role
        if (data.role === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else {
        const data = await response.json();
        setError(data.error || 'Invalid credentials or role');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url('https://www.healthychildren.org/SiteCollectionImagesArticleImages/classroom-students-and-teacher-view-from-back-of-room.jpg?RenditionID=3')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white p-8 rounded-3xl shadow-xl w-full max-w-md transform transition-all hover:scale-103">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Sign In</h1>

        <div className="space-y-8">
          {/* Error Message */}
          {error && <div className="text-red-600 text-center">{error}</div>}

          {/* Username Input */}
          <div className="group">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-700">
              Mobile Number or Username
            </label>
            <div className="relative mt-2">
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-lg text-gray-800 border-2 border-gray-300 focus:ring-4 focus:ring-indigo-500 placeholder-transparent"
                placeholder="Enter mobile number or username"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="group">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              OTP/Password
            </label>
            <div className="relative mt-2">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-lg text-gray-800 border-2 border-gray-300 focus:ring-4 focus:ring-indigo-500 placeholder-transparent"
                placeholder="Enter OTP or password"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="group">
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700">
              Select Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 bg-gray-100 rounded-lg text-gray-800 border-2 border-gray-300 focus:ring-4 focus:ring-indigo-500"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transform transition-all hover:scale-104"
          >
            Login
          </button>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <small className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-indigo-600 hover:underline">
              Sign up
            </a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default Login;
