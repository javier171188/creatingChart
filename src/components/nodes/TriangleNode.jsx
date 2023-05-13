import { Handle, Position } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function TriangleNode(){

    return <>
        <div style={styles.nodeContainer}>
            <div style={styles.textContainer}>
                click to add text
            </div>
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
        <Handle type="target" position={Position.Top} id="b"  />
    </> 
}

const styles = {
    nodeContainer:{
    width: 0, 
    height: 0, 
    borderLeft: "75px solid transparent",
    borderRight: "75px solid transparent",
    borderBottom: "75px solid rgb(255,194,55)",
    color:'white',
    fontSize:12
    },
    textContainer:{
        boxSizing: "border-box",
        //border:'solid',
        width: 75,
        height: 75,
        marginTop: 0,
        position:'absolute',
        left:42,
        paddingTop: 30
    }
}