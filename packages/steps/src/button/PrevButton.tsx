import { StepsButtonProps, StepId } from "../types";
import { useButton } from "./useButton";

type PrevButtonProps = StepsButtonProps & {
  stepId?: StepId;
};

/**
 * PrevButton renders a button for navigating to the previous step.
 */
const PrevButton = ({
  children,
  show,
  hide,
  stepId,
  ...props
}: PrevButtonProps) => {
  const { prev, isVisible, isDisabled } = useButton({
    show,
    hide,
  });

  const onClick = () => {
    prev(stepId);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button type="button" disabled={isDisabled} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

PrevButton.displayName = "PrevButton";

export { PrevButton };
