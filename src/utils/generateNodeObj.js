export function generateNodeObj({ position, type }) {
  const newNodes = [];
  const newEdges = [];
  const newId = `${type}-${new Date().getTime()}`;
  const newNode = {
    id: newId,
    type: type === "ifNode" ? type : "figure",
    position,
    data: { label: `${type} node`, shape: type },
    selected: false,
  };
  newNodes.push(newNode);
  if (type === "ifNode") {
    const plusButtonsY = 125;
    const thenId = `plus-then-${new Date().getTime()}`;
    const thenNode = {
      id: thenId,
      type: "plusNode",
      position: { x: -47, y: plusButtonsY },
      selected: false,
      parentNode: newId,
      //extent: "parent",
    };
    newNodes.push(thenNode);
    const elseId = `plus-else-${new Date().getTime()}`;
    const elseNode = {
      id: elseId,
      type: "plusNode",
      position: { x: 130, y: plusButtonsY },
      selected: false,
      parentNode: newId,
      //extent: "parent",
    };
    newNodes.push(elseNode);

    const ifThenEdgeId = `${newId}-${thenId}-${new Date().getTime()}`;
    const ifThenEdge = {
      id: ifThenEdgeId,
      source: newId,
      target: thenId,
      type: "step",
    };
    newEdges.push(ifThenEdge);
    const ifElseEdgeId = `${newId}-${elseId}-${new Date().getTime()}`;
    const ifElseEdge = {
      id: ifElseEdgeId,
      source: newId,
      target: elseId,
      type: "step",
      sourceHandle: "right",
    };
    newEdges.push(ifElseEdge);
  }

  return { newEdges, newNodes };
}
