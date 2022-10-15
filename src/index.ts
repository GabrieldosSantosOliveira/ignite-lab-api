import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import { routerAuth } from './routes/auth';
import { routerUser } from './routes/user';
config();
const port = process.env.PORT || 3000;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(routerAuth);
app.use(routerUser);
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
