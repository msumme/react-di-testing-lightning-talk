import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      content: "Initial Content"
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler() {

    fetch('/contentsFile').then((response) => {
      return response.text();
    }).then((content) => {

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
