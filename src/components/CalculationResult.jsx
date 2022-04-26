import React, { useContext } from 'react';
import { ExpressionStateContext } from '../contexts/ExpressionContext';

function CalculationResult() {
  const expression = useContext(ExpressionStateContext);
  const { prevNumber, operator, nextNumber } = expression;

  return <h1 id="total">{prevNumber + operator + nextNumber || '0'}</h1>;
}

export default CalculationResult;
