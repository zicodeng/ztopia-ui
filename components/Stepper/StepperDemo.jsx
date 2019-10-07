import { useState } from 'react';

export const StepperDemo = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const finish = () => {
    setIsFinished(true);
  };
  return children({ isFinished, currentStep, prevStep, nextStep, finish });
};
