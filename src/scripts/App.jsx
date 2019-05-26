import React from 'react';
import BoardComponent from './BoardComponent';
import UIComponent from './UIComponent';

const PLAYER = 1;
const COMPUTER = -1;
const EMPTY = 0;

function rollBoolean() {
  return Math.random() >= 0.5;
}

function rollBlunder(max, min = 0) {
  return Math.random() * (max - min) + min;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      board: [1, 0, 1, -1, 0, -1, 1, 0, 1],
      winConditions: [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]],
      playersTurn: rollBoolean(),
      playerIsX: rollBoolean(),
      blunderChance: rollBlunder(0.2),
      score: {
        wins: 0,
        losses: 0,
        draws: 0,
      },
    };

    this.handleTileClick = this.handleTileClick.bind(this);
  }

  componentDidUpdate() {
    console.log('-- update --');
    // const { playersTurn } = this.state;
    // this.checkWin();
    // this.checkDraw();
    // if (!playersTurn) {
    //   this.computersMove();
    // }
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

  checkWin() {
    const { winConditions } = this.state;
    console.log(winConditions);
  }

  checkDraw() {
    const { board } = this.state;
    if (!board.includes(EMPTY)) {
      console.log("It's a draw!");
    }
  }

  handleTileClick(env) {
    const index = env.currentTarget.dataset.board_index;
    const { board, playersTurn } = this.state;
    if (playersTurn && board[index] === EMPTY) {
      board[index] = PLAYER;
      this.setState({
        board,
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
    const { score, blunderChance, playersTurn } = this.state;
    const { wins, losses, draws } = score;
    return (
      <div className="app-main container mx-auto">
        <BoardComponent
          playersTurn={playersTurn}
          boardString={this.boardToString()}
          handleClick={this.handleTileClick}
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
