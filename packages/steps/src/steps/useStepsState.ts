import { useCallback, useMemo, useReducer } from "react";
import {
  StepsValues,
  StepsDirection,
  StepsAnimateConfig,
  StepsNavigationHandler,
  StepsNavigationResult,
  StepsState,
  StepsFormHandle,
  StepId,
  StepElement,
} from "../types";
import {
  filterActiveSteps,
  findNextActiveStep,
  findPrevStep,
  getAnimationConfig,
  runPromises,
} from "../utils";

type UseStepsStateProps<TStepsValues extends StepsValues> = {
  stepElements: StepElement<TStepsValues>[];
  defaultStep?: StepId;
  animate: StepsAnimateConfig;
  disabled: boolean;
  form: StepsFormHandle<TStepsValues>;
  onForward?: StepsNavigationHandler<TStepsValues>;
  onBackward?: StepsNavigationHandler<TStepsValues>;
};

const initialState = {
  direction: "forward",
  status: "idle",
  history: [],
  activeSteps: [],
};

const stepsReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_STATUS":
      return { ...state, status: action.status };
    case "NAVIGATE":
      return {
        ...state,
        history: action.history,
        status: action.status,
        direction: action.direction,
        activeSteps: action.activeSteps ?? state.activeSteps,
      };
    case "RESET":
      return {
        ...initialState,
        direction: "backward",
        history: [action.initialStepId],
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

/**
 * Manages the state and navigation between steps in a multi-step form.
 */
export const useStepsState = <TStepsValues extends StepsValues = StepsValues>({
  stepElements,
  defaultStep,
  animate,
  disabled,
  form,
  onForward,
  onBackward,
}: UseStepsStateProps<TStepsValues>) => {
  const [inner, dispatch] = useReducer(stepsReducer, {
    ...initialState,
    history: [defaultStep || stepElements[0].props.id],
    activeSteps: filterActiveSteps(stepElements, form.getValues()),
  });

  const { isAnimated, transition } = useMemo(
    () => getAnimationConfig(animate),
    [animate],
  );

  /**
   * Computes the current step's index and ID based on the history.
   */
  const currentStep = useMemo(() => {
    const id = inner.history.at(-1) as StepId;
    const index = stepElements.findIndex((step) => step.props.id === id);
    return { index, id };
  }, [stepElements, inner.history]);

  /**
   * Representation of the state of Steps.
   */
  const state: StepsState<TStepsValues> = useMemo(
    () => ({
      currentStep,
      activeSteps: inner.activeSteps,
      allSteps: stepElements,
      isFirstStep: currentStep.id === inner.history.at(0),
      isLastStep: currentStep.id === inner.activeSteps.at(-1)?.props.id,
      isAnimated,
      isDisabled: inner.status !== "idle" || disabled,
      isTransitioning: inner.status === "transitioning",
      isValidating: inner.status === "validating",
      direction: inner.direction,
      history: inner.history,
    }),
    [inner, currentStep, stepElements, isAnimated, disabled],
  );

  /**
   * Performs asynchronous operations like form validation and permission checks.
   *
   * Accepts an arbitrary number of check functions that return promises, executing them sequentially.
   * Each check is awaited in turn, and if any check returns `false`, the function early returns `false` to indicate failure.
   * It manages the `isValidating` state to reflect ongoing validation or permission checks.
   *
   * @param checks An array of functions that return promises, representing the checks to be performed.
   */
  const runChecks = useCallback(
    async (checks: (() => Promise<StepsNavigationResult>)[]) => {
      try {
        return await runPromises(checks);
      } catch (error) {
        console.error("Error during navigation checks:", error);
        return false;
      }
    },
    [],
  );

  /**
   * Navigates to the specified step.
   *
   * This function initiates a navigation action to a given step ID, handling the direction of the navigation
   * and managing the transition state. It updates the step navigation history depending on the direction.
   *
   * @param stepId The targeted step's identifier.
   * @param newDirection Indicates the navigation direction.
   */
  const goto = useCallback(
    (
      stepId: StepId,
      newDirection: StepsDirection = "forward",
      newActiveSteps?: any,
    ) => {
      let newHistory = state.history;

      if (newDirection === "backward") {
        // Set history up to and including the specified step if it exists
        const index = state.history.indexOf(stepId);
        if (index !== -1) {
          newHistory = state.history.slice(0, index + 1);
        }
      } else if (!state.history.includes(stepId)) {
        // Add new step to history if it's not already present
        newHistory = [...state.history, stepId];
      }

      dispatch({
        type: "NAVIGATE",
        history: newHistory,
        status: isAnimated ? "transitioning" : "idle",
        direction: newDirection,
        activeSteps: newActiveSteps,
      });

      if (isAnimated) {
        setTimeout(
          () => dispatch({ type: "SET_STATUS", status: "idle" }),
          transition.duration * 1000,
        );
      }
    },
    [state, isAnimated, transition],
  );

  /**
   * Validates and navigates to the next or a specified step.
   *
   * Conducts form validation and permission checks through `performChecks` before navigating forward.
   * If checks pass, navigates to the next available step in the active steps array or directly to a specified step.
   *
   * @param stepId Optional. Directly navigate to the specified step ID.
   */
  const next = useCallback(
    async (stepId?: StepId) => {
      if (state.isDisabled) return;

      dispatch({ type: "SET_STATUS", status: "validating" });

      const canProceed = await runChecks([
        async () => form.validate(),
        async () => onForward?.({ stepId, state, form }),
      ]);

      if (!canProceed) {
        dispatch({ type: "SET_STATUS", status: "idle" });
        return;
      }

      const activeSteps = filterActiveSteps(stepElements, form.getValues());
      const nextStepId = findNextActiveStep(
        activeSteps,
        currentStep.id,
        stepId,
      );

      if (nextStepId) {
        goto(nextStepId, "forward", activeSteps);
      }
    },
    [state, form, runChecks, onForward, goto],
  );

  /**
   * Navigates to a previous step in the history.
   *
   * Before navigating back, it optionally performs custom permission checks through `onBackward`.
   * It ensures that navigation only proceeds if not on the first step and if `onBackward` checks pass.
   * Form validation is not performed when navigating back.
   *
   * @param stepId Optional. Directly navigate back to the specified step ID.
   */
  const prev = useCallback(
    async (stepId?: StepId) => {
      if (state.isDisabled || state.history.length <= 1) return;

      if (onBackward) {
        dispatch({ type: "SET_STATUS", status: "validating" });
      }

      const canProceed = await runChecks([
        async () => onBackward?.({ stepId, state, form }),
      ]);

      if (!canProceed) {
        dispatch({ type: "SET_STATUS", status: "idle" });
        return;
      }

      const targetStepId = findPrevStep(state.history, stepId);

      if (targetStepId) {
        goto(targetStepId, "backward");
      }
    },
    [state, form, goto],
  );

  /**
   * Reset steps.
   *
   * Resets the state of steps and its form.
   */
  const reset = useCallback(async () => {
    const initialStepId = defaultStep || stepElements[0].props.id;
    dispatch({ type: "RESET", initialStepId });
    // Default values must be provided (see https://github.com/orgs/react-hook-form/discussions/7589)
    form.reset(form.defaultValues);
  }, [form]);

  return {
    next,
    prev,
    reset,
    state,
  };
};
