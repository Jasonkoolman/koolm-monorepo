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
    vi.useFakeTimers();
    formMock.validate.mockClear();
    formMock.getValues.mockClear();
    formMock.reset.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("processes step elements correctly", () => {
    const { result } = renderHook(() =>
      useStepsState({
        stepElements,
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
        defaultHistory: ["step1", "step2"],
        animate: false,
        disabled: true,
        form: formMock,
      }),
    );

    await act(async () => {
      await result.current.next();
    });

    expect(result.current.state.currentStep.id).toBe("step2");

    await act(async () => {
      await result.current.next();
    });

    expect(result.current.state.currentStep.id).toBe("step2");
  });

  it("does not navigate to the next step if form validation fails", async () => {
    formMock.validate.mockResolvedValueOnce(false);

    const { result } = renderHook(() =>
      useStepsState({
        stepElements,
        animate: false,
        disabled: false,
        form: formMock,
      }),
    );

    await act(async () => {
      await result.current.next();
    });

    expect(result.current.state.currentStep.id).toBe("step1");
  });

  it("calls onForward and can prevent navigation", async () => {
    const onForwardMock = vi.fn().mockResolvedValue(false);

    const { result } = renderHook(() =>
      useStepsState({
        stepElements,
        animate: false,
        disabled: false,
        form: formMock,
        onForward: onForwardMock,
      }),
    );

    await act(async () => {
      await result.current.next();
    });

    expect(onForwardMock).toHaveBeenCalled();
    expect(result.current.state.currentStep.id).toBe("step1");
  });

  it("calls onBackward and can prevent navigation", async () => {
    const onBackwardMock = vi.fn().mockResolvedValue(false);

    const { result } = renderHook(() =>
      useStepsState({
        stepElements,
        defaultHistory: ["step1", "step2"],
        animate: false,
        disabled: false,
        form: formMock,
        onBackward: onBackwardMock,
      }),
    );

    await act(async () => {
      await result.current.prev();
    });

    expect(onBackwardMock).toHaveBeenCalled();
    expect(result.current.state.currentStep.id).not.toBe("step1");
  });

  it("handles transition state with animation enabled", async () => {
    const { result } = renderHook(() =>
      useStepsState({
        stepElements,
        animate: "root",
        disabled: false,
        form: formMock,
      }),
    );

    await act(async () => {
      await result.current.next();
    });

    expect(result.current.state.isTransitioning).toBe(true);
    expect(result.current.state.isDisabled).toBe(true);

    await act(async () => {
      vi.advanceTimersByTime(1000);
    });

    expect(result.current.state.isTransitioning).toBe(false);
    expect(result.current.state.isDisabled).toBe(false);
  });

  it("resets the state correctly", async () => {
    const { result } = renderHook(() =>
      useStepsState({
        stepElements,
        animate: false,
        disabled: false,
        form: formMock,
      }),
    );

    await act(async () => {
      result.current.next();
    });

    await act(async () => {
      result.current.reset();
    });

    expect(result.current.state.history).toEqual(["step1"]);
    expect(formMock.reset).toHaveBeenCalled();
  });
});
