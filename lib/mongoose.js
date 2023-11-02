// Programmed in Collaboration by: Dennis Russell, Lean Hansen & Frederik Barbré

import mongoose from 'mongoose';

// variable to check if we're connected to MongoDB
let isConnected = false;

export const connectToDB = async () => {
  // setting mongoose options
  mongoose.set('strict', true);

  // if MONGODB_URL is not found, log an error
  if (!process.env.MONGODB_URL) return console.log('MONGODB_URL not found');
  // if already connected, log a message
  if (isConnected) return console.log('Already connected to MongoDB');

  // try to connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    // if error, log error
    console.log(error);
  }
};
