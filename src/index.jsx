import { React, Component, Fragment } from 'react';
import { ReactDOM } from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <h1>Hello World</h1>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
