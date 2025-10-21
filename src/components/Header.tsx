import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gray-800 text-white px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src="/files_1145219-1754302819938-logo.png"
            alt="FMDQ"
            className="h-8"
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-300">
            <User className="w-4 h-4" />
            <span className="text-sm">Welcome {user?.username || 'User'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;