import { StepsButtonProps } from "../types";
import { useButton } from "./useButton";

/**
 * SubmitButton renders a submit button for the steps form.
 *
 * It uses `type="submit"` to submit the form and trigger the `onSubmit` callback.
 */
const SubmitButton = ({ children, show, hide, ...props }: StepsButtonProps) => {
  const { isVisible, isDisabled } = useButton({
    show,
    hide,
  });

  if (!isVisible) {
    return null;
  }

  return (
    <button type="submit" disabled={isDisabled} {...props}>
      {children}
    </button>
  );
};

SubmitButton.displayName = "SubmitButton";

export { SubmitButton };
