export function generateNodeObj({ position, type, parentNodeId }) {
  const newNodes = [];
  const newEdges = [];
  const newId = `${type}-${new Date().getTime()}`;
  const newNode = {
    id: newId,
    type: type === "options" ? type : "figure",
    position,
    data: { label: `${type} node`, shape: type, height: 250 },
    selected: false,
  };
  newNodes.push(newNode);

  if (type === "options") {
    const plusButtonsY = 115;
    const ifNodeId = `if-${new Date().getTime()}`;
    const ifNodeNode = {
      id: ifNodeId,
      type: "ifNode",
      position: { x: 61.5, y: 30 },
      selected: false,
      parentNode: newId,
      extent: "parent",
      data: {},
      //draggable: false,
      // selectable: false,
      deletable: false,
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
      //draggable: false,
    };
    newNodes.push(thenNode);
    const elseId = `plus-else-${new Date().getTime()}`;
    const elseNode = {
      id: elseId,
      type: "plusNode",
      position: { x: 200, y: plusButtonsY },
      selected: false,
      parentNode: newId,
      extent: "parent",
      //draggable: false,
    };
    newNodes.push(elseNode);

    const bottomHandlerId = `handler-bottom-${new Date().getTime()}`;
    const bottomHandler = {
      id: bottomHandlerId,
      type: "internalHandler",
      position: { x: 125, y: 251 },
      selected: false,
      parentNode: newId,
      extent: "parent",
      //draggable: false,
    };
    newNodes.push(bottomHandler);

    const topHandlerId = `handler-top-${new Date().getTime()}`;
    const topHandler = {
      id: topHandlerId,
      type: "internalHandler",
      position: { x: 125, y: 0 },
      selected: false,
      parentNode: newId,
      extent: "parent",
      //draggable: false,
    };
    newNodes.push(topHandler);

    const topEdge = {
      id: `top-${ifNodeId}-${new Date().getTime()}`,
      source: topHandlerId,
      target: ifNodeId,
      type: "step",
      parentNode: newId,
      extent: "parent",
    };
    newEdges.push(topEdge);

    const thenEdge = {
      id: `${ifNodeId}-${thenId}-${new Date().getTime()}`,
      source: ifNodeId,
      target: thenId,
      type: "step",
      parentNode: newId,
      //extent: "parent",
      expandParent: true,
    };
    newEdges.push(thenEdge);
    const elseEdge = {
      id: `${ifNodeId}-${elseId}-${new Date().getTime()}`,
      source: ifNodeId,
      target: elseId,
      sourceHandle: "right",
      type: "step",
      parentNode: newId,
      extent: "parent",
    };
    newEdges.push(elseEdge);
    const thenContinue = {
      id: `${thenId}-flow-${new Date().getTime()}`,
      source: thenId,
      target: bottomHandlerId,
      type: "step",
      parentNode: newId,
      extent: "parent",
      parentNode: newId,
      extent: "parent",
    };
    newEdges.push(thenContinue);

    const elseContinue = {
      id: `${elseId}-flow-${new Date().getTime()}`,
      source: elseId,
      target: bottomHandlerId,
      type: "step",
      parentNode: newId,
      extent: "parent",
    };
    newEdges.push(elseContinue);
  }
  return { newNodes, newEdges };
}
