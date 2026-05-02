import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import LandingPage from '../pages/LandingPage';
import LoginPage from '../pages/LoginPage';
import SignupPage from '../pages/SignupPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import AdminManagementDashboard from '../pages/AdminManagementDashboard';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard isAdminView={true} />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/admin/management" 
        element={
          <ProtectedRoute>
            <AdminManagementDashboard />
          </ProtectedRoute>
        } 
      />
      <Route path="/customers" element={<div>Customers Page (WIP)</div>} />
      <Route path="/churn-analysis" element={<div>Churn Analysis Page (WIP)</div>} />
      <Route path="/retention" element={<div>Retention Page (WIP)</div>} />
      <Route path="/campaigns" element={<div>Campaigns Page (WIP)</div>} />
      <Route path="/settings" element={<div>Settings Page (WIP)</div>} />
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
};

export default AppRouter;