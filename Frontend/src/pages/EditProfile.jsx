import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import API_BASE_URL from '../config';
import Sidebar from '../components/Sidebar';

function EditProfile() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: {
      street: "",
      city: "",
      state: "",
      zip: "",
    },
    fathersName: "",
    mothersName: "",
    profilePic: null,
  });

  const [profileCompletion, setProfileCompletion] = useState(0);  
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const data = location.state?.userData;
    if (data) {
      setFormData({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
        address: data.address || {
          street: "",
          city: "",
          state: "",
          zip: "",
        },
        fathersName: data.fathersName,
        mothersName: data.mothersName,
        profilePic: null,
      });
      calculateProfileCompletion(data);  
    }
  }, [location.state]);

  const calculateProfileCompletion = (data) => {
    const filledFields = Object.values(data).filter(value => value !== null && value !== "").length;
    const totalFields = Object.keys(data).length;
    setProfileCompletion(Math.round((filledFields / totalFields) * 100));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    // Check if name belongs to the 'address' object
    if (['street', 'city', 'state', 'zip'].includes(name)) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      // If name is not part of the address, update other fields
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, profilePic: e.target.files[0] });
  };

  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem('token');
      const formDataObj = new FormData();
      formDataObj.append('firstName', formData.firstName);
      formDataObj.append('lastName', formData.lastName);
      formDataObj.append('email', formData.email);
      formDataObj.append('mobile', formData.mobile);
      formDataObj.append('fathersName', formData.fathersName);
      formDataObj.append('mothersName', formData.mothersName);

      // Convert address object into a JSON string before appending
      formDataObj.append('address', JSON.stringify(formData.address));

      if (formData.profilePic) {
        formDataObj.append('profilePic', formData.profilePic);
      }

      await axios.put(`${API_BASE_URL}/student/editProfile`, formDataObj, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Profile updated successfully!');
      navigate('/student-dashboard/profile');
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      <div className="flex-1 flex justify-center items-center p-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-3xl border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Profile</h2>

          {/* Profile Completion Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Profile Completion</span>
              <span className="font-semibold text-gray-600">{profileCompletion}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${profileCompletion}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-4">
            {/* First Name and Last Name Side by Side */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Email and Mobile Side by Side */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Address Fields */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Street</label>
                <input
                  type="text"
                  name="street"
                  value={formData.address.street}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.address.city}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            {/* State and Zip Code Side by Side */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.address.state}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Zip Code</label>
                <input
                  type="text"
                  name="zip"
                  value={formData.address.zip}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>


            {/* Father's Name and Mother's Name Side by Side */}
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Father's Name</label>
                <input
                  type="text"
                  name="fathersName"
                  value={formData.fathersName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Mother's Name</label>
                <input
                  type="text"
                  name="mothersName"
                  value={formData.mothersName}
                  onChange={handleInputChange}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
            </div>

            {/* Profile Picture */}
            {/* <div>
              <label className="block text-sm font-medium mb-1">Profile Picture</label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full border rounded px-3 py-2"
              />
            </div> */}

            {/* Save Changes Button */}
            <div className="mt-6 text-center">
              <button
                onClick={handleSaveChanges}
                className="bg-blue-600 text-white rounded px-6 py-2 font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
