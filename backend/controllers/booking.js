const Booking = require('../models/Booking');
const Workspace = require('../models/Workspace');

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const { workspaceId, date, startTime, endTime } = req.body;

    // Check if workspace exists
    const workspace = await Workspace.findById(workspaceId);
    if (!workspace) {
      return res.status(404).json({ success: false, message: 'Workspace not found' });
    }

    // Check for duplicate booking (simple overlapping check can be added, here we just check exact match for simplicity or same time slot overlap)
    // For a robust system, time logic should be parsed. Assuming simple strict slot checks here.
    const overlappingBookings = await Booking.find({
      workspaceId,
      date,
      status: 'booked',
      $or: [
        { startTime: { $lt: endTime, $gte: startTime } },
        { endTime: { $gt: startTime, $lte: endTime } },
        { startTime: { $lte: startTime }, endTime: { $gte: endTime } }
      ]
    });

    if (overlappingBookings.length > 0) {
      return res.status(400).json({ success: false, message: 'This workspace is already booked for the selected time slot' });
    }

    const booking = await Booking.create({
      userId: req.user.id,
      workspaceId,
      date,
      startTime,
      endTime
    });

    res.status(201).json({ success: true, data: booking });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get logged in user bookings
// @route   GET /api/bookings/user
// @access  Private
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('workspaceId', 'name type capacity');
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all bookings
// @route   GET /api/bookings/all
// @access  Private/Admin
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('workspaceId', 'name type')
      .populate('userId', 'name email');
    res.status(200).json({ success: true, count: bookings.length, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel/Delete booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }

    // Make sure user is booking owner or admin
    if (booking.userId.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ success: false, message: 'Not authorized to delete this booking' });
    }

    booking.status = 'cancelled';
    await booking.save();
    
    // Optionally delete it entirely: await booking.deleteOne();

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
