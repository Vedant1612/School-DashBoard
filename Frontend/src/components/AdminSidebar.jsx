import React, { useState, useEffect } from 'react';
import { FaUserAlt, FaFolder, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function AdminSidebar() {
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
    navigate('/'); // Redirect to the home or login page
  };

  // Handle navigation to Admin Dashboard
  const goToDashboard = () => {
    navigate('/admin-dashboard'); // Correct route for admin dashboard
  };

  // Handle navigation to Document Review
  const goToDocumentReview = () => {
    navigate('/admin-dashboard/document-review'); // Correct route for document review
  };

  if (!isAuthenticated) {
    return null; // If not authenticated, don't show the sidebar
  }

  return (
    <div className="w-64 bg-gradient-to-b from-blue-400 to-blue-400 text-white p-6 flex flex-col justify-between">
      <h2 className="text-2xl font-semibold mb-8 text-center">Admin Panel</h2>
      <ul className="space-y-4">
        <li>
          <button
            onClick={goToDashboard} // Navigate to Admin Dashboard
            className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center"
          >
            <FaUserAlt className="mr-3" /> Dashboard
          </button>
        </li>
        <li>
          {/* <button
            onClick={goToDocumentReview} // Navigate to Document Review
            className="w-full text-left py-2 px-4 hover:bg-blue-700 flex items-center"
          >
            <FaFolder className="mr-3" /> Document Review
          </button> */}
        </li>
      </ul>
      <button
        onClick={handleLogout} // Logout function
        className="w-full text-left py-2 px-4 mt-auto hover:bg-blue-700 flex items-center"
      >
        <FaSignOutAlt className="mr-3" /> Logout
      </button>
    </div>
  );
}

export default AdminSidebar;
