import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Legend, Label } from 'recharts';

export default class MoodChart extends PureComponent {
  render() {
    const { data, cx, cy, iR, oR, chartLabel } = this.props;

    return (
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
          <Label value={chartLabel} position="center" />
        </Pie>
        <Legend verticalAlign="top" height={36} />
      </PieChart>
    );
  }
}


MoodChart.defaultProps = {
  data: [
    { name: 'Happy', value: 60, color: '#FF0080' }, 
    { name: 'Sad', value: 30, color: '#99004C' },   
    { name: 'Neutral', value: 10, color: '#999999' } 
  ],
  cx: 200, 
  cy: 200,
  iR: 70,  
  oR: 170, 
  chartLabel: 'Mood Distribution',
};
