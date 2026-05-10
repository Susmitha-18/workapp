import React, { useState, useEffect } from 'react';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import { Calendar, Clock, MapPin, XCircle } from 'lucide-react';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get('/bookings/user');
      setBookings(res.data.data);
    } catch (error) {
      console.error("Error fetching bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await api.delete(`/bookings/${id}`);
        fetchBookings(); // Refresh list
      } catch (error) {
        console.error("Error cancelling booking", error);
        alert(error.response?.data?.message || 'Failed to cancel booking');
      }
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My Bookings</h1>
        <p className="text-gray-500 mt-1">Manage your upcoming workspace reservations.</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-16 glass rounded-2xl">
          <Calendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900">No bookings found</h3>
          <p className="mt-1 text-gray-500">You haven't booked any workspaces yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div key={booking._id} className="glass rounded-2xl p-6 border border-gray-100 relative overflow-hidden">
              {booking.status === 'cancelled' && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm z-10 flex items-center justify-center">
                  <span className="bg-red-100 text-red-800 px-4 py-2 rounded-full font-bold shadow-sm transform -rotate-12">
                    CANCELLED
                  </span>
                </div>
              )}
              
              <div className="flex items-center mb-4 text-brand-600">
                <MapPin className="w-5 h-5 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900 truncate">
                  {booking.workspaceId ? booking.workspaceId.name : 'Unknown Workspace'}
                </h3>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-3" />
                  <span className="text-sm">{new Date(booking.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-4 h-4 mr-3" />
                  <span className="text-sm">{booking.startTime} - {booking.endTime}</span>
                </div>
                {booking.workspaceId && (
                   <div className="flex items-center text-gray-600 ml-7">
                     <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                       Type: {booking.workspaceId.type}
                     </span>
                   </div>
                )}
              </div>

              {booking.status !== 'cancelled' && (
                <button
                  onClick={() => cancelBooking(booking._id)}
                  className="w-full flex items-center justify-center px-4 py-2 border border-red-200 text-sm font-medium rounded-lg text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Cancel Booking
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
