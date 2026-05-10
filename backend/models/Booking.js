const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  workspaceId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Workspace',
    required: true
  },
  date: {
    type: Date,
    required: [true, 'Please add a date']
  },
  startTime: {
    type: String,
    required: [true, 'Please add a start time']
  },
  endTime: {
    type: String,
    required: [true, 'Please add an end time']
  },
  status: {
    type: String,
    enum: ['booked', 'cancelled'],
    default: 'booked'
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);
