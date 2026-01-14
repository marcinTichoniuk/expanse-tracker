import { Router } from 'express';
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
} from '../../controllers/expenseController.js';
import { createExpenseSchema, expenseIdSchema, updateExpenseSchema } from '../../schemas/expenseSchema.js';
import { inputValidationMiddleware } from '../../middlewares/inputValidationMiddleware.js';

const router = Router();

router.get('/', getAllExpenses);
router.get('/:id', inputValidationMiddleware('params', expenseIdSchema), getExpense);
router.post('/', inputValidationMiddleware('body', createExpenseSchema), createExpense);
router.put(
  '/:id',
  inputValidationMiddleware('params', expenseIdSchema),
  inputValidationMiddleware('body', updateExpenseSchema),
  updateExpense
);
router.delete('/:id', inputValidationMiddleware('params', expenseIdSchema), deleteExpense);

export default router;
