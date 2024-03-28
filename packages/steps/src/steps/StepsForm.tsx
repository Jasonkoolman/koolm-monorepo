import React from "react";
import { classNames } from "../utils";

type StepsFormProps = React.FormHTMLAttributes<HTMLFormElement> & {
  formRef: React.RefObject<HTMLFormElement>;
  children?: React.ReactNode;
};

/**
 * Renders a form element specifically designed for the steps navigation structure.
 *
 * It prevents form submission via Enter keypress in input fields.
 */
function StepsForm({ formRef, children, className, ...rest }: StepsFormProps) {
  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLFormElement>) => {
      const target = event.target as HTMLInputElement;
      if (event.key === "Enter" && target.tagName === "INPUT") {
        event.preventDefault();
      }
    },
    []
  );

  return (
    <form
      {...rest}
      ref={formRef}
      className={classNames("steps-form", className)}
      onKeyDown={handleKeyDown}
    >
      {children}
    </form>
  );
}

StepsForm.displayName = "StepsForm";

export { StepsForm };
