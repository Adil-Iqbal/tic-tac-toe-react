import React from 'react';
import PropTypes from 'prop-types';

function HeaderComponent(props) {
  const { humansTurn, blunderChance } = props;
  const intellect = ((1 - blunderChance) * 100).toFixed(0);
  const msg = humansTurn ? `Intelligence: ${intellect}%` : 'Thinking...';
  return (
    <div className="app-header container">
      <div className="row">
        <h1 className="col text-center">Tic-Tac-Toe React</h1>
      </div>
      <div className="row">
        <div className="col text-right"><a href="http://www.adil-iqbal.com/" rel="noopener noreferrer">Home</a></div>
        <div className="col-2 text-center">|</div>
        <div className="col text-left"><a href="https://github.com/Adil-Iqbal/tic-tac-toe-react" rel="noopener noreferrer" target="_blank">About</a></div>
      </div>
      <div className="row">
        <div className="col text-center app-header-message">{msg}</div>
      </div>
    </div>
  );
}

HeaderComponent.propTypes = {
  humansTurn: PropTypes.bool.isRequired,
  blunderChance: PropTypes.number.isRequired,
};

export { HeaderComponent as default };
