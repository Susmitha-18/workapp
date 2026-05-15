import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { MapPin, Users, Building } from 'lucide-react';

const Dashboard = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const res = await api.get('/workspaces');
        setWorkspaces(res.data.data);
      } catch (error) {
        console.error("Error fetching workspaces", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Workspace Available</h1>
          <p className="text-gray-500 mt-1">Browse and book your perfect spot for the day.</p>
        </div>
        <Link to="/book" className="bg-brand-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-brand-700 transition-all shadow-md hover:shadow-lg">
          Book Now
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {workspaces.map((workspace) => (
          <div key={workspace._id} className="glass rounded-2xl p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">{workspace.name}</h3>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${workspace.type === 'room' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                {workspace.type === 'room' ? 'Meeting Room' : 'Hot Desk'}
              </span>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span className="text-sm">Capacity: {workspace.capacity} people</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Building className="w-4 h-4 mr-2" />
                <span className="text-sm">Status: {workspace.availability ? 'Available' : 'Unavailable'}</span>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Link 
                to={`/book?workspace=${workspace._id}`}
                className="inline-block bg-gray-50 hover:bg-brand-50 text-brand-600 text-sm font-medium px-4 py-1.5 rounded-md border border-gray-200 hover:border-brand-200 transition-colors"
              >
                Select for Booking
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {workspaces.length === 0 && (
        <div className="text-center py-12 glass rounded-2xl">
          <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No workspaces available</h3>
          <p className="mt-1 text-gray-500">Check back later or contact the admin.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default Dashboard;
