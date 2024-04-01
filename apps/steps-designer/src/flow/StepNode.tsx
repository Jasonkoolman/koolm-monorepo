import { memo } from "react";
import { Handle, Position, Node } from "@xyflow/react";
import { CustomNodeComponent, StepData } from "../types";

export type StepNodeProps = Node<StepData>;

function CustomStepNode({ data }: StepNodeProps) {
  return (
    <div className="px-4 py-2 w-40 shadow-md rounded-md bg-white border border-stone-400">
      <Handle
        type="target"
        position={Position.Top}
        className="w-10 min-h-[4px] bg-primary"
      />
      <div className="flex justify-center">
        <div className="font-semibold">{data.label}</div>
        <div className="text-sm text-gray-500">{data.fields?.length}</div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-10 min-h-[4px] bg-primary"
      />
    </div>
  );
}

export const StepNode = memo(CustomStepNode) as unknown as CustomNodeComponent<
  StepData,
  "step"
>;
