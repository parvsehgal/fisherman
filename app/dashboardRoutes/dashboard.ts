import express, { type Request, type Response } from 'express';
const router = express.Router();

router.get('/health', (req: Request, res: Response) => {
  console.log('here')
  res.status(200).json({
    success: true,
    message: "if here then user is logged in and can proceed with the dashboard view"
  })
})

export default router;
