import { Reducer, useCallback, useReducer } from "react";
import {
  StepsValues,
  StepElement,
  StepsDirection,
  StepsHistory,
} from "../types";

type StepsReducerState<TStepsValues extends StepsValues> = {
  direction: StepsDirection;
  status: "idle" | "transitioning" | "validating";
  history: StepsHistory;
  activeSteps: StepElement<TStepsValues>[];
};

type StepsReducerAction<TStepsValues extends StepsValues> =
  | { type: "UPDATE_STATE"; payload: Partial<StepsReducerState<TStepsValues>> }
  | { type: "RESET"; history: StepsHistory };

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
        history: action.history,
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
    (history: StepsHistory) => dispatch({ type: "RESET", history }),
    [],
  );

  return { state, updateState, resetState };
}

export default useStepsStateReducer;
