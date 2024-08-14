import React from 'react';
import { Treemap, ResponsiveContainer } from 'recharts';

const TopBpm = ({ data, dataKey = "size", ratio = 4 / 3 }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <p className='lead'>Your Top BPM</p>
      <Treemap
        data={data}
        dataKey={dataKey}
        ratio={ratio}
        stroke="#fff"
        fill="#FF0080"
      />
    </ResponsiveContainer>
  );
};

export default TopBpm;
