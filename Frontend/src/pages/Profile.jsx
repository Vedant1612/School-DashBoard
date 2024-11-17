import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhoneAlt, FaHome, FaMale, FaFemale } from 'react-icons/fa';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../config';

function Profile() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/student/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch profile data', error);
      }
    };

    fetchProfileData();
  }, []);

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        <div>Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl border border-gray-200">
          <header className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">Student Profile</h1>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              onClick={() => navigate('/student-dashboard/edit-profile', { state: { userData } })}
            >
              Edit Profile
            </button>
          </header>

          <div className="flex justify-center mb-6">
            {userData.profilePic ? (
              <img
                src={`${API_BASE_URL}${userData.profilePic}`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-blue-500 flex justify-center items-center text-4xl text-white border-4 border-blue-500">
                <FaUser />
              </div>
            )}
          </div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-700">STUDENT</h2>
            <h3 className="text-xl font-semibold text-gray-800 mt-2">
              {userData.firstName} {userData.lastName}
            </h3>
          </div>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-blue-500 text-2xl" />
              <p className="text-lg text-gray-600">
                <strong>Email:</strong> {userData.email}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaPhoneAlt className="text-blue-500 text-2xl" />
              <p className="text-lg text-gray-600">
                <strong>Contact:</strong> {userData.mobile}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaHome className="text-blue-500 text-2xl" />
              <p className="text-lg text-gray-600">
                <strong>Address:</strong> {userData.address}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaMale className="text-blue-500 text-2xl" />
              <p className="text-lg text-gray-600">
                <strong>Father's Name:</strong> {userData.fathersName}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <FaFemale className="text-blue-500 text-2xl" />
              <p className="text-lg text-gray-600">
                <strong>Mother's Name:</strong> {userData.mothersName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
