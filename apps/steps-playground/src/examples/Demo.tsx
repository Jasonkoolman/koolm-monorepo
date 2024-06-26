import React from "react";
import { StepsDebugger } from "@koolm/steps";

export type DemoComponentProps = {
  debugger: React.ReactElement;
};

type DemoProps = {
  title: string;
  as: React.ElementType<DemoComponentProps>;
};

function Demo({ title, as: Component }: DemoProps) {
  const [showDebugger, setShowDebugger] = React.useState(false);
  const debuggerElement = showDebugger ? <StepsDebugger title={title} /> : null;

  return (
    <section>
      <header>
        <h2>Demo: {title}</h2>
        <DebugButton
          isActive={showDebugger}
          onClick={() => setShowDebugger((visible) => !visible)}
        />
      </header>
      <Component debugger={debuggerElement as React.ReactElement} />
    </section>
  );
}

type DebugButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  isActive: boolean;
};

function DebugButton({ isActive, ...rest }: DebugButtonProps) {
  return (
    <button
      type="button"
      title="Toggle debugger"
      style={{
        display: "inline-flex",
        background: "transparent",
        border: "none",
        color: isActive ? "#dff976" : "#888",
        cursor: "pointer",
      }}
      {...rest}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.4375rem"
        height="1.4375rem"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="m29.83 20l.34-2l-5.17-.85v-4.38l5.06-1.36l-.51-1.93l-4.83 1.29A9 9 0 0 0 20 5V2h-2v2.23a8.81 8.81 0 0 0-4 0V2h-2v3a9 9 0 0 0-4.71 5.82L2.46 9.48L2 11.41l5 1.36v4.38L1.84 18l.32 2L7 19.18a8.9 8.9 0 0 0 .82 3.57l-4.53 4.54l1.42 1.42l4.19-4.2a9 9 0 0 0 14.2 0l4.19 4.2l1.42-1.42l-4.54-4.54a8.9 8.9 0 0 0 .83-3.57ZM15 25.92A7 7 0 0 1 9 19v-6h6ZM9.29 11a7 7 0 0 1 13.42 0ZM23 19a7 7 0 0 1-6 6.92V13h6Z"
        />
      </svg>
    </button>
  );
}

export default Demo;
