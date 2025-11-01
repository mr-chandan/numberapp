'use client';

import { useState } from 'react';
import { Operation } from '@/lib/types';

interface AddCalculationProps {
  parentId?: string;
  parentResult?: number;
  token: string;
  onSuccess: () => void;
  onCancel?: () => void;
}

export default function AddCalculation({ 
  parentId, 
  parentResult, 
  token, 
  onSuccess,
  onCancel 
}: AddCalculationProps) {
  const [rightOperand, setRightOperand] = useState('');
  const [operation, setOperation] = useState<Operation>('+');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const isStartingNumber = !parentId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const value = parseFloat(rightOperand);
      if (isNaN(value)) {
        setError('Please enter a valid number');
        setLoading(false);
        return;
      }

      const body = isStartingNumber
        ? { value }
        : { value, operation, rightOperand: value, parentId };

      const response = await fetch('/api/calculations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data.success) {
        setRightOperand('');
        onSuccess();
      } else {
        setError(data.message || 'Failed to create calculation');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-md border border-gray-200">
      <div className="space-y-3">
        {!isStartingNumber && parentResult !== undefined && (
          <div className="text-sm text-gray-600">
            Current value: <span className="font-semibold">{parentResult}</span>
          </div>
        )}

        {!isStartingNumber && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Operation
            </label>
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value as Operation)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="+">+ Addition</option>
              <option value="-">- Subtraction</option>
              <option value="*">× Multiplication</option>
              <option value="/">÷ Division</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {isStartingNumber ? 'Starting Number' : 'Right Operand'}
          </label>
          <input
            type="number"
            step="any"
            value={rightOperand}
            onChange={(e) => setRightOperand(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder={isStartingNumber ? 'Enter a number' : 'Enter number'}
            required
          />
        </div>

        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {loading ? 'Adding...' : (isStartingNumber ? 'Start Discussion' : 'Add Response')}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors text-sm"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
