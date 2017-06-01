import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// slight improvement because it can be imported
const contentLoader = () => {
  return fetch('/contentsFile').then((response) => {
    return response.text();
  });
};

/**
 4 possibilities:
 Create a function that wraps the class that is also exported
  - Still sucks but avoids problem w/ default props.  Extra layer of indirection is ugly
    in your implementation class.
 Pass it in with default props
  - Not a bad solution - requires test cases to look slightly funny and no longer
    function as well as documentation.
 Force it to always be passed in as a prop
  - If this was more than one level deep, that totally stinks, bc imagine passing
    everything from top to bottom, no thanks.
 Use the context from a wrapping component
  - Sucks b/c you have to wrap the component even when testing inside of a component
    that provides the context
 */

function builder(contentLoader) {
  class App extends Component {

    constructor(props) {
      super(props);

      this.state = {
        content: "Initial Content"
      };
      this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
      contentLoader().then((content) => {
        this.setState(function() {
          return {content};
        })
      });
    }

    render() {

      const clickHandler = this.clickHandler;

      return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Welcome to React</h2>
          </div>
          <p className="content App-intro">
            {this.state.content}
          </p>
          <button onClick={clickHandler}>Click me!</button>
        </div>
      );
    }
  }
  return App;
}

export default builder(contentLoader);

export {builder};


