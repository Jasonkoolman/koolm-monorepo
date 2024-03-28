import React from "react";
import { useFormContext } from "react-hook-form";

export type InputProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  label?: string;
};

export const Input = ({ name, label, type = "text", ...props }: InputProps) => {
  const id = React.useId();
  const { register } = useFormContext();
  const { required = true, min, max, ...rest } = props;

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        {...rest}
        {...register(name, { required, min, max })}
        id={id}
      />
    </div>
  );
};
