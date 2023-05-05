import { Handle, Position } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function DiamondNode(){

    return <>
        <div style={styles.nodeContainer}>
            Click to add text
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
        <Handle type="target" position={Position.Top} id="b"  />
    </> 
}

const styles = {
    nodeContainer:{
        width: 75,
        height: 75,
        borderBottom:'solid',
        borderWidth: 4,
        borderRadius: 5,
        borderColor:'rgb(61,159,255)',
        backgroundColor:'white',
        boxShadow: "3px 2px 5px 1px rgba(0,0,0,0.5)",
        padding:10
    }
}