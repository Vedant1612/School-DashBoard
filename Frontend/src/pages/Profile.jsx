import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaEnvelope, FaPhoneAlt, FaHome, FaMale, FaFemale, FaPen } from 'react-icons/fa';  // Add FaPen
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
          <header className="flex justify-between items-center border-b border-gray-200 pb-4 mb-3">
            <h1 className="text-3xl font-semibold text-gray-800">Student Profile</h1>
            <button
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 flex items-center space-x-2"
              onClick={() => navigate('/student-dashboard/edit-profile', { state: { userData } })}
            >
              <FaPen className="text-white text-lg" /> {/* Pencil Icon */}
              <span>Edit Profile</span>
            </button>
          </header>

          {/* Profile Section */}
          <div className="flex justify-center mb-2">
            <div className="w-32 h-32 rounded-full bg-blue-500 flex justify-center items-center text-4xl text-white border-4 border-blue-500">
              <FaUser />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-700">STUDENT</h2>
            <h3 className="text-xl font-semibold text-gray-800 mt-2">
              {userData.firstName} {userData.lastName}
            </h3>
          </div>

          {/* Card-style Sections */}
          <div className="space-y-6">
            {/* Contact Information Card */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md flex items-center space-x-4 border border-gray-200">
              <FaEnvelope className="text-blue-500 text-2xl" />
              <p className="text-lg text-gray-600">
                <strong>Email:</strong> {userData.email}
              </p>
            </div>

            {/* Phone Contact Card */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md flex items-center space-x-4 border border-gray-200">
              <FaPhoneAlt className="text-blue-500 text-2xl" />
              <p className="text-lg text-gray-600">
                <strong>Contact:</strong> {userData.mobile}
              </p>
            </div>

            {/* Address Card */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-md flex items-center space-x-4 border border-gray-200">
              <FaHome className="text-blue-500 text-2xl" />
              <p className="text-lg text-gray-600">
                <strong>Address:</strong> {userData.address ? `${userData.address.street}, ${userData.address.city}, ${userData.address.state} (${userData.address.zip})` : 'Not Available'}
              </p>
            </div>

            {/* Parent Information Cards */}
            <div className="flex space-x-4">
              {/* Father's Name */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-md flex items-center space-x-4 w-full border border-gray-200">
                <FaMale className="text-blue-500 text-2xl" />
                <p className="text-lg text-gray-600">
                  <strong>Father's Name:</strong> {userData.fathersName}
                </p>
              </div>

              {/* Mother's Name */}
              <div className="bg-gray-50 p-4 rounded-lg shadow-md flex items-center space-x-4 w-full border border-gray-200">
                <FaFemale className="text-blue-500 text-2xl" />
                <p className="text-lg text-gray-600">
                  <strong>Mother's Name:</strong> {userData.mothersName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
