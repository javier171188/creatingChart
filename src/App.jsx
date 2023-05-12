import React from 'react';
import ReactFlowComponent from './components/ReactFlowComponent'
import { LeftBar } from './components/LeftBar';
import { ReactFlowProvider } from '../../../react-flow/packages/reactflow/dist/esm';



export default function App() {

  return (
    <ReactFlowProvider>
      <div style={styles.editorContainer}>
          <LeftBar/>
          <ReactFlowComponent/>
      </div>
    </ReactFlowProvider>
  );
}

const styles = {
  editorContainer:{
    display:'flex'
  }
}