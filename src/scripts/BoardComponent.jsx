import React from 'react';
import PropTypes from 'prop-types';
import TileComponent from './TileComponent';

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
      {rows.map(value => (<div className="app-row row" key={value.id}>{value.tiles.map(tile => tile)}</div>))}
    </div>
  );
}

BoardComponent.propTypes = {
  boardString: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export { BoardComponent as default };
