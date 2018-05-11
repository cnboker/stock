import React, {Component} from 'react';
import {Form, FormGroup, ControlLabel, FormControl, Button, InputGroup} from 'react-bootstrap'
import logo from './logo.svg';
import './App.css';
import Chart from './charts/stockScreener'
import Sample from './charts/sample'

class App extends Component {
  constructor() {
    super();
    this.handleChange = this
      .handleChange
      .bind(this);
    this.handleSubmit = this
      .handleSubmit
      .bind(this);

    this.state = {
      value: '',
      symbols: []
    };
  }
  componentDidMount() {}

  handleSubmit(event) {
    event.preventDefault();
    var array = this
      .state
      .value
      .split(' ');
    this.setState({symbols: array})
  }

  handleChange(e) {
    this.setState({value: e.target.value});
  }

  getValidationState() {
    return "";
  }

  render() {

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup
            controlId="form"
            bsClass="form-group"
            validationState={this.getValidationState()}>
            <InputGroup>
            <FormControl
              bsClass="form-control"
              type="text"
              value={this.state.value}
              placeholder="enter symbol"
              onChange={this.handleChange}/>
            <InputGroup.Addon>
              <Button type="submit" bsClass="form-button" >查询</Button>
            </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </Form>

        {this
          .state
          .symbols
          .map(symbol => {
            return <Sample symbol={symbol}/>
          })}
      </div>
    );
  }
}

export default App;
