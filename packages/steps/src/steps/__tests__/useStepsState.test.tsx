import { act, renderHook } from "@testing-library/react";
import { useStepsState } from "../useStepsState";

// Create a generic Step component
const Step = ({ id, children }: any) => (
  <div data-testid={`step-${id}`}>{children}</div>
);
Step.displayName = "Step";

const stepElements = [
  <Step key="step1" id="step1">
    Step 1 Content
  </Step>,
  <Step key="step2" id="step2">
    Step 2 Content
  </Step>,
  <Step key="step3" id="step3">
    Step 3 Content
  </Step>,
];

const formMock = {
  validate: vi.fn().mockResolvedValue(true),
  getValues: vi.fn().mockReturnValue({}),
  reset: vi.fn(),
} as any;

describe("useStepsState hook", () => {
  beforeEach(() => {
    formMock.validate.mockClear();
    formMock.getValues.mockClear();
    formMock.reset.mockClear();
  });

  it("processes step elements correctly", () => {
    const { result } = renderHook(() =>
      useStepsState({
        stepElements,
        defaultStep: "step1",
        animate: false,
        disabled: false,
        form: formMock,
      }),
    );

    const state = result.current.state;
    expect(state.allSteps.length).toBe(3);
    expect(state.activeSteps.length).toBe(3);
    expect(state.direction).toBe("forward");
    expect(state.history).toEqual(["step1"]);
    expect(state.currentStep.id).toBe("step1");
    expect(state.isAnimated).toBe(false);
    expect(state.isDisabled).toBe(false);
    expect(state.isFirstStep).toBe(true);
    expect(state.isLastStep).toBe(false);
  });

  it("navigates to the next step", async () => {
    const { result } = renderHook(() =>
      useStepsState({
        stepElements,
        defaultStep: "step1",
        animate: false,
        disabled: false,
        form: formMock,
      }),
    );

    await act(async () => {
      await result.current.next();
    });

    expect(result.current.state.currentStep.id).toBe("step2");
    expect(result.current.state.history).toEqual(["step1", "step2"]);
  });

  it("navigates to the previous step", async () => {
    const { result } = renderHook(() =>
      useStepsState({
        stepElements,
        defaultStep: "step1",
        animate: false,
        disabled: false,
        form: formMock,
      }),
    );

    await act(async () => {
      await result.current.next("step3");
    });

    await act(async () => {
      await result.current.prev();
    });

    expect(result.current.state.currentStep.id).toBe("step1");
    expect(result.current.state.history).toEqual(["step1"]);
  });

  it("does not navigate when disabled", async () => {
    const { result } = renderHook(() =>
      useStepsState({
        stepElements,
        defaultStep: "step1",
        animate: false,
        disabled: true,
        form: formMock,
      }),
    );

    await act(async () => {
      await result.current.next();
    });

    expect(result.current.state.history).toEqual(["step1"]);
  });
});
