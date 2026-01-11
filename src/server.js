import express, { json } from 'express';

const app = express();
const PORT = 3000;

// middlewares
app.use(json());

// endpoints
app.get('/', (req, res) => {
  return res.status(200).json({ message: 'Hello World!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
