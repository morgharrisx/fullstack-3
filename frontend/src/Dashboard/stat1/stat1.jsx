import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Red", value: 400 },
  { name: "Blue", value: 300 },
  { name: "Yellow", value: 300 },
  { name: "Green", value: 200 },
  { name: "Purple", value: 100 },
  { name: "Orange", value: 150 }
];

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40"];

const SimplePieChart = () => {
  return (
    <div>
      <h2>Favourite Genres</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={0}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default SimplePieChart;
