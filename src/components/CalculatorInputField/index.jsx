import React, { useContext } from 'react';
import Digits from './Digits';
import AllClear from './AllClear';
import Operators from './Operators';
import { ExpressionDispatchContext } from '../../contexts/ExpressionContext';

function CalculatorInputField() {
  const { handleClickAC, handleClickDigit, handleClickOperator } = useContext(
    ExpressionDispatchContext
  );

  return (
    <>
      <AllClear handleClickAC={handleClickAC} />
      <Digits handleClickDigit={handleClickDigit} />
      <Operators handleClickOperator={handleClickOperator} />
    </>
  );
}

export default CalculatorInputField;
