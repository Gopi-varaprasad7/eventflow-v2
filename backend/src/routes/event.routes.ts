import { Router } from 'express';
import { createEvent } from '../controllers/event.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = Router();

router.post('/create', authMiddleware, createEvent);

export default router;
