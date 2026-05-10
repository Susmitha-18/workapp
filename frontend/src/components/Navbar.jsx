import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Building2, LogOut, CalendarDays, LayoutDashboard, Settings } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="glass sticky top-0 z-50 px-6 py-4 mb-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-brand-600 hover:text-brand-500 transition-colors">
          <Building2 className="w-8 h-8" />
          <span className="text-xl font-bold tracking-tight">SmartSpace</span>
        </Link>

        {user ? (
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-1 text-gray-600 hover:text-brand-600 transition-colors font-medium">
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            <Link to="/book" className="flex items-center space-x-1 text-gray-600 hover:text-brand-600 transition-colors font-medium">
              <CalendarDays className="w-4 h-4" />
              <span>Book</span>
            </Link>
            <Link to="/my-bookings" className="flex items-center space-x-1 text-gray-600 hover:text-brand-600 transition-colors font-medium">
              <CalendarDays className="w-4 h-4" />
              <span>My Bookings</span>
            </Link>
            
            {user.role === 'admin' && (
              <Link to="/admin" className="flex items-center space-x-1 text-gray-600 hover:text-brand-600 transition-colors font-medium">
                <Settings className="w-4 h-4" />
                <span>Admin</span>
              </Link>
            )}

            <div className="h-6 w-px bg-gray-300"></div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-semibold text-gray-700 bg-brand-50 px-3 py-1 rounded-full border border-brand-100">
                {user.name}
              </span>
              <button 
                onClick={handleLogout}
                className="flex items-center space-x-1 text-red-500 hover:text-red-700 transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-600 hover:text-brand-600 font-medium transition-colors">
              Login
            </Link>
            <Link to="/signup" className="bg-brand-600 text-white px-5 py-2 rounded-lg hover:bg-brand-500 transition-all font-medium shadow-md hover:shadow-lg">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
