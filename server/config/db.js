// server/config/db.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
   const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected successfully to: ${conn.connection.name}`);
  } catch (err) {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  }
};

export default connectDB;
