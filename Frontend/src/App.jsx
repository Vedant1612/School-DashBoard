import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';  // Updated import
import SignUp from './pages/SignUp';
import ViewDocuments from './pages/ViewDocuments';
import PrivateRoute from './components/PrivateRoute'; 
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import DocumentReview from './pages/DocumentReview'; // New DocumentReview import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}
        <Route 
          path="/student-dashboard" 
          element={<PrivateRoute allowedRoles={['student']}><StudentDashboard /></PrivateRoute>} 
        />
        <Route 
          path="/student-dashboard/profile" 
          element={<PrivateRoute allowedRoles={['student']}><Profile /></PrivateRoute>} 
        />
        <Route 
          path="/student-dashboard/view-documents" 
          element={<PrivateRoute allowedRoles={['student']}><ViewDocuments /></PrivateRoute>} 
        />
        <Route 
          path="/student-dashboard/edit-profile" 
          element={<PrivateRoute allowedRoles={['student']}><EditProfile /></PrivateRoute>} 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin-dashboard" 
          element={<PrivateRoute allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} 
        />
        <Route 
          path="/admin-dashboard/document-review" 
          element={<PrivateRoute allowedRoles={['admin']}><DocumentReview /></PrivateRoute>} 
        />
      </Routes>
    </Router>
  );
}

export default App;
