import React from "react";
import { classNames } from "../utils";

type StepNavbarProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * StepNavbar acts as a container for navigation controls.
 */
function StepNavbar({ children, className }: StepNavbarProps) {
  return <nav className={classNames("step-navbar", className)}>{children}</nav>;
}

StepNavbar.displayName = "StepNavbar";

export { StepNavbar };
