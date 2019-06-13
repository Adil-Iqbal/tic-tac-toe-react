import React from 'react';
import { PropTypes } from 'prop-types';

function UIComponent(props) {
  const {
    wins, losses, draws, handleResetGame, handleClearScore,
  } = props;
  return (
    <div className="app-ui container">
      <div className="row">
        <div className="col-sm app-ui-text">
          {'Wins: '}
          {wins}
        </div>
        <div className="col-sm app-ui-text">
          {'Draws: '}
          {draws}
        </div>
        <div className="col-sm app-ui-text">
          {'Losses: '}
          {losses}
        </div>
      </div>
      <div className="row">
        <div className="col-sm app-ui-buttons">
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleResetGame}
          >
            Reset Game
          </button>
        </div>
        <div className="col-sm app-ui-buttons">
          <button
            type="button"
            className="btn btn-primary center"
            onClick={handleClearScore}
          >
            Clear Score
          </button>
        </div>
      </div>
    </div>
  );
}

UIComponent.propTypes = {
  wins: PropTypes.number.isRequired,
  losses: PropTypes.number.isRequired,
  draws: PropTypes.number.isRequired,
  handleResetGame: PropTypes.func.isRequired,
  handleClearScore: PropTypes.func.isRequired,
};

export { UIComponent as default };
