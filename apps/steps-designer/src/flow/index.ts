import type { Edge, EdgeTypes } from "@xyflow/react";
import type { Node, NodeTypes } from "@xyflow/react";
import { StepNode } from "@/flow/StepNode";

export const nodeTypes = {
  step: StepNode,
} satisfies NodeTypes;

export const edgeTypes = {
  // Custom edge types
} satisfies EdgeTypes;

export const initialNodes = [
  {
    id: "1",
    type: "step",
    position: { x: 100, y: 100 },
    data: { label: "Node 1" },
  },
  {
    id: "2",
    type: "step",
    position: { x: 300, y: 100 },
    data: { label: "Node 2" },
  },
  {
    id: "3",
    type: "step",
    position: { x: 100, y: 300 },
    data: { label: "Node 3" },
  },
  {
    id: "4",
    type: "step",
    position: { x: 300, y: 300 },
    data: { label: "Node 4" },
  },
] satisfies Node[];

export const initialEdges = [
  {
    id: "1->2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "1->3",
    source: "1",
    target: "3",
    animated: true,
  },
  {
    id: "2->4",
    source: "2",
    target: "4",
    animated: true,
  },
  {
    id: "3->4",
    source: "3",
    target: "4",
    animated: true,
  },
] satisfies Edge[];
