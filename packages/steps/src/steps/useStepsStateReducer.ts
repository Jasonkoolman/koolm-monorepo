import { Reducer, useCallback, useReducer } from "react";
import { StepsValues, StepId, StepElement, StepsDirection } from "../types";

type StepsReducerState<TStepsValues extends StepsValues> = {
  direction: StepsDirection;
  status: "idle" | "transitioning" | "validating";
  history: StepId[];
  activeSteps: StepElement<TStepsValues>[];
};

type StepsReducerAction<TStepsValues extends StepsValues> =
  | { type: "UPDATE_STATE"; payload: Partial<StepsReducerState<TStepsValues>> }
  | { type: "RESET"; initialStepId: StepId };

const initialState: StepsReducerState<any> = {
  direction: "forward",
  status: "idle",
  history: [],
  activeSteps: [],
};

function stepsReducer<TStepsValues extends StepsValues>(
  state: StepsReducerState<TStepsValues>,
  action: StepsReducerAction<TStepsValues>,
): StepsReducerState<TStepsValues> {
  switch (action.type) {
    case "UPDATE_STATE":
      return { ...state, ...action.payload };
    case "RESET":
      return {
        ...initialState,
        history: [action.initialStepId],
        direction: "backward",
      };
    default:
      return state;
  }
}

function useStepsStateReducer<TStepsValues extends StepsValues>(
  defaultState: Partial<StepsReducerState<TStepsValues>>,
) {
  const [state, dispatch] = useReducer<
    Reducer<StepsReducerState<TStepsValues>, StepsReducerAction<TStepsValues>>
  >(stepsReducer, {
    ...initialState,
    ...defaultState,
  });

  const updateState = useCallback(
    (payload: Partial<StepsReducerState<TStepsValues>>) =>
      dispatch({ type: "UPDATE_STATE", payload }),
    [],
  );

  const resetState = useCallback(
    (initialStepId: StepId) => dispatch({ type: "RESET", initialStepId }),
    [],
  );

  return { state, updateState, resetState };
}

export default useStepsStateReducer;
