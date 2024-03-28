import { useCallback, useMemo } from "react";
import { FormProvider } from "react-hook-form";
import { useStepsForm } from "./useStepsForm";
import { useStepsState } from "./useStepsState";
import { StepsForm } from "./StepsForm";
import { StepsOutlet } from "./StepsOutlet";
import { StepsProvider } from "./StepsContext";
import { StepsContextValue, StepsProps, StepsValues } from "../types";
import {
  classNames,
  getStepsElements,
  getRelevantValues,
  focusFirstFocusableElement,
} from "../utils";

/**
 * The `Steps` component orchestrates the multi-step form process. It manages
 * form state, step transitions, and user interactions to progress through
 * a series of form steps.
 *
 * @param props.children - The step components that form the multi-step process.
 * @param props.defaultValues - Default form values.
 * @param props.defaultStep - The ID of the initial step to display.
 * @param props.animate - Configures the animation for step transitions.
 * @param props.disabled - Disables all interactions when true.
 * @param props.className - Additional CSS classes for the form.
 * @param props.onStepEnter - Callback invoked when a new step is mounted.
 * @param props.onStepExit - Callback invoked when unmounting a step.
 * @param props.onBackward - Callback invoked when moving back to a previous step.
 * @param props.onForward - Callback invoked when moving forward to the next step.
 * @param props.onSubmit - Callback invoked when the form is submitted.
 */
function Steps<TStepsValues extends StepsValues = StepsValues>({
  children,
  defaultValues,
  defaultStep,
  animate = "root",
  disabled = false,
  className,
  onStepEnter,
  onStepExit,
  onBackward,
  onForward,
  onSubmit,
  ...rest
}: StepsProps<TStepsValues>) {
  const { formRef, form, methods } = useStepsForm<TStepsValues>({
    defaultValues,
    disabled,
  });

  const { stepElements, layoutElements } = useMemo(
    () => getStepsElements<TStepsValues>(children),
    [children]
  );

  const { next, prev, reset, state } = useStepsState<TStepsValues>({
    stepElements,
    defaultStep,
    disabled,
    animate,
    form,
    onForward,
    onBackward,
  });

  const { currentStep, history } = state;

  /**
   * Returns the form values that belong to steps in the step history.
   */
  const getAnswers = useCallback(
    () =>
      getRelevantValues(form.getValues(), history, form.stepsFieldsRef.current),
    [form, history]
  );

  /**
   * Handles submission of the steps form.
   */
  const onValidSubmit = useCallback(
    (values: TStepsValues) => {
      const answers = getAnswers();
      onSubmit?.({ answers, values, state });
    },
    [onSubmit, getAnswers, state]
  );

  /**
   * Manages transitions between steps.
   */
  const onTransition = useCallback(() => {
    const values = form.getValues();
    methods.reset(values, { keepValues: true });
    onStepExit?.(currentStep, values);
    setTimeout(() => {
      focusFirstFocusableElement(formRef.current as HTMLElement);
      onStepEnter?.(currentStep, values);
    }, 0);
  }, [onStepExit, onStepEnter, methods.reset, currentStep]);

  const contextValue: StepsContextValue<TStepsValues> = useMemo(
    () => ({
      next,
      prev,
      form,
      state,
      animate,
      getAnswers,
      reset,
    }),
    [next, prev, form, state, animate, getAnswers]
  );

  return (
    <FormProvider {...methods}>
      <StepsProvider<TStepsValues> value={contextValue}>
        <StepsForm
          {...rest}
          formRef={formRef}
          className={classNames("steps", className)}
          onSubmit={methods.handleSubmit(onValidSubmit)}
        >
          <StepsOutlet
            id={currentStep.id}
            element={stepElements[currentStep.index]}
            animate={animate}
            onTransition={onTransition}
          />
          {layoutElements}
        </StepsForm>
      </StepsProvider>
    </FormProvider>
  );
}

Steps.displayName = "Steps";

export { Steps };
