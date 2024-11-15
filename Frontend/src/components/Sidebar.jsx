import React, { useEffect, useState } from 'react';
import { FaUserCircle, FaFileUpload, FaDownload, FaSignOutAlt } from 'react-icons/fa'; // Import profile icon
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return null; 
  }

  return (
    <div className="w-64 bg-gradient-to-b from-blue-500 to-blue-500 text-white p-6 flex flex-col justify-between">
      <h2 className="text-2xl font-semibold mb-8 text-center">Student Panel</h2>
      <ul className="space-y-4">
        {/* Profile Logo */}
        <li>
          <button
            className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center"
            onClick={() => navigate('/student-dashboard/profile')}  
          >
            <FaUserCircle className="mr-3 text-xl" />  {/* Profile Icon */}
            <span>Profile</span>
          </button>
        </li>

        <li>
          <button
            className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center"
            onClick={() => navigate('/student-dashboard')} 
          >
            <FaFileUpload className="mr-3" /> Upload Document
          </button>
        </li>
        <li>
          <button
            className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center"
            onClick={() => navigate('/student-dashboard/view-documents')} // Navigate to View Documents page
          >
            <FaDownload className="mr-3" /> View Documents
          </button>
        </li>
        <li>
          <button
            onClick={handleLogout} // Logout function
            className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center"
          >
            <FaSignOutAlt className="mr-3" /> Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
