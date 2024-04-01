import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { InputField, SelectField } from "@/components/fields";
import { StepField } from "@/types";

export const FieldEditorFieldTab = () => {
  const { control } = useFormContext<StepField>();

  return (
    <div className="space-y-3">
      <FormField
        control={control}
        name="name"
        rules={{
          required: true,
          pattern: /^[a-z0-9_-]+$/i,
        }}
        render={(props) => (
          <InputField
            field={props.field}
            label="Name"
            description="Unique name for the field."
            readOnly
          />
        )}
      />
      <FormField
        control={control}
        name="type"
        render={(props) => (
          <SelectField
            field={props.field}
            label="Type"
            description="Each type has different properties and rules."
            options={[
              { value: "input", label: "Input" },
              { value: "select", label: "Select" },
              { value: "textarea", label: "Textarea" },
              { value: "radio-group", label: "Radio Group" },
              { value: "checkbox", label: "Checkbox" },
            ]}
          />
        )}
      />
    </div>
  );
};
