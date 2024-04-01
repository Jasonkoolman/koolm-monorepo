import { Node } from "@xyflow/react";
import { StepData } from "../types";

/**
 * Updates a step node with new data within an array of nodes.
 *
 * @param nodes The current array of nodes in the flow.
 * @param id The ID of the node to update.
 * @param data The new data for the node.
 * @returns A new array of nodes with the specified node updated.
 */
export function updateNode(nodes: Node[], id: string, data: StepData): Node[] {
  const index = nodes.findIndex((node) => node.id === id);
  if (index === -1) return nodes; // Node not found, return original array

  const updatedNode = {
    ...nodes[index],
    data: { ...nodes[index].data, ...data },
  };

  return [...nodes.slice(0, index), updatedNode, ...nodes.slice(index + 1)];
}
