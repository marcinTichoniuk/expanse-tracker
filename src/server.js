import express, { json } from 'express';
import { connectDB } from './db/dbConfig.js';
import { envConfig } from './configs/envConfig.js';
import router from './routes/index.js';
import { notFoundMiddleware } from './middlewares/notFoundMiddleware.js';

const app = express();
const PORT = envConfig.PORT;

// middlewares
app.use(json());

// endpoints
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});

// routes
app.use('/api/v1', router);

app.use(notFoundMiddleware);

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

// Additional things to check:
// - add Category model

/*
Your Phase 1 Checklist (for each project):
1. Set up Express server - basic server that runs
2. Connect to MongoDB - using mongoose, connection string in .env
3. Create mongoose schema/model - define your data structure
4. Build CRUD routes:
    POST - create new item
    GET - fetch all items / single item by ID
    PUT/PATCH - update item
    DELETE - delete item
5. Basic input validation - check required fields, data types (use express-validator or Zod)
6. Basic error handling - try/catch blocks, send proper status codes (200, 201, 400, 404, 500)
7. Test with Postman/Thunder Client - make sure all routes work
*/
