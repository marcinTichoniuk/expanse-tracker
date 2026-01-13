import { Router } from 'express';
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
} from '../../controllers/expenseController.js';

const router = Router();

router.get('/', getAllExpenses);
router.get('/:id', getExpense);
router.post('/', createExpense);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

export default router;
