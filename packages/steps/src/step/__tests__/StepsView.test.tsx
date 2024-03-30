import { render } from "@testing-library/react";
import { m } from "framer-motion";
import { StepsContextValue } from "../../types";
import { MockContextValue } from "../../test-utils";
import { useStepsContext } from "../../steps/useStepsContext";
import { StepView } from "./../StepView";

vi.mock("framer-motion", () => ({
  m: {
    div: vi.fn(({ children }) => <div>{children}</div>),
  },
}));

vi.mock("../../steps/useStepsContext", () => ({
  useStepsContext: vi.fn(),
}));

const mockContext = (value: MockContextValue) => {
  vi.mocked(useStepsContext).mockReturnValue(
    value as unknown as StepsContextValue,
  );
};

describe("StepView component", () => {
  it("renders correctly", () => {
    mockContext({
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

    mockContext({
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
      expect.anything(),
    );
  });
});
