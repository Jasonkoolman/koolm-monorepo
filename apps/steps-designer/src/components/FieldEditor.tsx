import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { StepField } from "@/types";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FieldEditorFieldTab } from "./FieldEditorFieldTab";
import { FieldEditorPropertiesTab } from "./FieldEditorPropertiesTab";
import { FieldEditorRulesTab } from "./FieldEditorRulesTab";

type FieldEditorProps = {
  field?: StepField;
  onSave: (field: StepField) => void;
};

export const FieldEditor = ({ field, onSave }: FieldEditorProps) => {
  const methods = useForm<StepField>({
    shouldUnregister: true,
    defaultValues: {
      name: field?.name ?? "",
      type: field?.type ?? "input",
      props: field?.props ?? {},
      rules: field?.rules ?? {},
    },
  });

  const [activeTab, setActiveTab] = React.useState("field");

  const {
    reset,
    handleSubmit,
    formState: { isDirty },
  } = methods;

  const onSubmit = useCallback(
    (data: StepField) => {
      onSave(data);
      reset(data);
    },
    [onSave, reset]
  );

  const onReset = useCallback(() => {
    reset({}, { keepDefaultValues: true });
  }, [field]);

  return (
    <Form {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)}>
          <TabsList className="w-[100%]">
            <TabsTrigger value="field">Field</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
          </TabsList>
          <ScrollArea viewportClassName="max-h-96 pb-1">
            <TabsContent
              value="field"
              forceMount
              hidden={activeTab !== "field"}
              className="m-4"
            >
              <FieldEditorFieldTab />
            </TabsContent>
            <TabsContent
              value="properties"
              forceMount
              hidden={activeTab !== "properties"}
              className="m-4"
            >
              <FieldEditorPropertiesTab />
            </TabsContent>
            <TabsContent
              value="rules"
              forceMount
              hidden={activeTab !== "rules"}
              className="m-4"
            >
              <FieldEditorRulesTab />
            </TabsContent>
          </ScrollArea>
          <div className="flex flex-row gap-3 p-4 border-t bg-muted">
            <Button
              disabled={!isDirty}
              variant="outline"
              className="flex-1"
              onClick={onReset}
            >
              Reset
            </Button>
            <Button
              type="submit"
              disabled={!isDirty}
              className={cn("flex-1 gap-1.5", { "bg-green-600": !isDirty })}
            >
              {isDirty ? "Save" : "Saved"}
            </Button>
          </div>
        </Tabs>
      </form>
    </Form>
  );
};
