import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import { CheckboxField, InputField } from "@/components/fields";
import { StepField } from "@/types";

export const FieldEditorRulesTab = () => {
  const { control, watch } = useFormContext<StepField>();
  const fieldType = watch("type");
  const inputType = watch("props.type");

  const { excludeNumeric, excludeString } = useMemo(() => {
    switch (fieldType) {
      case "select":
      case "checkbox":
      case "radio-group":
        return { excludeNumeric: true, excludeString: true };
      case "input":
        return {
          excludeNumeric: inputType !== "number",
          excludeString: inputType === "number",
        };
      case "textarea":
        return {
          excludeNumeric: true,
          excludeString: false,
        };
      default:
        return { excludeNumeric: false, excludeString: false };
    }
  }, [fieldType, inputType]);

  return (
    <div className="space-y-3">
      <FormField
        control={control}
        name="rules.required"
        defaultValue={false}
        render={(props) => (
          <CheckboxField
            field={props.field}
            label="Required"
            description="Allow empty values when unchecked"
          />
        )}
      />
      {!excludeNumeric && (
        <>
          <FormField
            control={control}
            name="rules.min"
            defaultValue={0}
            rules={{ min: 0, max: 1000 }}
            render={(props) => (
              <InputField
                className="mt-2"
                field={props.field}
                label="Min"
                type="number"
              />
            )}
          />
          <FormField
            control={control}
            name="rules.max"
            defaultValue={100}
            rules={{ min: 1, max: 1000 }}
            render={(props) => (
              <InputField
                className="mt-2"
                field={props.field}
                label="Max"
                type="number"
              />
            )}
          />
        </>
      )}
      {!excludeString && (
        <>
          <FormField
            control={control}
            name="rules.minLength"
            defaultValue={0}
            rules={{ min: 0, max: 1000 }}
            render={(props) => (
              <InputField
                className="mt-2"
                field={props.field}
                label="Min length"
                type="number"
              />
            )}
          />
          <FormField
            control={control}
            name="rules.maxLength"
            defaultValue={255}
            rules={{ min: 1, max: 1000 }}
            render={(props) => (
              <InputField
                className="mt-2"
                field={props.field}
                label="Max length"
                type="number"
              />
            )}
          />
        </>
      )}
      {(!excludeNumeric || !excludeString) && (
        <FormField
          control={control}
          name="rules.pattern"
          defaultValue=""
          rules={{
            validate: (value: string | undefined) => {
              if (value) {
                try {
                  new RegExp(value);
                } catch (error) {
                  return false;
                }
              }
              return true;
            },
          }}
          render={(props) => (
            <InputField className="mt-2" field={props.field} label="Pattern" />
          )}
        />
      )}
    </div>
  );
};
