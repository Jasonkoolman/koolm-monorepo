import { StepsButtonVisibility, CurrentStep } from "../types";

type UseButtonVisibilityProps = {
  show?: StepsButtonVisibility;
  hide?: StepsButtonVisibility;
  currentStep: CurrentStep;
  isLastStep: boolean;
};

/**
 * Determines the visibility of a button in a multi-step form based on current step details.
 *
 * - `show`: Specifies conditions under which the button is visible.
 * - `hide`: Specifies conditions under which the button is hidden.
 *
 * Uses `currentStep` and `isLastStep` to evaluate visibility against `show` and `hide` conditions.
 *
 * @returns True if the button should be shown, false otherwise.
 */
export function useButtonVisibility({
  show,
  hide,
  currentStep,
  isLastStep,
}: UseButtonVisibilityProps): boolean {
  // Direct boolean visibility
  if (typeof show === "boolean") return show;
  if (typeof hide === "boolean") return !hide;

  // Step ID based visibility
  if (typeof show === "string") return currentStep.id === show;
  if (typeof hide === "string") return currentStep.id !== hide;

  // Step index based visibility, with special handling for last step (-1)
  const targetIndex = isLastStep ? -1 : currentStep.index;
  if (typeof show === "number") return show === targetIndex;
  if (typeof hide === "number")
    return hide !== targetIndex && !(hide === -1 && isLastStep);

  return true;
}
