import {
  LineChart,
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
              // d.pct = (100+d.pct) * d.current / 100
              // d.pcT5 = (100+d.pcT5) * d.current / 100
              // d.pcT10 = (100+d.pcT10) * d.current / 100
              // d.pcT20 = (100+d.pcT20) * d.current / 100
              // d.pcT1m = (100+d.pcT1m) * d.current / 100
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
    if(this.state.data.length == 0)return null;
    return (
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
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
          <Line type="monotone" dataKey="current" stroke="Red" />
          <Area type="monotone" dataKey="pct" stroke="Orange" fill="Orange" fillOpacity={0.3}/>
          <Area type="monotone" dataKey="pcT5" stroke="Grey" fill="Grey" fillOpacity={0.3}/>
          <Area type="monotone" dataKey="pcT10" stroke="Brown"  fill="Brown" fillOpacity={0.3}/>
          <Area type="monotone" dataKey="pcT20" stroke="Olive" fill="Olive" fillOpacity={0.3}/>
          <Area type="monotone" dataKey="pcT1m" stroke="Teal" file="Teal" fillOpacity={0.3}/>
          <CartesianGrid stroke="#ccc" strokeDasharray="5 5"/>
          <XAxis dataKey="date">
          <Label value={this.state.data.length > 0 ? this.state.data[0].name:''} offset={0} position="top" />
          </XAxis>
          <YAxis/>
          <Tooltip/>
          <Legend />
        </AreaChart>
     
      </ResponsiveContainer>
    )
  }
}