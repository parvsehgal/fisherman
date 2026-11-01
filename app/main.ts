import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import express, { type Express, type Request, type Response } from 'express';
import { usersTable } from './db/schema';

const app: Express = express();
const db = drizzle(process.env.DATABASE_URL!);

app.get('/', (req: Request, res: Response) => {
  res.send('test route');
});

app.get('/testDrizzle', async (req: Request, res: Response) => {
  try {
    const user: typeof usersTable.$inferInsert = {
      name: 'John',
      email: 'john@example.com',
      passwordHash: '####'
    };
    await db.insert(usersTable).values(user);
    console.log("added a user to the DB")
    res.send('created new user successfully')
  } catch (err: any) {
    console.log(err.message)
    res.send("faced an error when creating user")
  }
});

app.listen(3000);
