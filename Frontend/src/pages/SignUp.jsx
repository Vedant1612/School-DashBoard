import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:5000';

function SignUp() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          firstName,
          lastName,
          email,
          mobile,
          password,
          role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Sign-up successful! Please log in.');
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setError(data.error || 'Sign-up failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen" style={{
      backgroundImage: `url('https://www.healthychildren.org/SiteCollectionImagesArticleImages/classroom-students-and-teacher-view-from-back-of-room.jpg?RenditionID=3')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white p-8 rounded-3xl shadow-xl w-full max-w-lg transform transition-all hover:scale-102">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>

        <div className="space-y-6">
          {error && <div className="text-red-600 text-center">{error}</div>}
          {success && <div className="text-green-600 text-center">{success}</div>}

          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">First Name</label>
              <input type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-lg border-2 border-gray-300 focus:ring-4 focus:ring-indigo-500"
                placeholder="Enter your first name" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">Last Name</label>
              <input type="text" id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-lg border-2 border-gray-300 focus:ring-4 focus:ring-indigo-500"
                placeholder="Enter your last name" />
            </div>
          </div>

          {/* Email and Mobile */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-lg border-2 border-gray-300 focus:ring-4 focus:ring-indigo-500"
                placeholder="Enter your email" />
            </div>
            <div>
              <label htmlFor="mobile" className="block text-sm font-semibold text-gray-700">Mobile Number</label>
              <input type="text" id="mobile" value={mobile} onChange={(e) => setMobile(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-lg border-2 border-gray-300 focus:ring-4 focus:ring-indigo-500"
                placeholder="Enter your mobile number" />
            </div>
          </div>

          {/* Username and Password */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Username</label>
              <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-lg border-2 border-gray-300 focus:ring-4 focus:ring-indigo-500"
                placeholder="Enter your username" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
              <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-lg border-2 border-gray-300 focus:ring-4 focus:ring-indigo-500"
                placeholder="Enter your password" />
            </div>
          </div>

          {/* Role */}
          <div>
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700">Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-4 bg-gray-100 rounded-lg border-2 border-gray-300 focus:ring-4 focus:ring-indigo-500"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Submit Button */}
          <button onClick={handleSignUp} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-pink-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition transform hover:scale-102">
            Sign Up
          </button>
        </div>

        <div className="mt-6 text-center">
          <small className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/" className="text-indigo-600 hover:underline">Log in</a>
          </small>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
