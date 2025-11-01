import { Operation } from './types';

export function calculateResult(leftOperand: number, operation: Operation, rightOperand: number): number {
  switch (operation) {
    case '+':
      return leftOperand + rightOperand;
    case '-':
      return leftOperand - rightOperand;
    case '*':
      return leftOperand * rightOperand;
    case '/':
      if (rightOperand === 0) {
        throw new Error('Division by zero is not allowed');
      }
      return leftOperand / rightOperand;
    default:
      throw new Error(`Unknown operation: ${operation}`);
  }
}

export function formatOperation(left: number, operation: Operation, right: number, result: number): string {
  return `${left} ${operation} ${right} = ${result}`;
}
