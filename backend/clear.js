import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Item from './models/Item.js';

dotenv.config();

const clearDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear all data
    await Item.deleteMany({});
    console.log('✓ Cleared all items');

    await User.deleteMany({});
    console.log('✓ Cleared all users');

    console.log('\n✅ Database cleared successfully!');

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('✗ Error clearing database:', error);
    process.exit(1);
  }
};

clearDatabase();
