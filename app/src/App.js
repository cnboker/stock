import React, { Component } from 'react';
import { Form, FormGroup, ControlLabel, FormControl, Button, InputGroup } from 'react-bootstrap'
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
      symbols: []
    };
    this.value = '';
  }
  componentDidMount() { }

  handleSubmit(event) {
    event.preventDefault();
    var array = this
      .value
      .split(' ');
    this.setState({ symbols: [...array] })
  }

  handleChange(e) {
    this.value = e.target.value.trim() ;
  }

  getValidationState() {
    return "";
  }

  render() {
    const { symbols } = this.state
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
                placeholder="enter symbol"
                onChange={this.handleChange} />
              <InputGroup.Addon>
                <Button type="submit" bsClass="form-button" >查询</Button>
              </InputGroup.Addon>
            </InputGroup>
          </FormGroup>
        </Form>

        {
          symbols
          .map(symbol => {
            return <Sample symbol={symbol.trim()} key={symbol.trim()} />
          })}
      </div>
    );
  }
}

export default App;
