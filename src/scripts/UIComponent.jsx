import React from 'react';
import { PropTypes } from 'prop-types';

function UIComponent(props) {
  const {
    wins, losses, draws, blunderChance,
  } = props;
  let intelligence = (1 - blunderChance).toFixed(2);
  intelligence += '%';
  return (
    <div className="app-ui container">
      <div className="row">
        <div className="col-sm">
          {'Wins: '}
          {wins}
        </div>
        <div className="col-sm">
          {'Draws: '}
          {draws}
        </div>
        <div className="col-sm">
          {'Losses: '}
          {losses}
        </div>
      </div>
      <div className="row">
        <div className="col-sm">{}</div>
        <div className="col-sm">
          {'Intelligence: '}
          {intelligence}
        </div>
        <div className="col-sm">{}</div>
      </div>
    </div>
  );
}

UIComponent.propTypes = {
  wins: PropTypes.number.isRequired,
  losses: PropTypes.number.isRequired,
  draws: PropTypes.number.isRequired,
  blunderChance: PropTypes.number.isRequired,
};

export { UIComponent as default };
