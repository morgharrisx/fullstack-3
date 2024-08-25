import React, {useState, useEffect} from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";


const COLORS = ["#d11141", "#00b159", "#00aedb", "#f37735", "#FF8C9E"];
const FavouriteGenres = () => {
  const [topGenres, setTopGenres] = useState([]);
  useEffect(() => {
    const fetchTopGenres = async () => {
      try {
        const response = await fetch("http://localhost:5001/top-genres");
        const data = await response.json();
        console.log("fetch data genreeeess", data); 
        if (data.message === "Success") {
          const formattedData = data.data.map((item) => ({
            name: item.genre,
            value: item.count,
          }));

          setTopGenres(formattedData);
        }
      } catch (error) {
        console.error("Error fetching top tracks:", error);
      }
    };

    fetchTopGenres(); 
  }, []);


  return (
    <div>
      <h2>Favourite Genres</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={topGenres}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={120}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {topGenres.map((entry, index) => (
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
