import React from 'react';
import BoardComponent from './BoardComponent';
import UIComponent from './UIComponent';
import { HUMAN, COMPUTER, EMPTY } from './globalVars';

function rollBoolean() {
  return Math.random() >= 0.5;
}

function rollBlunder(max, min = 0) {
  return Math.random() * (max - min) + min;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      board: [1, 0, 1, -1, 0, -1, 1, 0, 1],
      highlight: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      winConditions: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
      humansTurn: rollBoolean(),
      humanIsX: rollBoolean(),
      blunderChance: rollBlunder(0.2),
      score: {
        wins: 0,
        losses: 0,
        draws: 0,
      },
      checkBoard: false,
    };

    this.handleTileClick = this.handleTileClick.bind(this);
  }

  componentDidMount() {
    this.newGame();
  }

  componentDidUpdate() {
    const { checkBoard } = this.state;
    if (checkBoard) {
      this.checkWin();
      this.checkDraw();
    }
  }

  newGame() {
    this.setState({
      board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      highlight: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      humansTurn: rollBoolean(),
      humanIsX: rollBoolean(),
      blunderChance: rollBlunder(0.2),
      checkBoard: false,
    });
  }

  checkWin() {
    const { board, winConditions } = this.state;
    for (let i = 0; i < winConditions.length; i += 1) {
      let a = winConditions[i][0];
      let b = winConditions[i][1];
      let c = winConditions[i][2];
      a = board[a];
      b = board[b];
      c = board[c];
      if ((a === b === c) && (a !== EMPTY)) {
        this.resolveGame(i, a);
      }
    }
  }

  async resolveGame(index, winner) {
    let { score } = this.state;
    score = Object.assign({}, score);
    if (winner === HUMAN) {
      score.wins += 1;
    } else if (winner === COMPUTER) {
      score.losses += 1;
    }
    this.setState({
      highlight: this.highlightBoard(index, winner),
      score,
      checkBoard: false,
    });
    await sleep(800);
    this.newGame();
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
      this.draw();
    }
    // else, Computer's turn begins here.
  }

  async draw() {
    let { score } = this.state;
    score = Object.assign({}, score);
    score.draws += 1;
    this.setState({
      highlight: [2, 2, 2, 2, 2, 2, 2, 2, 2],
      score,
      checkBoard: false,
    });
    await sleep(800);
    this.newGame();
  }

  handleTileClick(env) {
    const index = env.currentTarget.dataset.board_index;
    const { board, humansTurn } = this.state;
    if (humansTurn && board[index] === EMPTY) {
      this.claimTile(index, HUMAN);
    }
  }

  claimTile(index, player) {
    const { board } = this.state;
    board[index] = player;
    this.setState({
      board,
      checkBoard: true,
    });
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
          blunderChance={blunderChance}
        />
      </div>
    );
  }
}

export { App as default };
