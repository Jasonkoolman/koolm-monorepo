import { Connection, Edge, Node, getOutgoers } from "@xyflow/react";

/**
 * Checks if the proposed connection creates a cycle or connects a node to itself.
 *
 * @param connection The proposed connection.
 * @param nodes An array of the current nodes in the flow.
 * @param edges An array of the current edges in the flow.
 * @returns true if the connection is valid, false otherwise.
 */
export const validateConnection = (
  connection: Connection | Edge,
  nodes: Node[],
  edges: Edge[]
): boolean => {
  const targetNode = nodes.find((node) => node.id === connection.target);
  const sourceNode = nodes.find((node) => node.id === connection.source);

  // Check if connecting a node to itself
  if (sourceNode && targetNode && sourceNode.id === targetNode.id) {
    return false;
  }

  const hasCycle = (node: Node, visited: Set<string> = new Set()): boolean => {
    if (visited.has(node.id)) {
      return true;
    }

    visited.add(node.id);
    const outgoers = getOutgoers(node, nodes, edges);

    for (const outgoer of outgoers) {
      if (
        outgoer.id === connection.source ||
        hasCycle(outgoer, new Set(visited))
      ) {
        return true;
      }
    }

    return false;
  };

  return targetNode ? !hasCycle(targetNode) : false;
};
