import { useState } from "react"
import { Handle, Position, useReactFlow } from "../../../../../react-flow/packages/reactflow/dist/esm"


export function CircleNode(props){
    const {selected, data:{shownText}, id} = props
    const { setNodes } = useReactFlow()
    const [showingInput, setShowingInput] = useState(false)   
    const [inputValue, setInputValue] = useState(shownText||'')

    function handleClickNode(){
        setShowingInput(true)
    }

    function handleSetNodeValue(event){
        event.stopPropagation()
        setShowingInput(false)
        setNodes(nds=>nds.map(nd => {
            if(nd.id === id) return ({...nd, data:{...nd.data, shownText:inputValue}})
            return nd
        }))
        setShowingInput(false)
    }

    function handleCancel(event){
        event.stopPropagation()
        setShowingInput(false)
    }
    return <>
        <div style={selected?
            {...styles.nodeContainer, ...styles.selectedNodeContainer}
            :styles.nodeContainer}
            onClick={handleClickNode}
        >
          {
            showingInput? <>
                <input 
                    style={styles.infoInput}
                    value={inputValue}
                    onChange={(e)=>setInputValue(e.target.value)}
                />
                <div style={styles.buttonsContainer}>
                    <button style={{...styles.button,...styles.infoButton}} onClick={handleSetNodeValue}>set</button>
                    <button style={{...styles.button,...styles.cancelButton}} onClick={handleCancel}>cnl</button>
                </div>
                </> :
            shownText? 
                shownText:
                "click to add text"
            }
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
    },
    infoInput:{
        width: 30,
        fontSize: 12,
    },
    buttonsContainer:{
        marginTop: 5
    },
    button:{
        height: 20,
        width: 25,
        padding: 0, 
        borderWidth: 0,
        marginTop: 3
    },
    infoButton: {
        backgroundColor: 'rgb(97,209,136)',
    },
    cancelButton:{
        backgroundColor: 'red',
    }
}