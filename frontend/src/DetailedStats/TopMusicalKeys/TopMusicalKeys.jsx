import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

// export default class TopMusicalKeys extends PureComponent {
//   static demoUrl = 'https://codesandbox.io/p/sandbox/tiny-bar-chart-xzyy8g';


//   render() {
//     const { data, xAxisKey, yAxisKey, barColor, width, height } = this.props;



const TopMusicalKeys = ({ xAxisKey = "name", yAxisKey = "minutesListened",
   barColor = "#8884d8", width = 600, height = 300 }) => {
  const [topMusicalKeys, setTopMusicalKeys] = useState(null);
  //   { name: 'C Major', minutesListened: 120 },
  //   { name: 'G Major', minutesListened: 90 },
  //   { name: 'A Minor', minutesListened: 75 },
  // ]);

  useEffect (() => {
    const fetchMusicalKey = async() => {
      try {
        const response = await fetch('http://localhost:5001/detailed-stats');
        if (!response.ok){
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json();

        console.log('Fetched Data:', data);

        const formattedData = data.map((track) => ({
          name: track.key,
          minutesListened: (Math.round(track.duration_ms/60000)),
        }))
        setTopMusicalKeys(formattedData);
      }catch (err){
        console.error('Failed to fetch musical key data', err);
      }
    };
    fetchMusicalKey();
  }, [])

    return (
      <ResponsiveContainer width="100%" height={height || 300}>
        <p className='lead'>Your Top Keys</p>
        <BarChart
          width={width || 600}
          height={height || 300}
          data={topMusicalKeys}
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
  export default TopMusicalKeys;
