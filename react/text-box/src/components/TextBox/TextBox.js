import React, { Component } from 'react';
import cn from 'classnames';
import TextBoxOverlay from './TextBoxOverlay';
import { calculate } from 'services/calculatorService';
import { log } from 'utilities/logging';
import {alphaNumericRegex} from 'utilities/calculations';

export default class TextBox extends Component {
  state = {
    inputValue: '',
    isOverlayOpen: false,
    isInputValid: false,
    isSubmitEnabled: true,
  };

  handleChange = event => {
    const inputValue = event.target.value;
    this.setState({
      inputValue,
      isInputValid: alphaNumericRegex.test(inputValue),
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    
    this.setState({isSubmitEnabled: false});
    

    calculate({ value: this.state.inputValue })
      .then(jsonResponse => {
        this.setState({
          calculationResult: jsonResponse && jsonResponse.result,
          isOverlayOpen: true,
          isSubmitEnabled: true,
        });
      })
      .catch(error => {
        this.setState({
          calculationResult: error.toString(),
          isOverlayOpen: true,
          isSubmitEnabled: true,
        });
      });
  };

  onOverlayClose = () => {
    this.setState({ isOverlayOpen: false });
  };

  render() {
    return (
      <div className="textbox">
        <form className="pure-form" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Calculator</legend>
            <div className="textbox__group">
              <label htmlFor="textbox-input">Alpha Numeric:</label>
              <input
                className="textbox__input"
                id="textbox-input"
                type="text"
                value={this.state.inputValue}
                onChange={this.handleChange}
              />
              <button
                className="pure-button pure-button-primary"
                type="submit"
                disabled={!this.state.isSubmitEnabled && !this.state.isInputValid}
              >
                Submit
              </button>
            </div>
          </fieldset>
        </form>
        {this.state.isOverlayOpen && (
          <TextBoxOverlay onOverlayClose={this.onOverlayClose}>
            {this.state.calculationResult}
          </TextBoxOverlay>
        )}
      </div>
    );
  }
}
