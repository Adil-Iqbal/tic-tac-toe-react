import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

function HelloWorld(props) {
  const { text } = props;
  return (
    <h1>
      {' '}
      { text }
      {' '}
    </h1>
  );
}

HelloWorld.propTypes = {
  text: PropTypes.string.isRequired,
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: 'Hello World!',
    };
  }

  render() {
    const { text } = this.state;
    return (<HelloWorld text={text} />);
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
