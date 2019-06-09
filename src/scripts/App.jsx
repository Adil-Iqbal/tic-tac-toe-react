import React from 'react';
import BoardComponent from './BoardComponent';
import UIComponent from './UIComponent';
import {
  HUMAN, COMPUTER, EMPTY, rollBoolean, rollBlunder, sleep, getEmptyTiles, createChildNode,
} from './globalVars';

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
      blunderLimit: 0.0001,
      blunderChance: rollBlunder(this.blunderLimit),
      score: {
        wins: 0,
        losses: 0,
        draws: 0,
      },
      checkBoard: false,
      maxDepth: 10,
      lockState: false,
    };

    this.newGame = this.newGame.bind(this);
    this.handleTileClick = this.handleTileClick.bind(this);
    this.handleResetGame = this.handleResetGame.bind(this);
    this.handleResetScore = this.handleResetScore.bind(this);
  }

  componentDidMount() {
    this.newGame();
    const { humansTurn } = this.state;
    if (!humansTurn) {
      this.computersMove(true);
    }
  }

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
    });
  }

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

  highlightBoard(index, player) {
    const { winConditions } = this.state;
    const [a, b, c] = winConditions[index];
    const newDisplay = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    newDisplay[a] = player;
    newDisplay[b] = player;
    newDisplay[c] = player;
    return newDisplay;
  }

  checkDraw() {
    const { board } = this.state;
    if (!board.includes(EMPTY)) {
      this.drawGame();
    }
  }

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

  handleTileClick(env) {
    const index = env.currentTarget.dataset.board_index;
    const { board, humansTurn } = this.state;
    if (humansTurn && board[index] === EMPTY) {
      this.claimTile(index, HUMAN);
    }
  }

  claimTile(index, player) {
    const { board, humansTurn, lockState } = this.state;
    if (!lockState) {
      board[index] = player;
      this.setState({
        board,
        humansTurn: !humansTurn,
        checkBoard: true,
      });
    }
  }

  doesBlunder() {
    const { blunderChance } = this.state;
    return Math.random() >= blunderChance;
  }

  boardToString() {
    const { board, humanIsX: playerIsX } = this.state;
    let boardString = '';
    for (let i = 0; i < board.length; i += 1) {
      if (board[i] === HUMAN) {
        boardString += playerIsX ? 'X' : 'O';
      } else if (board[i] === COMPUTER) {
        boardString += playerIsX ? 'O' : 'X';
      } else {
        boardString += ' ';
      }
    }
    return boardString;
  }

  isTerminalNode(depth, emptyTiles, winningPlayer) {
    const { maxDepth } = this.state;
    if (depth > maxDepth || emptyTiles.length === 0 || typeof winningPlayer === 'number') {
      if (emptyTiles.length === 0 && typeof winningPlayer !== 'number') {
        return 0;
      }
      if (typeof winningPlayer === 'number') {
        return (maxDepth - depth) * winningPlayer;
      }
    }
    return false;
  }

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

  computersMove(forceBlunder = false) {
    const { board } = this.state;
    let index;
    if (forceBlunder || this.doesBlunder()) {
      console.log('Blunder!');
      index = this.randomMove();
    } else {
      index = this.minimaxA(board, 0, COMPUTER);
    }
    this.claimTile(index, COMPUTER);
  }

  randomMove() {
    const { board } = this.state;
    const emptyTiles = getEmptyTiles(board);
    const randomIndex = Math.floor(Math.random() * emptyTiles.length);
    const randomTile = emptyTiles[randomIndex];
    return randomTile;
  }

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

  async handleResetScore() {
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

  render() {
    const { score, blunderChance, highlight } = this.state;
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
          handleResetScore={this.handleResetScore}
        />
      </div>
    );
  }
}

export { App as default };
