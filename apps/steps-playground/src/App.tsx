import Demo from "./examples/Demo";
import PartyPlannerDemo from "./examples/PartyPlannerDemo";
import NavigationDemo from "./examples/NavigationDemo";
import FitnessTrackerDemo from "./examples/FitnessTrackerDemo";
import QuickSurveyDemo from "./examples/QuickSurveyDemo";

export default function App() {
  return (
    <div className="app">
      <header>
        <h1>Steps</h1>
        <p>
          A modern, flexible, and feature-rich library for building multi-step
          forms in React applications. Steps streamlines the process of
          creating, navigating, and managing multi-step forms with ease and
          efficiency. More information and examples are available in the README.
        </p>
      </header>
      <main>
        <Demo title="Party Planner" as={PartyPlannerDemo} />
        <Demo title="Fitness Tracker" as={FitnessTrackerDemo} />
        <Demo title="QuickSurvey" as={QuickSurveyDemo} />
        <Demo title="Navigation" as={NavigationDemo} />
      </main>
      <footer>Made with ❤ by Jason Koolman</footer>
    </div>
  );
}
