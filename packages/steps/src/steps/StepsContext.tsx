import React from "react";
import { StepsContextValue, StepsValues } from "../types";

const StepsContext = React.createContext<StepsContextValue<any>>({
  next: () => {},
  prev: () => {},
  reset: () => {},
  getAnswers: () => {},
  state: {
    currentStep: { id: "", index: 0 },
    allSteps: [],
    activeSteps: [],
    isFirstStep: true,
    isLastStep: false,
    isAnimated: true,
    isValidating: false,
    isTransitioning: false,
    isDisabled: false,
    direction: "forward",
    history: [],
  },
  form: {} as unknown as StepsContextValue["form"],
  animate: "root",
});

type StepsProviderProps<TStepsValues extends StepsValues> = {
  children: React.ReactNode;
  value: StepsContextValue<TStepsValues>;
};

/**
 * Provider component for the StepsContext.
 */
function StepsProvider<TStepsValues extends StepsValues>({
  children,
  value,
}: StepsProviderProps<TStepsValues>) {
  return (
    <StepsContext.Provider value={value}>{children}</StepsContext.Provider>
  );
}

StepsProvider.displayName = "StepsProvider";

export { StepsContext, StepsProvider };
