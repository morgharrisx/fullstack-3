import React, { PureComponent, useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";

const keyToChord = [
  { major: "C Major", minor: "C Minor" },
  { major: "C♯/D♭ Major", minor: "C♯/D♭ Minor" },
  { major: "D Major", minor: "D Minor" },
  { major: "D♯/E♭ Major", minor: "D♯/E♭ Minor" },
  { major: "E Major", minor: "E Minor" },
  { major: "F Major", minor: "F Minor" },
  { major: "F♯/G♭ Major", minor: "F♯/G♭ Minor" },
  { major: "G Major", minor: "G Minor" },
  { major: "G♯/A♭ Major", minor: "G♯/A♭ Minor" },
  { major: "A Major", minor: "A Minor" },
  { major: "A♯/B♭ Major", minor: "A♯/B♭ Minor" },
  { major: "B Major", minor: "B Minor" },
];

const TopMusicalKeys = ({xAxisKey = "name", yAxisKey = "minutesListened", barColor = "#8884d8",
  width = 600,
  height = 300}) => {

  const [topMusicalKeys, setTopMusicalKeys] = useState([]);

  useEffect(() => {
    const fetchMusicalKey = async () => {
      try {
        const response = await fetch("http://localhost:5001/detailed-stats");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const formattedData = data.map((track) => {
          const keyIndex = track.key;
          const chordType = track.mode === 1 ? "major" : "minor";

          const chordName = keyToChord[keyIndex]
            ? keyToChord[keyIndex][chordType]
            : "Unknown Key";

          console.log(`Processing track: Key = ${keyIndex}, Mode = ${track.mode}, Chord = ${chordName}`);

          return {
            name: chordName,
            minutesListened: Math.round(track.duration_ms / 60000),
          };
        });
        setTopMusicalKeys(formattedData);
      } catch (err) {
        console.error("Failed to fetch musical key data", err);
      }
    };
    fetchMusicalKey();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={height || 300}>
      <p className="lead">Your Top Keys</p>
      <BarChart
        width={width}
        height={height}
        data={topMusicalKeys}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xAxisKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={yAxisKey} fill={barColor} />
      </BarChart>
    </ResponsiveContainer>
  );
};
export default TopMusicalKeys;
