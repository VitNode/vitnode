import * as React from 'react';

interface Args {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}

export const InstallVitNodeContext = React.createContext<Args>({
  currentStep: 0,
  setCurrentStep: () => {},
});

export const useInstallVitnode = () => React.useContext(InstallVitNodeContext);
