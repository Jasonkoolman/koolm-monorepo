import { useCallback, useRef, useMemo } from "react";
import { useForm, UseFormProps, DefaultValues } from "react-hook-form";
import {
  StepsValues,
  StepId,
  StepsFields,
  StepsField,
  FieldName,
  StepsFormHandle,
} from "../types";

type UseStepsFormProps<TStepsValues extends StepsValues = StepsValues> =
  UseFormProps<TStepsValues> & {
    defaultValues?: DefaultValues<TStepsValues>;
  };

/**
 * Hook to manage form state with step-based navigation.
 *
 * Provides methods and properties to interact with a form broken into steps,
 * including setting and retrieving fields based on the step.
 */
export function useStepsForm<TStepsValues extends StepsValues = StepsValues>(
  options: UseStepsFormProps<TStepsValues>
) {
  const methods = useForm<TStepsValues>(options);
  const formRef = useRef<HTMLFormElement>(null);
  const stepsFieldsRef = useRef<StepsFields<TStepsValues>>({} as TStepsValues);
  const { defaultValues } = options;
  const { trigger } = methods;

  /**
   * Validates the steps form.
   *
   * Unmounted fields are not validated by built-in validation.
   *
   * @see https://react-hook-form.com/docs/useform#shouldUnregister
   */
  const validate = useCallback(
    () => trigger(undefined, { shouldFocus: true }),
    [trigger]
  );

  /**
   * Registers a field within a specific step.
   *
   * @param field - The field to set, including its name and associated stepId.
   */
  const setStepField = useCallback((field: StepsField<TStepsValues>) => {
    stepsFieldsRef.current[field.name] = field.stepId;
  }, []);

  /**
   * Retrieves all fields associated with a given stepId. If no stepId is supplied,
   * returns all fields.
   *
   * @param stepId - Optional. The ID of the step for which to retrieve fields.
   * @returns An array of fields belonging to the specified step or all fields if no stepId is provided.
   */
  const getStepFields = useCallback((stepId?: StepId) => {
    return Object.entries(stepsFieldsRef.current).reduce((acc, [name, id]) => {
      if (!stepId || id === stepId) {
        acc.push(name as FieldName<TStepsValues>);
      }
      return acc;
    }, [] as FieldName<TStepsValues>[]);
  }, []);

  const form: StepsFormHandle<TStepsValues> = useMemo(
    () => ({
      control: methods.control,
      watch: methods.watch,
      trigger: methods.trigger,
      reset: methods.reset,
      validate,
      getValues: methods.getValues,
      getFieldState: methods.getFieldState,
      getStepFields,
      setStepField,
      defaultValues: defaultValues || ({} as DefaultValues<TStepsValues>),
      stepsFieldsRef,
    }),
    [methods, validate, defaultValues]
  );

  return {
    formRef,
    form,
    methods,
  };
}
