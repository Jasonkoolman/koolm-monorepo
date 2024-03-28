import { useMemo, cloneElement } from "react";
import { LazyMotion, AnimatePresence } from "framer-motion";
import { StepsAnimateConfig } from "../types";
import { getAnimationConfig } from "../utils";
import { StepView } from "../step/StepView";

const framerFeatures = async () => (await import("../framer")).default;

type StepsOutletProps = {
  id: string;
  element: React.ReactElement;
  animate: StepsAnimateConfig;
  onTransition?: () => void;
};

/**
 * Renders and manages transitions between step components in a multi-step form.
 *
 * Conditionally wraps the element in a StepView and assigns a unique key for transitions.
 *
 * @param props.id - Unique ID for the step.
 * @param props.element - The step element to render.
 * @param props.animate - Animation configuration for step transitions.
 * @param props.onTransition - Callback invoked when a step transitions.
 */
function StepsOutlet({ id, element, animate, onTransition }: StepsOutletProps) {
  const { mode } = useMemo(() => getAnimationConfig(animate), [animate]);

  const step = useMemo(() => {
    if (!element) return null;
    const el = mode === "root" ? <StepView>{element}</StepView> : element;
    return cloneElement(el, { key: id });
  }, [mode, id, element]);

  return (
    <div className="steps-outlet">
      <LazyMotion features={framerFeatures} strict>
        <AnimatePresence
          initial={false}
          mode="wait"
          onExitComplete={onTransition}
        >
          {step}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
}

StepsOutlet.displayName = "StepsOutlet";

export { StepsOutlet };
