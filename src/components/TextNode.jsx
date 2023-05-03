export function TextNode({data:{barIcon}}) {
  

  return (
    <>
      <div style={styles.container}>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text" disabled={barIcon}  className="nodrag" style={styles.input}/>
      </div>
    </>
  );
}

const styles = {
  container: {
    height: 75,
    width: 150,
    boxShadow: "10px 5px 5px",
    background: '#f5f6f7',
    borderRadius:10
  },
  input:{
    width: 120
  }

} 