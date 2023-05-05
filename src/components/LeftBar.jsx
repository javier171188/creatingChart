import { useState } from "react";
import { LeftBarNodeButton } from "./LeftBarNodeBotton";
import logo from "../assets/images/logo-sb.png";

export function LeftBar(){
    const [areNodesShown, setAreNodesShown] = useState(false)
    return <aside style={styles.container}>
      <a href="/#" style={styles.logoLink}>
        <img src={logo} alt="Sibatel logo"  style={styles.logo}/>
      </a>
      <LeftBarNodeButton/>
    </aside>
}

const styles = {
    container:{
        width: 70,
        backgroundColor: '#f8fafe',
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
    }
}