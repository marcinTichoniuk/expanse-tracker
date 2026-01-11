import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/expanse-tracker');

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

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error(`MongoDB disconnection error: ${error.message}`);
  }
};

// Ctrl+C
process.on('SIGINT', async () => {
  await disconnectDB();
  process.exit(0);
});

// kill command / Docker stop / Kubernetes
// process.on('SIGTERM', gracefulShutdown);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});
mongoose.connection.on('error', (error) => {
  console.error(`Mongoose connection error: ${error}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});
