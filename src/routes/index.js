import { Router } from 'express';
import expenseRouter from './expenseRoutes/expenseRoutes.js';

const router = Router();

router.use('/expense', expenseRouter);

export default router;
