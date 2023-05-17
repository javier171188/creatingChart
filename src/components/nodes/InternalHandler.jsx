import { Handle, Position } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function InternalHandler(){
    return <>
        <div style={styles.nodeContainer}>
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
        <Handle type="target" position={Position.Top} id="b"  />
    </> 
}

const styles = {
    nodeContainer:{
        width: 1,
        height: 1,
    }
}