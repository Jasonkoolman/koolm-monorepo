import type { ComponentType } from "react";
import type { FieldName, FieldValues, RegisterOptions } from "react-hook-form";
import type { Node, NodeProps } from "@xyflow/react";

export type CustomNodeComponent<
  TData extends Record<string, any> = Record<string, any>,
  TNodeType extends string = string
> = ComponentType<
  NodeProps & {
    data: TData;
    type: TNodeType;
  }
>;

export type StepNode<TStepData extends StepData = StepData> = Node<TStepData>;

export type StepData = {
  label?: string; // Step ID
  title: string;
  description?: string;
  fields: StepField[];
  buttons: StepButton[];
};

export type StepFieldType =
  | "input"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio-group";

export type StepField<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldName<TFieldValues> = FieldName<TFieldValues>
> = {
  type: StepFieldType;
  name: TFieldName;
  rules?: {
    min?: number;
    max?: number;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    pattern?: string;
  };
  props: Record<string, any>;
};

export type StepButton = StepPrevButton | StepNextButton | StepSubmitButton;

export type StepPrevButton = {
  type: "prev";
  prevStep?: string;
  [key: string]: any;
};

export type StepNextButton = {
  type: "next";
  nextStep?: string;
  [key: string]: any;
};

export type StepSubmitButton = {
  type: "submit";
  [key: string]: any;
};
