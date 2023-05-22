import { useState } from "react"
import { Handle, Position, useReactFlow } from "../../../../../react-flow/packages/reactflow/dist/esm"

function FigureNodeContainer({selected, children, shape}){
    switch (shape){
        case 'circle':
            return <div style={selected?
                {...styles.circleNodeContainer, ...styles.circleSelectedNodeContainer}
                :styles.circleNodeContainer}
                
            >
                {children}
            </div>
        case 'square':
            return <div style={selected?
                {...styles.squareNodeContainer,...styles.squareSelectedNodeContainer}:
                styles.squareNodeContainer}
                >
                    {children}
                </div>
        case 'rectangle':
            return <div style={selected?
                {...styles.rectangleNodeContainer, ...styles.rectangleSelectedNodeContainer}:
                styles.rectangleNodeContainer
                }
              
                >
                    {children}
                </div>
        case 'triangle':
            return <div style={styles.triangleNodeContainer} >
                    <div style={styles.triangleTextContainer}>
                    {children}
                    </div>
                </div>
        case 'triangleDown':
            return <div style={styles.triangleDownNodeContainer} >
                    <div style={styles.triangleDownTextContainer}>{children}</div>
                 </div>
        case 'diamond':
            return <div style={selected?
                        {...styles.diamondNodeContainer,...styles.diamondNodeContainerSelected}:
                        styles.diamondNodeContainer
                        } >
                <div style={styles.diamondTextContainer}>{children}</div>
                </div>
        default :
            return <div style={selected?
                    {...styles.squareNodeContainer,...styles.squareselectedNodeContainer}:
                    styles.squareNodeContainer}
                    
                    >
                    {children}
                </div>
    }
    
}

export function FigureNode(props){
    const {selected, data:{shownText, shape}, id} = props
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
        <div >
        <FigureNodeContainer 
            selected={selected} 
            shape={shape}>
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
           <> <div>{shownText? 
                shownText:
                "No info"}
                </div>
                <button style={styles.editButton} onClick={handleClickNode}>Edit</button>
                </>
            }
        </FigureNodeContainer>
        </div>
        <Handle type="source" position={Position.Bottom} id="a" />
        <Handle type="target" position={Position.Top} id="b"  />
    </> 
}

const styles = {
    circleNodeContainer:{
        width: 50,
        height: 50,
        borderRadius: '50%',
        border:'solid',
        textAlign:'center',
        borderColor:'rgb(61,159,255)',
        backgroundColor:'white',
        borderWidth: 1,
        padding:10,
        fontSize:12,
    },
    circleSelectedNodeContainer:{
        boxShadow: "3px 2px 5px 1px rgba(0,0,0,0.5)",
        borderWidth: 2,
    },
    squareNodeContainer:{
        width: 50,
        height: 48,
        border:'solid',
        borderWidth: '1px 1px  4px',
        borderRadius: 5,
        borderColor:'rgb(61,159,255)',
        backgroundColor:'white',
        padding:10,
        fontSize: 12,
        //boxSizing: "border-box"
    },
    squareSelectedNodeContainer:{
        boxShadow: "3px 2px 5px 1px rgba(0,0,0,0.5)",
        borderWidth: '2px 2px  4px',
    },
    rectangleNodeContainer:{
        width: 100,
        height: 50,
        border:'solid',
        borderWidth: '1px 1px 4px',
        borderRadius: 5,
        borderColor:'rgb(61,159,255)',
        backgroundColor:'white',
        padding:10,
        fontSize:12
    },
    rectangleSelectedNodeContainer:{
        boxShadow: "3px 2px 5px 1px rgba(0,0,0,0.5)",
        borderWidth: '2px 2px  4px',
    },
    triangleNodeContainer:{
        width: 0, 
        height: 0, 
        borderLeft: "75px solid transparent",
        borderRight: "75px solid transparent",
        borderBottom: "75px solid rgb(255,194,55)",
        color:'white',
        fontSize:12
        },
    triangleTextContainer:{
        boxSizing: "border-box",
        //border:'solid',
        width: 75,
        height: 75,
        marginTop: 0,
        position:'absolute',
        left:42,
        paddingTop: 30
    },
    triangleDownNodeContainer:{
        width: 0, 
        height: 0, 
        borderLeft: "75px solid transparent",
        borderRight: "75px solid transparent",
        borderTop: "75px solid rgb(255,194,55)",
        color:'white',
        fontSize: 12
        },
    triangleDownTextContainer:{
        boxSizing: "border-box",
        //border:'solid',
        width: 75,
        height: 75,
        position:'absolute',
        left:45,
        top: 5
            },
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