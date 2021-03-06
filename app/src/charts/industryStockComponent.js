import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine
} from "recharts";

export default class IndustryStockComponent extends  React.Component {
 
  render() {
    return (
      <div>
      <h3>{this.props.title}</h3>
        <BarChart
          width={2500}
          height={180}
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <ReferenceLine y={0} stroke="#000" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="rank" fill="Orange" />
          <Bar dataKey="rank3" fill="Green" />
          <Bar dataKey="rank5" fill="Blue" />
          <Bar dataKey="rank10" fill="Black" />
        </BarChart>

        <BarChart
          width={2500}
          height={180}
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ReferenceLine y={0} stroke="Red" />
          <Tooltip />
          <Legend />
          <Bar dataKey="assertBalance" fill="Orange" maxBarSize="5"/>
          <Bar dataKey="assertBalance3" fill="Green" barSize="20"/>
          <Bar dataKey="assertBalance5" fill="Blue" barSize="20"/>
          <Bar dataKey="assertBalance10" fill="Black" barSize="20"/>
        </BarChart>

        <BarChart
          width={2500}
          height={180}
          data={this.props.data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
          
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <ReferenceLine y={0} stroke="Red" />
          <Tooltip />
          <Legend />
          <Bar dataKey="pcr" fill="Orange" maxBarSize="5"/>
          <Bar dataKey="pcr3" fill="Green" barSize="20"/>
          <Bar dataKey="pcr5" fill="Blue" barSize="20"/>
          <Bar dataKey="pcr10" fill="Black" barSize="20"/>
        </BarChart>
      </div>
    );
  }
}
