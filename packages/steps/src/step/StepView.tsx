import React from "react";
import { m, HTMLMotionProps } from "framer-motion";
import { useStepsContext } from "../steps/useStepsContext";
import { classNames, getAnimationConfig } from "../utils";
import { StepsAnimationVariants } from "../types";

const defaultVariants: StepsAnimationVariants = {
  enter: (direction: string) => ({
    x: direction === "forward" ? "40%" : "-40%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: string) => ({
    x: direction === "forward" ? "-40%" : "40%",
    opacity: 0,
  }),
};

type StepViewProps = HTMLMotionProps<"div"> & {
  children: React.ReactNode;
};

/**
 * StepView component wraps step content and manages transition animations.
 *
 * Utilizing framer-motion, it's perfectly suited for animating transitions within
 * the Steps component ("root") or individual steps ("child") for improved layout control.
 * Supports directional transitions tailored to navigation flow, enhancing the user
 * experience through smooth and intuitive movement between steps.
 *
 * @param children - Children to render
 * @param variants - An object that specifies values to animate to.
 * @param className - An object that specifies values to animate to.
 */
function StepView({ children, className, ...props }: StepViewProps) {
  const { state, animate } = useStepsContext();
  const { direction } = state;

  const variants =
    (typeof animate === "object" && animate.variants) || defaultVariants;

  const { transition } = React.useMemo(
    () => getAnimationConfig(animate),
    [animate]
  );

  return (
    <m.div
      {...props}
      className={classNames("step-view", className)}
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
    >
      {children}
    </m.div>
  );
}

StepView.displayName = "StepView";

export { StepView };
