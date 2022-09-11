import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// getting env variables
dotenv.config();
const { URL } = process.env;
// create app
const app = express();
// middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());
// initiate server
const port = 5000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
  console.log(`Please visit ${URL as string} to run your app`);
});

app.get('/', (req, res) => {
  res.send('Hello world');
});
