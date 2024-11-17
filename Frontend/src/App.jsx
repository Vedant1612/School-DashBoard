import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SignUp from './pages/SignUp';
import ViewDocuments from './pages/ViewDocuments';
import PrivateRoute from './components/PrivateRoute'; 
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes using PrivateRoute */}
        <Route 
          path="/student-dashboard" 
          element={<PrivateRoute><StudentDashboard /></PrivateRoute>} 
        />
        <Route 
          path="/student-dashboard/profile" 
          element={<PrivateRoute><Profile /></PrivateRoute>} 
        />
        <Route 
          path="/student-dashboard/view-documents" 
          element={<PrivateRoute><ViewDocuments /></PrivateRoute>} 
        />

        {/* Add Edit Profile Route */}
        <Route 
          path="/student-dashboard/edit-profile" 
          element={<PrivateRoute><EditProfile /></PrivateRoute>} 
        />

        <Route 
          path="/admin-dashboard" 
          element={<PrivateRoute><AdminDashboard /></PrivateRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;
