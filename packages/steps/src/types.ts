import type React from "react";
import type Hook from "react-hook-form";
import type Framer from "framer-motion";

/**
 * Represents the form values across all steps.
 */
export type StepsValues = Hook.FieldValues;

/**
 * Animation configuration for step transitions.
 *
 * Allows specifying 'root' or 'child' animations or disabling animations with false.
 * When providing an object, it enables custom transition effects and variants.
 */
export type StepsAnimateConfig =
  | StepsAnimationMode
  | {
      mode: StepsAnimationMode;
      transition: StepsAnimationTransition;
      variants?: StepsAnimationVariants;
    };

/**
 * Animation variants for defining the appearance and behavior during step transitions.
 */
export type StepsAnimationVariants = {
  enter: Framer.Variant;
  center: Framer.Variant;
  exit: Framer.Variant;
};

/**
 * Transition configuration for animations.
 */
export type StepsAnimationTransition = Framer.Transition & {
  duration: number;
};

/**
 * Defines the mode of animation for step transitions.
 */
export type StepsAnimationMode = "root" | "child" | false;

/**
 * Specifies the navigation direction between steps.
 */
export type StepsDirection = "forward" | "backward";

/**
 * History of navigated steps.
 */
export type StepsHistory = StepId[];

/**
 * Unique identifier for each step.
 */
export type StepId = string;

/**
 * Defines the structure of a step element with typed form values.
 */
export type StepElement<TStepsValues extends StepsValues> = React.ReactElement<
  StepProps<TStepsValues>
>;

/**
 * Type for a field's name within the steps.
 */
export type FieldName<TStepsValues extends StepsValues = StepsValues> =
  Hook.FieldName<TStepsValues>;

/**
 * Type for a field's path within the steps.
 */
export type FieldPath<TStepsValues extends StepsValues = StepsValues> =
  Hook.FieldPath<TStepsValues>;

/**
 * Associates a field with its step for navigation and state management.
 */
export type StepsField<TStepsValues extends StepsValues = StepsValues> = {
  name: FieldName<TStepsValues>;
  stepId: StepId;
};

/**
 * Maps fields to their respective step identifiers.
 */
export type StepsFields<TStepsValues extends StepsValues = StepsValues> =
  Record<FieldName<TStepsValues>, StepId>;

/**
 * Possible results from navigation handlers, allowing for asynchronous decisions.
 */
export type StepsNavigationResult = boolean | void | Promise<boolean | void>;

/**
 * Handler for navigation events.
 */
export type StepsNavigationHandler<TStepsValues extends StepsValues> =
  (status: {
    stepId?: string;
    state: StepsState<TStepsValues>;
    form: any;
  }) => StepsNavigationResult;

/**
 * Handler for step transition events, useful for setup or teardown when entering or exiting a step.
 */
export type StepsTransitionHandler<TStepsValues extends StepsValues> = (
  currentStep: CurrentStep,
  values: TStepsValues,
) => void;

/**
 * Handler for submission of the steps form.
 */
export type StepsSubmitHandler<TStepsValues extends StepsValues> = (
  result: StepsSubmitResult<TStepsValues>,
) => void | Promise<void>;

/**
 * Result returned in the submit handler.
 */
export type StepsSubmitResult<TStepsValues extends StepsValues> = {
  answers: TStepsValues;
  values: TStepsValues;
  state: StepsState<TStepsValues>;
};

/**
 * Represents the current active step, including its index.
 */
export type CurrentStep = {
  id: StepId;
  index: number;
};

/**
 * Defines the visibility conditions for steps navigation buttons.
 *
 * - `boolean`: Directly controls visibility (true for visible, false for hidden).
 * - `string`: Interpreted as a `stepId`. The button is visible only on the matching step.
 * - `number`: Interpreted as a `stepIndex`. The button is visible only on the matching step index,
 *   with `-1` indicating visibility only on the last step.
 */
export type StepsButtonVisibility = boolean | number | string;

/**
 * Properties for navigation buttons.
 */
export type StepsButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  show?: StepsButtonVisibility;
  hide?: StepsButtonVisibility;
};

/**
 * Properties for individual step components.
 */
export type StepProps<TStepsValues extends StepsValues> =
  React.HTMLAttributes<HTMLDivElement> & {
    id: string;
    children: React.ReactNode;
    active?: ((values: TStepsValues) => boolean) | boolean;
    className?: string;
    stepRef?: React.MutableRefObject<HTMLDivElement>;
  };

/**
 * Properties for the Steps component.
 */
export type StepsProps<TStepsValues extends StepsValues> = Pick<
  React.FormHTMLAttributes<HTMLFormElement>,
  "id" | "style" | "aria-label" | "aria-describedby"
> & {
  children: StepElement<TStepsValues>[] | StepElement<TStepsValues>;
  defaultValues?: Hook.DefaultValues<TStepsValues>;
  defaultHistory?: StepsHistory;
  animate?: StepsAnimateConfig;
  disabled?: boolean;
  className?: string;
  onStepEnter?: StepsTransitionHandler<TStepsValues>;
  onStepExit?: StepsTransitionHandler<TStepsValues>;
  onBackward?: StepsNavigationHandler<TStepsValues>;
  onForward?: StepsNavigationHandler<TStepsValues>;
  onSubmit?: StepsSubmitHandler<TStepsValues>;
};

/**
 * State of the Steps component.
 */
export type StepsState<TStepsValues extends StepsValues> = {
  currentStep: CurrentStep;
  allSteps: StepElement<TStepsValues>[];
  activeSteps: StepElement<TStepsValues>[];
  isFirstStep: boolean;
  isLastStep: boolean;
  isAnimated: boolean;
  isValidating: boolean;
  isTransitioning: boolean;
  isDisabled: boolean;
  direction: StepsDirection;
  history: StepsHistory;
};

/**
 * Form handle for the Steps component.
 */
export type StepsFormHandle<TStepsValues extends StepsValues> = Pick<
  Hook.UseFormReturn<TStepsValues>,
  "control" | "watch" | "trigger" | "reset" | "getValues" | "getFieldState"
> & {
  reset: (values?: TStepsValues) => void;
  validate: () => Promise<boolean>;
  getStepFields: (stepId?: StepId) => FieldName<TStepsValues>[];
  setStepField: (field: StepsField<TStepsValues>) => void;
  defaultValues: Hook.DefaultValues<TStepsValues>;
  stepsFieldsRef: React.MutableRefObject<StepsFields<TStepsValues>>;
};

/**
 * Context value for Steps.
 */
export type StepsContextValue<TStepsValues extends StepsValues = StepsValues> =
  {
    next: (stepId?: StepId) => void;
    prev: (stepId?: StepId) => void;
    reset: () => void;
    getAnswers: () => TStepsValues;
    state: StepsState<TStepsValues>;
    form: StepsFormHandle<TStepsValues>;
    animate: StepsAnimateConfig;
  };

/**
 * Utility type for extending props of a polymorphic component, supporting custom component elements.
 */
export type PolymorphicProps<
  TProps,
  TComponent extends React.ElementType,
> = TProps & Omit<React.ComponentPropsWithoutRef<TComponent>, keyof TProps>;
