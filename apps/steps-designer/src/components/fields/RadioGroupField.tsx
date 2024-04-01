import React from "react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

type RadioGroupFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  label?: string;
  options: { value: string; label: string }[];
} & Omit<React.HTMLAttributes<HTMLDivElement>, "dir">;

const RadioGroupField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field,
  label,
  options = [],
  className,
  ...props
}: RadioGroupFieldProps<TFieldValues, TName>) => {
  return (
    <FormItem className={cn("space-y-3", className)}>
      {label && <FormLabel>{label}</FormLabel>}
      <FormControl>
        <RadioGroup
          {...props}
          onValueChange={field.onChange}
          defaultValue={field.value}
          onBlur={field.onBlur}
          ref={field.ref}
          disabled={field.disabled}
          className="flex flex-col space-y-1"
        >
          {options.map((option) => (
            <FormItem
              key={option.value}
              className="flex items-center space-x-2.5 space-y-0"
            >
              <FormControl>
                <RadioGroupItem value={option.value} />
              </FormControl>
              <FormLabel className="font-normal">{option.label}</FormLabel>
            </FormItem>
          ))}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export { RadioGroupField };
export type { RadioGroupFieldProps };
