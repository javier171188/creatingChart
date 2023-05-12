import { Handle, Position, useReactFlow } from "../../../../../react-flow/packages/reactflow/dist/esm"


export function CircleNode(props){
    const {selected, data:{shownText}, id} = props
    const { setNodes } = useReactFlow()
   
    function handleClick(){
        setNodes(nds=>nds.map(nd => {
            if(nd.id === id) return ({...nd, data:{...nd.data, shownText:'I am modified'}})
            return nd
        }))
    }


    return <>
        <div style={selected?
            {...styles.nodeContainer, ...styles.selectedNodeContainer}
            :styles.nodeContainer}
            onClick={handleClick}
        >
          {shownText? shownText:"click to add text"}
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
        <Handle type="target" position={Position.Top} id="b"  />
    </> 
}

const styles = {
    nodeContainer:{
        width: 50,
        height: 50,
        borderRadius: '50%',
        border:'solid',
        textAlign:'center',
        borderColor:'rgb(61,159,255)',
        backgroundColor:'white',
        borderWidth: 1,
        padding:10,
        fontSize:12
    },
    selectedNodeContainer:{
        boxShadow: "3px 2px 5px 1px rgba(0,0,0,0.5)",
        borderWidth: 2,
    }
}