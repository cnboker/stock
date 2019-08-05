import React from "react";
import IndustryStockComponent from "./industryStockComponent";
import DataLoader from './dataloader'

export default class IndustryStock extends React.Component {
  constructor() {
    super();
    var loader = require("./dataloader");
    this.state = {
      data: {}
    }

  }

  componentDidMount() {
    var $this = this;

    DataLoader().then(data => {
      console.log('data', data)
      $this.setState({data})
    })
  }

  render() {
    return (
      <div>
        <IndustryStockComponent data={this.state.data.nowData} title={"今天"}/>
        <IndustryStockComponent data={this.state.data.yestodayData} title={"昨天"}/>
        <IndustryStockComponent data={this.state.data.beforedayData} title={"前天"}/>
      </div>
    );
  }
}
