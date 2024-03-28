import { useContext } from "react";
import { StepsContextValue, StepsValues } from "../types";
import { StepsContext } from "./StepsContext";

/**
 * A hook for consuming the Steps context.
 *
 * Provides access to the steps navigation and state management functionalities.
 */
export const useStepsContext = <
  TStepsValues extends StepsValues = StepsValues
>() => {
  const context = useContext(StepsContext) as StepsContextValue<TStepsValues>;

  if (!context) {
    throw new Error("useStepsContext must be used within a StepsProvider");
  }

  return context;
};
