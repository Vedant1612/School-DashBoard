import React, { useState } from 'react';

function RegisterStudent({ onRegister }) {
  const [studentName, setStudentName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [lastName, setLastName] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/admin/registerStudent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName,
          contactNumber,
          address,
          fatherName,
          motherName,
          email,
          password,
          lastName,
        }),
      });

      if (!response.ok) {
        throw new Error('Error registering student');
      }

      const data = await response.json();
      onRegister(data.student);  // Pass the newly registered student to the parent component
    } catch (error) {
      console.error('Error registering student:', error);
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Register New Student</h2>

      {/* Form Inputs */}
      <div className="space-y-4">
        {/* First Name and Last Name Side by Side */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Student Name</label>
            <input
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Email and Contact Number Side by Side */}
        <div className="flex space-x-4">
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Contact Number</label>
            <input
              type="text"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
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
              placeholder="Father's Name"
              value={fatherName}
              onChange={(e) => setFatherName(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Mother's Name</label>
            <input
              type="text"
              placeholder="Mother's Name"
              value={motherName}
              onChange={(e) => setMotherName(e.target.value)}
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
              placeholder="Street"
              value={address.street}
              onChange={handleAddressChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={address.city}
              onChange={handleAddressChange}
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
              placeholder="State"
              value={address.state}
              onChange={handleAddressChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
          <div className="w-1/2">
            <label className="block text-sm font-medium mb-1">Zip Code</label>
            <input
              type="text"
              name="zip"
              placeholder="Zip Code"
              value={address.zip}
              onChange={handleAddressChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-6">
        <button
          onClick={handleRegister}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Save Student
        </button>
      </div>
    </div>
  );
}

export default RegisterStudent;
