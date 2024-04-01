import { useState } from "react";
import { Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";
import { StepField } from "@/types";
import { FieldEditor } from "./FieldEditor";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverAnchor, PopoverArrow } from "@radix-ui/react-popover";

export type FieldConfiguratorProps = {
  defaultValues?: StepField[];
};

export const FieldConfigurator = ({
  defaultValues,
}: FieldConfiguratorProps) => {
  const [fields, setFields] = useState<StepField[]>(defaultValues || []);

  const addField = (field: StepField) => {
    setFields((prevFields) => [...prevFields, field]);
  };

  const editField = (index: number, field: StepField) => {
    setFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[index] = field;
      return newFields;
    });
  };

  const removeField = (field: StepField) => {
    setFields((prevFields) => prevFields.filter((f) => f.name !== field.name));
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button>Add Field</Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <FieldEditor onSave={addField} />
        </PopoverContent>
      </Popover>
      <Reorder.Group
        axis="y"
        values={fields}
        onReorder={setFields}
        className="space-y-2 p-4"
      >
        {fields.map((field, index) => (
          <Reorder.Item
            key={field.name}
            value={field}
            className="flex justify-between items-center p-2 bg-gray-100 rounded"
          >
            <Popover>
              <PopoverAnchor>{field.name}</PopoverAnchor>
              <div className="flex items-center">
                <PopoverTrigger asChild>
                  <Button size="sm">Edit</Button>
                </PopoverTrigger>
                <PopoverContent
                  side="left"
                  align="start"
                  className="p-0 w-80 shadow-xl"
                  alignOffset={-10}
                  sideOffset={12}
                >
                  {/* <PopoverOverlay /> */}
                  <FieldEditor
                    field={field}
                    onSave={(field) => editField(index, field)}
                  />
                  <PopoverArrow className="fill-muted drop-shadow-stroke stroke-2 mt-[-1px]" />
                </PopoverContent>

                <Button size="sm" onClick={() => removeField(field)}>
                  Remove
                </Button>
              </div>
            </Popover>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </div>
  );
};

export const PopoverOverlay = () => {
  return (
    <div className="absolute left-0 z-0 top-14 h-screen w-full bg-black bg-opacity-20"></div>
  );
};
