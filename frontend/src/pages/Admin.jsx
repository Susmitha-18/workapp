import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Settings, Plus, Trash2, Users, Building, CalendarDays } from 'lucide-react';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('workspaces'); // workspaces or bookings
  const [workspaces, setWorkspaces] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // New Workspace form state
  const [newWorkspace, setNewWorkspace] = useState({
    name: '',
    type: 'desk',
    capacity: 1,
    availability: true
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [wsRes, bkRes] = await Promise.all([
        api.get('/workspaces'),
        api.get('/bookings/all')
      ]);
      setWorkspaces(wsRes.data.data);
      setBookings(bkRes.data.data);
    } catch (error) {
      console.error("Error fetching admin data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateWorkspace = async (e) => {
    e.preventDefault();
    try {
      await api.post('/workspaces', newWorkspace);
      setNewWorkspace({ name: '', type: 'desk', capacity: 1, availability: true });
      fetchData(); // Refresh lists
    } catch (error) {
      alert(error.response?.data?.message || 'Error creating workspace');
    }
  };

  const handleDeleteWorkspace = async (id) => {
    if (window.confirm('Are you sure you want to delete this workspace?')) {
      try {
        await api.delete(`/workspaces/${id}`);
        fetchData();
      } catch (error) {
        alert(error.response?.data?.message || 'Error deleting workspace');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center space-x-3 mb-8">
        <Settings className="w-8 h-8 text-brand-600" />
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Admin Dashboard</h1>
      </div>

      <div className="flex space-x-4 mb-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('workspaces')}
          className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'workspaces' ? 'text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <div className="flex items-center">
            <Building className="w-4 h-4 mr-2" />
            Manage Workspaces
          </div>
          {activeTab === 'workspaces' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600"></div>}
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`pb-4 px-2 font-medium text-sm transition-colors relative ${activeTab === 'bookings' ? 'text-brand-600' : 'text-gray-500 hover:text-gray-700'}`}
        >
          <div className="flex items-center">
            <CalendarDays className="w-4 h-4 mr-2" />
            All Bookings
          </div>
          {activeTab === 'bookings' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-600"></div>}
        </button>
      </div>

      {activeTab === 'workspaces' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="glass rounded-2xl p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <Plus className="w-5 h-5 mr-2 text-brand-500" />
                Add Workspace
              </h2>
              <form onSubmit={handleCreateWorkspace} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    required
                    value={newWorkspace.name}
                    onChange={(e) => setNewWorkspace({...newWorkspace, name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border"
                    placeholder="e.g. Conference Room A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Type</label>
                  <select
                    value={newWorkspace.type}
                    onChange={(e) => setNewWorkspace({...newWorkspace, type: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border"
                  >
                    <option value="desk">Hot Desk</option>
                    <option value="room">Meeting Room</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={newWorkspace.capacity}
                    onChange={(e) => setNewWorkspace({...newWorkspace, capacity: e.target.value})}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm py-2 px-3 border"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={newWorkspace.availability}
                    onChange={(e) => setNewWorkspace({...newWorkspace, availability: e.target.checked})}
                    className="h-4 w-4 text-brand-600 focus:ring-brand-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Available</label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-700 transition-colors"
                >
                  Create Workspace
                </button>
              </form>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl overflow-hidden border border-gray-100">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workspaces.map((ws) => (
                    <tr key={ws._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ws.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{ws.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ws.capacity}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ws.availability ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {ws.availability ? 'Available' : 'Unavailable'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button onClick={() => handleDeleteWorkspace(ws._id)} className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-5 h-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'bookings' && (
        <div className="glass rounded-2xl overflow-hidden border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workspace</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-brand-100 rounded-full flex items-center justify-center">
                        <Users className="h-4 w-4 text-brand-600" />
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{booking.userId?.name}</div>
                        <div className="text-sm text-gray-500">{booking.userId?.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {booking.workspaceId?.name || 'Deleted Workspace'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {booking.startTime} - {booking.endTime}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${booking.status === 'booked' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'}`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
