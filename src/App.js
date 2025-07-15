import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './Pages/Login';
import Register from './Pages/Register';
import UploadStudent from './Pages/UploadStudent';
import Dashboard from './Pages/Dashboard';
import StudentTable from './Pages/StudentTable';
import EditStudent from './Pages/EditStudent';

import PublicLayout from './Components/PublicLayout';

const App = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
      <Routes>
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* Public Pages with Layout */}
        <Route
          path="/login"
          element={
            <PublicLayout>
              <Login />
            </PublicLayout>
          }
        />
        <Route
          path="/register"
          element={
            <PublicLayout>
              <Register />
            </PublicLayout>
          }
        />

        {/* Private Routes */}
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/upload"
          element={isLoggedIn ? <UploadStudent /> : <Navigate to="/login" />}
        />
        <Route
          path="/studentTable"
          element={isLoggedIn ? <StudentTable /> : <Navigate to="/login" />}
        />
        <Route
          path="/edit-student/:id"
          element={isLoggedIn ? <EditStudent /> : <Navigate to="/login" />}
        />
      </Routes>
  );
};

export default App;
