import React from 'react';
import { LeftBarIcon } from './NodeIcon/NodeIcon';
import {AiOutlineClose} from 'react-icons/ai'

export default ({handleClose, isInPlusNodeMenu}) => {
  
  return (
    <aside style={styles.aside}>
      <div style={styles.barTitle}>
        <div>{!isInPlusNodeMenu
        ? "Drag a node to add it to the flow"
        :"Click a node to add it"}
        </div>
        <button style={styles.closeButton}>
          <AiOutlineClose size={14}  onClick={handleClose} />
        </button>
      </div>
       
       <div style={styles.iconsContainer}>
        <LeftBarIcon shape='square' size={15} handleClose={handleClose} isInPlusNodeMenu={isInPlusNodeMenu}/>
        <LeftBarIcon shape='rectangle' size={18} handleClose={handleClose}isInPlusNodeMenu={isInPlusNodeMenu}/>
        <LeftBarIcon shape='circle' size={17} handleClose={handleClose} isInPlusNodeMenu={isInPlusNodeMenu}/>
        <LeftBarIcon shape='triangle' size={17} handleClose={handleClose}isInPlusNodeMenu={isInPlusNodeMenu}/>
        <LeftBarIcon shape='triangleDown' size={17} handleClose={handleClose}isInPlusNodeMenu={isInPlusNodeMenu}/>
        <LeftBarIcon shape='diamond' handleClose={handleClose} isInPlusNodeMenu={isInPlusNodeMenu}/>
        <LeftBarIcon shape='ifNode' handleClose={handleClose} isInPlusNodeMenu={isInPlusNodeMenu}/>
        <LeftBarIcon handleClose={handleClose} isInPlusNodeMenu={isInPlusNodeMenu}/>
        <LeftBarIcon handleClose={handleClose} isInPlusNodeMenu={isInPlusNodeMenu}/>
        <LeftBarIcon handleClose={handleClose} isInPlusNodeMenu={isInPlusNodeMenu}/> 
      </div>      
    </aside>
  );
};


const styles = {
  aside: {
    backgroundColor:'#eaf1ff',
    width: "100%",
    height: "100%"
  },
  barTitle:{
    padding: 10,
    fontWeight: 'bold',
    fontSize:14,
    width: "90%",
    //color:'blue'
    display:'flex',
    justifyContent:'space-between'
  },
  iconNode:{
    backgroundColor:'#f7f3f3',
    margin: 10,
    width: '80%',
    fontSize: 12,
    height: 50,
    borderRadius: 12,
    boxShadow: '4px 5px 5px -1px rgba(0,0,0,0.61)'
  },
  iconsContainer:{
    display:'flex',
    flexWrap: 'wrap',
    width: '90%',
    justifyContent:'space-around',
    margin: 10, 
  },
  closeButton:{
    marginTop: 1,
    width:17,
    height:17,
    padding:0,
    borderWidth:0
  }
} 