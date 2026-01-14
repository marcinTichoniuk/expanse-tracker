import z from 'zod';

export const expenseIdSchema = z.object({
  id: z.string().length(24, { error: 'id must be exactly 24 characters' }),
});

export const createExpenseSchema = z.object({
  amount: z.number().min(0, { error: 'Cannot be less than 0' }),
  category: z.enum(['Grocery', 'Car', 'VOD'], { error: 'Category is not supported' }),
  date: z.coerce.date().optional(),
  description: z.string().trim().max(200, { error: 'Max 200 characters' }).optional(),
});

export const updateExpenseSchema = createExpenseSchema.partial().refine((data) => Object.keys(data).length > 0, {
  error: 'At least one attribute is required',
});
