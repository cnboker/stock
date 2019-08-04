import React  from "react";
import IndustryStockComponent from "./industryStockComponent";

export default class IndustryStock extends React.Component {
  constructor() {
    super();
    console.log("test--------------------------");
    var loader = require("./dataloader");
    var data = loader.dataload();
    this.state = {
      data
    };
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <IndustryStockComponent data={this.state.data.beforedayData} />
        <IndustryStockComponent data={this.state.data.yestodayData} />
        <IndustryStockComponent data={this.state.data.nowData} />
      </div>
    );
  }
}
