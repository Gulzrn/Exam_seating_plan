const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO_URI is not defined in environment variables.');
  }

  await mongoose.connect(uri, {
    dbName: process.env.MONGO_DB || 'exam_seating',
  });

  console.log('MongoDB connected');
};

module.exports = connectDB;

