import React, { Component } from 'react';
import './app.css';
import TextBox from 'components/TextBox';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <TextBox />
      </div>
    );
  }
}
