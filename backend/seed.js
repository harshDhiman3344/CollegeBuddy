import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Item from './models/Item.js';

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing data
    await Item.deleteMany({});
    await User.deleteMany({});
    console.log('✓ Cleared existing data');

    // Create sample users
    const users = await User.insertMany([
      {
        clerkId: 'user_sample_1',
        username: 'John Doe',
        email: 'john@example.com',
      },
      {
        clerkId: 'user_sample_2',
        username: 'Sarah Smith',
        email: 'sarah@example.com',
      },
      {
        clerkId: 'user_sample_3',
        username: 'Mike Johnson',
        email: 'mike@example.com',
      },
      {
        clerkId: 'user_sample_4',
        username: 'Emma Wilson',
        email: 'emma@example.com',
      },
    ]);
    console.log('✓ Created 4 sample users');

    // Create sample items
    const items = await Item.insertMany([
      {
        title: 'Drafter Set - Mechanical Drawing',
        description: 'Complete drafter set with compass, scale, and triangle. Perfect for engineering drawings. Hardly used.',
        price: 250,
        seller: users[0]._id,
      },
      {
        title: 'Aakash Study Material - Physics & Chemistry',
        description: 'Complete Aakash coaching modules for Physics and Chemistry. Includes theory sheets and solved problems.',
        price: 800,
        seller: users[0]._id,
      },
      {
        title: 'Handwritten Notes - Data Structures',
        description: 'Detailed handwritten notes on Data Structures and Algorithms. Well-organized with examples. Semester 4.',
        price: 150,
        seller: users[1]._id,
      },
      {
        title: 'Sheet Holder - A4 Size',
        description: 'Metal sheet holder with clips. Great for organizing loose papers and notes. Compact design.',
        price: 120,
        seller: users[1]._id,
      },
      {
        title: 'Graph Paper Pad - Engineering',
        description: '5 pads of quality graph paper. 100 sheets per pad. Ideal for sketches and designs.',
        price: 200,
        seller: users[2]._id,
      },
      {
        title: 'OP Tandon Organic Chemistry',
        description: 'OP Tandon Organic Chemistry book. Comprehensive with solved examples. Good condition.',
        price: 350,
        seller: users[2]._id,
      },
      {
        title: 'Notebook Set - College Pack',
        description: '10 ruled notebooks (200 pages each). Bulk buy, used only 2-3 notebooks.',
        price: 400,
        seller: users[3]._id,
      },
      {
        title: 'Drawing Compass & Angles Set',
        description: 'Precision compass set with protractor and angle templates. Professional grade tools.',
        price: 180,
        seller: users[3]._id,
      },
      {
        title: 'Class Notes - Database Management System',
        description: 'Comprehensive notes covering all topics from DBMS course. Hand-written, easy to understand.',
        price: 120,
        seller: users[0]._id,
      },
      {
        title: 'Scale Ruler Set - 6 Pieces',
        description: 'Set of 6 rulers (15cm, 30cm) with clear measurements. Durable plastic material.',
        price: 100,
        seller: users[1]._id,
      },
      {
        title: 'Colored Pencil Set - 36 Colors',
        description: '36 colors premium colored pencils. Smooth and vibrant. Original packaging.',
        price: 300,
        seller: users[2]._id,
      },
      {
        title: 'Previous Year Question Paper Bundle',
        description: 'Last 5 years question papers for all core subjects. Photocopied, solved solutions included.',
        price: 250,
        seller: users[3]._id,
      },
      {
        title: 'Sticky Notes Combo Pack',
        description: '15 pads of sticky notes in different colors. Perfect for reminders and quick notes.',
        price: 150,
        seller: users[0]._id,
      },
      {
        title: 'Engineering Drawing Stencil Set',
        description: 'Geometric stencils for technical drawings. Includes circles, squares, hexagons.',
        price: 200,
        seller: users[1]._id,
      },
      {
        title: 'Mathematics Handbook - Engineering',
        description: 'Comprehensive math handbook with formulas and solved examples. Pocket-sized, easy reference.',
        price: 250,
        seller: users[2]._id,
      },
    ]);
    console.log('✓ Created 15 sample items');

    console.log('\n📊 Database seeded successfully!');
    console.log(`   - Users: ${users.length}`);
    console.log(`   - Items: ${items.length}`);

    await mongoose.connection.close();
    console.log('✓ Database connection closed');
  } catch (error) {
    console.error('✗ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
