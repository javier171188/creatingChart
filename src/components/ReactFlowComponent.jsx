import React,{ useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactFlow, { 
    ReactFlowProvider,
    useReactFlow,
    MiniMap,
    Controls,
    //Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from '../../../../react-flow/packages/reactflow/dist/esm/index';
import '../../../../react-flow/packages/reactflow/dist/style.css'
import { TextNode } from './nodes/TextNode'
import { PlusNode } from './nodes/PlusNode';
import { SquareNode } from './nodes/SquareNode';
import { RectangleNode } from './nodes/RectangleNode';
import { CircleNode } from './nodes/CircleNode';
import { TriangleNode } from './nodes/TriangleNode';
import { TriangleDownNode } from './nodes/TriangleDownNode';
import { StartStopNode } from './nodes/StartStopNode';
import { DiamondNode } from './nodes/DiamondNode';

const initialNodes=[ ]
const displacementDistance = 100 

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
    startStopNode: StartStopNode,
    diamondNode: DiamondNode,
    triangle: TriangleNode,
    triangleDown: TriangleDownNode,
    circle: CircleNode,
    square:SquareNode,
    rectangle: RectangleNode,
    textNode: TextNode,
    plusNode:PlusNode
  }), [])
  const onConnect = useCallback((params) => {
    // const {source, target} = params
    // //const parentNode = nodes.find(node => node.id === source)
    // const childNode = nodes.find(node => node.id === target)
    //   console.log(target, nodes)
    // const newPlusButtonId = `plus-${(new Date()).getTime()}`   
    //   const bottomPlus = {
    //     id: newPlusButtonId,
    //     type:'plusNode',
    //     position:{x:100,y:100},
    //   }
    //   //setNodes(nodes=>nodes.filter(node=> node.id!==interNodes[0].id))
    //   setNodes(nodes=>[...nodes, bottomPlus])


     setEdges((eds) => addEdge(params, eds))
  }, [setEdges]);
 
  
  function createIfIntersectsPlusNode(node){
    const connectingNodes = edges.filter( edge=> edge.source===node.id || edge.target===node.id)
    if (connectingNodes.length>0)return

    const interNodes = getIntersectingNodes(node)
    if(interNodes.length>0&&interNodes[0].id.startsWith('plus-')){
        const inputEdge = edges.find(edge=>edge.target===interNodes[0].id)
        const outputEdge = edges.find(edge=>edge.source===interNodes[0].id)

        if(!inputEdge || !outputEdge )return
        
        //const parentNode = nodes.find(node => node.id === inputEdge.source)
        const childNode = nodes.find(node => node.id === outputEdge.target)
       
        
      const newPlusButtonId = `plus-${(new Date()).getTime()}`   
      const bottomPlus = {
        id: newPlusButtonId,
        type:'plusNode',
        position:{x:childNode.position.x,y:childNode.position.y+displacementDistance},
      }
      //setNodes(nodes=>nodes.filter(node=> node.id!==interNodes[0].id))
      node.position.y = node.position.y+displacementDistance
      setNodes(nodes=>[...nodes, bottomPlus, node])


      moveNodesDown(childNode)
      setEdges(edges=>{
        const newEdges = edges.filter(edge=>  outputEdge.id!==(edge.id))
        // const newInputEdge = {id:`${inputEdge.source}-${node.id}`, source:inputEdge.source, target:node.id}
        // const newOutputEdge = {id:`${node.id}-${outputEdge.target}`, source:node.id, target:outputEdge.target}
        // newEdges.push(newInputEdge)
        // newEdges.push(newOutputEdge)
        const edgeA = {id:`fromPlus-${node.id}-${(new Date()).getTime()}`, source:interNodes[0].id, target:node.id}
        newEdges.push(edgeA)
        const edgeB = {id:`${node.id}-plus-${(new Date()).getTime()}`, source:node.id, target:newPlusButtonId}
        newEdges.push(edgeB)
        const edgeC = {id:`fromPlus-${inputEdge.target}-${(new Date()).getTime()}`, source:newPlusButtonId, target:outputEdge.target}
        newEdges.push(edgeC)
        return newEdges
      })

    
    }
  }


  function moveNodesDown(node){ 
    node.position.y = node.position.y+displacementDistance*2
    setNodes(nodes=>[...nodes,  node])
    const outgoingEdge = edges.find(edg=>edg.source===node.id)
    if(!outgoingEdge)return
    const childNode = nodes.find(nd=> nd.id===outgoingEdge.target)
    moveNodesDown(childNode)
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
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
      
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      //TODO: The ids should have info about the type of node
      const newId = `${(new Date()).getTime()}` 
      
      const newNode = {
        id: newId,
        type,
        position,
        data: { label: `${type} node` },
        selected: true
      };

      setNodes((nds) => {
        nds = nds.map(node=> ({...node, selected:false}))
        return nds.concat(newNode)});
      setLatestNodeId(newId)
    },
    [reactFlowInstance]
  );

  function onNodeDragStop(event, node){
    createIfIntersectsPlusNode(node)
  }
  
  return <div style={styles.draggingAreaContainer} ref={reactFlowWrapper}>
         <ReactFlow 
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeDragStop={onNodeDragStop} 
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
       
        <div style={styles.draggingArea}>
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
    width: "calc(100vw - 70px)",
    height: "100vh",
  },
  draggingArea:{
    background:'rgba(248,248,248,0.85)'
  }
}