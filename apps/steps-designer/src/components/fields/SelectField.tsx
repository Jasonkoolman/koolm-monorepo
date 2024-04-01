import React from "react";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";

type SelectFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  description?: React.ReactNode;
  className?: string;
} & React.ComponentProps<typeof Select>;

const SelectField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field,
  label,
  options,
  placeholder,
  description,
  className,
  ...props
}: SelectFieldProps<TFieldValues, TName>) => {
  return (
    <FormItem className={className}>
      <FormLabel>{label}</FormLabel>
      <Select
        {...props}
        onValueChange={field.onChange}
        value={field.value}
        disabled={field.disabled}
      >
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
};

export { SelectField };
export type { SelectFieldProps };
