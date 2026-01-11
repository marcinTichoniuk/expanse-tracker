import express, { json } from 'express';

const app = express();
const PORT = 3000;

// middlewares
app.use(json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
