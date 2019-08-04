import {
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Label
} from 'recharts'
import React, { Component } from 'react'
import axios from 'axios'
import moment from 'moment'

//const apiServer = `${process.env.APIServer}/api/screener/`
export default class XuqiuStock extends Component {
  constructor() {

    super();
    this.state = {
      data: []
    }
  }

  componentDidMount() {
    const { symbol } = this.props;
    const url = `${process.env.REACT_APP_API_URL}/api/screener/${symbol}`;

    axios
      .get(url)
      .then(x => {
        var data = [];
        x
          .data
          .forEach(function (d) {

            d.date = moment(d.date).format('YYYY-MM-DD')
            d.dd = moment(d.date).format('MM-DD')
            if (data.filter(i => d.date.indexOf(i.date) >= 0).length === 0) {
              // d.pct = (100+d.pct) * d.current / 100
              // d.pcT5 = (100+d.pcT5) * d.current / 100
              // d.pcT10 = (100+d.pcT10) * d.current / 100
              // d.pcT20 = (100+d.pcT20) * d.current / 100
              // d.pcT1m = (100+d.pcT1m) * d.current / 100
              data.push(d);
            }
          });
        data.sort(function (left, right) {
          return moment.utc(left.date).diff(moment.utc(right.date))
        });
        this.setState({ data: data })
      })
      .catch(err => {
        console.log(err)
      })
  }
  render() {
   
    if (this.state.data.length === 0) return null;
    return (
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          cx="50%"
          cy="50%"
          outerRadius="80%"
          data={this.state.data}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 0
          }}>
          <Line type="monotone" dataKey="current" stroke="Red" />
          <Area type="monotone" dataKey="pct" stroke="Red" fill="Red" fillOpacity={1} />
          <Area type="monotone" dataKey="pcT5" stroke="Blue" fill="Blue" fillOpacity={1} />
          <Area type="monotone" dataKey="pcT10" stroke="Yellow" fill="Yellow" fillOpacity={1} />
          <Area type="monotone" dataKey="pcT20" stroke="Green" fill="Green" fillOpacity={1} />
          <Area type="monotone" dataKey="pcT1m" stroke="Purple" file="Purple" fillOpacity={1} />
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
          <XAxis dataKey="dd">
            <Label value={this.state.data.length > 0 ? this.state.data[0].name : ''} offset={0} position="top" />
          </XAxis>
          <YAxis />
          <Tooltip />
          <Legend />
        </AreaChart>

      </ResponsiveContainer>
    )
  }
}