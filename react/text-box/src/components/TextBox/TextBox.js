import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
//import cn from 'classnames';
import _ from 'lodash';
import TextBoxOverlay from './TextBoxOverlay';
//import { log } from 'utilities/logging';
import { alphaNumericRegex } from 'utilities/calculations';
import * as textboxActions from 'actions/textboxActions';

class TextBox extends Component {
  state = {
    inputValue: '',
    isInputValid: false,
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
    this.props.actions.calculateData({ value: this.state.inputValue });
  };

  onOverlayClose = () => {
    this.props.actions.closeOverlay();
  };

  componentDidMount(){
    this.inputElement.focus();
  }

  render() {
    return (
      <div className="textbox">
        <form className="pure-form" onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>Calculator</legend>
            <div className="textbox__group">
              <label htmlFor="textbox-input">Alpha Numeric:</label>
              <input
                ref={el => this.inputElement = el}
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
        {this.props.isDebugMode &&
          <Fragment>
            <h4>state</h4>
            <pre>{JSON.stringify(this.state, null, 2)} </pre>
            <h4>props</h4>
            <pre>{JSON.stringify(_.pick(this.props,['fromStore']), null, 2)}</pre>
          </Fragment>
        }
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
    fromStore: state.textbox,
    isDebugMode: state.debug.isDebugMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(textboxActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TextBox);
