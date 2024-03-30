import React from "react";
import { render, screen } from "@testing-library/react";
import { StepsContext, StepsProvider } from "../StepsContext";
import { StepsContextValue } from "../../types";

const MockConsumerComponent = () => {
  const context = React.useContext(StepsContext);
  return <div>{context.state.currentStep.id}</div>;
};

describe("StepsProvider component", () => {
  it("provides the context value to consuming components", () => {
    const contextValue = {
      next: () => {},
      prev: () => {},
      reset: () => {},
      getAnswers: () => {},
      state: {
        currentStep: { id: "testStep", index: 0 },
      },
      form: {},
      animate: "child",
    } as StepsContextValue;

    render(
      <StepsProvider value={contextValue}>
        <MockConsumerComponent />
      </StepsProvider>,
    );

    expect(screen.getByText("testStep")).toBeInTheDocument();
  });
});
