import { useDispatch } from 'react-redux';
import { AiOutlineStar } from 'react-icons/ai';
import {BsCircle,BsDiamond,BsSquare, BsTriangle} from 'react-icons/bs'
import {MdOutlineRectangle} from 'react-icons/md'
import {TbTriangleInverted} from 'react-icons/tb'
import { setCreatedType } from '../../../stateManagement/slices/plusNode';

import './styles.css'

export function LeftBarIcon({handleClose,shape='star', size=20, isInPlusNodeMenu=false}){
    const dispatch = useDispatch()

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
        default:
          return <AiOutlineStar size={size} />
      }
    }

    function handleClick(){
      if(isInPlusNodeMenu){
        //Icon is in a plus button menu
        handleClose()
        dispatch(setCreatedType(shape))
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

