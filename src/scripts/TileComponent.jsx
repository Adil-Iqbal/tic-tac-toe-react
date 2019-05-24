import React from 'react';
import PropTypes from 'prop-types';

function TileComponent(props) {
  const {
    focus, boardIndex, boardStringChar, handleClick,
  } = props;
  return (
    <div
      role="button"
      className="app-tile col-sm auto-mx text-center"
      onClick={() => handleClick(boardIndex)}
      onKeyPress={() => handleClick(boardIndex)}
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

export { TileComponent as default };
