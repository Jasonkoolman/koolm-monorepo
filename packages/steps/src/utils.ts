import {
  ReactElement,
  Children,
  FunctionComponent,
  isValidElement,
} from "react";
import { FieldValues, get } from "react-hook-form";
import {
  StepsValues,
  StepElement,
  FieldName,
  StepId,
  StepsAnimateConfig,
  StepsAnimationTransition,
  CurrentStep,
  StepsButtonVisibility,
} from "./types";

/**
 * Retrieves a component's display name.
 *
 * This function attempts to find a display name for a React component,
 * which can be used for identifying components of a specific type, such as 'Step'.
 */
export function getComponentDisplayName(element: ReactElement) {
  const type = element.type;
  const displayName =
    typeof type === "string"
      ? type
      : (type as FunctionComponent).displayName ||
        (type as FunctionComponent).name ||
        "Unknown";
  return displayName;
}

/**
 * Focuses the first focusable element within a given container.
 *
 * This function searches for focusable elements including buttons, inputs,
 * selects, textareas, and elements with a tabindex that is not -1. It then
 * focuses the first match found, if any.
 */
export function focusFirstFocusableElement(container: HTMLElement | null) {
  if (!container) return;

  const focusableElement = container.querySelector<HTMLElement>(
    'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  focusableElement?.focus();
}

/**
 * Extracts and filters steps from children.
 *
 * Iterates over React children, categorizing them into all steps, active steps based on the 'active' prop, and non-step elements.
 *
 * @param children The children components to process.
 * @param getValues Function returning current form values to evaluate active steps.
 * @returns Object containing categorized steps and elements.
 */
export function getStepsElements<
  TStepsValues extends StepsValues = StepsValues,
>(children: React.ReactNode) {
  const stepElements: StepElement<TStepsValues>[] = [];
  const layoutElements: React.ReactNode[] = [];

  Children.forEach(children, (child) => {
    if (isValidElement(child) && getComponentDisplayName(child) === "Step") {
      stepElements.push(child as StepElement<TStepsValues>);
    } else {
      layoutElements.push(child);
    }
  });

  return { stepElements, layoutElements };
}

/**
 * Filters steps to include only those considered active.
 * Active status is determined by the step's 'active' prop, which can be a boolean or a function returning a boolean.
 *
 * @param steps - The list of step elements to filter.
 * @param values - The current form values, for evaluating the 'active' prop functions.
 * @returns A filtered list of active step elements.
 */
export function filterActiveSteps<TStepsValues extends StepsValues>(
  steps: StepElement<TStepsValues>[],
  values: TStepsValues
) {
  return steps.filter((step) => {
    return typeof step.props.active === "function"
      ? step.props.active(values)
      : step.props.active !== false;
  });
}

/**
 * Finds the ID of the next active step based on current conditions.
 * If nextStepId is provided, it validates its activity; otherwise, it finds the next active step in sequence.
 *
 * @param activeSteps - List of currently active steps.
 * @param currentStepId - ID of the current step.
 * @param nextStepId - Optionally, the ID of a specific next step.
 * @returns The ID of the next active step, or null if not found.
 */
export function findNextActiveStep<TStepsValues extends StepsValues>(
  activeSteps: StepElement<TStepsValues>[],
  currentStepId: StepId,
  nextStepId?: StepId
): StepId | null {
  let nextActiveStep = nextStepId
    ? activeSteps.find((step) => step.props.id === nextStepId)
    : activeSteps[
        activeSteps.findIndex((step) => step.props.id === currentStepId) + 1
      ];

  return nextActiveStep ? nextActiveStep.props.id : null;
}

/**
 * Finds the previous step ID in the history.
 *
 * @param history The history array of step IDs.
 * @param stepId The step ID to navigate to, if specified.
 * @returns The target step ID.
 */
export function findPrevStep(history: StepId[], stepId?: StepId) {
  let targetStepId = history.at(-2); // Default to the previously visited step

  if (stepId) {
    const targetIndex = history.indexOf(stepId);
    if (targetIndex !== -1) {
      targetStepId = stepId;
    }
  }

  return targetStepId;
}

/**
 * Extracts animation configuration from the provided animate prop.
 *
 * @param animate - The animate prop which can be a simple mode or detailed configuration.
 * @returns An object containing isAnimated, mode, and transition configuration.
 */
export function getAnimationConfig(
  animate: StepsAnimateConfig,
  defaultTransition: StepsAnimationTransition = {
    ease: "easeOut",
    duration: 0.4,
  }
) {
  let result;

  if (typeof animate === "object") {
    result = {
      isAnimated: animate.mode !== false,
      mode: animate.mode,
      transition: animate.transition || defaultTransition,
    };
  } else {
    result = {
      isAnimated: animate !== false,
      mode: animate,
      transition: defaultTransition,
    };
  }

  if (!result.isAnimated) {
    result.transition.duration = 0;
    result.transition.type = false;
  }

  return result;
}

/**
 * Filters form values based on the step history.
 *
 * @param formValues - An object containing all submitted form values.
 * @param stepsHistory - An array of step IDs indicating the history of steps flowed through.
 * @param stepsFields - A mapping from field names to their corresponding step ID.
 * @returns An object containing only the form values that belong to steps in the step history.
 */
export function getRelevantValues<
  TStepsValues extends FieldValues = FieldValues,
>(
  formValues: TStepsValues,
  stepsHistory: string[],
  stepsFields: Record<FieldName, StepId>
) {
  const relevantSteps = new Set(stepsHistory);
  const filteredValues: Record<FieldName, TStepsValues> = {};

  // Iterate over each field in the form values
  Object.keys(formValues).forEach((fieldName) => {
    const stepId = get(stepsFields, fieldName);
    // If the field's step is in the history, keep it
    if (relevantSteps.has(stepId)) {
      filteredValues[fieldName] = formValues[fieldName];
    }
  });

  return filteredValues as TStepsValues;
}

/**
 * Determines the visibility of an element in a multi-step form based on current step details.
 *
 * @param show Specifies conditions under which the button is visible.
 * @param hide Specifies conditions under which the button is hidden.
 * @param currentStep The current step of the form.
 * @param isLastStep A boolean indicating if the current step is the last step.
 * @returns True if the button should be shown, false otherwise.
 */
export function determineVisibility({
  show,
  hide,
  currentStep,
  isLastStep,
}: {
  show?: StepsButtonVisibility;
  hide?: StepsButtonVisibility;
  currentStep: CurrentStep;
  isLastStep: boolean;
}): boolean {
  // Direct boolean visibility
  if (typeof show === "boolean") return show;
  if (typeof hide === "boolean") return !hide;

  // Step ID based visibility
  if (typeof show === "string") return currentStep.id === show;
  if (typeof hide === "string") return currentStep.id !== hide;

  // Step index based visibility with special handling for last step (-1)
  let targetIndex = currentStep.index;
  if (isLastStep) targetIndex = -1;

  if (typeof show === "number") return show === targetIndex;
  if (typeof hide === "number") return hide !== targetIndex;

  return true;
}

/**
 * Combines one or more class names.
 */
export function classNames(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/**
 * Sequentially runs an array of functions that return promises.
 * Stops and returns `false` if any promise resolves to `false`.
 *
 * @param checks An array of functions that return promises.
 * @returns A promise that resolves to `true` if all checks pass, otherwise `false`.
 */
export async function runPromises(
  checks: (() => Promise<unknown> | unknown)[]
): Promise<boolean> {
  for (const check of checks) {
    const result = await check();
    if (result === false) {
      return false;
    }
  }
  return true;
}
