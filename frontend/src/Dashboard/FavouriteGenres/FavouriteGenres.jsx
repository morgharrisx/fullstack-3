import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

// const data = [
//   { name: "Red", value: 400 },
//   { name: "Blue", value: 300 },
//   { name: "Yellow", value: 300 },
//   { name: "Green", value: 200 },
//   { name: "Purple", value: 100 },
//   { name: "Orange", value: 150 }
// ];

const COLORS = ["#06D001", "#FF0080", "#836FFF", "#4BC0C0", "#9966FF", "#FF9F40"];

const FavouriteGenres = ({ data, width, height, innerRadius, outerRadius }) => {
  return (
    <div>
      <h2>Favourite Genres</h2>
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          cx={width / 2}
          cy={height / 2}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
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

export default FavouriteGenres;
