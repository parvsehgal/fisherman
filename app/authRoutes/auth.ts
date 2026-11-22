import express, { type Request, type Response, type NextFunction } from 'express';
const router = express.Router();
import { db } from "../db"
import { eq, or } from "drizzle-orm";
import { clientsTable } from "../db/schema"
import { client } from "../zodSchemas/schemas"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

router.post('/register', async (req: Request, res: Response) => {
  try {
    //make sure that input is of correct type using zod
    const clientData = client.parse(req.body);
    //check if a user already exists
    const { username, email, password } = clientData
    const existingClient = await db.select({
      username: clientsTable.name,
      email: clientsTable.email
    }).from(clientsTable).where(or(eq(clientsTable.email, email), eq(clientsTable.name, username)))
      .limit(1)
    if (existingClient.length > 0) {
      console.log("client already exists with this username/email")
      res.status(500).json({
        success: false,
        message: "client already exists with this username/email"
      })
    } else {
      //create the new user
      const passwordHash = await bcrypt.hash(password, 12)
      const clientResponse = await db.insert(clientsTable).values({ name: username, email, passwordHash }).returning({ id: clientsTable.id, username: clientsTable.name });
      console.log("below client clreated")
      console.log(clientResponse)
      //now return a jwt token as well
      const JWT_SECRET = process.env.JWT_SECRET
      console.log(JWT_SECRET)
      if (typeof JWT_SECRET != 'string') throw new Error('JWT secret strgin not found');
      const token = jwt.sign({ sub: clientResponse[0].id }, JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 7
      })
      //need to set cookie in this path
      res.cookie('token', token, {
        httpOnly: true,
      })
      res.status(200).json({
        success: true,
        message: "client created"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "some error occured"
    })
  }
});

router.get('/login', (req: Request, res: Response) => {
  res.send('user logged in');
});

export default router;
