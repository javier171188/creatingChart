export function generateNodeObj({ position, type }) {
  const newNodes = [];
  const newId = `${type}-${new Date().getTime()}`;
  const newNode = {
    id: newId,
    type: type === "options" ? type : "figure",
    position,
    data: { label: `${type} node`, shape: type },
    selected: false,
  };
  newNodes.push(newNode);
  if (type === "options") {
    const plusButtonsY = 125;
    const ifNodeId = `if-${new Date().getTime()}`;
    const ifNodeNode = {
      id: ifNodeId,
      type: "ifNode",
      position: { x: 65, y: 20 },
      selected: false,
      parentNode: newId,
      extent: "parent",
      data: { label: "if: ", shape: "diamond" },
    };
    newNodes.push(ifNodeNode);
    const thenId = `plus-then-${new Date().getTime()}`;
    const thenNode = {
      id: thenId,
      type: "plusNode",
      position: { x: 10, y: plusButtonsY },
      selected: false,
      parentNode: newId,
      extent: "parent",
    };
    newNodes.push(thenNode);
    const elseId = `plus-else-${new Date().getTime()}`;
    const elseNode = {
      id: elseId,
      type: "plusNode",
      position: { x: 150, y: plusButtonsY },
      selected: false,
      parentNode: newId,
      extent: "parent",
    };
    newNodes.push(elseNode);
  }
  return newNodes;
}
