import React from 'react';
import { LeftBarIcon } from './NodeIcon';

export default ({handleClose}) => {
  return (
    <aside style={styles.aside}>
      <div style={styles.barTitle}>{handleClose
        ? "Click a node to add it"
        : "Drag a node to add it to the flow"}</div>
      <div style={styles.iconsContainer}>
        <LeftBarIcon shape='square' size={15} handleClose={handleClose}/>
        <LeftBarIcon shape='rectangle' size={18} handleClose={handleClose}/>
        <LeftBarIcon shape='circle' size={17} handleClose={handleClose}/>
        <LeftBarIcon shape='triangle' size={17} handleClose={handleClose}/>
        <LeftBarIcon shape='triangleDown' size={17} handleClose={handleClose}/>
        <LeftBarIcon shape='diamond' handleClose={handleClose}/>
        <LeftBarIcon handleClose={handleClose}/>
        <LeftBarIcon handleClose={handleClose}/>
        <LeftBarIcon handleClose={handleClose}/>
        <LeftBarIcon handleClose={handleClose}/>
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
  }
} 