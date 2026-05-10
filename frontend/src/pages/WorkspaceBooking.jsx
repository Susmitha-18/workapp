import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

const WorkspaceBooking = () => {
  const [searchParams] = useSearchParams();
  const preselectedWorkspace = searchParams.get('workspace');
  
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    workspaceId: preselectedWorkspace || '',
    date: '',
    startTime: '',
    endTime: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const res = await api.get('/workspaces');
        setWorkspaces(res.data.data.filter(w => w.availability));
      } catch (err) {
        console.error("Error fetching workspaces", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkspaces();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (formData.startTime >= formData.endTime) {
      setError('End time must be after start time');
      return;
    }

    try {
      await api.post('/bookings', formData);
      navigate('/my-bookings');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to book workspace');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
      <div className="glass rounded-2xl p-8 shadow-xl border border-gray-100">
        <div className="mb-8 border-b border-gray-100 pb-6 text-center">
          <CalendarIcon className="mx-auto h-12 w-12 text-brand-500 mb-4" />
          <h2 className="text-3xl font-bold text-gray-900">Book a Workspace</h2>
          <p className="text-gray-500 mt-2">Select your preferred space, date, and time slot.</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r">
            <p className="text-sm text-red-700 font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Workspace</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                name="workspaceId"
                required
                value={formData.workspaceId}
                onChange={handleChange}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 text-gray-900 focus:ring-brand-500 focus:border-brand-500 sm:text-sm border"
              >
                <option value="">Choose a workspace...</option>
                {workspaces.map(ws => (
                  <option key={ws._id} value={ws._id}>
                    {ws.name} ({ws.type === 'room' ? 'Room' : 'Desk'} - Cap: {ws.capacity})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="date"
                name="date"
                required
                min={new Date().toISOString().split('T')[0]}
                value={formData.date}
                onChange={handleChange}
                className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 text-gray-900 focus:ring-brand-500 focus:border-brand-500 sm:text-sm border"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  name="startTime"
                  required
                  value={formData.startTime}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 text-gray-900 focus:ring-brand-500 focus:border-brand-500 sm:text-sm border"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="time"
                  name="endTime"
                  required
                  value={formData.endTime}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-lg border-gray-300 bg-gray-50 py-3 text-gray-900 focus:ring-brand-500 focus:border-brand-500 sm:text-sm border"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-brand-600 hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 transition-colors"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkspaceBooking;
