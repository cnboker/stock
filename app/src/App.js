import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Chart from './charts/stockScreener'
import Sample from './charts/sample'

class App extends Component {
  componentDidMount(){
   
  }
  render() {
   
    return (
      <Sample symbol={"SZ002456"}/>
    );
  }
}

export default App;
