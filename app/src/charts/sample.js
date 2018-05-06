import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts'
import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'

export default class Sample extends Component {
  constructor() {

    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const {symbol} = this.props;
    const url = `http://localhost:5000/api/screener/${symbol}`
    axios
      .get(url)
      .then(x => {
        var data = [];
        x
          .data
          .forEach(function (d) {
            d.date = moment(d.date).format('YY-MM-DD')
            if (data.filter(i => d.date.indexOf(i.date) >= 0).length == 0) {
              data.push(d);
            }
          })
        this.setState({data: data})
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
    const colors = [
      'Maroon',
      'Brown',
      'Olive',
      'Teal',
      'Red',
      'Orange',
      'Yellow',
      'Pink',
      'Lime',
      'Green',
      'Coral',
      'Cyan',
      'Grey',
      'Black',
      'Navy',
      'Mint',
      'Purple'
    ]

    return (
      <ResponsiveContainer width="100%" height={500}>
        <LineChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={this.state.data}
          margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0
        }}>
          <Line type="monotone" dataKey="current" stroke="Red" label="价格"/>
          <Line type="monotone" dataKey="pct" stroke="Purple" label="前5日涨跌幅"/>
          <Line type="monotone" dataKey="pcT5" stroke="Maroon" label="前5日涨跌幅"/>
          <Line type="monotone" dataKey="pcT10" stroke="Brown"/>
          <Line type="monotone" dataKey="pcT20" stroke="Olive"/>
          <Line type="monotone" dataKey="pcT1m" stroke="Mint"/>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
          <XAxis dataKey="date"/>
          <YAxis/>
          <Tooltip/>
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    )
  }
}