import { CSSProperties } from "react";
import { StepsContextValue } from "../../types";

const stepsContainerStyle: CSSProperties = {
  display: "flex",
  gap: "0.75rem",
  overflowX: "auto",
  padding: "0.75rem",
  borderTop: "1px solid #333",
  backgroundColor: "#1a1a1a",
};

const stepStyle: CSSProperties = {
  padding: "0.25rem 0.75rem",
  border: "1px solid transparent",
  transition: "all 300ms ease",
  borderRadius: "0.125rem",
};

const activeStepStyle: CSSProperties = {
  ...stepStyle,
  backgroundColor: "rgba(170, 65, 140, 0.2)",
  borderColor: "rgba(170, 65, 140, 0.6)",
};

const historyStepStyle: CSSProperties = {
  ...stepStyle,
  backgroundColor: "rgba(76, 175, 80, 0.2)",
  borderColor: "rgba(76, 175, 80, 0.6)",
};

const inactiveStepStyle: CSSProperties = {
  ...stepStyle,
  backgroundColor: "rgba(128, 128, 128, 0.2)",
  borderColor: "rgba(128, 128, 128, 0.6)",
};

export const DebuggerFlow = ({ context }: { context: StepsContextValue }) => {
  const {
    state: { allSteps, history, activeSteps },
    form: { getStepFields },
  } = context;

  return (
    <div style={stepsContainerStyle}>
      {allSteps.map((step, index) => {
        const stepId = step.props.id;
        const isHistory = history.includes(stepId);
        const isActive = activeSteps.find(
          (activeStep) => activeStep.props.id === stepId
        );

        const stepStyle = isHistory
          ? historyStepStyle
          : isActive
            ? activeStepStyle
            : inactiveStepStyle;

        return (
          <div
            key={stepId}
            style={stepStyle}
            title={`Fields registered: ${getStepFields(stepId)}`}
          >
            {[index + 1]}: {stepId}
          </div>
        );
      })}
    </div>
  );
};
