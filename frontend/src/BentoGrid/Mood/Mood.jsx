import React, { PureComponent } from 'react';
import { PieChart, Pie, Cell, Legend, Label } from 'recharts';

const RADIAN = Math.PI / 180;
const data = [
  { name: 'Happy', value: 60, color: '#ffcc00' }, // Yellow for Happy
  { name: 'Sad', value: 30, color: '#0000ff' },   // Blue for Sad
  { name: 'Neutral', value: 10, color: '#cccccc' } // Gray for Neutral
];
const cx = 200; // Center x position of the pie chart
const cy = 200; // Center y position of the pie chart
const iR = 60;  // Inner radius of the pie chart
const oR = 120; // Outer radius of the pie chart

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 8;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="none" fill={color} />,
  ];
};

export default class Mood extends PureComponent {
  render() {
    // The mood value to point out with the needle
    const moodValue = 60; 

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
          <Label value="Mood Distribution" position="center" />
        </Pie>
        {needle(moodValue, data, cx, cy, iR, oR, '#d0d000')}
        <Legend verticalAlign="top" height={36} />
      </PieChart>
    );
  }
}
