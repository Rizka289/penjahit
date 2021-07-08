import React, { useReducer } from 'react';
import OrderReducer from './OrderReducer';
import OrderContext from './OrderContext';
import { UPDATE_CURRENT_STEP, SET_STEPS } from './types';

const StepsState = ({ children }) => {
  const initialState = {
    steps: [],
    currentStepIndex: 0,
  };
  const [state, dispatch] = useReducer(OrderReducer, initialState);
  const setSteps = (steps) => {
    dispatch({
      type: SET_STEPS,
      payload: steps,
    });
  };
  const setCurrentStep = (index) => {
    dispatch({
      type: UPDATE_CURRENT_STEP,
      payload: index,
    });
  };
  return (
    <OrderContext.Provider
      value={{
        steps: state.steps,
        currentStepIndex: state.currentStepIndex,
        setSteps,
        setCurrentStep,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default StepsState;