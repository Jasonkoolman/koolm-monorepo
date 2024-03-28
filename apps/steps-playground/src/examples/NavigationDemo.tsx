import { Steps, Step, PrevButton, NextButton } from "@koolm/steps";
import { DemoComponentProps } from "./Demo";

function NavigationDemo(props: DemoComponentProps) {
  return (
    <Steps animate={false}>
      <Step id="step1">
        <h2>First step</h2>
        <p>This is the first step</p>
        <PrevButton>Previous</PrevButton>
        <NextButton>Next</NextButton>
      </Step>
      <Step id="step2">
        <h2>Second step</h2>
        <p>This is the second step</p>
        <PrevButton>Previous</PrevButton>
        <NextButton>Next</NextButton>
      </Step>
      <Step id="step3">
        <h2>Third step</h2>
        <p>This is the third step</p>
        <PrevButton>Previous</PrevButton>
        <NextButton>Next</NextButton>
      </Step>
      <Step id="step4">
        <h2>Fourth step</h2>
        <p>This is the fourth step</p>
        <PrevButton>Previous</PrevButton>
        <NextButton>Next</NextButton>
      </Step>
      <Step id="step5">
        <h2>Fifth step</h2>
        <p>This is the fifth and last step</p>
        <PrevButton>Previous</PrevButton>
        <NextButton>Next</NextButton>
      </Step>
      {props.debugger}
    </Steps>
  );
}

export default NavigationDemo;
