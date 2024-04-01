import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface PanelProps {
  title: string;
  children: React.ReactNode;
}

export const Panel = ({ title, children }: PanelProps) => {
  return (
    <Collapsible
      defaultOpen
      className="border-y border-gray-200 dark:border-gray-800"
    >
      <CollapsibleTrigger className="w-[100%] px-4 py-2.5 text-left font-semibold border-b border-gray-200 dark:border-gray-800">
        {title}
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 py-4">{children}</CollapsibleContent>
    </Collapsible>
  );
};
