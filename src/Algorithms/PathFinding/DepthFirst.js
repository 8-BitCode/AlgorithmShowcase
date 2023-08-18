export const DepthFirst = (edges, source, target) => {
  const adj = {};
  for (let i = 0; i < edges.length; i++) {
    const [v1, v2, len] = edges[i];
    if (!adj[v1]) adj[v1] = {};
    if (!adj[v2]) adj[v2] = {};
    adj[v1][v2] = len;
    adj[v2][v1] = len;
  }

  const visited = new Set();
  const checkedCells = new Set();

  let shortestPath = [];

  const dfs = (node, path) => {
    if (node === target) {
      shortestPath = path;
      return true;
    }

    visited.add(node);
    checkedCells.add(node);

    for (const neighbor in adj[node]) {
      if (!visited.has(neighbor)) {
        const newPath = dfs(neighbor, [...path, neighbor]);
        if (newPath) return true;
      }
    }

    return false;
  };

  dfs(source, [source]);

  return [shortestPath, Array.from(checkedCells)];
};