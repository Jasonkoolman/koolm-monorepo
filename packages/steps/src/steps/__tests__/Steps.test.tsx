import React from "react";
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MotionGlobalConfig } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { MockStepsProps } from "../../test-utils";
import {
  Steps,
  Step,
  StepField,
  StepNavbar,
  PrevButton,
  NextButton,
  SubmitButton,
  StepsProps,
} from "../..";

type InputProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
};

const Input = ({ name, ...props }: InputProps) => {
  const { register } = useFormContext();
  const { required, ...rest } = props;
  return (
    <input
      type="text"
      placeholder={name}
      defaultValue=""
      {...rest}
      {...register(name, { required })}
    />
  );
};

const renderSteps = (props?: MockStepsProps) => {
  const onSubmit = vi.fn();
  const stepsProps = props as unknown as StepsProps<any>;

  const result = render(
    <Steps animate={false} onSubmit={onSubmit} {...stepsProps}>
      <Step id="1">
        <h2>One</h2>
        <StepField as={Input} name="one" />
      </Step>
      <Step id="2">
        <h2>Two</h2>
        <StepField as={Input} name="two" required />
      </Step>
      <Step id="2a" active={(values) => values.two === "a"}>
        <h2>Two A</h2>
        <StepField as={Input} name="two_a" required />
      </Step>
      <Step id="2b" active={(values) => values.two === "b"}>
        <h2>Two B</h2>
        <StepField as={Input} name="two_b" required />
      </Step>
      <Step id="3">
        <h2>Three</h2>
        <StepField as={Input} name="three" />
      </Step>
      <StepNavbar>
        <PrevButton>Prev</PrevButton>
        <NextButton>Next</NextButton>
        <SubmitButton show={-1}>Submit</SubmitButton>
      </StepNavbar>
    </Steps>,
  );

  return {
    ...result,
    getStep: (name: string) => result.getByRole("heading", { name }),
    getInput: (name: string) => result.getByPlaceholderText(name),
    getButton: (name: string) => result.getByRole("button", { name }),
    onSubmit,
  };
};

