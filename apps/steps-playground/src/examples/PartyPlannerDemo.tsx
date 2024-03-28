import {
  Steps,
  StepsSubmitHandler,
  Step,
  StepNavbar,
  StepField,
  PrevButton,
  NextButton,
  SubmitButton,
  ResetButton,
} from "@koolm/steps";
import { Input, Radio } from "./fields";
import { DemoComponentProps } from "./Demo";

type PartyPlannerValues = {
  guestOfHonor: string;
  theme: string;
  attendees: number;
  outdoor: string;
};

function PartyPlannerDemo(props: DemoComponentProps) {
  const defaultValues: PartyPlannerValues = {
    guestOfHonor: "",
    theme: "",
    attendees: 0,
    outdoor: "",
  };

  const onSubmit: StepsSubmitHandler<PartyPlannerValues> = ({ answers }) => {
    alert(
      `Surprise party planned successfully! 🎉 We'll have a ${answers.theme} theme party for ${answers.guestOfHonor} with ${answers.attendees} guests.`
    );
  };

  return (
    <Steps animate="root" defaultValues={defaultValues} onSubmit={onSubmit}>
      <Step id="guestOfHonor">
        <h2>👤 Who's the party for?</h2>
        <StepField
          as={Input}
          name="guestOfHonor"
          label="Guest of Honor's Name"
        />
      </Step>
      <Step id="theme" active={(values) => values.guestOfHonor === "Jason"}>
        <h2>👗 What's the theme of the party?</h2>
        <StepField
          as={Input}
          name="theme"
          label="Party Theme (e.g., '80s, Superheroes, Jungle)"
        />
      </Step>
      <Step id="attendees">
        <h2>👥 How many guests are we expecting?</h2>
        <StepField
          as={Input}
          name="attendees"
          label="Number of Attendees"
          type="number"
          min={1}
        />
      </Step>
      <Step id="location">
        <h2>📍 Where's the party at?</h2>
        <StepField as={Radio} name="outdoor" label="Outdoor" value="true" />
        <StepField as={Radio} name="outdoor" label="Indoor" value="false" />
      </Step>
      <Step id="confirmation">
        <h2>🎉 Ready to plan your surprise party?</h2>
        <p>
          Make sure all the details are correct. You can go back to edit any
          step.
        </p>
      </Step>
      <StepNavbar>
        <ResetButton>Reset</ResetButton>
        <PrevButton hide="guestOfHonor">Oops, go back!</PrevButton>
        <NextButton hide="confirmation">What's next?</NextButton>
        <SubmitButton show="confirmation">Plan the party!</SubmitButton>
      </StepNavbar>
      {props.debugger}
    </Steps>
  );
}

export default PartyPlannerDemo;
