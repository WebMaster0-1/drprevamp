import React from 'react';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import UniversalInputterDashboard from './pages/UniversalInputterDashboard';
import AdminDashboard from './pages/AdminDashboard';
import FMDQISADashboard from './pages/FMDQISADashboard';

function App() {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  if (user?.role === 'UniversalInputter') {
    return <UniversalInputterDashboard />;
  }

  if (user?.role === 'AdminFMDQ') {
    return <AdminDashboard />;
  }

  if (user?.role === 'FMDQISA') {
    return <FMDQISADashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600">Your role does not have access to any dashboard.</p>
      </div>
    </div>
  );
}

export default App;