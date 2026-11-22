import express, { type Express, type Request, type Response } from 'express';
import auth from './authRoutes/auth'
import dashboard from './dashboardRoutes/dashboard'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import { loginStatus } from './authRoutes/middleware';

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
app.use('/dashboard', loginStatus, dashboard)

app.listen(3000, () => {
  console.log('server started')
});
