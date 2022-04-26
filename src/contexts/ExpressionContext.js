import { createContext, useState } from 'react';
import {
  ERROR_MESSAGE,
  INFINITY_CASE_TEXT,
  MAX_NUMBER_LENGTH,
} from '../constants';

const calculateExpression = (prevNumber, operator, nextNumber) => {
  const num1 = Number(prevNumber);
  const num2 = Number(nextNumber);

  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'X':
      return num1 * num2;
    case '/':
      return num2 === 0 ? INFINITY_CASE_TEXT : Number.parseInt(num1 / num2);
    default:
      alert(ERROR_MESSAGE.STRANGE_OPERATOR(operator));
  }
};

const initialExpression = {
  prevNumber: '',
  operator: '',
  nextNumber: '',
};

const ExpressionStateContext = createContext(null);
const ExpressionDispatchContext = createContext(null);

const ExpressionProvider = ({ children }) => {
  const [expression, setExpression] = useState(initialExpression);

  const handleClickAC = () => {
    setExpression(initialExpression);
  };

  const handleClickDigit = ({ target: { textContent: selectedDigit } }) => {
    if (expression.prevNumber === INFINITY_CASE_TEXT) {
      setExpression((prevState) => ({
        ...prevState,
        prevNumber: selectedDigit,
      }));
      return;
    }

    updateNumber(
      expression.operator ? 'nextNumber' : 'prevNumber',
      selectedDigit
    );
  };

  const updateNumber = (numberKey, selectedDigit) => {
    if (expression[numberKey].length >= MAX_NUMBER_LENGTH) {
      alert(ERROR_MESSAGE.EXCEED_MAX_NUMBER_LENGTH);
      return;
    }
    setExpression((prevState) => ({
      ...prevState,
      [numberKey]: prevState[numberKey] + selectedDigit,
    }));
  };

  const handleClickOperator = ({
    target: { textContent: selectedOperator },
  }) => {
    const { prevNumber, operator } = expression;

    if (prevNumber === INFINITY_CASE_TEXT) return;

    const pattern = {
      equal_calculate: {
        case: selectedOperator === '=' && operator,
        func() {
          setExpression((prevState) => ({
            ...initialExpression,
            prevNumber: calculateExpression(
              prevState.prevNumber,
              prevState.operator,
              prevState.nextNumber
            ),
          }));
        },
      },
      add_operator: {
        case: selectedOperator !== '=' && !operator,
        func() {
          setExpression((prevState) => ({
            ...prevState,
            operator: selectedOperator,
          }));
        },
      },
      over_two_operator: {
        case: selectedOperator !== '=' && operator,
        func() {
          alert(ERROR_MESSAGE.ALLOW_ONE_OPERATOR);
        },
      },
      other: {
        case: true,
        func() {},
      },
    };

    const currentCase = Object.keys(pattern).find((key) => pattern[key].case);
    pattern[currentCase].func();
  };

  return (
    <ExpressionDispatchContext.Provider
      value={{
        setExpression,
        handleClickAC,
        handleClickDigit,
        handleClickOperator,
      }}
    >
      <ExpressionStateContext.Provider value={expression}>
        {children}
      </ExpressionStateContext.Provider>
    </ExpressionDispatchContext.Provider>
  );
};

export {
  ExpressionProvider,
  ExpressionStateContext,
  ExpressionDispatchContext,
};
