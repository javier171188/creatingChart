import React, { useCallback, useEffect } from 'react';
import ReactFlow, { 
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
}from '../../../react-flow/packages/reactflow/dist/esm/index';

import '../../../react-flow/packages/reactflow/dist/style.css';

// import chart from '../chart.json';

// const initialNodes = [
//   { id: '1', position: { x: 400, y: 100 }, data: { label: '1' } },
//   { id: '2', position: { x: 400, y: 200 }, data: { label: '2' } },
//   { id: '3', position: { x: 550, y: 300 }, data: { label: '3' } },
//   { id: '4', position: { x: 300, y: 300 }, data: { label: '4' } },
//   { id: '5', position: { x: 400, y: 400 }, data: { label: '5' } },
//   { id: '6', position: { x: 400, y: 500 }, data: { label: '6' } },
// ];
// const initialEdges = [{ id: 'e1-2', source: '1', target: '2' },
//                       { id: 'e2-4', source: '2', target: '4' },
//                       { id: 'e2-3', source: '2', target: '3' },
//                       { id: 'e3-5', source: '3', target: '5' }, 
//                       { id: 'e4-5', source: '4', target: '5' },
//                       { id: 'e5-6', source: '5', target: '6' }];

// const chart = {nodes:initialNodes,edges:initialEdges }


export default function App() {
  
  useEffect(()=>{
    fetch('http://localhost:3000/chart').then(response=>{
     return response.json()
    }).then(({edges, nodes})=>{
      setEdges(edges)
      setNodes(nodes)
    })
  },[])

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}