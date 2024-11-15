import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import AdminDashboard from './pages/AdminDashboard';
import SignUp from './pages/SignUp';
import ViewDocuments from './pages/ViewDocuments';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes wrapped in PrivateRoute */}
        <Route path="/student-dashboard" element={<PrivateRoute element={<StudentDashboard />} />} />
        <Route path="/student-dashboard/view-documents" element={<PrivateRoute element={<ViewDocuments />} />} />

        <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} />} />
      </Routes>
    </Router>
  );
}

export default App;
