import React from "react";
import ReactDOM from "react-dom";

const createContainer = () => {
  const existingContainer = document.getElementById("steps-debugger");
  if (existingContainer) {
    return existingContainer;
  }
  const containerDiv = document.createElement("div");
  containerDiv.setAttribute("id", "steps-debugger");
  containerDiv.style.position = "fixed";
  containerDiv.style.bottom = "0";
  containerDiv.style.left = "0";
  containerDiv.style.width = "100%";
  containerDiv.style.zIndex = "1000";
  document.body.appendChild(containerDiv);
  return containerDiv;
};

type DebuggerOutletProps = {
  children: React.ReactNode;
};

const DebuggerOutlet = ({ children }: DebuggerOutletProps) => {
  const container = createContainer();
  return ReactDOM.createPortal(children, container);
};

export { DebuggerOutlet };
