import React, { Component } from 'react';
import cn from 'classnames';

import './app.css';
import TextBox from 'components/TextBox';
const log = console.log.bind(console);

export default class App extends Component {
  state = {
    inputValue: '',
    isOverlayOpen: false,
    isInputValid: false,
  };

  handleChange = event => {
    const alphaNumericRegex = /^[a-z0-9]+$/i;
    const inputValue = event.target.value;
    this.setState({
      inputValue,
      isInputValid: alphaNumericRegex.test(inputValue),
    });
  };

  handleSubmit = event => {
    alert('A name was submitted: ' + this.state.inputValue);
    event.preventDefault();
  };

  onOverlayClose = () => {
    this.setState({ isOverlayOpen: false });
  };

  componentDidMount() {
    // getUsers()
    //   .then(function(json) {
    //     log('parsed json', json);
    //   })
    //   .catch(function(ex) {
    //     log('parsing failed', ex);
    //   });
  }

  render() {
    return (
      <div className="app">
        <TextBox />
      </div>
    );
  }
}
