import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cn from 'classnames';
import TextBoxOverlay from './TextBoxOverlay';
import { calculate } from 'services/calculatorService';
import { log } from 'utilities/logging';
import { alphaNumericRegex } from 'utilities/calculations';
import * as textboxActions from 'actions/textboxActions';

class TextBox extends Component {
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

    this.props.createCalculate(this.state.inputValue);

    this.setState({ isSubmitEnabled: false });

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
                disabled={
                  !this.state.isSubmitEnabled || !this.state.isInputValid
                }
              >
                Submit
              </button>
            </div>
          </fieldset>
        </form>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
        <pre>{JSON.stringify(this.props, null, 2)}</pre>
        {this.state.isOverlayOpen && (
          <TextBoxOverlay onOverlayClose={this.onOverlayClose}>
            {this.state.calculationResult}
          </TextBoxOverlay>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    calculationResult: state.calculationResult,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    createCalculate: data => dispatch(textboxActions.createCalculate(data)),
    /* Or use this helper method for the same (with actions)
      actions: bindActionCreators(textboxActions, dispatch),
    */     
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);
