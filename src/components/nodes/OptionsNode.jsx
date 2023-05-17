import { Handle, Position } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function OptionsNode({data}){
    const {label} = data

    return <>
        <div style={styles.nodeContainer}>
           
        </div>
        <Handle type="target" position={Position.Top} id="top-target"  />
       <Handle type="source" position={Position.Bottom} id="bottom-source" />
       <Handle type="target" position={Position.Bottom} id="bottom-target"  />
    </> 
}

const styles = {
    nodeContainer:{
        placeItems:'center',
        borderStyle:'solid',
        height: 400,
        width: 200,
        borderColor:'rgb(61,159,255)',
        borderWidth: 1,
        //backgroundColor: 'white'
    }
}