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
 Pass it in with default props
 Force it to always be passed in as a prop
 Use the context from a wrapping component
 */


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

export default App;
