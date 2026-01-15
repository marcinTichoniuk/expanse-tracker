import { Expense } from '../models/expenseModel.js';

export const getTotalSpendings = async (req, res) => {
  try {
    const result = await Expense.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    const total = result.length > 0 ? result[0].total : 0;

    return res.status(200).json({ total });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAllExpenses = async (req, res) => {
  try {
    const allExpenses = await Expense.find();

    return res.status(200).json(allExpenses);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.status(200).json(expense);
  } catch (error) {
    console.error(error.message);

    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const createExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;

  try {
    const newExpense = await Expense.create({ amount, category, date, description });

    return res.status(201).json(newExpense);
  } catch (error) {
    console.error(error.message);

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Mongoose Validation Error' });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const updateExpense = async (req, res) => {
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

    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Mongoose Validation Error' });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedExpense = await Expense.findByIdAndDelete(id);

    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    return res.sendStatus(204);
  } catch (error) {
    console.error(error.message);

    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid id format' });
    }

    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
