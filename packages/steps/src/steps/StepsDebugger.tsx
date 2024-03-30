import { useState, CSSProperties, HTMLAttributes } from "react";
import { DebuggerContent } from "./debugger/DebuggerContent";
import { DebuggerOutlet } from "./debugger/DebuggerOutlet";

const containerStyle: CSSProperties = {
  fontSize: "14px",
  color: "#fff",
  backgroundColor: "#0d0d0d",
};

const barStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0.4375rem 0.75rem",
  borderTop: "1px solid #333333",
  cursor: "pointer",
  textAlign: "center",
};

const titleStyle: CSSProperties = {
  fontWeight: 600,
  color: "#CCC",
};

type StepsDebuggerProps = HTMLAttributes<HTMLDivElement> & {
  title?: string;
};

const StepsDebugger = ({ title, ...props }: StepsDebuggerProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDebugger = () => setIsExpanded(!isExpanded);

  const debuggerBar = (
    <div style={barStyle} onClick={toggleDebugger}>
      <div style={titleStyle}>{title ?? "Steps"}</div>
    </div>
  );

  return (
    <DebuggerOutlet>
      <div style={containerStyle} {...props}>
        {debuggerBar}
        {isExpanded && <DebuggerContent />}
      </div>
    </DebuggerOutlet>
  );
};

StepsDebugger.displayName = "StepsDebugger";

export { StepsDebugger };
