import React,{ useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ReactFlow, { 
    useReactFlow,
    useNodesState,
    useEdgesState,
    useViewport,
    //addEdge,
} from '../../../../react-flow/packages/reactflow/dist/esm/index';
import '../../../../react-flow/packages/reactflow/dist/style.css'
import { PlusNode } from './nodes/PlusNode/PlusNode';
import { StartEndNode } from './nodes/StartEndNode';
import { FigureNode } from './nodes/FigureNode';
import { setLatestNodeId } from '../stateManagement/slices/reactFlow';
import { nodeSizes } from '../utils/nodesSizes';
import { OptionsNode } from './nodes/OptionsNode';
import { generateNodeObj } from '../utils/generateNodeObj';
import { IfNode } from './nodes/IfNode/IfNode';
import { InternalHandler } from './nodes/InternalHandler';
import { mergeNodeToFlow, moveNodes } from '../utils/mergingFunctions';

const initialNodes=[ ]

export default function Flow() {
  const { addEdges,  getIntersectingNodes } = useReactFlow();
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const latestNodeId = useSelector(state => state.reactFlow.latestNodeId)
  const dispatch = useDispatch()
  const { zoom } = useViewport()
  
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
    startEndNode: StartEndNode,
    plusNode:PlusNode,
    figure: FigureNode,
    options: OptionsNode,
    ifNode: IfNode,
    internalHandler: InternalHandler
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
    const connectingEdges = edges.filter( edge=> edge.source===node.id || edge.target===node.id)
    if (connectingEdges.length>0)return
    
    const interNodes = getIntersectingNodes(node)
    if(interNodes.length>0&&interNodes[0].id.startsWith('plus-')){
      mergeNodeToFlow({plusNode:interNodes[0], newNode:node, edges, nodes, setEdges, setNodes, zoom})   
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
      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }
      
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left-37,
        y: event.clientY - reactFlowBounds.top-37,
      });
      
      const {newEdges, newNodes} = generateNodeObj({position, type})
      
      setNodes((nds) => {
        nds = nds.map(node=> ({...node, selected:false}))
        return nds.concat(newNodes)});
      addEdges(newEdges)
      dispatch(setLatestNodeId(newNodes[0].id))
    },
    [reactFlowInstance, setNodes, addEdges]
  );
    console.log(nodes)
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
      setEdges(edges=>edges.filter(edg=>edg.id!==upperEdge.id &&edg.id!==remainingEdge?.id))
      return
    }
    if(!upperEdge){
      const childPlusNode = nodes.find(nd=>nd.id===bottomEdge.target)
      const remainingEdge = edges.find(edg=>edg.source===childPlusNode.id)
      setNodes(nds => nds.filter(nd=>nd.id!==childPlusNode.id))
      setEdges(edges=>edges.filter(edg=>edg.id!==bottomEdge.id &&edg.id!==remainingEdge?.id))
      return
    }
    
    const parentPlusNode = nodes.find(nd=> nd.id === upperEdge.source)
    const childPlusNode = nodes.find(nd=>nd.id===bottomEdge.target)
    const bottomNodeEdge = edges.find(edg=>edg.source===childPlusNode.id)
    setNodes(nds=>nds.filter(nd=>nd.id!==childPlusNode.id))
    
    const newEdge = {id:`fromPlus-${bottomNodeEdge.target}-${(new Date()).getTime()}`, source:parentPlusNode.id, target:bottomNodeEdge.target}
    setEdges(edges=>[...edges.filter(edg=>edg.target!==bottomNodeEdge.target),newEdge])

    const newBottomNode = nodes.find(nd=>nd.id === bottomNodeEdge.target)
    moveNodes(newBottomNode,'up', edges, nodes, setNodes, zoom)
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