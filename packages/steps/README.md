# Steps

A modern library for creating, navigating, and managing multi-step forms in React. Steps makes it easy to break down complex forms and processes into manageable steps.

- 🛠 Easy integration: Plug and play with existing React projects.
- 🔧 Customizable steps: Flexibly define steps with custom content and navigation.
- 🔄 Dynamic navigation: Built-in Next, Prev, and Submit buttons with dynamic visibility.
- 🎨 Style agnostic: Full control over the form's aesthetics.
- 🔄 Animated transitions: Smooth step transitions for enhanced UX with framer-motion.
- 📋 Form state management: Seamless integration with react-hook-form.
- 🚦 Conditional rendering: Conditional step and button rendering.
- 🌟 Versatile flows: Supports both linear and non-linear workflows.
- 💡 Contextual control: Manage the form flow from any component.

## Table of Contents

1. [What is Steps?](#what-is-steps)
2. [When to Use Steps](#when-to-use-steps)
3. [Quickstart](#quickstart)
4. [Usage](#usage)
5. [Advanced Options](#advanced-options)
6. [The Ideas Behind Steps](#the-ideas-behind-steps)
7. [Contributing](#contributing)
8. [License](#license)

## What is Steps?

Steps is a React library designed for building multi-step forms, transforming complex data collection into a streamlined, user-friendly process. It's suited for managing intricate workflows by breaking them down into structured, sequential steps. This makes it perfect for a wide range of applications, from onboarding new users to conducting detailed surveys.

By organizing forms into digestible pieces, Steps ensures that users can navigate through information without feeling overwhelmed. It turns potentially tedious forms into engaging, conversation-like experiences, enhancing both the creation process for developers and the completion process for users. Steps is about simplifying interactions to achieve clearer, more effective outcomes.

## When to use Steps

Understanding where Steps excels and where it might not be the best fit will help you decide if it's the right choice for your project.

Steps is best used when you need to:

- ✔️ Gather detailed information in a user-friendly manner.
- ✔️ Sequentially guide users through a process.
- ✔️ Present conditional content based on user input.

Steps is not ideal for:

- ❌ Infinite sliders/carousels
- ❌ Simple, single-step forms
- ❌ Real-time data display

Steps flows have a start and end, suitable for achieving a definitive form state for actionable outcomes. With Steps, you can design flexible flows with multiple endpoints, enabling submissions at different stages of the user journey.

## Quickstart

Install the package with npm or yarn:

```
npm install @koolm/steps
// or
yarn add @koolm/steps
```

Here's a quick example to incorporate into your React component:

```jsx
import React from "react";
import {
  Steps,
  Step,
  StepNavbar,
  NextButton,
  PrevButton,
  SubmitButton,
  StepField,
} from "@koolm/steps";
import { Input } from "./components/Input";

const defaultValues = {
  guestOfHonor: "",
  theme: "",
};

const MyForm = () => {
  const handleSubmit = (answers) => {
    console.log("Submitted form", answers);
  };

  return (
    <Steps defaultValues={defaultValues} onSubmit={handleSubmit}>
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
    </Steps>
  );
};

export default MyForm;
```

See the `examples` folder for various, more advanced, examples.

## Usage

### The Steps Component

The `<Steps>` component acts as the orchestrator for your multi-step form, managing the navigation, state, and context for all child components. Wrap your individual `<Step>` components with `<Steps>`, specifying any initial values, submission handlers, and optional configurations like animation mode or initial step.

```jsx
<Steps defaultValues={initialValues} onSubmit={handleSubmit}>
  {/* Steps go here */}
</Steps>
```

### The Step Component

The `Step` component defines an individual part of a multi-step form. Assign each step a unique `id` and include the related form elements within. To manage which steps are presented to the user, the `active` property can be used. This property accepts a function that returns a boolean, allowing steps to be conditionally rendered based on form values or other criteria.

```jsx
<Step id="personalInfo" active={(values) => values.age >= 18}>
  {/* Step content goes here */}
</Step>
```

### Linear and Non-linear Flows

When designing multi-step forms, you may encounter two types of flows: linear and non-linear. Linear flows follow a fixed sequence of steps without variation, while non-linear flows can change depending on user input, conditions, or other logic. `@koolm/steps` is designed to handle both flow types.

**Linear Flows**

In a linear flow, users progress through a predefined set of steps in order. Each step must be completed before moving to the next, with no branching or skipping steps. This is common in scenarios like checkout processes or application forms.

Example of a linear flow:

```jsx
<Steps onSubmit={handleSubmit}>
  <Step id="info"> {/* User Info Form */} </Step>
  <Step id="shipping"> {/* Shipping Details Form */} </Step>
  <Step id="payment"> {/* Payment Form */} </Step>
</Steps>
```

**Non-linear (Conditional) Flows**

Non-linear flows allow for a dynamic path through the form steps. Steps can be skipped, repeated, or chosen based on user inputs or other conditions. This approach is useful for complex forms that require conditional logic to determine the next step, such as surveys or registrations with varying requirements.

Example of a non-linear flow with conditional steps:

```jsx
<Steps onSubmit={handleSubmit}>
  <Step id="start">{/* Starting Form */}</Step>
  <Step id="conditionalStep" active={(values) => values.option === "yes"}>
    {/* Conditional Form */}
  </Step>
  <Step id="end">{/* Final Form */}</Step>
</Steps>
```

Example of a non-linear flow with navigation buttons:

```jsx
<Steps onSubmit={handleSubmit}>
  <Step id="start">
    <NextButton stepId="end">
  </Step>
  <Step id="conditionalStep">
    {/* Conditional Form */}
  </Step>
  <Step id="end">
    <PrevButton stepId="start">
  </Step>
</Steps>
```

### Handling Form Data

When the form is submitted, Steps provides two distinct objects: `values` and `answers`.

- `values` contains all form data from every step, regardless of whether a step was active or not. This is straightforward for linear flows where all data is relevant.
- `answers` contains data only from the active steps that the user actually interacted with. This is important for non-linear flows, ensuring that you only process the data relevant to the user's journey through the form.

To make sure `answers` is accurate, you must use the `StepField` component to register each form field within its step. This allows Steps to track the steps and their associated data effectively.

Here's an example of how the `onSubmit` handler provides both `values` and `answers`:

```jsx
const MyForm = () => {
  const handleSubmit = ({ answers, values }) => {
    console.log("Relevant answers based on user journey:", answers);
    console.log("All form values:", values);
  };

  return <Steps onSubmit={handleSubmit}>{/* Steps go here */}</Steps>;
};
```

Using `answers` is especially recommended for non-linear forms with conditional fields, as it respects the user's navigation history and provides a cleaner, more relevant dataset for processing or analysis.

### Navigation Buttons

`NextButton`, `PrevButton`, and `SubmitButton` facilitate navigation between steps. They can be shown or hidden depending on the form's current state or step by using the `show` and `hide` properties.

```jsx
<StepNavbar>
  <PrevButton hide="first">Back</PrevButton>
  <NextButton hide="last">Next</NextButton>
  <SubmitButton show="final">Submit</SubmitButton>
</StepNavbar>
```

### StepField and Registration

The `StepField` component is designed to register form fields with their respective steps. This feature enables the filtering of answers based on the path a user takes through the form. By tracking which steps were actually part of the user's journey, `StepField` ensures that only relevant data from steps visited in the final navigation history is considered.

```jsx
<StepField as={InputComponent} name="email" placeholder="Enter your email" />
```

### StepView and Animations

`StepView` enhances the user experience with animated transitions between steps. It supports two modes of animation:

- `animate="root"`: Animates the entire step content as one unit.
- `animate="child"`: Allows for individual elements within the step to be animated for a more dynamic effect.

The placement of `StepNavbar` relative to `StepView` determines its inclusion in the transition animation.

Example with `animate="child"`:

```jsx
<Step id="welcome">
  <StepView>
    <h2>Welcome!</h2>
    <p>Let's get started by entering your basic information below.</p>
  </StepView>
  <StepNavbar>
    <NextButton>Start</NextButton>
  </StepNavbar>
</Step>
```

## Advanced Options

Dive deeper into the capabilities of Steps for more advanced use cases.

### Data Processing with onForward and onBackward

Leverage `onForward` and `onBackward` for (async) operations like data validation or API calls. Navigation halts if these callbacks return `false`.

```jsx
const handleForward = async (currentStep, values) => {
  const isValid = await validateData(values);
  return isValid; // Return false to prevent navigation
};

const handleBackward = async (currentStep, values) => {
  console.log("Moving back from", currentStep.id);
  return true; // Always allow backward navigation
};

<Steps
  onForward={handleForward}
  onBackward={handleBackward}
  onSubmit={({ answers }) => console.log(answers)}
>
  {/* Step components */}
</Steps>;
```

### Conditional Navigation Buttons

Control navigation button visibility using `show` and `hide` props, showcasing various scenarios.

```jsx
<StepNavbar>
  <PrevButton hide={true}>Back</PrevButton> {/* Always hidden */}
  <PrevButton hide={0}>Back</PrevButton> {/* Hidden only on the first step */}
  <NextButton show="confirmation">Confirm</NextButton>{" "}
  {/* Shown only on "confirmation" */}
  <SubmitButton show={-1}>Submit</SubmitButton> {/* Hidden only on the last step */}
</StepNavbar>
```

### Customizing Step Transitions

Define your animation configurations outside your component for clarity, then pass it to the `Steps` component.

```jsx
const animationConfig = {
  mode: "child",
  transition: { duration: 0.5 },
  variants: {
    enter: { opacity: 0, x: -100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 100 },
  },
};

<Steps animate={animationConfig}>{/* Step components */}</Steps>;
```

### Accessing State and Control

Utilize `useStepsContext` within any child component of `Steps` to access form state and control navigation programmatically.

```jsx
const CustomComponent = () => {
  const { next, prev, reset, state, form } = useStepsContext();

  return (
    <div>
      <p>Current Step: {state.currentStep.id}</p>
      <p>Current Values: {JSON.stringify(form.getValues())}</p>
      <button onClick={prev}>Back</button>
      <button onClick={next}>Next</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

## The Ideas Behind Steps

Understanding Steps' core principles can help developers leverage its full potential, whether you're tailoring it to unique project needs, troubleshooting, or contributing to its growth.

### Key Characteristics

Steps forms are designed with these guiding principles:

- **Defined Start and Endpoints:** Each form has a clear beginning and concludes at an endpoint defined by `<SubmitButton>` placements, enabling varied completion paths based on user navigation.

- **Purpose-Driven:** Steps aims to streamline the process of gathering all necessary information to achieve a conclusive, actionable form state, suitable for further processing or decision-making.

### Simple Parts, Complex Forms

At its core, Steps is about using simple, reusable components to build complex forms. It's designed for adaptability and future growth, laying the groundwork for potential high-level abstractions like JSON-based form configurations.

### Keeping Steps in Order

Steps directly processes its child components to preserve the declared order of `<Step>` elements. It identifies `<Step>` components by using their displayName, which eliminates the need for context to register steps and explicitly set their order.

### Dynamic Navigation, Not a State Machine

Steps is not a state machine. It doesn't preset navigation paths. Instead, Steps dynamically responds to user actions, enabling a wide range of user-driven navigation scenarios without needing to know all possible paths in advance. This approach allows developers to build forms that adapt to user inputs and decisions, offering flexibility in how forms are structured and how users interact with them.

---

## Contributing

Contributions to Steps are welcome! Whether it's reporting bugs, discussing new features, or submitting pull requests, your input is valuable to making Steps better for everyone.

Before contributing, please read our contributing guidelines to understand the process and how best to contribute.

## License

Steps is [MIT licensed](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute it as part of your projects.

## Roadmap

- One form vs. multiple forms: https://github.com/orgs/react-hook-form/discussions/3714#discussioncomment-286340
- Read https://github.com/react-hook-form/react-hook-form/issues/4355
