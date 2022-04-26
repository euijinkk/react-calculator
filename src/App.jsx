import './App.css';
import React, { useContext, useEffect } from 'react';
import CalculationResult from './components/CalculationResult';
import CalculatorInputField from './components/CalculatorInputField';
import { LOCAL_STORAGE_EXPRESSION_KEY } from './constants';
import useExpression from './hooks/useExpression';
import { CustomLocalStorage } from './utils/CustomLocalStorage';
import useUnload from './hooks/useUnload';
import { useBeforeunload } from './hooks/useBeforeunload';
import {
  ExpressionDispatchContext,
  ExpressionStateContext,
} from './contexts/ExpressionContext';

function App() {
  const expression = useContext(ExpressionStateContext);
  const { setExpression } = useContext(ExpressionDispatchContext);

  useEffect(() => {
    const expression = CustomLocalStorage.load(LOCAL_STORAGE_EXPRESSION_KEY);
    if (expression) {
      setExpression(expression);
    }
  }, [setExpression]);

  useBeforeunload(() => {});

  useUnload(() =>
    CustomLocalStorage.save(LOCAL_STORAGE_EXPRESSION_KEY, expression)
  );

  return (
    <div id="app">
      <div className="calculator">
        <CalculationResult />
        <CalculatorInputField />
      </div>
    </div>
  );
}

export default App;
