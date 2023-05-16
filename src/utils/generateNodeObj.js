export function generateNodeObj({ position, type }) {
  const newId = `${type}-${new Date().getTime()}`;
  const newNode = {
    id: newId,
    type: type === "options" ? type : "figure",
    position,
    data: { label: `${type} node`, shape: type },
    selected: true,
  };
  return newNode;
}
