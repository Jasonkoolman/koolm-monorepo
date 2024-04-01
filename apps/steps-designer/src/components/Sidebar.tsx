import { useCallback } from "react";
import { useFlowStore, FlowState } from "../store/useFlowStore";
import { StepForm, StepFormValues } from "./StepForm";
import { Panel } from "./Panel";
import { Button } from "./ui/button";
import { FieldConfigurator } from "./FieldConfigurator";

const selector = (state: FlowState) => ({
  selectedNode:
    state.selectedNodes.length === 1 ? state.selectedNodes.at(0) : null,
  selectedEdge:
    state.selectedEdges.length === 1 ? state.selectedEdges.at(0) : null,
  updateStep: state.updateStep,
  addStep: state.addStep,
  setEdgeOptions: state.setEdgeOptions,
  fitView: state.fitView,
});

export function Sidebar() {
  const {
    selectedNode,
    selectedEdge,
    addStep,
    updateStep,
    setEdgeOptions,
    fitView,
  } = useFlowStore(selector);

  const handleAddStep = useCallback(() => {
    addStep({
      title: `Step ${Math.floor(Math.random() * 100)}`,
      description: "A new step",
      fields: [
        {
          type: "text",
          name: "name",
          label: "Your Name",
          validate: { required: true },
        },
      ],
      buttons: [{ type: "next", label: "Next", stepId: "2" }],
    });
  }, []);

  const handleSetEdgeProps = useCallback(() => {
    setEdgeOptions({
      animated: false,
      type: "smoothstep",
    });
  }, []);

  const handleFitView = useCallback(() => {
    fitView();
  }, []);

  const handleSubmit = useCallback(
    (data: StepFormValues) => {
      if (selectedNode) {
        updateStep(selectedNode.id, data);
      }
    },
    [selectedNode]
  );

  return (
    <div className="app-sidebar">
      <Button onClick={handleAddStep}>Add Step</Button>
      <Button onClick={handleSetEdgeProps}>Update edges</Button>
      <Button onClick={handleFitView}>Fit view</Button>

      {/* <StepDialog /> */}

      <Panel title="Flow">Settings</Panel>

      <FieldConfigurator
        defaultValues={[
          { name: "FirstField", type: "input", props: {}, rules: {} },
          { name: "SecondField", type: "input", props: {}, rules: {} },
        ]}
      />

      {selectedNode && (
        <Panel title="Step">
          <StepForm defaultValues={selectedNode.data} onSubmit={handleSubmit} />
        </Panel>
      )}
      {selectedEdge && (
        <Panel title="Connection">
          <div>
            {selectedEdge.source} &gt; {selectedEdge.target}
          </div>
        </Panel>
      )}
    </div>
  );
}
