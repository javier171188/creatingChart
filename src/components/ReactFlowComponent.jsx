import React,{ useCallback, useEffect, useMemo } from 'react'
import ReactFlow, { 
    ReactFlowProvider,
    useReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
} from '../../../../react-flow/packages/reactflow/dist/esm/index';
import '../../../../react-flow/packages/reactflow/dist/style.css'
import { TextNode } from './TextNode'
import { PlusNode } from './PlusNode';

const initialNodes=[
    { id: 'sampleTextNode', type: 'textNode', position: { x: 10, y: 10 }, data:{barIcon:true}},
  ]
  

function Flow() {
  const { getIntersectingNodes } = useReactFlow();
  useEffect(()=>{
    fetch('http://localhost:3000/chart').then(response=>{
     return response.json()
    }).then(({edges, nodes})=>{
      setEdges(edges)
      const newNodes = [...initialNodes,...nodes]
      setNodes(newNodes)
    })
  },[])
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const nodeTypes = useMemo(() => ({ 
    textNode: TextNode,
    plusNode:PlusNode
  }), [])
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
 
  function onNodeDragStop(event, node){
    if(node.id==='sampleTextNode'){
      setNodes(nodes=> nodes.map(node=> node.id==='sampleTextNode'
                                                ? {...node, position:{ x: 10, y: 10 }} 
                                                :node
        )
      )
      const newNode = {id:`textNode-${(new Date()).getTime()}`, type: 'textNode', position: node.position, data:{barIcon:false}}
      setNodes(nodes=>[...nodes,newNode])
    }
    createIfIntersectsPlusNode(node)
  }  

  function createIfIntersectsPlusNode(node){
    const interNodes = getIntersectingNodes(node)
    //There should be only one "plus" intersecting nodes. TODO: change children position
    if(interNodes.length>0&&interNodes[0].id.startsWith('plus-')){
        const inputEdge = edges.find(edge=>edge.target===interNodes[0].id)
        const outputEdge = edges.find(edge=>edge.source===interNodes[0].id)
        console.log(inputEdge)
        console.log(outputEdge)
        console.log(node)
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
  return <ReactFlow 
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onNodeDragStop={onNodeDragStop}
         />;
}


function FlowWithProvider() {
  return (
    <ReactFlowProvider>
      <Flow>
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />
      </Flow>
    </ReactFlowProvider>
  );
}

export default FlowWithProvider;