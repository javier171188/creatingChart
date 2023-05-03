import { Handle, Position } from "../../../../react-flow/packages/reactflow/dist/esm/index";

export function TextNode() {
  return (
    <>
      <div style={styles.container}>
        <label htmlFor="text">Text:</label>
        <input id="text" name="text"   className="nodrag" style={styles.input}/>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
      <Handle type="target" position={Position.Top} id="b"  />
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