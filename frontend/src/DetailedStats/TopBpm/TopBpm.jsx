import React from "react";
import { Treemap, ResponsiveContainer } from "recharts";
import { useEffect, useState } from 'react';

const TopBpm = ({ data, dataKey = "size", ratio = 4 / 3 }) => {

  const [bpmData, setBpmData] = useState(null);
   

  useEffect(() => {
    const fetchBpmData = async () => {
      try {
        const response = await fetch('http://localhost:5001/detailed-stats');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Log the data to verify it's being fetched correctly
      console.log("Fetched Data:", data);

        // Format the data for the Treemap
        const formattedData = data.map((track) => ({
          name: (Math.round(track.tempo)),  
          size: (Math.round(track.tempo)),   
          
        }));

        setBpmData(formattedData);
      } catch (err) {
        console.error("Failed to fetch BPM data", err);
      }
    };

    fetchBpmData();
  }, []);

  if (!bpmData) {
    return <p>Loading...</p>; // Display loading message until data is fetched
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <p className="lead">Your Top BPM</p>
      <Treemap
        data={bpmData}
        dataKey= {dataKey}
        ratio={ratio}
        stroke="#fff"
        fill="#FF0080"
      />
    </ResponsiveContainer> 
  );
};

export default TopBpm;