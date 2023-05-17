import { useState } from "react"
import { Handle, Position, useReactFlow  } from "../../../../../../react-flow/packages/reactflow/dist/esm"
import './styles.css' 

export function IfNode(props){
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
        <div className="if-node-container" >
        </div>
        <Handle type="source" position={Position.Left} id="left" />
        <Handle type="source" position={Position.Right} id="right" />
        <div className="if-text-container">
            {
            showingInput? <>
                <input 
                    className="info-input"
                    value={inputValue}
                    onChange={(e)=>setInputValue(e.target.value)}
                />
                <div className="buttons-container">
                    <button className="button info-button" onClick={handleSetNodeValue}>set</button>
                    <button className="button cancel-button" onClick={handleCancel}>cnl</button>
                </div>
                </> :
        <> <div>
            {shownText? 
                shownText:
                "option"}
            </div>
            <button className="edit-button" onClick={handleClickNode}>Edit</button>
        </>
            }
        </div>
    </> 
}

