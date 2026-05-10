const express = require('express');
const {
  getWorkspaces,
  createWorkspace,
  deleteWorkspace
} = require('../controllers/workspace');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(getWorkspaces)
  .post(protect, authorize('admin'), createWorkspace);

router
  .route('/:id')
  .delete(protect, authorize('admin'), deleteWorkspace);

module.exports = router;
