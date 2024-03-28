import React from "react";
import { useFormContext } from "react-hook-form";

export type RadioProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  label: string;
  value: string;
};

export const Radio = ({ name, label, value, ...props }: RadioProps) => {
  const { register } = useFormContext();
  const { required = true, ...rest } = props;

  return (
    <label>
      <input
        type="radio"
        value={value}
        {...register(name, { required })}
        {...rest}
      />
      {label}
    </label>
  );
};
