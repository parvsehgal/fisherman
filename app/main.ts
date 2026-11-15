import express, { type Express, type Request, type Response } from 'express';
import auth from './authRoutes/auth'
import cors from 'cors'

const app: Express = express();

app.get('/', (req: Request, res: Response) => {
  res.send('server is running');
});

app.use(cors())
app.use(express.json())
app.use('/auth', auth)

app.listen(3000, () => {
  console.log('server started')
});
