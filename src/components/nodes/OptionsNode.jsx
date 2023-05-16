import { Handle, Position } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function OptionsNode({data}){
    const {label} = data

    return <>
        <div style={styles.nodeContainer}>
           
        </div>
        <Handle type="target" position={Position.Top} id="b"  />
       <Handle type="source" position={Position.Bottom} id="a" />
    </> 
}

const styles = {
    nodeContainer:{
        placeItems:'center',
        borderStyle:'solid',
        height: 200,
        width: 200,
        borderColor:'rgb(61,159,255)',
        borderWidth: 1,
    }
}