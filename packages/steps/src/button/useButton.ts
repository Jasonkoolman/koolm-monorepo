import { StepsButtonVisibility } from "../types";
import { useStepsContext } from "../steps/useStepsContext";
import { useButtonVisibility } from "./useButtonVisibility";

type UseButtonPropsProps = {
  show?: StepsButtonVisibility;
  hide?: StepsButtonVisibility;
};

/**
 * Returns commonly used props for navigation buttons.
 */
export function useButton({ show, hide }: UseButtonPropsProps) {
  const { next, prev, reset, state } = useStepsContext();
  const { currentStep, isLastStep, isDisabled } = state;

  const isVisible = useButtonVisibility({
    show,
    hide,
    currentStep,
    isLastStep,
  });

  return {
    next,
    prev,
    reset,
    isDisabled,
    isVisible,
  };
}
