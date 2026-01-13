import { Router } from 'express';
import { Expense } from '../../models/expenseModel.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const allExpenses = await Expense.find();

    return res.status(200).json(allExpenses);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.status(200).json(expense);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { amount, category, date, description } = req.body;

  try {
    const newExpense = await Expense.create({ amount, category, date, description });

    return res.status(201).json(newExpense);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { amount, category, date, description } = req.body;

  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      id,
      { amount, category, date, description },
      { new: true, runValidators: true }
    );

    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.status(200).json(updatedExpense);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

export default router;
