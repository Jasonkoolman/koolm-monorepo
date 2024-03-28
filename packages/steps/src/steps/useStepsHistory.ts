import { useState, useCallback } from "react";
import { StepId } from "../types";

/**
 * Custom hook to manage the navigation history of form steps.
 *
 * This hook initializes with an initial step ID and provides functionalities
 * to manage the history of navigated steps.
 */
export const useStepsHistory = (initialStepId: string) => {
  const [history, setHistory] = useState<string[]>([initialStepId]);

  /**
   * Checks if a given stepId is already in the history.
   */
  const hasEntry = useCallback(
    (stepId: string) => history.includes(stepId),
    [history]
  );

  /**
   * Adds a new entry to the history if it's not already present.
   */
  const addEntry = useCallback(
    (stepId: string) => {
      if (!hasEntry(stepId)) {
        setHistory((prevHistory) => [...prevHistory, stepId]);
      }
    },
    [hasEntry]
  );

  const setHistoryToStep = useCallback(
    (stepId: StepId) => {
      const index = history.indexOf(stepId);
      if (index !== -1) {
        // Set history up to and including the specified step
        const newHistory = history.slice(0, index + 1);
        setHistory(newHistory);
      }
    },
    [history]
  );

  return { history, hasEntry, setHistory, addEntry, setHistoryToStep };
};
