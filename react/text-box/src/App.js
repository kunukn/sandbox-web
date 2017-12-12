import React, { Component } from 'react';
import './app.css';
import { getUsers, getTodos } from './api';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'type' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  componentDidMount(){
    getUsers().then(function(json) {
      console.log('parsed json', json)
    }).catch(function(ex) {
      console.log('parsing failed', ex)
    });
  }

  render() {
    return (
      <div className="app">
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
          <div>{this.state.value}</div>
        </form>
      </div>
    );
  }
}
