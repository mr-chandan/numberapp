'use client';

import { Calculation } from '@/lib/types';
import CalculationNode from './CalculationNode';

interface CalculationTreeProps {
  calculations: Calculation[];
  token: string | null;
  onUpdate: () => void;
}

export default function CalculationTree({ calculations, token, onUpdate }: CalculationTreeProps) {
  // Get root calculations (those without a parent)
  const rootCalculations = calculations.filter(calc => !calc.parentId);

  if (calculations.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No discussions yet.</p>
        <p className="text-sm mt-2">
          {token 
            ? 'Start a new discussion by adding a starting number below!' 
            : 'Login to start a new discussion.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {rootCalculations.map((root) => {
        const childCalcs = calculations.filter(calc => calc.parentId === root.id);
        return (
          <CalculationNode
            key={root.id}
            calculation={root}
            childCalculations={childCalcs}
            token={token}
            onUpdate={onUpdate}
            allCalculations={calculations}
          />
        );
      })}
    </div>
  );
}
