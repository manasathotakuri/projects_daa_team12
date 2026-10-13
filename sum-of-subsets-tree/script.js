const svg = document.getElementById("tree");
const showAllBtn = document.getElementById("showAllBtn");
const resetBtn = document.getElementById("resetBtn");

// Every node records the decisions made so far.
// I = include the current number; E = exclude it.
const values = [5, 10, 12];
const target = 15;
let allVisible = true;

function buildTree() {
  const nodes = [];
  const edges = [];
  let id = 0;

  function visit(level, sum, subset, x, y, parentId, decision) {
    const nodeId = id++;
    const isSolution = sum === target;
    const isDead = sum > target || (level === values.length && sum !== target);
    const node = { id: nodeId, level, sum, subset: [...subset], x, y, parentId, decision, isSolution, isDead };
    nodes.push(node);

    if (parentId !== null) {
      edges.push({ from: parentId, to: nodeId, label: decision });
    }
    if (level >= values.length || isSolution || sum > target) return nodeId;

    const remainingSlots = Math.pow(2, values.length - level - 1);
    const gap = 470 / Math.pow(2, level + 1);
    const leftX = x - gap;
    const rightX = x + gap;
    visit(level + 1, sum + values[level], [...subset, values[level]], leftX, y + 135, nodeId, `Include ${values[level]}`);
    visit(level + 1, sum, subset, rightX, y + 135, nodeId, `Exclude ${values[level]}`);
    return nodeId;
  }

  // Positions are assigned recursively; spread each level across the viewBox.
  function create(level, sum, subset, parentId, decision, x, y, span) {
    const nodeId = id++;
    const isSolution = sum === target;
    const isDead = sum > target || (level === values.length && sum !== target);
    nodes.push({ id: nodeId, level, sum, subset: [...subset], x, y, parentId, decision, isSolution, isDead });
    if (parentId !== null) edges.push({ from: parentId, to: nodeId, label: decision });

    if (level === values.length || isSolution || sum > target) return;
    const childSpan = span / 2;
    create(level + 1, sum + values[level], [...subset, values[level]], nodeId, `Include ${values[level]}`, x - childSpan, y + 130, childSpan);
    create(level + 1, sum, subset, nodeId, `Exclude ${values[level]}`, x + childSpan, y + 130, childSpan);
  }

  create(0, 0, [], null, "", 500, 48, 240);
  return { nodes, edges };
}

function render() {
  const { nodes, edges } = buildTree();
  svg.innerHTML = "";
  const ns = "http://www.w3.org/2000/svg";

  // Edges first, so they appear behind the nodes.
  edges.forEach(edge => {
    const from = nodes.find(n => n.id === edge.from);
    const to = nodes.find(n => n.id === edge.to);
    const path = document.createElementNS(ns, "path");
    path.setAttribute("d", `M ${from.x} ${from.y + 25} L ${to.x} ${to.y - 25}`);
    path.setAttribute("class", `edge${to.isSolution ? " solution-edge" : ""}`);
    svg.appendChild(path);

    const label = document.createElementNS(ns, "text");
    label.setAttribute("x", (from.x + to.x) / 2);
    label.setAttribute("y", (from.y + to.y) / 2 - 2);
    label.setAttribute("class", "edge-label");
    label.textContent = edge.label;
    svg.appendChild(label);
  });

  nodes.forEach(node => {
    const group = document.createElementNS(ns, "g");
    group.setAttribute("class", `node${node.isSolution ? " solution" : (node.isDead ? " dead" : "")}`);
    group.setAttribute("transform", `translate(${node.x},${node.y})`);

    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("r", 25);
    group.appendChild(circle);

    const sumText = document.createElementNS(ns, "text");
    sumText.setAttribute("y", -3);
    sumText.textContent = `Sum: ${node.sum}`;
    group.appendChild(sumText);

    const subsetText = document.createElementNS(ns, "text");
    subsetText.setAttribute("y", 12);
    subsetText.setAttribute("class", "small");
    subsetText.textContent = node.subset.length ? `{${node.subset.join(",")}}` : "Empty set";
    group.appendChild(subsetText);

    group.addEventListener("click", () => {
      alert(`Subset: {${node.subset.join(", ")}}\nSum: ${node.sum}\n${node.isSolution ? "Target found!" : "This branch does not reach the target yet."}`);
    });
    svg.appendChild(group);
  });
}

showAllBtn.addEventListener("click", () => {
  allVisible = true;
  render();
  showAllBtn.textContent = "Full tree shown";
});
resetBtn.addEventListener("click", () => {
  allVisible = false;
  render();
  showAllBtn.textContent = "Show full tree";
});
render();
