import { Node } from "@xyflow/react";
import { StepData } from "../types";

const tileHeight = 20;
const nodeHeight = tileHeight * 2;
const verticalSpacing = tileHeight * 2;

/**
 * Creates a new step node and positions it below the lowest existing node.
 *
 * @param nodes The current array of nodes in the flow to calculate the new node's position.
 * @param data Data for the new step.
 * @returns A new node object ready to be added to the flow.
 */
export function createNode(nodes: Node[], data: StepData): Node {
  const nextId = String(nodes.length + 1);

  // Find the lowest node's y position
  const lowestNode = nodes.reduce((lowest, node) => {
    return !lowest || node.position.y > lowest.position.y ? node : lowest;
  });

  const xPos = lowestNode ? lowestNode.position.x : 0;
  const yPos = lowestNode
    ? lowestNode.position.y + (nodeHeight + verticalSpacing)
    : 0;

  return {
    id: nextId,
    type: "step",
    position: { x: xPos, y: yPos },
    data: {
      label: data.label ?? nextId,
      title: data.title,
      description: data.description,
      fields: data.fields,
      buttons: data.buttons,
    },
  };
}
