import { Handle, Position } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function SquareNode({selected}){

    return <>
        <div style={selected?
            {...styles.nodeContainer,...styles.selectedNodeContainer}:
            styles.nodeContainer}>
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
        border:'solid',
        borderWidth: '1px 1px  4px',
        borderRadius: 5,
        borderColor:'rgb(61,159,255)',
        backgroundColor:'white',
        padding:10
    },
    selectedNodeContainer:{
        boxShadow: "3px 2px 5px 1px rgba(0,0,0,0.5)",
        borderWidth: '2px 2px  4px',
    }
}