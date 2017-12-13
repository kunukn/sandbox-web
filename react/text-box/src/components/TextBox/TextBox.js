import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import cn from 'classnames';
import TextBoxOverlay from './TextBoxOverlay';
import { calculateService } from 'services/calculatorServices';
import { log } from 'utilities/logging';
import { alphaNumericRegex } from 'utilities/calculations';
import * as textboxActions from 'actions/textboxActions';

class TextBox extends Component {
  state = {
    inputValue: '1',
    isInputValid: true,
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
    this.props.actions.calculateData({value: this.state.inputValue});
  };

  onOverlayClose = () => {
    this.props.actions.closeOverlay();
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
                disabled={!this.state.isInputValid}
              >
                Submit
              </button>
            </div>
          </fieldset>
        </form>
        <pre style={{display: 'none'}}>{JSON.stringify(this.state, null, 2)}</pre>
        <pre style={{display: ''}}>{JSON.stringify(this.props, null, 2)}</pre>
        {this.props.fromStore.isOverlayOpen && (
          <TextBoxOverlay onOverlayClose={this.onOverlayClose}>
            {this.props.fromStore.calculationResult}
          </TextBoxOverlay>
        )}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    fromStore: state.calculationResult,
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(textboxActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);
