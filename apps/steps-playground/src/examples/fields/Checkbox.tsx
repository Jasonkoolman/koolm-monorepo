import React from "react";
import { useFormContext } from "react-hook-form";

export type CheckboxProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  label: string;
  value: string;
};

export const Checkbox = ({ name, label, value, ...props }: CheckboxProps) => {
  const { register } = useFormContext();
  const { required, ...rest } = props;

  return (
    <label>
      <input
        type="checkbox"
        value={value}
        {...register(name, { required })}
        {...rest}
      />
      {label}
    </label>
  );
};
