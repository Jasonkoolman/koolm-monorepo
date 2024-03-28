import { StepsButtonProps } from "../types";
import { useButton } from "./useButton";

/**
 * ResetButton renders a button for resetting steps.
 */
const ResetButton = ({ children, show, hide, ...props }: StepsButtonProps) => {
  const { reset, isVisible, isDisabled } = useButton({
    show,
    hide,
  });

  if (!isVisible) {
    return null;
  }

  return (
    <button type="button" disabled={isDisabled} onClick={reset} {...props}>
      {children}
    </button>
  );
};

ResetButton.displayName = "ResetButton";

export { ResetButton };
