import React from "react";
import { useStepsContext } from "../steps/useStepsContext";
import { PolymorphicProps } from "../types";

type StepFieldProps<TComponent extends React.ElementType> = PolymorphicProps<
  {
    as?: TComponent;
    name: string;
    children?: React.ReactNode;
  },
  TComponent
>;

/**
 * Field component that registers itself to the current step, supporting custom field components.
 *
 * @param props.as - The component type that this field should render as.
 * @param props.name - The name of the form field.
 */
function StepField<TComponent extends React.ElementType>({
  as,
  name,
  ...props
}: StepFieldProps<TComponent>) {
  const {
    state: { currentStep },
    form: { setStepField },
  } = useStepsContext();

  const stepId = React.useRef(currentStep.id);
  const Component = as || "input";

  React.useEffect(() => {
    setStepField({ name, stepId: stepId.current });
  }, [name, setStepField]);

  return <Component name={name} {...props} />;
}

StepField.displayName = "StepField";

export { StepField };
