import { useState } from "react";
import ReactModal from 'react-modal';
import { LeftBarNodeButton } from "./LeftBarNodeBotton";
import NodesMenu from "./NodesMenu";
import logo from "../assets/images/logo-sb.png";

export function LeftBar(){
    const [areNodesShown, setAreNodesShown] = useState(false)
    function handleClose(){
        setAreNodesShown(false)
    }
    return <aside style={styles.container}>
      <a href="/#" style={styles.logoLink}>
        <img src={logo} alt="Sibatel logo"  style={styles.logo}/>
      </a>
      <LeftBarNodeButton onClick={()=>setAreNodesShown(!areNodesShown)}/>
      <ReactModal 
        isOpen={areNodesShown}
        ariaHideApp={false}    
        style={
            {
                overlay: styles.modalContainer,
                content: styles.modalContent    
            } 
         }
      >
        <NodesMenu isInLeftBar={true} handleClose={handleClose}/>
      </ReactModal>
    </aside>
}

const styles = {
    container:{
        width: 70,
        backgroundColor: '#eaf1ff',
        display:'flex',
        flexDirection: 'column',
        alignItems:'center'
    },
    logoLink:{
        height: "80px",
        padding: "5px 0",
        marginBottom: "1rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    logo:{
        height: "35px",
        width: "35px",
    },
    modalContainer:{
        inset:"140px 0px 0px 40px",
        width: 200, 
        height: 500,
        left: 100,
        top: 100,
        margin:0,
        padding:0,
        boxShadow: '3px 4px 4px -1px rgba(0,0,0,0.61)',
    },
    modalContent:{
        inset: 0,
        padding: 0
    }
}