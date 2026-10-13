# TSP Branch-and-Bound Search Tree (4 Cities)

A standalone HTML/CSS mini project visualizing a Branch-and-Bound search tree for the Travelling Salesperson Problem.

## Run
1. Extract the ZIP.
2. Open the folder in VS Code.
3. Open `index.html` in your browser.

No Flutter, Node.js, packages, or internet connection are required.

## Distance matrix
A-B = 10, A-C = 15, A-D = 20, B-C = 35, B-D = 25, C-D = 30.

Optimal tours:
- A → B → D → C → A = 10 + 25 + 30 + 15 = 80
- A → C → D → B → A = 15 + 30 + 25 + 10 = 80

Branches with lower bound 95 are marked as pruned after a complete tour costing 80 is found.
