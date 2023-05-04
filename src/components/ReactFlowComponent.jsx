import React,{ useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactFlow, { 
    ReactFlowProvider,
    useReactFlow,
    MiniMap,
    Controls,
    // Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from '../../../../react-flow/packages/reactflow/dist/esm/index';
import '../../../../react-flow/packages/reactflow/dist/style.css'
import { TextNode } from './TextNode'
import { PlusNode } from './PlusNode';
import LeftBar from './LeftBar';

const initialNodes=[
    // { id: 'sampleTextNode', type: 'textNode', position: { x: 10, y: 10 }, data:{barIcon:true}},
  ]
  

function Flow() {
  const { getIntersectingNodes } = useReactFlow();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [latestNodeId, setLatestNodeId] = useState(null)

  useEffect(()=>{
    fetch('http://localhost:3000/chart').then(response=>{
     return response.json()
    }).then(({edges, nodes})=>{
      setEdges(edges)
      const newNodes = [...initialNodes,...nodes]
      setNodes(newNodes)
    })
  },[])
  const numberOfNodes = nodes.length
  useEffect(()=>{
    setTimeout(()=>{
        const checkingNode = nodes.find(node=>node.id===latestNodeId)
        if(checkingNode){ 
          createIfIntersectsPlusNode(checkingNode)
         }
    },100)   
  },[numberOfNodes])
 
  

  const nodeTypes = useMemo(() => ({ 
    textNode: TextNode,
    plusNode:PlusNode
  }), [])
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
 
  

  function createIfIntersectsPlusNode(node){
    //There should be only one "plus" intersecting nodes. 
    //TODO: change children position, add new plus nodes
    const interNodes = getIntersectingNodes(node)
    
    if(interNodes.length>0&&interNodes[0].id.startsWith('plus-')){
        const inputEdge = edges.find(edge=>edge.target===interNodes[0].id)
        const outputEdge = edges.find(edge=>edge.source===interNodes[0].id)
        setEdges(edges=>{
            const newEdges = edges.filter(edge=> ![inputEdge.id, outputEdge.id].includes(edge.id))
            const newInputEdge = {id:`${inputEdge.source}-${node.id}`, source:inputEdge.source, target:node.id}
            const newOutputEdge = {id:`${node.id}-${outputEdge.target}`, source:node.id, target:outputEdge.target}
            newEdges.push(newInputEdge)
            newEdges.push(newOutputEdge)
            return newEdges
        })
        setNodes(nodes=>nodes.filter(node=> node.id!==interNodes[0].id))
    }
   
  }

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');
      console.log(type)
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: `${(new Date()).getTime()}`,
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  
  return <div style={styles.draggingAreaContainer} ref={reactFlowWrapper}>
         <ReactFlow 
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
           // onNodeDragStop={onNodeDragStop} 
            onDragOver={onDragOver}
            onDrop={onDrop}
            onInit={setReactFlowInstance}
         />
      </div>
 
        
}


function FlowWithProvider() {
  return (
    <ReactFlowProvider>
      <div style={styles.barAndDragging}>
        <LeftBar/>
        <div >
        <Flow>
        </Flow>
        <Controls />
        <MiniMap />
        </div>
      </div>
    </ReactFlowProvider>
  );
}

export default FlowWithProvider;

const styles = {
  barAndDragging:{
    display:'flex'
  },
  draggingAreaContainer:{
    width: "80vw",
    height: "100vh",
  }
}