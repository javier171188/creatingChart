import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setActivePlusNodeId } from '../../../stateManagement/slices/reactFlow'
import ReactModal from 'react-modal';
import { Handle, Position,  useViewport } from '../../../../../../react-flow/packages/reactflow/dist/esm';
import NodesMenu from '../../NodesMenu';
import './styles.css'

export function PlusNode(props) {
  // const onChange = useCallback((evt) => {
  //   console.log(evt.target.value);
  // }, []);

  const {xPos,yPos,id} = props
  const dispatch = useDispatch()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { x, y, zoom } = useViewport();

  function handleClick(){
    setIsMenuOpen(prev=>!prev)
    dispatch(setActivePlusNodeId(id))
  }

  
  return (
    <>
      <div className='label-container' onClick={handleClick}>
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
         onRequestClose={()=>setIsMenuOpen(false)} 
      >
         <NodesMenu handleClose={handleClick} isInPlusNodeMenu={true}/>
      </ReactModal>
    </>
  );
}
