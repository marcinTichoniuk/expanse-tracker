import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/expanse-tracker');

    console.log('MongoDB connected');
    console.log(`Database host: ${db.connection.host}`);
    console.log(`Database name: ${db.connection.name}`);

    if (process.env.NODE_ENV === 'development') {
      mongoose.set('debug', true);
    }
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};
