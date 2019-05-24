/* eslint-disable jsx-a11y/click-events-have-key-events */

import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import '../styles/index.scss';

const PLAYER = 1;
const COMPUTER = -1;
const EMPTY = 0;

function TileComponent(props) {
  const {
    focus, boardIndex, boardStringChar, handleClick,
  } = props;
  return (
    <div
      role="button"
      className="app-tile col-sm auto-mx text-center"
      onClick={() => handleClick(boardIndex)}
      tabIndex={focus}
    >
      {boardStringChar}
    </div>
  );
}

TileComponent.propTypes = {
  boardIndex: PropTypes.number.isRequired,
  boardStringChar: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  focus: PropTypes.number.isRequired,
};

function BoardComponent(props) {
  const { boardString, handleClick } = props;
  let tabIndex = 0;
  let index = 0;
  const rows = [];
  for (let i = 0; i < 3; i += 1) {
    const cols = [];
    for (let j = 0; j < 3; j += 1) {
      cols.push(
        <TileComponent
          key={index}
          focus={tabIndex}
          boardIndex={index}
          boardStringChar={boardString.charAt(index)}
          handleClick={handleClick}
        />,
      );
      tabIndex = -1;
      index += 1;
    }
    rows.push({ id: index, tiles: cols });
  }
  return (
    <div className="app-board container mx-auto">
      {rows.map(value => (<div className="app-Row row" key={value.id}>{value.tiles.map(tile => tile)}</div>))}
    </div>
  );
}

BoardComponent.propTypes = {
  boardString: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

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

ReactDOM.render(<App />, document.getElementById('app'));
