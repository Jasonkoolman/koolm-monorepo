import { StepProps, StepsValues } from "../types";
import { classNames } from "../utils";

/**
 * Represents an individual step within a multi-step form.
 *
 * Serves for structural organization and step identification.
 * The rendering logic and transition control are delegated to the Steps component.
 */
function Step<TStepsValues extends StepsValues = StepsValues>({
  id,
  children,
  className,
  stepRef,
  active,
  ...rest
}: StepProps<TStepsValues>) {
  return (
    <div
      {...rest}
      className={classNames("step", className)}
      data-step={id}
      ref={stepRef}
    >
      {children}
    </div>
  );
}

Step.displayName = "Step";

export { Step };
