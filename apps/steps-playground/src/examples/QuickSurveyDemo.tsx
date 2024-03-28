import { useFormContext } from "react-hook-form";
import {
  Steps,
  Step,
  SubmitButton,
  ResetButton,
  StepsAnimateConfig,
  useStepsContext,
} from "@koolm/steps";
import { DemoComponentProps } from "./Demo";
import styles from "./QuickSurveyDemo.module.scss";

const animate: StepsAnimateConfig = {
  mode: "root",
  transition: {
    duration: 0.4,
    ease: "circInOut",
  },
  variants: {
    enter: { opacity: 0, scale: 0.25 },
    center: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.25 },
  },
};

const defaultValues = {
  choices: "",
};

function QuickSurveyDemo(props: DemoComponentProps) {
  return (
    <Steps
      animate={animate}
      defaultValues={defaultValues}
      className={styles.survey}
      onSubmit={({ values }) => {
        alert(values.choices);
      }}
    >
      <Step id="step1" style={{ backgroundColor: "#FADCD9" }}>
        <h3>Adventure or Relaxation?</h3>
        <p>Are you more of a thrill-seeker or prefer to relax and unwind?</p>
        <SurveyButton>Adventure 🚴</SurveyButton>
        <SurveyButton>Relaxation 📖</SurveyButton>
      </Step>
      <Step id="step2" style={{ backgroundColor: "#BDE0FE" }}>
        <h3>Favorite Season?</h3>
        <p>Do you love the warmth of summer or the chill of winter?</p>
        <SurveyButton>Summer ☀️</SurveyButton>
        <SurveyButton>Winter ❄️</SurveyButton>
      </Step>
      <Step id="step3" style={{ backgroundColor: "#FEC8D8" }}>
        <h3>City or Countryside?</h3>
        <p>
          Where does your heart belong, bustling cities or peaceful countryside?
        </p>
        <SurveyButton>City 🏙️</SurveyButton>
        <SurveyButton>Countryside 🌄</SurveyButton>
      </Step>
      <Step id="step4" style={{ backgroundColor: "#D8A7B1" }}>
        <h3>Early Bird or Night Owl?</h3>
        <p>When do you feel most energetic and productive?</p>
        <SurveyButton>Early Bird 🌅</SurveyButton>
        <SurveyButton>Night Owl 🌙</SurveyButton>
      </Step>
      <Step id="step5" style={{ backgroundColor: "#99F3BD" }}>
        <h3>Cats or Dogs?</h3>
        <p>Which furry friend do you prefer?</p>
        <SurveyButton>Cats 😺</SurveyButton>
        <SurveyButton>Dogs 🐶</SurveyButton>
      </Step>
      <Step id="step6" style={{ backgroundColor: "#FADCD9" }}>
        <h3>You Have Great Taste</h3>
        <ResetButton>Go Again</ResetButton>
        <SubmitButton>View Preferences</SubmitButton>
      </Step>
      {props.debugger}
    </Steps>
  );
}

function SurveyButton({ children }: { children: string }) {
  const { next } = useStepsContext();
  const { setValue, getValues } = useFormContext();

  const onSelect = () => {
    const values = getValues("choices");
    setValue("choices", values ? `${values + children}` : children);
    next();
  };

  return (
    <button type="button" onClick={onSelect}>
      {children}
    </button>
  );
}

export default QuickSurveyDemo;
