import express, { type Request, type Response } from 'express';
import { error } from 'node:console';
const router = express.Router();

export interface AuthedRequest extends Request {
  client?: { id: string; username: string; email: string };
}

router.get('/health', (req: AuthedRequest, res: Response) => {
  try {
    console.log('here')
    if (!req.client) throw new Error("client obj not present")
    res.status(200).json({
      success: true,
      message: "if here then user is logged in and can proceed with the dashboard view",
      client: req.client
    })
  } catch (err) {
    console.log(err)
  }
})

export default router;
