import express, { type Request, type Response, type NextFunction } from 'express';
const router = express.Router();
import { db } from "../db"
import { clientsTable } from "../db/schema"

router.post('/register', async (req: Request, res: Response) => {
  //get client details from request
  //save that to DB and return a token to the browser
  const { email, password } = req.body
  console.log(req.body)
  res.send('user registered');
});

router.get('/login', (req: Request, res: Response) => {
  res.send('user logged in');
});

export default router;
