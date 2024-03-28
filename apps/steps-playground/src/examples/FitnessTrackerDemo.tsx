import {
  Steps,
  StepsSubmitHandler,
  StepNavbar,
  Step,
  StepView,
  PrevButton,
  NextButton,
  SubmitButton,
} from "@koolm/steps";
import { Input, Select, Checkbox } from "./fields";
import { DemoComponentProps } from "./Demo";

type FitnessTrackerValues = {
  fitnessLevel: string;
  fitnessGoals: string;
  activities: string[];
  availability: string;
};

function FitnessTracker(props: DemoComponentProps) {
  const defaultValues: FitnessTrackerValues = {
    fitnessLevel: "none",
    fitnessGoals: "",
    activities: [],
    availability: "",
  };

  const onSubmit: StepsSubmitHandler<FitnessTrackerValues> = () => {
    alert("Your fitness plan has been submitted successfully!");
  };

  return (
    <Steps animate="child" defaultValues={defaultValues} onSubmit={onSubmit}>
      <Step id="introduction">
        <StepView>
          <h2>Welcome to Your Fitness Journey!</h2>
          <p>Let's set some goals and track your progress.</p>
        </StepView>
        <StepNavbar>
          <NextButton>Begin</NextButton>
        </StepNavbar>
      </Step>

      <Step id="fitnessLevel">
        <StepView>
          <h2>🏋️ Your Current Fitness Level</h2>
          <Select name="fitnessLevel" label="Select your current fitness level">
            <option value="none">None</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="elite">Elite</option>
          </Select>
        </StepView>
        <StepNavbar>
          <PrevButton>Back</PrevButton>
          <NextButton>Next: Set Goals</NextButton>
        </StepNavbar>
      </Step>

      <Step id="fitnessGoals">
        <StepView>
          <h2>🎯 Set Your Fitness Goals</h2>
          <Input
            name="fitnessGoals"
            label="What are your main fitness goals?"
          />
        </StepView>
        <StepNavbar>
          <PrevButton>Back to Fitness Level</PrevButton>
          <NextButton>Next: Choose Activities</NextButton>
        </StepNavbar>
      </Step>

      <Step id="activities">
        <StepView>
          <h2>🚴 Choose Preferred Activities</h2>
          <Checkbox name="activities" label="Running" value="running" />
          <Checkbox name="activities" label="Cycling" value="cycling" />
          <Checkbox name="activities" label="Swimming" value="swimming" />
          <Checkbox name="activities" label="Gym Workouts" value="workouts" />
        </StepView>
        <StepNavbar>
          <PrevButton>Back to Goals</PrevButton>
          <NextButton>Next: Availability</NextButton>
        </StepNavbar>
      </Step>

      <Step id="availability">
        <StepView>
          <h2>🗓️ Your Availability</h2>
          <Input
            name="availability"
            type="number"
            label="How many days per week can you dedicate to training?"
            min={1}
            max={7}
          />
        </StepView>
        <StepNavbar>
          <PrevButton>Back to Activities</PrevButton>
          <NextButton>Next: Review & Submit</NextButton>
        </StepNavbar>
      </Step>

      <Step id="review">
        <StepView>
          <h2>🔍 Review Your Plan</h2>
          <p>
            Please review your fitness plan. You can go back to edit any step.
          </p>
        </StepView>
        <StepNavbar>
          <PrevButton>Back to Availability</PrevButton>
          <SubmitButton>Submit My Plan</SubmitButton>
        </StepNavbar>
      </Step>

      {props.debugger}
    </Steps>
  );
}

export default FitnessTracker;
