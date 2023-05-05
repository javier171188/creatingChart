import { Handle, Position } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function CircleNode(){

    return <>
        <div style={styles.nodeContainer}>
            click to add text
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
        <Handle type="target" position={Position.Top} id="b"  />
    </> 
}

const styles = {
    nodeContainer:{
        width: 75,
        height: 75,
        borderRadius: '50%',
        border:'solid',
        textAlign:'center',
        borderColor:'rgb(61,159,255)',
        backgroundColor:'white',
        boxShadow: "3px 2px 5px 1px rgba(0,0,0,0.5)",
        borderWidth: 1,
        padding:10
    }
}