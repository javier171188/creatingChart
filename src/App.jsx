import React from 'react';
import ReactFlowComponent from './components/ReactFlowComponent'
import { LeftBar } from './components/LeftBar';



export default function App() {

  return (
    <div style={styles.editorContainer}>
        <LeftBar/>
        <ReactFlowComponent/>
    </div>
  );
}

const styles = {
  editorContainer:{
    display:'flex'
  }
}