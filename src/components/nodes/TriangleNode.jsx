import { Handle, Position } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function TriangleNode(){

    return <>
        <div style={styles.nodeContainer}>
            <div style={styles.textContainer}>click to add text</div>
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
        <Handle type="target" position={Position.Top} id="b"  />
    </> 
}

const styles = {
    nodeContainer:{
    width: 0, 
    height: 0, 
    borderLeft: "100px solid transparent",
    borderRight: "100px solid transparent",
    borderBottom: "100px solid #f00",
    
    },
    textContainer:{
        boxSizing: "border-box",
        //border:'solid',
        width: 100,
        height: 100,
        marginTop: 0,
        position:'absolute',
        left:55,
        paddingTop: 40
    }
}