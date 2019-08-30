import React from "react";
import IndustryStockComponent from "./industryStockComponent";
import {dataLoader,dataByTag} from './dataloader'
import TagStock from './tagStock'
export default class IndustryStock extends React.Component {
  constructor() {
    super();
    var loader = require("./dataloader");
    this.state = {
      data: {
      },
      tags:[]
    }

  }

  componentDidMount() {
    var $this = this;

    dataLoader(1).then(data => {
      console.log('data', data)
      $this.setState({data})
    })
  }

  rankChange(type){
    var $this = this;

    dataLoader(type).then(data => {
      console.log('data', data)
      $this.setState({data,tags:data.tags})
    })
  }

  tagClick(tag){
    console.log('tag=',tag)
    var data = dataByTag(tag);
    this.setState({data})
  }

  render() {
    return (
      <div>
        <div className="btn-toolbar">
          <div className="btn-group mr-2">
            <button className="btn btn-secondary" onClick={this.rankChange.bind(this,1)}>
              连涨
            </button>
            <button className="btn btn-secondary" onClick={this.rankChange.bind(this,2)}>
            排名前20
            </button>
            <button className="btn btn-secondary" onClick={this.rankChange.bind(this,3)}>
            资金前50
            </button>
          </div>
        </div>
        <div>
          <TagStock tags= {this.state.tags} tagClick={this.tagClick.bind(this)}/>
        </div>
        <IndustryStockComponent data={this.state.data.nowData} title={"今天"}/>
        <IndustryStockComponent data={this.state.data.yestodayData} title={"昨天"}/>
        <IndustryStockComponent data={this.state.data.beforedayData} title={"前天"}/>
      </div>
    );
  }
}
