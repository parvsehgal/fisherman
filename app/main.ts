import express, { type Express, type Request, type Response } from 'express';
import auth from './authRoutes/auth'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app: Express = express();

app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", // must be a specific origin, not "*"
  credentials: true,
}));

app.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});

app.use(express.json())
app.use('/auth', auth)

app.listen(3000, () => {
  console.log('server started')
});
