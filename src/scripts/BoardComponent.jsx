import React from 'react';
import PropTypes from 'prop-types';
import TileComponent from './TileComponent';

function BoardComponent(props) {
  const { boardString, handleClick, signals } = props;
  let index = 0;
  const rows = [];
  for (let i = 0; i < 3; i += 1) {
    const cols = [];
    for (let j = 0; j < 3; j += 1) {
      const char = boardString.charAt(index);
      cols.push(
        <TileComponent
          key={index}
          boardIndex={index}
          boardStringChar={char}
          signal={signals[index]}
          handleClick={handleClick}
        />,
      );
      index += 1;
    }
    rows.push({ id: index, tiles: cols });
  }
  return (
    <div className="app-board container mx-auto">
      {rows.map(value => (<div className="app-row row" key={value.id}>{value.tiles.map(tile => tile)}</div>))}
    </div>
  );
}

BoardComponent.propTypes = {
  signals: PropTypes.arrayOf(PropTypes.number).isRequired,
  boardString: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export { BoardComponent as default };
