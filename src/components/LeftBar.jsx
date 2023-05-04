import React from 'react';
import { LeftBarIcon } from './LeftBarIcon';

export default () => {
  return (
    <aside style={styles.aside}>
      <div style={styles.barTitle}>Drag a node to add it to the flow</div>
      <div style={styles.iconsContainer}>
        <LeftBarIcon shape='square' size={15}/>
        <LeftBarIcon shape='rectangle' size={18} />
        <LeftBarIcon shape='circle' size={17}/>
        <LeftBarIcon shape='triangle' size={17}/>
        <LeftBarIcon shape='triangleDown' size={17}/>
        <LeftBarIcon shape='diamond'/>
        <LeftBarIcon/>
        <LeftBarIcon/>
        <LeftBarIcon/>
      </div>
      
    </aside>
  );
};


const styles = {
  aside: {
    backgroundColor:'#eaf1ff',
  },
  barTitle:{
    padding: 10,
    fontWeight: 'bold',
    fontSize:14,
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
    width: 150,
    justifyContent:'flex-start',
    marginLeft: 10
  }
} 