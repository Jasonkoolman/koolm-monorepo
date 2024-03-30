import { CSSProperties } from "react";
import { StepsContextValue } from "../../types";

const wrapperStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  gap: "0.75rem 1.25rem",
  padding: "0.75rem",
};

const keyValueContainerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "0.5rem",
};

const keyStyle: CSSProperties = {
  color: "#BBB",
};

const valueStyle: CSSProperties = {
  color: "#FFF",
};

export const DebuggerInfo = ({ context }: { context: StepsContextValue }) => {
  const {
    state: {
      currentStep,
      allSteps,
      activeSteps,
      history,
      direction,
      isValidating,
      isTransitioning,
      isDisabled,
    },
  } = context;

  const progression = (
    (currentStep.index / (allSteps.length - 1)) *
    100
  ).toFixed(0);

  const data = [
    ["Step ID", currentStep.id],
    ["Step index", currentStep.index],
    ["All steps", allSteps.length],
    ["Active steps", activeSteps.length],
    ["Steps taken", history.length],
    ["Steps left", activeSteps.length - history.length],
    ["Direction", direction],
    ["Progression (estimate)", `${progression}%`],
    ["Validating", isValidating ? "Yes" : "No"],
    ["Transitioning", isTransitioning ? "Yes" : "No"],
    ["Disabled", isDisabled ? "Yes" : "No"],
  ];

  return (
    <div style={wrapperStyle}>
      {data.map(([key, value]) => (
        <div key={key} style={keyValueContainerStyle}>
          <span style={keyStyle}>{key}</span>
          <span style={valueStyle}>{value}</span>
        </div>
      ))}
    </div>
  );
};
