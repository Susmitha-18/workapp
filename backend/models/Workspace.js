const mongoose = require('mongoose');

const WorkspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a workspace name'],
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters']
  },
  type: {
    type: String,
    required: [true, 'Please specify workspace type (room or desk)'],
    enum: ['room', 'desk']
  },
  capacity: {
    type: Number,
    required: [true, 'Please specify capacity']
  },
  availability: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Workspace', WorkspaceSchema);
