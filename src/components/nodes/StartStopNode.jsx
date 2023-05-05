import { Handle, Position } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function StartStopNode({data}){
    const {label} = data
    return <>
        <div style={styles.nodeContainer}>
            {label}
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
        <Handle type="target" position={Position.Top} id="b"  />
    </> 
}

const styles = {
    nodeContainer:{
        display: 'grid',
        padding:8,
        position:'relative',
        maxWidth: 210,
        minWidth: 30,
        minHeight: 21,
        placeItems:'center',
        borderStyle:'solid',
        borderWidth:2,
        borderRadius: 6,
        color:'white',
        backgroundColor:'rgb(97,209,136)',
        fontSize:'1rem'
    }
}