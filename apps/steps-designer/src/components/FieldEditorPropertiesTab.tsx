import React from "react";
import { useFormContext, useFieldArray, Control } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { InputField, SelectField } from "@/components/fields";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";

function getFieldComponents(fieldType: string, control: Control) {
  switch (fieldType) {
    case "input":
    case "textarea":
      return [
        <InputProperties control={control} />,
        <CommonFieldProperties control={control} />,
      ];
    case "checkbox":
      return [<CheckboxProperties control={control} />];
    case "radio-group":
    case "select":
      return [
        <OptionsProperties control={control} />,
        <CommonFieldProperties control={control} />,
      ];
    default:
      return [null];
  }
}

export const FieldEditorPropertiesTab = () => {
  const { control, watch } = useFormContext();
  const fieldType = watch("type");

  const fieldComponents = getFieldComponents(fieldType, control);

  return (
    <div className="space-y-3">
      {fieldComponents.map((Component, index) => (
        <React.Fragment key={index}>{Component}</React.Fragment>
      ))}
    </div>
  );
};

const CommonFieldProperties = ({ control }: { control: Control }) => {
  return (
    <>
      <FormField
        control={control}
        name="props.label"
        defaultValue=""
        render={({ field }) => <InputField field={field} label="Label" />}
      />
      <FormField
        control={control}
        name="props.placeholder"
        defaultValue=""
        render={({ field }) => <InputField field={field} label="Placeholder" />}
      />
      <FormField
        control={control}
        name="props.description"
        defaultValue=""
        render={({ field }) => <InputField field={field} label="Description" />}
      />
    </>
  );
};

const InputProperties = ({ control }: { control: Control }) => {
  return (
    <FormField
      control={control}
      name="props.type"
      defaultValue="text"
      render={({ field }) => (
        <SelectField
          field={field}
          label="Type"
          options={[
            { value: "color", label: "Color" },
            { value: "date", label: "Date" },
            { value: "datetime-local", label: "Datetime local" },
            { value: "email", label: "Email" },
            { value: "number", label: "Number" },
            { value: "password", label: "Password" },
            { value: "tel", label: "Telephone number" },
            { value: "text", label: "Text" },
            { value: "url", label: "URL" },
          ]}
        />
      )}
    />
  );
};

const CheckboxProperties = ({ control }: { control: Control }) => {
  return (
    <>
      <FormField
        control={control}
        name="props.label"
        defaultValue=""
        rules={{ required: true }}
        render={({ field }) => <InputField field={field} label="Label" />}
      />
      <FormField
        control={control}
        name="props.value"
        defaultValue="text"
        rules={{ required: true, pattern: /^[a-z0-9_-]+$/i }}
        render={({ field }) => <InputField field={field} label="Value" />}
      />
    </>
  );
};

const OptionsProperties = ({ control }: { control: Control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "props.options",
  });

  return (
    <div className="space-y-2">
      <Label id="field-options">Options</Label>
      {fields.map((item, index) => (
        <div key={item.id} className="flex flex-row items-center gap-2">
          <FormField
            control={control}
            name={`props.options.${index}.label`}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <InputField
                field={field}
                placeholder="Label"
                aria-label="Option label"
              />
            )}
          />
          <FormField
            control={control}
            name={`props.options.${index}.value`}
            defaultValue=""
            rules={{ required: true }}
            render={({ field }) => (
              <InputField
                field={field}
                placeholder="Value"
                aria-label="Option value"
              />
            )}
          />
          <Button
            variant="outline"
            size="icon"
            title="Remove ption"
            onClick={() => remove(index)}
          >
            <Trash2Icon className="size-4" />
          </Button>
        </div>
      ))}
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => append({ value: "" })}
        >
          Add option
        </Button>
      </div>
    </div>
  );
};
