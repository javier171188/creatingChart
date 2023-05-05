import { AiOutlineStar } from 'react-icons/ai';
import {BsCircle,BsDiamond,BsSquare, BsTriangle} from 'react-icons/bs'
import {MdOutlineRectangle} from 'react-icons/md'
import {TbTriangleInverted} from 'react-icons/tb'
export function LeftBarIcon({shape='star', size=20}){
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

    return <div 
                style={styles.iconNode} 
                onDragStart={(event) => onDragStart(event)} 
                draggable>
                {getIcon()}
            </div>
}

const styles = {
    iconNode:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f7f3f3',
        margin: 10,
        borderRadius: 12,
        boxShadow: '3px 4px 4px -1px rgba(0,0,0,0.61)',
        width: 28,
        height: 28
      }
}