import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { PieChart, Pie } from "recharts";
import './mood.css'

const RADIAN = Math.PI / 180;

const GaugeChart = ({
  value,
  cx,
  cy,
  innerRadius,
  outerRadius,
  needleColor,
  backgroundColor,
  leftEmoji,
  rightEmoji,
}) => {
  const total = 1;
  const ang = 180.0 * (1 - value / total);
  const length = (innerRadius + 2 * outerRadius) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx;
  const y0 = cy;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  const needlePath = (
    <>
      <circle cx={x0} cy={y0} r={r} fill={needleColor} stroke="none" />
      <path
        d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
        stroke="none"
        fill={needleColor}
      />
    </>
  );

  return (
    <div style={{ position: "relative", width: 2 * cx, height: 2 * cy }}>
      <div
        style={{
          position: "absolute",
          top: cy - outerRadius + 30,
          left: cx - outerRadius - 50,
          fontSize: "48px",
        }}
      >
        {leftEmoji}
      </div>
      <div
        style={{
          position: "absolute",
          top: cy - outerRadius + 30,
          right: cx - outerRadius - 50,
          fontSize: "48px",
        }}
      >
        {rightEmoji}
      </div>
      <PieChart width={2 * cx} height={2 * cy}>
        <Pie
          data={[{ value: 1 }]}
          startAngle={180}
          endAngle={0}
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill={backgroundColor}
          stroke="none"
        />
        {needlePath}
      </PieChart>
    </div>
  );
};

const Example = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5001/mood");
        const result = await response.json();
        setValue(result.average_valence);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <p className="stat-title">Your Mood</p>
      <GaugeChart
        value={value}
        cx={150}
        cy={200}
        innerRadius={50}
        outerRadius={100}
        needleColor="#08d003"
        backgroundColor="#ff007f" 
        leftEmoji=" 😢 " 
        rightEmoji=" 🥳 " 
      />
      <Row>
        <Col className="mood-text-info">
        <p>
            <strong>😢 Melancholic Music:</strong> If the needle is closer to the left, it indicates that the music you've been listening to is more on the sad or melancholic side.
        </p>
        <p>
            <strong>🥳 Upbeat Music:</strong> If the needle is closer to the right, it means you’ve been enjoying more upbeat and happy tunes.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Example;
