import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { CalculationModel } from '@/lib/models';
import { getAuthUser } from '@/lib/auth';
import { calculateResult } from '@/lib/utils';

// GET - Retrieve all calculations
export async function GET() {
  try {
    await connectDB();
    
    const calculations = await CalculationModel.find({})
      .sort({ createdAt: 1 })
      .lean();
    
    // Convert _id to id for frontend compatibility
    const formattedCalculations = calculations.map(calc => ({
      ...calc,
      id: calc._id.toString(),
      _id: undefined,
    }));

    return NextResponse.json({
      success: true,
      calculations: formattedCalculations,
    });
  } catch (error) {
    console.error('Get calculations error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new calculation
export async function POST(request: Request) {
  try {
    // Check authentication
    const authUser = getAuthUser(request);
    if (!authUser) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      );
    }

    await connectDB();

    const body = await request.json();
    const { value, operation, rightOperand, parentId } = body;

    // Validate input
    if (typeof value !== 'number') {
      return NextResponse.json(
        { success: false, message: 'Value must be a number' },
        { status: 400 }
      );
    }

    // If this is a starting number (no parent and no operation)
    if (!parentId && !operation) {
      const calculation = await CalculationModel.create({
        userId: authUser.userId,
        username: authUser.username,
        value,
        result: value,
        createdAt: new Date(),
      });

      return NextResponse.json({
        success: true,
        calculation: {
          ...calculation.toObject(),
          id: calculation._id.toString(),
          _id: undefined,
        },
      });
    }

    // If this is an operation on a parent calculation
    if (parentId && operation && typeof rightOperand === 'number') {
      // Get parent calculation
      const parent = await CalculationModel.findById(parentId);
      if (!parent) {
        return NextResponse.json(
          { success: false, message: 'Parent calculation not found' },
          { status: 404 }
        );
      }

      // Validate operation
      if (!['+', '-', '*', '/'].includes(operation)) {
        return NextResponse.json(
          { success: false, message: 'Invalid operation' },
          { status: 400 }
        );
      }

      // Calculate result
      let result: number;
      try {
        result = calculateResult(parent.result, operation, rightOperand);
      } catch (error) {
        return NextResponse.json(
          { success: false, message: (error as Error).message },
          { status: 400 }
        );
      }

      const calculation = await CalculationModel.create({
        userId: authUser.userId,
        username: authUser.username,
        value,
        operation,
        rightOperand,
        parentId,
        result,
        createdAt: new Date(),
      });

      return NextResponse.json({
        success: true,
        calculation: {
          ...calculation.toObject(),
          id: calculation._id.toString(),
          _id: undefined,
        },
      });
    }

    // Invalid request
    return NextResponse.json(
      { success: false, message: 'Invalid calculation request' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Create calculation error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
