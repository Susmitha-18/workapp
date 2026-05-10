const Workspace = require('../models/Workspace');

// @desc    Get all workspaces
// @route   GET /api/workspaces
// @access  Public
exports.getWorkspaces = async (req, res) => {
  try {
    const workspaces = await Workspace.find();
    res.status(200).json({ success: true, count: workspaces.length, data: workspaces });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new workspace
// @route   POST /api/workspaces
// @access  Private/Admin
exports.createWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.create(req.body);
    res.status(201).json({ success: true, data: workspace });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete workspace
// @route   DELETE /api/workspaces/:id
// @access  Private/Admin
exports.deleteWorkspace = async (req, res) => {
  try {
    const workspace = await Workspace.findById(req.params.id);

    if (!workspace) {
      return res.status(404).json({ success: false, message: `No workspace with the id of ${req.params.id}` });
    }

    await workspace.deleteOne();

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
