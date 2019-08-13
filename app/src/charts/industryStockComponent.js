import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
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
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="rank3" fill="Green" />
          <Bar dataKey="rank5" fill="Blue" />
          <Bar dataKey="rank10" fill="Black" />
          <Bar dataKey="rank20" fill="Red" />
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
          <Tooltip />
          <Legend />
          <Bar dataKey="assertBalance3" fill="Green" />
          <Bar dataKey="assertBalance5" fill="Blue" />
          <Bar dataKey="assertBalance10" fill="Black" />
          <Bar dataKey="assertBalance20" fill="Red" />
        </BarChart>
      </div>
    );
  }
}
