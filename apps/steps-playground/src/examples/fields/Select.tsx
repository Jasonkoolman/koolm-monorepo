import React from "react";
import { useFormContext } from "react-hook-form";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  name: string;
  label: string;
  children: React.ReactNode;
};

export const Select = ({ name, label, children, ...props }: SelectProps) => {
  const id = React.useId();
  const { register } = useFormContext();
  const { required, ...rest } = props;

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <select id={id} {...register(name)} {...rest}>
        {children}
      </select>
    </div>
  );
};
