import { Handle, Position } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function DiamondNode({selected}){

    return <>
        <div style={selected?
                {...styles.nodeContainer,...styles.nodeContainerSelected}:
                styles.nodeContainer
                }>
           <div style={styles.textContainer}> Click to add text</div>
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
        borderWidth: 1,
        borderRadius: 5,
        borderColor:'rgb(61,159,255)',
        backgroundColor:'white',
        
        padding:10,
        transform: "rotate(-45deg)"
    },
    textContainer:{
        margin:10,
        transform: "rotate(45deg)",
        fontSize:14
    },
    nodeContainerSelected:{
        boxShadow: "3px 2px 5px 1px rgba(0,0,0,0.5)",
        borderWidth: 2,
    }
}