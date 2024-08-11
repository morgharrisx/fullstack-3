import React from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Genre A', size: 400 },
  { name: 'Genre B', size: 300 },
  { name: 'Genre C', size: 300 },
];

const TopBpm = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <Treemap
        width={400}
        height={200}
        data={data}
        dataKey="size"
        ratio={4 / 3}
        stroke="#fff"
        fill="#8884d8"
      />
    </ResponsiveContainer>
  );
};

export default TopBpm;
