import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';


const data = [
  {
    name: 'Key 1',
    uv: 4000,
  },
  {
    name: 'Key 2',
    uv: 3000,
  },
  {
    name: 'Key 3',
    uv: 2000,
  },
];

// Figure out what would go on y axis. Minutes listened? right now it is uv which is user visits as it was in the example

export default class TopMusicalKeys extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/tiny-bar-chart-xzyy8g';

  render() {
    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          width={600}  
          height={300}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
