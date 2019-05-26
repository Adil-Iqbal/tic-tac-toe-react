/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

function TileComponent(props) {
  const {
    boardIndex, boardStringChar, handleClick,
  } = props;
  return (
    <div
      role="button"
      className="app-tile col-sm auto-mx text-center"
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
};

export { TileComponent as default };
