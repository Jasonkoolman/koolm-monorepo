import { render, screen } from "@testing-library/react";
import { Step } from "../Step";

describe("Step component", () => {
  it("renders without crashing", () => {
    render(<Step id="test-step">Test Content</Step>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies className correctly", () => {
    render(
      <Step id="test-step" className="custom-class">
        Test Content
      </Step>
    );
    expect(screen.getByText("Test Content")).toHaveClass("custom-class");
  });

  it("sets data-step attribute correctly", () => {
    const testId = "test-step";
    render(<Step id={testId}>Test Content</Step>);
    expect(screen.getByText("Test Content")).toHaveAttribute(
      "data-step",
      testId
    );
  });

  it("assigns stepRef correctly", () => {
    const ref = { current: null };
    const stepRef = ((el: any) => (ref.current = el)) as any;
    render(
      <Step id="test-step" stepRef={stepRef}>
        Test Content
      </Step>
    );
    expect(ref.current).toBeInstanceOf(HTMLElement);
    expect(ref.current).toHaveAttribute("data-step", "test-step");
  });
});
