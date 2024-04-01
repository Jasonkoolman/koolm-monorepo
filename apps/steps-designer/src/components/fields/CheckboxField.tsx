import React from "react";
import { ControllerRenderProps, FieldPath, FieldValues } from "react-hook-form";
import { cva, type VariantProps } from "class-variance-authority";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const checkboxFieldVariants = cva(
  "flex flex-row items-start space-y-0 space-x-2.5",
  {
    variants: {
      variant: {
        default: "",
        card: "rounded-md border p-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

type CheckboxFieldProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  label: string;
  description?: React.ReactNode;
} & VariantProps<typeof checkboxFieldVariants> &
  React.ButtonHTMLAttributes<HTMLButtonElement>;

const CheckboxField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  field,
  label,
  description,
  variant,
  className,
  ...props
}: CheckboxFieldProps<TFieldValues, TName>) => {
  return (
    <FormItem className={cn(checkboxFieldVariants({ variant, className }))}>
      <FormControl>
        <Checkbox
          {...props}
          checked={field.value}
          onCheckedChange={field.onChange}
          onBlur={field.onBlur}
          disabled={field.disabled}
          ref={field.ref}
        />
      </FormControl>
      <div className="space-y-2 leading-none">
        <FormLabel>{label}</FormLabel>
        {description && <FormDescription>{description}</FormDescription>}
      </div>
      <FormMessage />
    </FormItem>
  );
};

export { CheckboxField };
export type { CheckboxFieldProps };
