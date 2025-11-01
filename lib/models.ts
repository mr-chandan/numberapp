import mongoose, { Schema, Model } from 'mongoose';
import { User as IUser, Calculation as ICalculation } from './types';

// User Schema
const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculation Schema
const CalculationSchema = new Schema<ICalculation>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  operation: {
    type: String,
    enum: ['+', '-', '*', '/', undefined],
  },
  rightOperand: {
    type: Number,
  },
  parentId: {
    type: String,
    index: true,
  },
  result: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create indexes
CalculationSchema.index({ createdAt: 1 });
CalculationSchema.index({ parentId: 1, createdAt: 1 });

// Export models
export const UserModel: Model<IUser> = 
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export const CalculationModel: Model<ICalculation> = 
  mongoose.models.Calculation || mongoose.model<ICalculation>('Calculation', CalculationSchema);
