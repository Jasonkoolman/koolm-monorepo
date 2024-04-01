import { useCallback } from "react";
import {
  ReactFlow,
  Connection,
  Background,
  ReactFlowProps,
  Edge,
} from "@xyflow/react";

import { useFlowStore, FlowState } from "@/store/useFlowStore";
import { validateConnection } from "@/lib";
import { nodeTypes, edgeTypes } from "@/flow";

import "@xyflow/react/dist/base.css";

const selector = (state: FlowState) => ({
  nodes: state.nodes,
  edges: state.edges,
  edgeOptions: state.edgeOptions,
  instance: state.instance,
  onInit: state.onInit,
  onConnect: state.onConnect,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onSelectionChange: state.onSelectionChange,
});

const defaultProps: ReactFlowProps = {
  snapGrid: [40, 40],
  snapToGrid: true,
  fitView: true,
  fitViewOptions: { maxZoom: 1 },
  selectionKeyCode: "Shift",
  multiSelectionKeyCode: "Shift",
  proOptions: { hideAttribution: true },
};

export function Canvas() {
  const {
    nodes,
    edges,
    edgeOptions,
    instance,
    onInit,
    onConnect,
    onNodesChange,
    onEdgesChange,
    onSelectionChange,
  } = useFlowStore(selector);

  /**
   * Prevent cycles in the flow.
   */
  const isValidConnection = useCallback(
    (connection: Connection | Edge) => {
      if (!instance) return false;
      // We are using getNodes and getEdges helpers to make
      // sure we create isValidConnection function only once.
      return validateConnection(
        connection,
        instance.getNodes(),
        instance.getEdges(),
      );
    },
    [instance],
  );

  return (
    <ReactFlow
      className="app-canvas"
      onInit={onInit}
      nodes={nodes}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      edges={edges}
      edgeTypes={edgeTypes}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onSelectionChange={onSelectionChange}
      isValidConnection={isValidConnection}
      defaultEdgeOptions={edgeOptions}
      {...defaultProps}
    >
      <Background gap={[40, 40]} />
    </ReactFlow>
  );
}