describe("Steps component", () => {
  const user = userEvent.setup();

  beforeAll(() => {
    MotionGlobalConfig.skipAnimations = true;
  });
  afterAll(() => {
    MotionGlobalConfig.skipAnimations = false;
  });

  it("navigates between steps", async () => {
    const { getStep, getButton } = renderSteps();
    await user.click(getButton("Next"));
    expect(getStep("Two")).toBeInTheDocument();
  });

  it("prevents navigation on invalid input", async () => {
    const { getStep, getInput, getButton } = renderSteps();
    await user.click(getButton("Next")); // Proceed without filling required field
    expect(getStep("Two")).toBeInTheDocument(); // Still on "Two" due to validation
    await user.type(getInput("two"), "John Doe");
    await user.click(getButton("Next"));
    expect(getStep("Three")).toBeInTheDocument(); // Proceeds after valid input
  });

  it("navigates back correctly", async () => {
    const { getStep, getButton } = renderSteps();
    await user.click(getButton("Next"));
    await user.click(getButton("Prev"));
    expect(getStep("One")).toBeInTheDocument(); // Returned to "One"
  });

  it("submits with valid inputs", async () => {
    const { getInput, getButton, onSubmit } = renderSteps();
    await user.type(getInput("one"), "FirstValue");
    await user.click(getButton("Next"));
    await user.type(getInput("two"), "SecondValue");
    await user.click(getButton("Next"));
    await user.type(getInput("three"), "ThirdValue");
    await user.click(getButton("Submit"));
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        values: {
          one: "FirstValue",
          two: "SecondValue",
          three: "ThirdValue",
        },
      }),
    );
  });

  it("disables navigation buttons", async () => {
    const { getButton } = renderSteps({
      disabled: true,
      defaultHistory: ["2"],
    });
    expect(getButton("Prev")).toBeDisabled();
    expect(getButton("Next")).toBeDisabled();
  });

  it("invokes onForward and onBackward during navigation", async () => {
    const onForward = vi.fn().mockResolvedValue(true);
    const onBackward = vi.fn().mockResolvedValue(true);
    const { getButton } = renderSteps({ onForward, onBackward });
    await user.click(getButton("Next"));
    expect(onForward).toHaveBeenCalled();
    await user.click(getButton("Prev"));
    expect(onBackward).toHaveBeenCalled();
  });

  it("halts navigation when onForward or onBackward return false", async () => {
    const onForward = vi.fn().mockResolvedValue(false);
    const onBackward = vi.fn().mockResolvedValue(false);
    const { getButton, getStep } = renderSteps({ onForward, onBackward });

    // Attempt to navigate forward and verify navigation is halted
    await user.click(getButton("Next"));
    expect(onForward).toHaveBeenCalled();
    // Verify the step hasn't changed (still on "One")
    expect(getStep("One")).toBeInTheDocument();

    // Navigate to the next step manually to test onBackward
    onForward.mockResolvedValue(true); // Temporarily allow navigation
    await user.click(getButton("Next"));
    expect(getStep("Two")).toBeInTheDocument();

    // Attempt to navigate back with onBackward returning false
    await user.click(getButton("Prev"));
    expect(onBackward).toHaveBeenCalled();
    // Verify the step hasn't changed (still on "Two" despite attempting to go back)
    expect(getStep("Two")).toBeInTheDocument();
  });

  it("invokes onStepEnter and onStepExit during transitions", async () => {
    const onStepEnter = vi.fn();
    const onStepExit = vi.fn();
    const { getButton } = renderSteps({ onStepEnter, onStepExit });
    await user.click(getButton("Next"));
    expect(onStepExit).toHaveBeenCalledTimes(1);
    expect(onStepEnter).toHaveBeenCalledTimes(1);
    await user.click(getButton("Prev"));
    expect(onStepExit).toHaveBeenCalledTimes(2);
    expect(onStepEnter).toHaveBeenCalledTimes(2);
  });

  it("respects defaultHistory for navigation", async () => {
    const { getStep, getButton } = renderSteps({ defaultHistory: ["2", "3"] });
    expect(getStep("Three")).toBeInTheDocument(); // Starts at "Three"
    await user.click(getButton("Prev"));
    expect(getStep("Two")).toBeInTheDocument();
    await user.click(getButton("Prev"));
    expect(getStep("Two")).toBeInTheDocument(); // Remains on "Two"
  });

  it("manages conditional steps and visited values", async () => {
    const { getInput, getButton, getStep, onSubmit } = renderSteps();

    // Navigate to the second step after filling the first
    await user.type(getInput("one"), "FirstValue");
    await user.click(getButton("Next"));

    // Set input to conditionally display Step 2a
    await user.type(getInput("two"), "a");
    await user.click(getButton("Next"));
    // Validate that conditional navigation occurred based on input
    expect(getStep("Two A")).toBeInTheDocument();

    // Fill Step 2a and backtrack to change conditional path
    await user.type(getInput("two_a"), "ValueA");
    await user.click(getButton("Prev"));

    // Change the condition to navigate to an alternate step (Step 2b)
    await user.clear(getInput("two"));
    await user.type(getInput("two"), "b");
    await user.click(getButton("Next"));
    // Confirm the navigation to Step 2b
    expect(getStep("Two B")).toBeInTheDocument();

    // Complete Step 2b, submit, and verify submission includes only visited steps
    await user.type(getInput("two_b"), "ValueB");
    await user.click(getButton("Next"));
    await user.type(getInput("three"), "ThirdValue");
    await user.click(getButton("Submit"));
    // Ensure onSubmit captured the correct sequence of steps, excluding non-visited conditional paths
    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        state: expect.any(Object),
        values: expect.objectContaining({
          one: "FirstValue",
          two: "b",
          two_a: "ValueA",
          two_b: "ValueB",
          three: "ThirdValue",
        }),
        answers: expect.objectContaining({
          one: "FirstValue",
          two: "b",
          two_b: "ValueB",
          three: "ThirdValue",
        }),
      }),
    );
  });
});
