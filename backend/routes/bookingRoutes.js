const express = require('express');
const {
  createBooking,
  getUserBookings,
  getAllBookings,
  deleteBooking
} = require('../controllers/booking');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.post('/', createBooking);
router.get('/user', getUserBookings);
router.get('/all', authorize('admin'), getAllBookings);
router.delete('/:id', deleteBooking);

module.exports = router;
