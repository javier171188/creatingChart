import React from 'react';
import ReactFlowComponent from './components/ReactFlowComponent'
import { LeftBar } from './components/leftBar/LeftBar';
import { ReactFlowProvider, MiniMap, Controls } from '../../../react-flow/packages/reactflow/dist/esm';



export default function App() {

  return (
    <ReactFlowProvider>
      <div style={styles.editorContainer}>
          <LeftBar/>
          <ReactFlowComponent/>
          <MiniMap pannable/>
          <Controls/>
      </div>
    </ReactFlowProvider>
  );
}

const styles = {
  editorContainer:{
    display:'flex'
  }
}