import express, { type Request, type Response } from 'express';
const router = express.Router();
import { db } from "../db"
import { eq, or } from "drizzle-orm";
import { clientsTable } from "../db/schema"
import { clientRegister, clientLogin } from "../zodSchemas/schemas"
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (typeof JWT_SECRET != 'string') throw new Error('JWT secret strgin not found');
router.post('/register', async (req: Request, res: Response) => {
  try {
    //make sure that input is of correct type using zod
    const clientData = clientRegister.parse(req.body);
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
      const token = jwt.sign({ sub: clientResponse[0].id }, JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 7
      })
      //need to set cookie in this path
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
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

router.post('/login', async (req: Request, res: Response) => {
  try {
    //parse the body
    const clientData = clientLogin.parse(req.body);
    //check if client exists or not
    const [existingClient] = await db.select({
      id: clientsTable.id,
      username: clientsTable.name,
      email: clientsTable.email,
      passwordHash: clientsTable.passwordHash
    }).from(clientsTable).where(eq(clientsTable.email, clientData.email))
      .limit(1)
    console.log(existingClient)
    const valid = existingClient
      ? await bcrypt.compare(clientData.password, existingClient.passwordHash)
      : false;
    //if user does exist set cookie and give 200
    if (valid) {
      const token = jwt.sign({ sub: existingClient.id }, JWT_SECRET, {
        expiresIn: 60 * 60 * 24 * 7
      })
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      res.status(200).json({
        success: true,
        message: "login successfull"
      })
    } else {
      res.status(401).json({
        success: false,
        message: "incorrect password or email"
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      success: false,
      message: "server error"
    })
  }
});

export default router;
