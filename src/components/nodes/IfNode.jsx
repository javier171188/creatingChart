import { useState } from "react"
import { Handle, Position,  } from "../../../../../react-flow/packages/reactflow/dist/esm"

export function IfNode(props){
    const {selected, data:{shownText}, id} = props
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
                        {...styles.diamondNodeContainer,...styles.diamondNodeContainerSelected}:
                        styles.diamondNodeContainer
                        } >
                <div style={styles.diamondTextContainer}>
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
        <> <div>
            {shownText? 
                shownText:
                "option"}
            </div>
            <button style={styles.editButton} onClick={handleClickNode}>Edit</button>
        </>
            }
        </div>
        </div>
        <Handle type="source" position={Position.Left} id="a" />
        <Handle type="source" position={Position.Right} id="b" />
    </> 
}


const styles = {
   diamondNodeContainer:{
        width: 50,
        height: 50,
        border:'solid',
        borderWidth: 1,
        borderRadius: 5,
        borderColor:'rgb(61,159,255)',
        backgroundColor:'white',
        
        padding:10,
        transform: "rotate(-45deg)"
    },
    diamondTextContainer:{
        margin:2,
        transform: "rotate(45deg)",
        fontSize:12
    },
    diamondNodeContainerSelected:{
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
    },
    editButton:{ 
        backgroundColor:'rgb(97,209,136)',
        width: 35,
        padding:0,
        marginTop:10
    }
}