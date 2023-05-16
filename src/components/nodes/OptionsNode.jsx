import { Handle, Position } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function OptionsNode({data}){
    const {label} = data

    return <>
        <div style={styles.nodeContainer}>
            Option:
        </div>
        <Handle type="target" position={Position.Top} id="b"  />
       <Handle type="source" position={Position.Bottom} id="a" />
    </> 
}

const styles = {
    nodeContainer:{
        placeItems:'center',
        borderStyle:'solid',
    }
}