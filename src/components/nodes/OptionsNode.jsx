import { Handle, Position } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function OptionsNode({data}){
    const {height} = data
    
    
    return <>
        <div style={{...styles.nodeContainer,height}}>  
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
        width: 250,
        borderColor:'#ba96ec',
        borderWidth: 1,
        //backgroundColor: 'white',
        //boxShadow: "5px 5px 5px 0px rgba(0,0,0,0.75)"
    }
}