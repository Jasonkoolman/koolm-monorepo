import React from "react";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

type TextareaFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: string;
  description?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextareaField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field,
  label,
  description,
  className,
  ...props
}: TextareaFieldProps<TFieldValues, TName>) => {
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Textarea {...props} {...field} />
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

export { TextareaField };
export type { TextareaFieldProps };
