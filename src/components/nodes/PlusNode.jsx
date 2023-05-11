import {  useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { setNode } from '../../stateManagement/slices/plusNode'
import ReactModal from 'react-modal';
import { Handle, Position, useViewport } from '../../../../../react-flow/packages/reactflow/dist/esm';
import NodesMenu from '../NodesMenu';


export function PlusNode({xPos,yPos,id}) {
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { x, y, zoom } = useViewport();

 
  function handleClick(){
    setIsMenuOpen(prev=>!prev)
    dispatch(setNode(id))
  }

  
  return (
    <>
      <div style={styles.labelContainer} onClick={handleClick}>
        <div >+</div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="target" position={Position.Top} id="b" />
      <ReactModal 
        isOpen={isMenuOpen}
        ariaHideApp={false}    
        style={
            {
                overlay: {
                  position: 'fixed', 
                  width: 200, 
                  height: 300, 
                  left: xPos*zoom + x + 120,
                  top: yPos*zoom + y + 10,
                  margin:0,
                  padding:0,
                  boxShadow: '3px 4px 4px -1px rgba(0,0,0,0.61)',
                },
                content: {
                  inset: 0, 
                  padding: 0
                }   
            } 
         }
      >
         <NodesMenu handleClose={handleClick}/>
      </ReactModal>
    </>
  );
}

const styles = {
  labelContainer:{ 
      borderRadius: 10,
      backgroundColor:'#white',
      color:'gray',
      fontSize: 25,
      display: 'flex',
      justifyContent:'center',
      alignItems:'center',
      height: 40,
      width: 45,
  },
  menuContainer:{
    position:'absolute',  
    left: 30,
    top: 25,
    width:200,
    boxShadow: "3px 2px 5px 1px rgba(0,0,0,0.5)",
  }
}