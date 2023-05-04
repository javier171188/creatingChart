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
        border:'solid',
        borderRadius: '50%',
        textAlign:'center'
    }
}