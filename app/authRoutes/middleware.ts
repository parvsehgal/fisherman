import { type Request, type Response, type NextFunction } from 'express';
import { db } from "../db"
import { eq } from "drizzle-orm";
import { clientsTable } from "../db/schema"
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET
if (typeof JWT_SECRET != 'string') throw new Error('JWT secret strgin not found');

export interface AuthedRequest extends Request {
  client?: { id: string; username: string; email: string };
}
export async function loginStatus(req: AuthedRequest, res: Response, next: NextFunction) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ success: false, message: "Please sign in." });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET!, { algorithms: ["HS256"] });
    const id = String(decoded.sub);

    const [client] = await db
      .select({
        id: clientsTable.id,
        username: clientsTable.name,
        email: clientsTable.email,
      })
      .from(clientsTable)
      .where(eq(clientsTable.id, id))
      .limit(1);

    if (!client) {
      return res.status(401).json({ success: false, message: "Please sign in." });
    }

    req.client = client;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Please sign in." });
  }
}
