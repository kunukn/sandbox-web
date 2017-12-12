import React, { Component } from 'react';
import cn from 'classnames';
import './textbox.css';
import { getUsers, getTodos } from 'communications/api';
const log = console.log.bind(console);

export default class TextBox extends Component {
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
      <div className="textbox">
        <form className="pure-form" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Calculator</legend>
            <div className="textbox-form__group">
              <label htmlFor="textbox-input">Alpha Numeric:</label>
              <input
                className="textbox-form__input"
                id="textbox-input"
                type="text"
                value={this.state.inputValue}
                onChange={this.handleChange}
              />
              <button
                className="pure-button pure-button-primary"
                type="submit"
                disabled={!this.state.isInputValid}
              >
                Submit
              </button>
            </div>
          </fieldset>
        </form>
        {this.state.isOverlayOpen && (
          <div className="overlay">
            <div className="overlay__content">overlay</div>
            <button
              type="button"
              className="pure-button overlay__button"
              onClick={this.onOverlayClose}
            >
              close overlay
            </button>
          </div>
        )}
      </div>
    );
  }
}
