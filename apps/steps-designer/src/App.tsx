import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Canvas } from "@/components/Canvas";
import { Sidebar } from "@/components/Sidebar";

function App() {
  return (
    <div className="app w-[100vw] h-[100vh]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={75}>
          <Canvas />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={25}>
          <Sidebar />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default App;
