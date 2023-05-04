import { Handle, Position } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function RectangleNode(){

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
        width: 125,
        height: 75,
        border:'solid',
        borderRadius: 10,
    }
}