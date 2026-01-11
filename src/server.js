import express, { json } from 'express';
import { connectDB } from './db/dbConfig.js';

const app = express();
const PORT = 3000;

// middlewares
app.use(json());

// endpoints
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});

// start server
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (error) {
    console.error(`Failed to start the server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
