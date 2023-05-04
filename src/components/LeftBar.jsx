import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    console.log(event)
  };

  return (
    <aside style={styles.aside}>
      <div style={styles.barTitle}>Drag a node to add it to the flow</div>
      <div style={styles.iconNode} onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div>
      <div  style={styles.iconNode} onDragStart={(event) => onDragStart(event, 'default')} draggable>
        Default Node
      </div>
      <div style={styles.iconNode} onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
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
  }
    
}