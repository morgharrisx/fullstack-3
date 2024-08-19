import React from "react";
import { Treemap, ResponsiveContainer } from "recharts";
import { useEffect, useState } from 'react';

const TopBpm = ({ data, dataKey = "size",
   ratio = 4 / 3 }) => {

const [bpmData, bpmState] = useState({
  data, dataKey "size",
  ratio = 4 / 3 
})

  useEffect(() => {
    const fetchBpmData = async () => {
      try {
        const response = await fetch('/detailed-stats');
        const data = await response.json();

        // Format the data for the Treemap
        const formattedData = data.map((track) => ({
          name: track.trackName,  // Name of the track (or could use trackName + artistName)
          size: track.tempo,      // Tempo as the size for the Treemap
        }));

        setBpmData(formattedData);
      } catch (err) {
        console.error("Failed to fetch BPM data", err);
      }
    };

    fetchBpmData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <p className="lead">Your Top BPM</p>
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
