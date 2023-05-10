import React,{ useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ReactFlow, { 
    ReactFlowProvider,
    useReactFlow,
    MiniMap,
    Controls,
    //Background,
    useNodesState,
    useEdgesState,
    //addEdge,
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
    diamond: DiamondNode,
    triangle: TriangleNode,
    triangleDown: TriangleDownNode,
    circle: CircleNode,
    square:SquareNode,
    rectangle: RectangleNode,
    textNode: TextNode,
    plusNode:PlusNode
  }), [])
  const onConnect = (params) => {
        const sourceNode = nodes.find(nd=>nd.id===params.source)
        const targetNode = nodes.find(nd=>nd.id===params.target)

        const plusButtonPosition = {
          x: (sourceNode.position.x + targetNode.position.x)/2,
          y: (sourceNode.position.y + targetNode.position.y)/2
         }

        const newPlusButtonId = `plus-${(new Date()).getTime()}`   
        const buttonPlus = {
          id: newPlusButtonId,
          type:'plusNode',
          position: plusButtonPosition,
          deletable:false
        }
        setNodes(nds=>[...nds,buttonPlus])
        setEdges(edges=>{
          const edgeUp = {id:`${sourceNode.id}-plus-${(new Date()).getTime()}`, source:sourceNode.id, target:newPlusButtonId}
          const edgeDown = {id:`fromPlus-${targetNode.id}-${(new Date()).getTime()}`, source:newPlusButtonId, target:targetNode.id}
          return [...edges,edgeUp,edgeDown]
        })
  }
  
  function createIfIntersectsPlusNode(node){
    const connectingNodes = edges.filter( edge=> edge.source===node.id || edge.target===node.id)
    if (connectingNodes.length>0)return
    
    const interNodes = getIntersectingNodes(node)
    if(interNodes.length>0&&interNodes[0].id.startsWith('plus-')){
        const inputEdge = edges.find(edge=>edge.target===interNodes[0].id)
        const outputEdge = edges.find(edge=>edge.source===interNodes[0].id)

        if(!inputEdge || !outputEdge )return
        
        const childNode = nodes.find(node => node.id === outputEdge.target)
       
        
      const newPlusButtonId = `plus-${(new Date()).getTime()}`   
      const bottomPlus = {
        id: newPlusButtonId,
        type:'plusNode',
        position:{x:childNode.position.x,y:childNode.position.y+displacementDistance},
        deletable:false
      }
      
      node.position.y = node.position.y+displacementDistance
      setNodes(nodes=>[...nodes, bottomPlus])


      moveNodes(childNode,'down')
      setEdges(edges=>{
        const newEdges = edges.filter(edge=>  outputEdge.id!==(edge.id))
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


  function moveNodes(node,yDirection='up'){ 
    const mult = yDirection!=='up'? 1:-1
    setNodes(nodes=>nodes.map(nd=>{
      if(nd.id===node.id){
        return {...nd, position:{x:nd.position.x, y:nd.position.y+ displacementDistance*2*mult}}
      }return nd
    }))
    const outgoingEdge = edges.find(edg=>edg.source===node.id)
    if(!outgoingEdge)return
    const childNode = nodes.find(nd=> nd.id===outgoingEdge.target)
    moveNodes(childNode, yDirection)
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
    [reactFlowInstance, setNodes]
  );

  function onNodeDragStop(event, node){
    createIfIntersectsPlusNode(node)
  }
  
  function onNodesDelete(nodes){
    nodes.forEach(node=>onNodeDelete(node))
  }
 
  function onNodeDelete(node){
    const upperEdge = edges.find(edg=> edg.target===node.id)
    const bottomEdge = edges.find(edg=>edg.source===node.id )

    if(!bottomEdge && !upperEdge)return
   
    if(!bottomEdge){
      const parentPlusNode = nodes.find(nd=> nd.id === upperEdge.source)
      const remainingEdge = edges.find(edg=>edg.target===parentPlusNode.id)
      setNodes(nds => nds.filter(nd=>nd.id!==parentPlusNode.id))
      setEdges(edges=>edges.filter(edg=>edg.id!==upperEdge.id &&edg.id!==remainingEdge.id))
      return
    }
    if(!upperEdge){
      const childPlusNode = nodes.find(nd=>nd.id===bottomEdge.target)
      const remainingEdge = edges.find(edg=>edg.source===childPlusNode.id)
      setNodes(nds => nds.filter(nd=>nd.id!==childPlusNode.id))
      setEdges(edges=>edges.filter(edg=>edg.id!==bottomEdge.id &&edg.id!==remainingEdge.id))
      return
    }
    
    const parentPlusNode = nodes.find(nd=> nd.id === upperEdge.source)
    const childPlusNode = nodes.find(nd=>nd.id===bottomEdge.target)
    const bottomNodeEdge = edges.find(edg=>edg.source===childPlusNode.id)
    setNodes(nds=>nds.filter(nd=>nd.id!==childPlusNode.id))
    
    const newEdge = {id:`fromPlus-${bottomNodeEdge.target}-${(new Date()).getTime()}`, source:parentPlusNode.id, target:bottomNodeEdge.target}
    setEdges(edges=>[...edges.filter(edg=>edg.target!==bottomNodeEdge.target),newEdge])

    const newBottomNode = nodes.find(nd=>nd.id === bottomNodeEdge.target)
    moveNodes(newBottomNode,'up')
  }
  
  function onEdgesDelete(edges){
    //TODO: Distinguish when more than one edge have been manually deleted from two edges have
    // disappeared because its node has been deleted
    if(edges.length>1) return
    edges.forEach(edge=>onEdgeDelete(edge))
  }
  function onEdgeDelete(edge){
    const sourceNode = nodes.find(nd=>nd.id===edge.source)
    const targetNode = nodes.find(nd=>nd.id===edge.target)

    let remainingEdge
    if(sourceNode.id.startsWith('plus-')){
      //Delete up
      remainingEdge = edges.find(edg=>edg.target===sourceNode.id)
      setNodes(nds => nds.filter(nd=>nd.id!==sourceNode.id))      
    }else{
      //delete down
      remainingEdge = edges.find(edg=>edg.source===targetNode.id)
      setNodes(nds => nds.filter(nd=>nd.id!==targetNode.id))  
    }
    
    setEdges(edgs=>edgs.filter(edg=>edg.id!==remainingEdge.id))
    
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
            onNodesDelete={onNodesDelete}
            onEdgesDelete={onEdgesDelete}
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