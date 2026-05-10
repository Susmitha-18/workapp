const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const User = require('./models/User');
const Workspace = require('./models/Workspace');
const connectDB = require('./config/db');

dotenv.config();

const seedDB = async () => {
  try {
    await connectDB();

    console.log('Seeding Database...');

    // Create Admin User
    const adminExists = await User.findOne({ email: 'admin@admin.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@admin.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created (admin@admin.com / admin123)');
    } else {
      console.log('Admin user already exists');
    }

    // Create initial workspaces
    const wsCount = await Workspace.countDocuments();
    if (wsCount === 0) {
      await Workspace.insertMany([
        { name: 'Conference Room Alpha', type: 'room', capacity: 10, availability: true },
        { name: 'Conference Room Beta', type: 'room', capacity: 6, availability: true },
        { name: 'Hot Desk 1', type: 'desk', capacity: 1, availability: true },
        { name: 'Hot Desk 2', type: 'desk', capacity: 1, availability: true }
      ]);
      console.log('Initial workspaces created');
    } else {
      console.log('Workspaces already exist');
    }

    console.log('Database Seeding Completed Successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
