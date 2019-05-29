/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { HUMAN, COMPUTER, EMPTY } from './globalVars';

function TileComponent(props) {
  const {
    boardIndex, boardStringChar, handleClick, signal,
  } = props;
  function getClasses(s) {
    const baseClasses = 'app-tile col-sm auto-mx text-center';
    if (s === EMPTY) {
      return `${baseClasses} empty`;
    }
    if (s === HUMAN) {
      return `${baseClasses} player-wins`;
    }
    if (s === COMPUTER) {
      return `${baseClasses} player-losses`;
    }
    return `${baseClasses} draw`;
  }
  return (
    <div
      role="button"
      className={getClasses(signal)}
      data-board_index={boardIndex}
      onClick={handleClick}
      tabIndex={-1}
    >
      {boardStringChar}
    </div>
  );
}

TileComponent.propTypes = {
  boardIndex: PropTypes.number.isRequired,
  boardStringChar: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  signal: PropTypes.number.isRequired,
};

export { TileComponent as default };
