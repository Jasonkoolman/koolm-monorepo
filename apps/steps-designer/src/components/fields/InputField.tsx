import React from "react";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

type InputFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  label?: string;
  description?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const InputField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field,
  label,
  type = "text",
  description,
  className,
  ...props
}: InputFieldProps<TFieldValues, TName>) => {
  return (
    <FormItem className={className}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <Input type={type} {...props} {...field} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

export { InputField };
export type { InputFieldProps };
