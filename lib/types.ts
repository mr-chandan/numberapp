export type Operation = '+' | '-' | '*' | '/';

export interface User {
  _id?: string;
  id?: string;
  username: string;
  passwordHash: string;
  createdAt: Date;
}

export interface Calculation {
  _id?: string;
  id?: string;
  userId: string;
  username: string;
  value: number;
  operation?: Operation;
  rightOperand?: number;
  parentId?: string;
  createdAt: Date;
  result: number;
}

export interface CreateCalculationRequest {
  value: number;
  operation?: Operation;
  rightOperand?: number;
  parentId?: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}

export interface CalculationsResponse {
  success: boolean;
  calculations?: Calculation[];
  message?: string;
}
