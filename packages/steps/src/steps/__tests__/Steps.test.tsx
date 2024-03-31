import React from "react";
import { render } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MotionGlobalConfig } from "framer-motion";
import { useFormContext } from "react-hook-form";
import {
  Steps,
  Step,
  StepField,
  StepNavbar,
  PrevButton,
  NextButton,
  SubmitButton,
} from "../..";

export type InputProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  label: string;
};

export const Input = ({ name, label, ...props }: InputProps) => {
  const id = React.useId();
  const { register } = useFormContext();
  const { required, min, max, ...rest } = props;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        {...rest}
        {...register(name, { required, min, max })}
      />
    </div>
  );
};

const defaultValues = {
  guestOfHonor: "",
  theme: "",
};

const handleSubmit = vi.fn();

describe("Steps Component", () => {
  const user = userEvent.setup();

  beforeAll(() => {
    MotionGlobalConfig.skipAnimations = true;
  });

  afterAll(() => {
    MotionGlobalConfig.skipAnimations = false;
  });

  it("renders and navigates between steps correctly", async () => {
    const { getByText, getByRole } = render(
      <Steps
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        animate={false}
      >
        <Step id="guestOfHonor">
          <h2>👤 Who's the party for?</h2>
          <StepField
            as={Input}
            name="guestOfHonor"
            label="Guest of Honor's Name"
          />
        </Step>
        <Step id="theme">
          <h2>🎨 Choose a theme</h2>
          <StepField
            as={Input}
            name="theme"
            label="Party Theme (e.g., '80s, Superheroes, Jungle)"
          />
        </Step>
        <Step id="confirmation">
          <h2>🎉 Ready to plan your surprise party?</h2>
          <p>
            Make sure all the details are correct. You can go back to edit any
            step.
          </p>
        </Step>
        <StepNavbar>
          <PrevButton>Prev</PrevButton>
          <NextButton>Next</NextButton>
        </StepNavbar>
      </Steps>,
    );

    expect(getByText("👤 Who's the party for?")).toBeInTheDocument();

    await user.click(getByRole("button", { name: "Next" }));

    expect(getByText("🎨 Choose a theme")).toBeInTheDocument();
  });

  it("prevents navigation to the next step on invalid input", async () => {
    const { getByText, getByLabelText } = render(
      <Steps
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        animate={false}
      >
        <Step id="guestOfHonor">
          <h2>👤 Who's the party for?</h2>
          <StepField
            as={Input}
            name="guestOfHonor"
            label="Guest of Honor's Name"
            required
          />
        </Step>
        <Step id="theme">
          <h2>🎨 Choose a theme</h2>
          <StepField
            as={Input}
            name="theme"
            label="Party Theme (e.g., '80s, Superheroes, Jungle)"
          />
        </Step>
        <Step id="confirmation">
          <h2>🎉 Ready to plan your surprise party?</h2>
          <p>
            Make sure all the details are correct. You can go back to edit any
            step.
          </p>
        </Step>
        <StepNavbar>
          <PrevButton hide="guestOfHonor">Oops, go back!</PrevButton>
          <NextButton hide="confirmation">What's next?</NextButton>
          <SubmitButton show="confirmation">Plan the party!</SubmitButton>
        </StepNavbar>
      </Steps>,
    );

    await user.click(getByText("What's next?"));

    expect(getByText("👤 Who's the party for?")).toBeInTheDocument();

    await user.type(getByLabelText("Guest of Honor's Name"), "John Doe");

    await user.click(getByText("What's next?"));

    expect(getByText("🎨 Choose a theme")).toBeInTheDocument();
  });

  it("navigates back to the previous step", async () => {
    const { getByText, getByLabelText } = render(
      <Steps
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        animate={false}
      >
        <Step id="guestOfHonor">
          <h2>👤 Who's the party for?</h2>
          <StepField
            as={Input}
            name="guestOfHonor"
            label="Guest of Honor's Name"
          />
        </Step>
        <Step id="theme">
          <h2>🎨 Choose a theme</h2>
          <StepField
            as={Input}
            name="theme"
            label="Party Theme (e.g., '80s, Superheroes, Jungle)"
          />
        </Step>
        <Step id="confirmation">
          <h2>🎉 Ready to plan your surprise party?</h2>
          <p>
            Make sure all the details are correct. You can go back to edit any
            step.
          </p>
        </Step>
        <StepNavbar>
          <PrevButton hide="guestOfHonor">Oops, go back!</PrevButton>
          <NextButton hide="confirmation">What's next?</NextButton>
          <SubmitButton show="confirmation">Plan the party!</SubmitButton>
        </StepNavbar>
      </Steps>,
    );

    await user.type(getByLabelText("Guest of Honor's Name"), "John Doe");
    await user.click(getByText("What's next?"));

    expect(getByText("🎨 Choose a theme")).toBeInTheDocument();
    await user.click(getByText("Oops, go back!"));

    expect(getByText("👤 Who's the party for?")).toBeInTheDocument();
  });

  it("submits the form with valid inputs from all steps", async () => {
    const { getByText, getByLabelText } = render(
      <Steps
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        animate={false}
      >
        <Step id="guestOfHonor">
          <h2>👤 Who's the party for?</h2>
          <StepField
            as={Input}
            name="guestOfHonor"
            label="Guest of Honor's Name"
          />
        </Step>
        <Step id="theme">
          <h2>🎨 Choose a theme</h2>
          <StepField
            as={Input}
            name="theme"
            label="Party Theme (e.g., '80s, Superheroes, Jungle)"
          />
        </Step>
        <Step id="confirmation">
          <h2>🎉 Ready to plan your surprise party?</h2>
          <p>
            Make sure all the details are correct. You can go back to edit any
            step.
          </p>
        </Step>
        <StepNavbar>
          <PrevButton hide="guestOfHonor">Oops, go back!</PrevButton>
          <NextButton hide="confirmation">What's next?</NextButton>
          <SubmitButton show="confirmation">Plan the party!</SubmitButton>
        </StepNavbar>
      </Steps>,
    );

    const answers = {
      guestOfHonor: "John Doe",
      theme: "80s",
    };

    await user.type(
      getByLabelText("Guest of Honor's Name"),
      answers.guestOfHonor,
    );
    await user.click(getByText("What's next?"));

    await user.type(
      getByLabelText("Party Theme (e.g., '80s, Superheroes, Jungle)"),
      answers.theme,
    );
    await user.click(getByText("What's next?"));

    await user.click(getByText("Plan the party!"));

    expect(handleSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        state: expect.any(Object),
        values: expect.objectContaining(answers),
        answers: expect.objectContaining(answers),
      }),
    );
  });
});
