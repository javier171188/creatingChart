import { nodeSizes } from "./nodesSizes";

const displacementDistance = 75;

export function mergeNodeToFlow({
  plusNode,
  newNode,
  edges,
  nodes,
  setEdges,
  setNodes,
  zoom,
}) {
  const inputEdge = edges.find((edge) => edge.target === plusNode.id);
  const outputEdge = edges.find((edge) => edge.source === plusNode.id);

  if (!inputEdge || !outputEdge) return;

  const childNode = nodes.find((node) => node.id === outputEdge.target);
  const newPlusButtonId = `plus-${new Date().getTime()}`;
  const newNodeWidth = newNode.width || nodeSizes[newNode.data.shape].width;
  const plusNodeWidth = plusNode.width || nodeSizes.plus.width;

  const bottomPlus = {
    id: newPlusButtonId,
    type: "plusNode",
    position: {
      //x:childNode.position.x + zoom*(childNodeWidth - plusNodeWidth)/2,
      x: plusNode.position.x,
      y: childNode.position.y + displacementDistance + zoom * 32,
    },
    deletable: false,
    data: {
      shape: "plus",
    },
  };

  const existingNewNode = nodes.some((nd) => nd.id === newNode.id);
  console.log(existingNewNode);

  const newNodes = [...nodes, bottomPlus].map((nd) => {
    if (nd.id === newNode.id) {
      return {
        ...nd,
        position: {
          y: plusNode.position.y + displacementDistance + 15 * zoom,
          x: plusNode.position.x + (zoom * (plusNodeWidth - newNodeWidth)) / 2,
        },
      };
    }
    return nd;
  });

  if (!existingNewNode) {
    newNodes.push(newNode);
  }

  setNodes(newNodes);
  // setNodes((nodes) =>
  //   [...nodes, bottomPlus].map((nd) => {
  //     if (nd.id === newNode.id) {
  //       return {
  //         ...nd,
  //         position: {
  //           y: plusNode.position.y + displacementDistance + 15 * zoom,
  //           x:
  //             plusNode.position.x +
  //             (zoom * (plusNodeWidth - newNodeWidth)) / 2,
  //         },
  //       };
  //     }
  //     return nd;
  //   })
  // );

  moveNodes(childNode, "down", edges, newNodes, setNodes, zoom);
  setEdges((edges) => {
    const newEdges = edges.filter((edge) => outputEdge.id !== edge.id);
    const edgeA = {
      id: `fromPlus-${newNode.id}-${new Date().getTime()}`,
      source: plusNode.id,
      target: newNode.id,
    };
    newEdges.push(edgeA);
    const edgeB = {
      id: `${newNode.id}-plus-${new Date().getTime()}`,
      source: newNode.id,
      target: newPlusButtonId,
    };
    newEdges.push(edgeB);
    const edgeC = {
      id: `fromPlus-${inputEdge.target}-${new Date().getTime()}`,
      source: newPlusButtonId,
      target: outputEdge.target,
    };
    newEdges.push(edgeC);
    return newEdges;
  });
}

export function moveNodes(
  node,
  yDirection = "up",
  edges,
  nodes,
  setNodes,
  zoom
) {
  const mult = yDirection !== "up" ? 1 : -1;
  setNodes((nodes) =>
    nodes.map((nd) => {
      if (nd.id === node.id) {
        return {
          ...nd,
          position: {
            x: nd.position.x,
            y: nd.position.y + (displacementDistance * 2 + zoom * 40) * mult,
          },
        };
      }
      return nd;
    })
  );
  const outgoingEdge = edges.find((edg) => edg.source === node.id);
  if (!outgoingEdge) return;
  const childNode = nodes.find((nd) => nd.id === outgoingEdge.target);
  moveNodes(childNode, yDirection, edges, nodes, setNodes, zoom);
}
