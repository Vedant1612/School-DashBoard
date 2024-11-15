import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../config'; // Assuming this is where your API base URL is configured
import { FaUser, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';
import Sidebar from '../components/Sidebar'; // Import Sidebar component

function Profile() {
  const [userData, setUserData] = useState(null);

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
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">Student Profile</h1>
        </header>

        <div className="flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl border border-gray-200">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-blue-200 flex justify-center items-center text-4xl text-white">
                <FaUser />
              </div>
            </div>
            <div className="text-center mb-4">
              <h2 className="text-2xl font-semibold text-gray-700">STUDENT</h2>
              <h3 className="text-xl font-semibold text-gray-800 mt-2">{userData.name}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center">
                <FaEnvelope className="text-blue-500 mr-3" />
                <p className="text-lg text-gray-600">{userData.email}</p>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="text-blue-500 mr-3" />
                <p className="text-lg text-gray-600">{userData.mobile}</p>
              </div>
              {/* Removed degree section */}
              {/* <div className="flex items-center">
                <p className="text-lg text-gray-600"><strong>Roll No:</strong> {userData.rollNo}</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
