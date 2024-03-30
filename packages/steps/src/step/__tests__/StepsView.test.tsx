import { render } from "@testing-library/react";
import { m } from "framer-motion";
import { StepView } from "./../StepView";
import { useStepsContext } from "../../steps/useStepsContext";

vi.mock("framer-motion", () => ({
  m: {
    div: vi.fn(({ children }) => <div>{children}</div>),
  },
}));

vi.mock("../../steps/useStepsContext", () => ({
  useStepsContext: vi.fn(),
}));

describe("StepView component", () => {
  it("renders correctly", () => {
    vi.mocked(useStepsContext).mockReturnValue({
      state: { direction: "forward" },
      animate: { variants: {} },
    });

    const { getByText } = render(<StepView>Test Child</StepView>);

    expect(getByText("Test Child")).toBeInTheDocument();
  });

  it("receives motion props", () => {
    const customPropValue = "backward";
    const mockSetStepField = vi.fn();
    const variants = {
      enter: { opacity: 0 },
      exit: { opacity: 1 },
    };

    vi.mocked(useStepsContext).mockReturnValue({
      state: { direction: customPropValue },
      animate: { variants },
      form: { setStepField: mockSetStepField },
    });

    const spy = vi.spyOn(m, "div");

    render(<StepView className="test-class">Child</StepView>);

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        custom: customPropValue,
        variants: variants,
        initial: "enter",
        animate: "center",
        exit: "exit",
        transition: expect.any(Object),
      }),
      expect.anything()
    );
  });
});
