import mongoose, { Schema } from 'mongoose';

// https://mongoosejs.com/docs/schematypes.html
const expenseSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: [0, 'Cannot be less than 0'],
    },
    category: {
      type: String,
      enum: {
        values: ['Grocery', 'Car', 'VOD'],
        message: '{VALUE} is not supported',
      },
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Expense = mongoose.model('Expense', expenseSchema);

// Popular model queries for CRUD
// https://mongoosejs.com/docs/queries.html

// Validation
// https://mongoosejs.com/docs/validation.html
