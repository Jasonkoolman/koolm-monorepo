import { CSSProperties } from "react";
import { useStepsContext } from "../../steps/useStepsContext";
import { DebuggerInfo } from "./DebuggerInfo";
import { DebuggerFlow } from "./DebuggerFlow";

const contentStyle: CSSProperties = {
  borderTop: "1px solid #333333",
  overflow: "auto",
};

export const DebuggerContent = () => {
  const context = useStepsContext();
  return (
    <div style={contentStyle}>
      <DebuggerInfo context={context} />
      <DebuggerFlow context={context} />
    </div>
  );
};
