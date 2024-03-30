import { renderHook, act } from "@testing-library/react";
import { useStepsForm } from "../useStepsForm";

describe("useStepsForm hook", () => {
  it("initializes form with default values", () => {
    const { result } = renderHook(() =>
      useStepsForm({ defaultValues: { exampleField: "test" } }),
    );

    expect(result.current.form.getValues()).toEqual({ exampleField: "test" });
  });

  it("sets and retrieves step fields correctly", () => {
    const { result } = renderHook(() => useStepsForm({}));

    act(() => {
      result.current.form.setStepField({ name: "testField", stepId: "step1" });
    });

    const stepFields = result.current.form.getStepFields("step1");
    expect(stepFields).toContain("testField");
  });
});
