import 'dotenv/config'
import cors from 'cors';
import express from "express";

const app = express();

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, () =>
  console.log(`Listening on port ${PORT}!`),
);