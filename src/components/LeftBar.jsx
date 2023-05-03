import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';


export function LeftBar({ data }) {
  const onChange = useCallback((evt) => {
    console.log(evt.target.value);
  }, []);

  return (
    <>
     <div style={styles.labelContainer}>
        <div>{data.label}</div>
      </div>
    </>
  );
}

const styles = {
    labelContainer:{ 
        borderRadius: 10,
        backgroundColor:'rgb(97,209,136)',
        color:'white',
        fontSize: 12,
        fontWeight: 'bold',
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        height: 40,
        width: 45,
    }
}