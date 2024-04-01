import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Form, FormField } from "./ui/form";
import { InputField } from "./fields/InputField";
import { TextareaField } from "./fields/TextareaField";
import { Button } from "./ui/button";

export type StepFormValues = {
  title: string;
  description?: string;
  fields?: any[];
  buttons?: any[];
};

type StepFormProps = {
  defaultValues?: StepFormValues;
  onSubmit: (data: StepFormValues) => void;
};

export function StepForm({ defaultValues, onSubmit }: StepFormProps) {
  const methods = useForm<StepFormValues>({
    defaultValues: {
      title: "",
      description: "",
      fields: [],
      buttons: [],
      ...(defaultValues || {}),
    },
  });

  const { control, register, reset, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  const onValidSubmit = (data: StepFormValues) => {
    onSubmit(data);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <Form {...methods}>
      <form
        onSubmit={handleSubmit(onValidSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={control}
          name="title"
          render={({ field }) => <InputField field={field} label="Title" />}
        />
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <TextareaField field={field} label="Description" />
          )}
        />
        <ul>
          {fields.map((item, index) => (
            <li key={item.id}>
              <input
                {...register(`fields.${index}.name`)}
                placeholder="Field Name"
              />
              <select {...register(`fields.${index}.type`)}>
                <option value="text">Text</option>
                <option value="number">Number</option>
              </select>
              <button type="button" onClick={() => remove(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
        <Button
          type="button"
          variant="secondary"
          onClick={() => append({ name: "", type: "text" })}
        >
          Add Field
        </Button>
        <Button type="submit">Save Step</Button>
      </form>
    </Form>
  );
}
