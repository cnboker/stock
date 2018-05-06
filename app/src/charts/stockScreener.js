import crossfilter from 'crossfilter'
//import  d3 from 'd3'
import React, {Component} from 'react'
//import dc from 'dc'
import axios from 'axios'
var d3 = require('d3')
var dc = require('dc')
const records = [
  {
    x: 0,
    y: 1
  }, {
    x: 1,
    y: 3
  }, {
    x: 2,
    y: 5
  }
]
const data = crossfilter(records)
const dimension = data.dimension(record => record.x)
const hits = dimension
  .group()
  .reduceSum(r => r.y)

class LineChart extends Component {
  componentDidMount() {
    var that = this;
    axios
      .get('http://localhost:5000/api/screener/SZ300570')
      .then(x => {
        //console.log(x)
        var parseDate = d3
          .timeFormat('%Y-%m-%d')
        //console.log('test', parseDate(new Date("2018-04-23T06:48:13.362Z")))
        x
          .data
          .forEach(function (d) {
            d.date = parseDate(new Date(d.date))
          })
          console.log(x.data)
        var ndx = crossfilter(x.data)
        var dateDim = ndx.dimension(d => {
          return d.date
        })
        var hits = dateDim
          .group()
          .reduce(
            //callback for when data is added to the current filter results
            function(p,v){
              return p;
            },
            //callback for when data is removed from the current results
            function(p,v){
              return p;
            },
            function(){
              return {
                  count:0
              }
            }
          )
          console.log('hits', hits)
        var minDate = dateDim.bottom(1)[0].date;
        var maxDate = dateDim.top(1)[0].date
        console.log('minDate',minDate, 'maxDate',maxDate)
        that.chart = dc.lineChart(this.chart)
        that
          .chart
          .width(500).height(200)
          .dimension(dateDim)
          .group(hits)
          .x(d3.scaleTime().domain([new Date(minDate), new Date(maxDate)]))
        that
          .chart
          .render()
      })
      .catch(err => {
        console.log(err)
      })

  }
  render() {
    return (
      <div ref={chart => this.chart = chart}></div>
    )
  }
}
export default LineChart