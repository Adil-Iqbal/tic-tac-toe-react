/** Integer representation of the human player. */
export const HUMAN = 1;

/** Integer representation of the AI player. */
export const COMPUTER = -1;

/** Integer representation of an empty tile. */
export const EMPTY = 0;

/** Coin toss.
 * @returns {boolean} Result of coin toss.
 */
export function rollBoolean() {
  return Math.random() >= 0.5;
}

/**
 * Returns a random number.
 * @param {number} max Maximum value of random number.
 * @param {number} min Minimum value of random number.
 * @returns {number} Random number.
 */
export function rollBlunder(max, min = 0) {
  return Math.random() * (max - min) + min;
}

/**
 * Halts execution of code for set amount of time.
 * @param {number} ms Milliseconds of delay.
 * @returns {Promise<void>}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Finds all empty tiles on a board.
 * @param {number[]} node Board state.
 * @returns {number[]} Indices of empty tiles.
 */
export function getEmptyTiles(node) {
  const emptyTiles = [];
  for (let i = 0; i < node.length; i += 1) {
    if (node[i] === EMPTY) {
      emptyTiles.push(i);
    }
  }
  return emptyTiles;
}

/**
 * Creates a hypothetical move on a given board.
 * @param {number[]} parent Board on which to make move.
 * @param {number} index Index on which the move is made.
 * @param {number} player Integer representation of player making the move.
 * @returns {number[]} New board state after move is made.
 */
export function createChildNode(parent, index, player) {
  const child = [];
  for (let i = 0; i < parent.length; i += 1) {
    child[i] = parent[i];
  }
  child[index] = player;
  return child;
}

/**
 * Picks a random element in an array.
 * @param {any[]} array Array to be processed.
 * @returns {any} Item to be returned.
 */
export function pickRandomElement(array) {
  const randomPickIndex = Math.floor(Math.random() * array.length);
  const randomElement = array[randomPickIndex];
  return randomElement;
}
