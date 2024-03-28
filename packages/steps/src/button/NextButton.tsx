import { StepsButtonProps, StepId } from "../types";
import { useButton } from "./useButton";

type NextButtonProps = StepsButtonProps & {
  stepId?: StepId;
};

/**
 * NextButton renders a button for navigating to the next or a specific step.
 */
const NextButton = ({
  children,
  show,
  hide,
  stepId,
  ...props
}: NextButtonProps) => {
  const { next, isVisible, isDisabled } = useButton({
    show,
    hide,
  });

  const onClick = () => {
    next(stepId);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button type="button" onClick={onClick} disabled={isDisabled} {...props}>
      {children}
    </button>
  );
};

NextButton.displayName = "NextButton";

export { NextButton };
