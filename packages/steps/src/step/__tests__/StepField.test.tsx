import { render, screen } from "@testing-library/react";
import { MockContextValue } from "../../test-utils";
import { StepsContextValue } from "../../types";
import { useStepsContext } from "../../steps/useStepsContext";
import { StepField } from "../StepField";

vi.mock("../../steps/useStepsContext", () => ({
  useStepsContext: vi.fn(),
}));

const mockContext = (value: MockContextValue) => {
  vi.mocked(useStepsContext).mockReturnValue(
    value as unknown as StepsContextValue,
  );
};

describe("StepField component", () => {
  it("renders as an input by default", () => {
    mockContext({
      state: { currentStep: { id: "test-step" } },
      form: { setStepField: vi.fn() },
    });

    render(<StepField name="testName" />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("name", "testName");
  });

  it("renders as a custom component when specified", () => {
    mockContext({
      state: { currentStep: { id: "test-step" } },
      form: { setStepField: vi.fn() },
    });

    render(<StepField as="textarea" name="testName" />);
    const textarea = screen.getByRole("textbox");
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe("TEXTAREA");
    expect(textarea).toHaveAttribute("name", "testName");
  });

  it("calls setStepField on render", () => {
    const setStepFieldMock = vi.fn();

    mockContext({
      state: { currentStep: { id: "test-step" } },
      form: { setStepField: setStepFieldMock },
    });

    render(<StepField name="testField" />);
    expect(setStepFieldMock).toHaveBeenCalledWith({
      name: "testField",
      stepId: "test-step",
    });
  });
});
