import { useCallback } from 'react';
import { Handle, Position } from '../../../../../react-flow/packages/reactflow/dist/esm';


export function PlusNode({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
      <div style={styles.labelContainer}>
        <div >+</div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="target" position={Position.Top} id="b" />
    </>
  );
}

const styles = {
    labelContainer:{ 
        borderRadius: 10,
        backgroundColor:'#white',
        color:'gray',
        fontSize: 25,
        //fontWeight: 'bold',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        height: 40,
        width: 45,
    }
}