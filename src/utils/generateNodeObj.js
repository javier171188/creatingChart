export function generateNodeObj({ position, type, parentNodeId }) {
  const newNodes = [];
  const newEdges = [];
  const newId = `${type}-${new Date().getTime()}`;
  const newNode = {
    id: newId,
    type: type === "ifNode" ? type : "figure",
    position,
    data: { label: `${type} node`, shape: type },
    selected: false,
    parentNode: parentNodeId,
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

    const intHandlerId = `handler-${newId}-${new Date().getTime()}`;
    const intHandler = {
      id: intHandlerId,
      type: "internalHandler",
      position: { x: 69, y: 2 * plusButtonsY },
      selected: false,
      parentNode: newId,
    };
    newNodes.push(intHandler);

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

    const plThenFlEdgeId = `${thenId}-${intHandlerId}-${new Date().getTime()}`;
    const plThenFlEdge = {
      id: plThenFlEdgeId,
      source: thenId,
      target: intHandlerId,
      type: "step",
    };
    newEdges.push(plThenFlEdge);

    const plElseFlEdgeId = `${elseId}-${intHandlerId}-${new Date().getTime()}`;
    const plElseFlEdge = {
      id: plElseFlEdgeId,
      source: elseId,
      target: intHandlerId,
      type: "step",
    };
    newEdges.push(plElseFlEdge);
  }

  return { newEdges, newNodes };
}
