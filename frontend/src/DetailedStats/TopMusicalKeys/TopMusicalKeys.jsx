import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default class TopMusicalKeys extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/tiny-bar-chart-xzyy8g';

  render() {
    const { data, xAxisKey, yAxisKey, barColor, width, height } = this.props;

    return (
      <ResponsiveContainer width="100%" height={height || 300}>
        <p className='lead'>Your Top Keys</p>
        <BarChart
          width={width || 600}
          height={height || 300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={xAxisKey || "name"} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={yAxisKey || "uv"} fill={barColor || "#8884d8"} />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
