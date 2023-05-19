import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineStar } from 'react-icons/ai';
import { useUpdateNodeInternals, useReactFlow, useViewport } from '../../../../../../react-flow/packages/reactflow/dist/esm';
import {BsCircle,BsDiamond,BsSquare, BsTriangle} from 'react-icons/bs'
import {MdOutlineRectangle} from 'react-icons/md'
import {TbTriangleInverted} from 'react-icons/tb'
import {ImTree} from 'react-icons/im'
import { setLatestNodeId } from '../../../stateManagement/slices/reactFlow';
import { generateNodeObj } from '../../../utils/generateNodeObj';
import { nodeSizes } from '../../../utils/nodesSizes';

import './styles.css'

const displacementDistance = 75


export function LeftBarIcon({handleClose,shape='star', size=20, isInPlusNodeMenu=false}){
   const activePlusNodeId = useSelector(state=>state.reactFlow.activePlusNodeId)
   const reactFlowInstance = useReactFlow()
   const { addNodes, getEdges, getNode, getNodes, setEdges, setNodes } = reactFlowInstance
   const nodes = getNodes()
   const edges = getEdges()
   const dispatch = useDispatch()
   const { x, y, zoom } = useViewport();
   const updateNodeInternals = useUpdateNodeInternals();

    const onDragStart = (event) => {
        event.dataTransfer.setData('application/reactflow', shape);
        event.dataTransfer.effectAllowed = 'move';
      };
 
    function getIcon(){
      switch(shape){
        case 'circle':
          return <BsCircle size={size}/>
        case 'square':
          return < BsSquare size={size}/>
        case 'rectangle':
          return <MdOutlineRectangle size={size}/>
        case 'triangle':
          return <BsTriangle size={size}/>
        case 'triangleDown':
          return <TbTriangleInverted/>
        case 'diamond':
          return <BsDiamond/>
        case 'options':
          return <ImTree/>
        default:
          return <AiOutlineStar size={size} />
      }
    }

    function moveNodes(node,yDirection='up',nodeHeight=75){ 
      //TODO: Avoid repetition in ReactFlow component
      const mult = yDirection!=='up'? 1:-1
      setNodes(nodes=>nodes.map(nd=>{
        if(nd.id===node.id){
          return {...nd, position:{x:nd.position.x, y:nd.position.y+ (displacementDistance + nodeHeight + zoom*40)*mult}}
        }
        return nd
      }))
      
      const outgoingEdge = edges.find(edg=>edg.source===node.id)
      if(!outgoingEdge)return
      const childNode = nodes.find(nd=> nd.id===outgoingEdge.target)
      setTimeout(()=>moveNodes(childNode, yDirection, nodeHeight), 10)
      
    }
    
    function handleClick(){
      if(isInPlusNodeMenu){
        //Icon is in a plus button menu
        handleClose()
        
        const activePlusNode = getNode(activePlusNodeId)
        const childEdge = edges.find(ed=> ed.source === activePlusNode.id)
        const childNode = nodes.find(nd=> nd.id === childEdge.target)
        
        const newPlusButtonId = `plus-${(new Date()).getTime()}`  

        const newNodeWidth = nodeSizes[shape].width
        const newNodeHeight = nodeSizes[shape].height
        
        const plusNodeWidth = activePlusNode.width || nodeSizes.plus.width
        const plusNodeHeight = activePlusNode.width || nodeSizes.plus.width
        //const childNodeWidth = childNode.width || nodeSizes[childNode.data.shape].width 
      
        const bottomPlus = {
          id: newPlusButtonId,
          type:'plusNode',
          position:{
            x:activePlusNode.position.x ,
            y:childNode.position.y + displacementDistance/2 * zoom + newNodeHeight },
          deletable:false,
          data: {
            shape: "plus"
          }
        }

        moveNodes(childNode, 'down', newNodeHeight)
        const position = {
          x: activePlusNode.position.x + zoom*(plusNodeWidth - newNodeWidth)/2,
          y: activePlusNode.position.y + displacementDistance * zoom
        };
        
        let {newEdges,newNodes} = generateNodeObj({position, type:shape})

        // setNodes(nds=>nds.map(nd=>{ 
        //   if(nd.id!==activePlusNode.id){
        //     return {...nd, selected:false}
        //   }
        //   return nd
        // }))
        newNodes.push(bottomPlus)

        let nodeType = 'default'
        if(activePlusNode.parentNode){
          newNodes = newNodes.map( nd => {
            //nd.extent = 'parent'
            nd.parentNode = activePlusNode.parentNode
            nd.expandParent = true
            nd.extent = "parent"
            return nd
          })
          nodeType = 'step'
          newEdges = newEdges.map(ed =>{
            ed.type = nodeType
            return ed
          })
          

          setNodes(nds=>nds.map(nd=>{
            if(nd.id === activePlusNode.parentNode){
              return {...nd, 
                    data:{
                      ...nd.data, 
                      height:nd.data.height+ plusNodeHeight + newNodeHeight + zoom* displacementDistance
                    }}
            }
            if(nd.id.startsWith('handler-bottom')&&nd.parentNode===activePlusNode.parentNode){
              return {...nd, 
                    position:{
                      ...nd.position, 
                      y:nd.position.y + plusNodeHeight + newNodeHeight + zoom* displacementDistance
                    }}
            }
            return nd
          }))
        }
        addNodes(newNodes) 
        
        const oldPlusToNodeEdge = {
          id: `plus-${activePlusNodeId}-${newNodes[0].id}-${(new Date()).getTime()}`,
          source: activePlusNodeId, target: newNodes[0].id,
          type:nodeType
        }
        const nodeToNewPlusEdge = {
          id: `plus-${newNodes[0].id}-${bottomPlus.id}-${(new Date()).getTime()}`,
          source: newNodes[0].id, target: bottomPlus.id,
          type:nodeType
        }
        const newPlusToChildEdge = {
          id: `plus-${bottomPlus.id}-${childNode.id}-${(new Date()).getTime()}`,
          source: bottomPlus.id, target: childNode.id,
          type:nodeType
        }
        setEdges(eds => {
          const createdEdges = eds.filter(ed=>ed.id!==childEdge.id).map(ed =>{
            ed.type = nodeType
            return ed})
          return [...newEdges, ...createdEdges, 
              oldPlusToNodeEdge, 
              nodeToNewPlusEdge, 
              newPlusToChildEdge]
        })
        dispatch(setLatestNodeId(activePlusNode.id))
      }else{
        //Icon is in the left bar menu
      }
      
    }

    // function handleMouseDown(){
    //   console.log('clicked')
    // }

    // function handleMouseUp(){
    //   console.log('left')
    // }

    // function handleMouseMove(){
    //   console.log('hovered')
    // }

    return <div 
                className={isInPlusNodeMenu?'from-plus':'from-left'}
                onDragStart={(event) => onDragStart(event)} 
                draggable
                onClick={handleClick}
                // onMouseDown={handleMouseDown}
                // onMouseUp={handleMouseUp}
                // onMouseMove={handleMouseMove}
              >
                {getIcon()}
            </div>
}

