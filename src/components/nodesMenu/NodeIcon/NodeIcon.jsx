import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineStar } from 'react-icons/ai';
import { useReactFlow, useViewport } from '../../../../../../react-flow/packages/reactflow/dist/esm';
import {BsCircle,BsDiamond,BsSquare, BsTriangle} from 'react-icons/bs'
import {MdOutlineRectangle} from 'react-icons/md'
import {TbTriangleInverted} from 'react-icons/tb'
import {ImTree} from 'react-icons/im'
import { setLatestNodeId } from '../../../stateManagement/slices/reactFlow';
import { generateNodeObj } from '../../../utils/generateNodeObj';

import './styles.css'

export function LeftBarIcon({handleClose,shape='star', size=20, isInPlusNodeMenu=false}){
   const activePlusNodeId = useSelector(state=>state.reactFlow.activePlusNodeId)
   const reactFlowInstance = useReactFlow()
   const { addNodes,addEdges, getNode, setNodes } = reactFlowInstance
   
   const dispatch = useDispatch()
   const { x, y, zoom } = useViewport();

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

    function handleClick(){
      if(isInPlusNodeMenu){
        //Icon is in a plus button menu
        handleClose()
        //dispatch(setCreatedType(shape))
        const activePlusNode = getNode(activePlusNodeId)
        const position = reactFlowInstance.project({
          x: activePlusNode.position.x *zoom + x - 22,
          y: activePlusNode.position.y *zoom + y,
        });
        
        const {newEdges,newNodes} = generateNodeObj({position, type:shape})

        setNodes(nds=>nds.map(nd=>{ 
          if(nd.id!==newNodes[0].id){
            return {...nd, selected:false}
          }
          return nd
        }))
        addNodes(newNodes) 
        addEdges(newEdges)
        dispatch(setLatestNodeId(newNodes[0].id))

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

