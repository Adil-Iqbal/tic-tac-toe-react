import React from 'react';
import BoardComponent from './BoardComponent';
import UIComponent from './UIComponent';
import {
  HUMAN, COMPUTER, EMPTY, rollBoolean, rollBlunder, sleep,
  getEmptyTiles, createChildNode, pickRandomElement,
} from './utility';

/** App Comonent. Handles all business-logic of the app. */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      highlight: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      winConditions: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
      humansTurn: rollBoolean(),
      humanIsX: rollBoolean(),
      blunderLimit: 0.05,
      blunderChance: rollBlunder(this.blunderLimit),
      score: {
        wins: 0,
        losses: 0,
        draws: 0,
      },
      checkBoard: false,
      maxDepth: 10,
      lockState: false,
      computerHasMoved: false,
    };

    this.newGame = this.newGame.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
    this.handleClearScore = this.handleClearScore.bind(this);
  }

  /** React life-cycle method. Called after component is initially mounted. */
  componentDidMount() {
    this.newGame();
    const { humansTurn } = this.state;
    if (!humansTurn) {
      this.computersMove();
    }
  }

  /** React life-cycle method. Called after a render. */
  componentDidUpdate() {
    const {
      checkBoard, board, humansTurn, lockState,
    } = this.state;
    if (checkBoard) {
      if (this.checkWin(board) === null) {
        this.checkDraw();
      }
    }
    if (!humansTurn && !lockState) {
      this.computersMove();
    }
  }

  /** Clears the board and resets the game. */
  newGame() {
    const { blunderLimit } = this.state;
    this.setState({
      board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      highlight: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      humansTurn: rollBoolean(),
      humanIsX: rollBoolean(),
      blunderChance: rollBlunder(blunderLimit),
      checkBoard: false,
      lockState: false,
      computerHasMoved: false,
    });
  }

  /**
   * Checks if the current board or node meets a win condition.
   * @param {number[]} board The current board or node to be evaluated.
   * @param {boolean} isNode If true, returns boolean. If false, resolves game if win occurs.
   * @param {boolean} returnPlayer If true, returns integer representation of winning player.
   * @returns {boolean|number|null} Return type depends on setting of isNode & returnPlayer params.
   */
  checkWin(board, isNode = false, returnPlayer = false) {
    const { winConditions } = this.state;
    for (let i = 0; i < winConditions.length; i += 1) {
      let a = winConditions[i][0];
      let b = winConditions[i][1];
      let c = winConditions[i][2];
      a = board[a];
      b = board[b];
      c = board[c];
      if (a === b && a === c && a !== EMPTY) {
        if (!isNode) {
          this.resolveGame(i, a);
          return false;
        }
        if (returnPlayer) {
          return a;
        }
        return true;
      }
    }
    if (isNode) {
      return false;
    }
    return null;
  }

  /**
   * Called when a win condition is met.
   * Increments score, highlights winning move, and starts next game.
   * @param {number} index Index of state.winCondition that was met.
   * @param {number} winner Integer representation of winning player.
   */
  async resolveGame(index, winner) {
    const { lockState } = this.state;
    let { score } = this.state;
    if (!lockState) {
      score = Object.assign({}, score);
      if (winner === HUMAN) {
        score.wins += 1;
      } else if (winner === COMPUTER) {
        score.losses += 1;
      }
      await this.setState({
        highlight: this.highlightBoard(index, winner),
        score,
        checkBoard: false,
        lockState: true,
      });
      await sleep(800);
      this.newGame();
    }
  }

  /**
   * Tells the render method which tiles to highlight in which color.
   * @param {number} index Index of state.winCondition that was met.
   * @param {number} player Integer representation of winning player.
   * @returns {number[]} Number array to replace state.highlight.
   */
  highlightBoard(index, player) {
    const { winConditions } = this.state;
    const [a, b, c] = winConditions[index];
    const newDisplay = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    newDisplay[a] = player;
    newDisplay[b] = player;
    newDisplay[c] = player;
    return newDisplay;
  }

  /** Checks if the current board meets the draw condition. */
  checkDraw() {
    const { board } = this.state;
    if (!board.includes(EMPTY)) {
      this.drawGame();
    }
  }

  /**
   * Called when the draw condition is met.
   * Increments score, highlights board, and starts next game.
   */
  async drawGame() {
    const { lockState } = this.state;
    let { score } = this.state;
    if (!lockState) {
      score = Object.assign({}, score);
      score.draws += 1;
      await this.setState({
        highlight: [2, 2, 2, 2, 2, 2, 2, 2, 2],
        score,
        checkBoard: false,
        lockState: true,
      });
      await sleep(800);
      this.newGame();
    }
  }

  /**
   * Handles a tile being clicked.
   * @param {object} obj Object containing index of tile that was clicked.
   */
  handleTileClick(obj) {
    const index = obj.currentTarget.dataset.board_index;
    const { board, humansTurn } = this.state;
    if (humansTurn && board[index] === EMPTY) {
      this.claimTile(index, HUMAN);
    }
  }

  /**
   * Registers tile ownership.
   * @param {number} index Index of state.board that was claimed.
   * @param {number} player Integer representation of player claiming tile.
   */
  claimTile(index, player) {
    const { board, humansTurn, lockState } = this.state;
    let { computerHasMoved } = this.state;
    if (!lockState) {
      board[index] = player;
      if (!computerHasMoved && player === COMPUTER) {
        computerHasMoved = true;
      }
      this.setState({
        board,
        humansTurn: !humansTurn,
        checkBoard: true,
        computerHasMoved,
      });
    }
  }

  /**
   * Compares state.blunderChance to a random number.
   * @returns {boolean} Result of comparison.
   */
  doesBlunder() {
    const { blunderChance: randomA } = this.state;
    const randomB = Math.random();
    const compare = randomA >= randomB;
    return compare;
  }

  /**
   * Converts state.board from number array to string Xs and Os.
   * @returns {string} String representation of state.board.
   */
  boardToString() {
    const { board, humanIsX } = this.state;
    let boardString = '';
    for (let i = 0; i < board.length; i += 1) {
      if (board[i] === HUMAN) {
        boardString += humanIsX ? 'X' : 'O';
      } else if (board[i] === COMPUTER) {
        boardString += humanIsX ? 'O' : 'X';
      } else {
        boardString += ' ';
      }
    }
    return boardString;
  }

  /**
   * Checks if a node is terminal.
   * @param {number} depth Indicates the depth of the node.
   * @param {number[]} emptyTiles The indices of empty tiles in the node.
   * @param {number|null} winner Integer representation of the winning player, if any.
   */
  isTerminalNode(depth, emptyTiles, winner) {
    const { maxDepth } = this.state;
    if (depth > maxDepth || emptyTiles.length === 0 || typeof winner === 'number') {
      if (emptyTiles.length === 0 && typeof winner !== 'number') {
        return 0;
      }
      if (typeof winner === 'number') {
        return (depth - maxDepth) * winner;
      }
    }
    return false;
  }

  /**
   * Determines the best move by constructing a search tree of all possible AI moves.
   * @param {number[]} node The state of the board after possible moves are played.
   * @param {number} depth The depth of the tree.
   * @param {number} alpha Prunes nodes that could not possibly be maximizing.
   * @param {number} beta Prunes nodes that could not possibly be minimizing.
   * @param {boolean} first If true, designates the root node.
   * @returns {number} If root node, returns index of best move. Otherwise returns heuristic value.
   */
  minimaxA(node, depth = 0, alpha = -Infinity, beta = Infinity, first = true) {
    const emptyTiles = getEmptyTiles(node);
    const winner = this.checkWin(node, true, true);
    const terminal = this.isTerminalNode(depth, emptyTiles, winner);
    if (typeof terminal === 'number') {
      return terminal;
    }
    let maxValue = -Infinity;
    let index = null;
    let localAlpha = alpha;
    for (let i = 0; i < emptyTiles.length; i += 1) {
      const deeper = depth + 1;
      const child = createChildNode(node, emptyTiles[i], COMPUTER);
      const value = this.minimaxB(child, deeper, localAlpha, beta);
      if (value > maxValue) {
        maxValue = value;
        index = emptyTiles[i];
      }
      if (value > localAlpha) {
        localAlpha = value;
      }
      if (localAlpha >= beta) {
        if (first) {
          return index;
        }
        return localAlpha;
      }
    }
    if (first) {
      return index;
    }
    return maxValue;
  }

  /**
   * Determines the best move by constructing a search tree of all possible human moves.
   * @param {number[]} node The state of the board after possible moves are played.
   * @param {number} depth  The depth of the tree.
   * @param {number} alpha Prunes nodes that could not possibly be maximizing.
   * @param {number} beta Prunes nodes that could not possibly be minimizing.
   * @returns {number} The heuristic value of this node.
   */
  minimaxB(node, depth = 0, alpha = -Infinity, beta = Infinity) {
    const emptyTiles = getEmptyTiles(node);
    const winner = this.checkWin(node, true, true);
    const terminal = this.isTerminalNode(depth, emptyTiles, winner);
    if (typeof terminal === 'number') {
      return terminal;
    }
    let minValue = Infinity;
    let localBeta = beta;
    for (let i = 0; i < emptyTiles.length; i += 1) {
      const deeper = depth + 1;
      const child = createChildNode(node, emptyTiles[i], HUMAN);
      const value = this.minimaxA(child, deeper, alpha, localBeta, false);
      if (value < minValue) {
        minValue = value;
      }
      if (value < localBeta) {
        localBeta = value;
      }
      if (alpha >= localBeta) {
        return localBeta;
      }
    }
    return minValue;
  }

  /**
   * Determines which tile the AI will claim. If it's the first move, the AI will randomly
   * claim either the center tile or the corners. If it's the second move, the AI will attempt
   * to claim the center tile, otherwise it will claim one of the corners. Thereafter, if the
   * AI blunders, it will claim a random tile. If it does not blunder, it will make the best
   * possible move.
   */
  computersMove() {
    const { computerHasMoved, board } = this.state;
    let move;
    if (!computerHasMoved) {
      const humanHasMoved = board.reduce((a, b) => a || b === HUMAN, false);
      const corners = [0, 2, 6, 8];
      if (humanHasMoved) {
        const humanMove = board.indexOf(HUMAN);
        if (humanMove === 4) {
          move = pickRandomElement(corners);
        } else {
          move = 4;
        }
      } else {
        const cornersAndMiddle = [4].concat(corners);
        move = pickRandomElement(cornersAndMiddle);
      }
    } else if (this.doesBlunder()) {
      move = this.randomMove();
    } else {
      move = this.minimaxA(board, 0, COMPUTER);
    }
    this.claimTile(move, COMPUTER);
  }

  /**
   * Chooses an empty tile at random.
   * @returns {number} Index of a random empty tile.
   */
  randomMove() {
    const { board } = this.state;
    const emptyTiles = getEmptyTiles(board);
    const randomIndex = pickRandomElement(emptyTiles);
    return randomIndex;
  }

  /**
   * Handles the 'Reset Game' button being clicked.
   * Increments loss counter, highlights board, and starts new game.
   */
  async handleResetGame() {
    const { lockState, highlight } = this.state;
    let { score } = this.state;
    if (!lockState) {
      score = Object.assign({}, score);
      score.losses += 1;
      await this.setState({
        highlight: highlight.fill(COMPUTER),
        score,
        checkBoard: false,
        lockState: true,
      });
      await sleep(800);
      this.newGame();
    }
  }

  /**
   * Handles 'Clear Score' button being clicked.
   * Clears score, highlights board, and starts new game.
   */
  async handleClearScore() {
    const { lockState } = this.state;
    let { score } = this.state;
    if (!lockState) {
      score = Object.assign({}, score);
      score.draws = 0;
      score.wins = 0;
      score.losses = 0;
      await this.setState({
        highlight: [2, 2, 2, 2, 2, 2, 2, 2, 2],
        score,
        checkBoard: false,
        lockState: true,
      });
      await sleep(800);
      this.newGame();
    }
  }

  /** React method. Renders UI. */
  render() {
    const { score, highlight } = this.state;
    const { wins, losses, draws } = score;
    return (
      <div className="app-main container mx-auto">
        <BoardComponent
          boardString={this.boardToString()}
          handleClick={this.handleTileClick}
          signals={highlight}
        />
        <UIComponent
          wins={wins}
          losses={losses}
          draws={draws}
          handleResetGame={this.handleResetGame}
          handleClearScore={this.handleClearScore}
        />
      </div>
    );
  }
}

export { App as default };
