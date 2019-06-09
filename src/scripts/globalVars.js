export const HUMAN = 1;
export const COMPUTER = -1;
export const EMPTY = 0;

export function rollBoolean() {
  return Math.random() >= 0.5;
}

export function rollBlunder(max, min = 0) {
  return Math.random() * (max - min) + min;
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function getEmptyTiles(node) {
  const emptyTiles = [];
  for (let i = 0; i < node.length; i += 1) {
    if (node[i] === EMPTY) {
      emptyTiles.push(i);
    }
  }
  return emptyTiles;
}

export function createChildNode(parent, index, player) {
  const child = [];
  for (let i = 0; i < parent.length; i += 1) {
    child[i] = parent[i];
  }
  child[index] = player;
  return child;
}
