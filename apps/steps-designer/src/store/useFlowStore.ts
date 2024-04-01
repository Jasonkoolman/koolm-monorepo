import { create } from "zustand";
import {
  Edge,
  OnInit,
  OnConnect,
  OnEdgesChange,
  OnNodesChange,
  OnSelectionChangeParams,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowInstance,
  NodeChange,
  EdgeChange,
  Connection,
  DefaultEdgeOptions,
} from "@xyflow/react";
import { StepData, StepNode } from "@/types";
import { initialNodes, initialEdges } from "@/flow";
import { createNode, updateNode } from "@/lib";

export type FlowState = {
  instance: ReactFlowInstance | null;
  nodes: StepNode[];
  edges: Edge[];
  edgeOptions: DefaultEdgeOptions;
  selectedNodes: StepNode[];
  selectedEdges: Edge[];
  onInit: OnInit;
  onConnect: OnConnect;
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onSelectionChange: (params: OnSelectionChangeParams) => void;
  setNodes: (nodes: StepNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  setEdgeOptions: (options: DefaultEdgeOptions) => void;
  addStep: (...args: any) => void;
  updateStep: (id: string, data: StepData) => void;
  fitView: (duration?: number) => void;
};

export const useFlowStore = create<FlowState>((set, get) => ({
  instance: null,
  nodes: initialNodes as any, // TODO: type any
  edges: initialEdges,
  edgeOptions: {
    type: "default",
    animated: true,
  },
  selectedNodes: [],
  selectedEdges: [],
  onInit: (instance: ReactFlowInstance) => {
    set({ instance });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as StepNode[],
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onSelectionChange: (params: OnSelectionChangeParams) => {
    set({
      selectedEdges: params.edges,
      selectedNodes: params.nodes as StepNode[],
    });
  },
  setNodes: (nodes: StepNode[]) => {
    set({ nodes });
  },
  setSelectedNodes: (nodes: StepNode[]) => {
    set({ selectedNodes: nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  setEdgeOptions: (options: DefaultEdgeOptions) => {
    set({
      edgeOptions: options,
      edges: get().edges.map((edge) => {
        return {
          ...edge,
          ...options,
        };
      }),
    });
  },
  addStep: (data: StepData) => {
    set((state) => {
      const node = createNode(state.nodes, data) as StepNode;
      setTimeout(state.fitView, 20);
      return {
        nodes: [...state.nodes, node],
      };
    });
  },
  updateStep: (id: string, data: StepData) => {
    set((state) => ({
      nodes: updateNode(state.nodes, id, data) as StepNode[],
    }));
  },
  fitView: (duration = 800) => {
    get().instance?.fitView({
      duration,
      maxZoom: 1.25,
      minZoom: 0.75,
    });
  },
}));
