import React from 'react';
import BoardComponent from './BoardComponent';

const PLAYER = 1;
const COMPUTER = -1;
const EMPTY = 0;

class App extends React.Component {
  static rollBlunder(max, min = 0) {
    return Math.random() * (max - min) + min;
  }

  static rollBoolean() {
    return Math.random() >= 0.5;
  }

  constructor() {
    super();
    this.state = {
      board: [1, 0, 1, -1, 0, -1, 1, 0, 1],
      winConditions: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
      playersTurn: App.rollBoolean(),
      playerIsX: App.rollBoolean(),
      blunderChance: App.rollBlunder(0.2),
      score: {
        wins: 0,
        losses: 0,
        draws: 0,
      },
    };

    this.handleTileClick = this.handleTileClick.bind(this);
  }

  componentDidUpdate() {
    const { playersTurn } = this.state;
    this.checkWin();
    this.checkDraw();
    if (!playersTurn) {
      this.computersMove();
    }
  }

  initializeGame() {
    const newState = {
      board: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      playersTurn: App.rollBoolean(),
      playerIsX: App.rollBoolean(),
      blunderChance: App.rollBlunder(0.2),
    };
    this.setState(newState);
  }

  handleTileClick(boardIndex) {
    let { playersTurn } = this.state;
    const { board } = this.state;
    if (playersTurn && board[boardIndex] === EMPTY) {
      board[boardIndex] = PLAYER;
      playersTurn = false;
      this.setState({
        board,
        playersTurn,
      });
    }
  }

  doesBlunder() {
    const { blunderChance } = this.state;
    return Math.random() >= blunderChance;
  }

  boardToString() {
    const { board, playerIsX } = this.state;
    let boardString = '';
    for (let i = 0; i < board.length; i += 1) {
      if (board[i] === PLAYER) {
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
    return (
      <div className="app-main container mx-auto">
        <BoardComponent
          boardString={this.boardToString()}
          handleClick={this.handleTileClick}
        />
      </div>
    );
  }
}

export { App as default };
