'use client';

import { useState } from 'react';
import { Calculation } from '@/lib/types';
import AddCalculation from './AddCalculation';

interface CalculationNodeProps {
  calculation: Calculation;
  childCalculations: Calculation[];
  token: string | null;
  onUpdate: () => void;
  allCalculations: Calculation[];
}

export default function CalculationNode({ 
  calculation, 
  childCalculations,
  token,
  onUpdate,
  allCalculations 
}: CalculationNodeProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const isStartingNumber = !calculation.parentId;
  const hasChildren = childCalculations.length > 0;

  const getOperationDisplay = () => {
    if (isStartingNumber) {
      return (
        <div className="font-semibold text-lg text-blue-700">
          Starting Number: {calculation.result}
        </div>
      );
    }

    const parent = allCalculations.find(c => c.id === calculation.parentId);
    const leftOperand = parent ? parent.result : 0;

    return (
      <div className="font-mono text-sm">
        <span className="text-gray-600">{leftOperand}</span>{' '}
        <span className="text-purple-600 font-bold">{calculation.operation}</span>{' '}
        <span className="text-gray-600">{calculation.rightOperand}</span>{' '}
        <span className="text-gray-400">=</span>{' '}
        <span className="text-green-600 font-semibold">{calculation.result}</span>
      </div>
    );
  };

  return (
    <div className="border-l-2 border-gray-300 pl-4 ml-2">
      <div className="mb-2">
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              {getOperationDisplay()}
              <div className="text-xs text-gray-500 mt-1">
                by <span className="font-medium">{calculation.username}</span> • {' '}
                {new Date(calculation.createdAt).toLocaleString()}
              </div>
            </div>
            
            {hasChildren && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="ml-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                {isExpanded ? '▼' : '▶'} {childCalculations.length}
              </button>
            )}
          </div>

          {token && (
            <div className="mt-2">
              {!showReplyForm ? (
                <button
                  onClick={() => setShowReplyForm(true)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  + Add Response
                </button>
              ) : (
                <div className="mt-2">
                  <AddCalculation
                    parentId={calculation.id}
                    parentResult={calculation.result}
                    token={token}
                    onSuccess={() => {
                      setShowReplyForm(false);
                      onUpdate();
                    }}
                    onCancel={() => setShowReplyForm(false)}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {isExpanded && hasChildren && (
          <div className="mt-2 space-y-2">
            {childCalculations.map((child) => {
              const grandchildren = allCalculations.filter(c => c.parentId === child.id);
              return (
                <CalculationNode
                  key={child.id}
                  calculation={child}
                  childCalculations={grandchildren}
                  token={token}
                  onUpdate={onUpdate}
                  allCalculations={allCalculations}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
