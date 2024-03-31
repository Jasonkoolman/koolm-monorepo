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
        <SubmitButton>Submit</SubmitButton>
      </StepNavbar>
    </Steps>,
  );

  const getStep = (name: string) => result.getByRole("heading", { name });
  const getInput = (name: string) => result.getByPlaceholderText(name);
  const getButton = (name: string) => result.getByRole("button", { name });

  return {
    ...result,
    getStep,
    getInput,
    getButton,
    onSubmit,
  };
};

describe("Steps Component", () => {
  const user = userEvent.setup();

  beforeAll(() => {
    MotionGlobalConfig.skipAnimations = true;
  });

  afterAll(() => {
    MotionGlobalConfig.skipAnimations = false;
  });

  it("renders and navigates between steps correctly", async () => {
    const { getStep, getButton } = renderSteps();

    expect(getStep("One")).toBeInTheDocument();

    await user.click(getButton("Next"));

    expect(getStep("Two")).toBeInTheDocument();
  });

  it("prevents navigation to the next step on invalid input", async () => {
    const { getStep, getInput, getButton } = renderSteps();

    await user.click(getButton("Next"));

    expect(getStep("Two")).toBeInTheDocument();

    await user.click(getButton("Next"));

    expect(getStep("Two")).toBeInTheDocument();

    await user.type(getInput("two"), "John Doe");
    await user.click(getButton("Next"));

    expect(getStep("Three")).toBeInTheDocument();
  });

  it("navigates back to the previous step", async () => {
    const { getStep, getButton } = renderSteps();

    await user.click(getButton("Next"));
    await user.click(getButton("Prev"));

    expect(getStep("One")).toBeInTheDocument();
  });

  it("submits the form with valid inputs from all steps", async () => {
    const { getInput, getButton, onSubmit } = renderSteps();

    const answers = {
      one: "FirstValue",
      two: "SecondValue",
      three: "ThirdValue",
    };

    await user.type(getInput("one"), answers.one);
    await user.click(getButton("Next"));

    await user.type(getInput("two"), answers.two);
    await user.click(getButton("Next"));

    await user.type(getInput("three"), answers.three);
    await user.click(getButton("Submit"));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        state: expect.any(Object),
        values: expect.objectContaining(answers),
        answers: expect.objectContaining(answers),
      }),
    );
  });

  it("handles conditional steps and retains only visited step values", async () => {
    const { getInput, getButton, getStep, onSubmit } = renderSteps();

    // Navigate to Step 2
    await user.type(getInput("one"), "FirstValue");
    await user.click(getButton("Next"));
    expect(getStep("Two")).toBeInTheDocument();

    // Choose the option that leads to Step 2a
    await user.type(getInput("two"), "a");
    await user.click(getButton("Next"));
    expect(getStep("Two A")).toBeInTheDocument();

    // Fill in Step 2a and then navigate back to Step 2 to change the input to lead to 2b
    await user.type(getInput("two_a"), "ValueA");
    await user.click(getButton("Prev"));
    expect(getStep("Two")).toBeInTheDocument();

    // Change input at Step 2 to lead to Step 2b instead
    await user.clear(getInput("two"));
    await user.type(getInput("two"), "b");
    await user.click(getButton("Next"));
    expect(getStep("Two B")).toBeInTheDocument();

    // Fill in Step 2b and proceed to Step 3
    await user.type(getInput("two_b"), "ValueB");
    await user.click(getButton("Next"));
    expect(getStep("Three")).toBeInTheDocument();

    // Fill in Step 3 and submit
    await user.type(getInput("three"), "ThirdValue");
    await user.click(getButton("Submit"));

    // Verify onSubmit was called with the expected data
    // Specifically, "two_a" should NOT be included in `answers` since we navigated back and chose a different path
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
