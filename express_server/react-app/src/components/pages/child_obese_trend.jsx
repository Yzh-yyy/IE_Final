import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Label } from 'recharts';
import JsonData from './data/stage_1.json';

function ChildObeseTrend() {
  const [data, setData] = useState([]);
  const [currentYear, setCurrentYear] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [colors, setColors] = useState({});

  useEffect(() => {
    const transformedData = JsonData.map(info => ({
      entity: info.Entity || '',
      year: parseInt(info.Year, 10) || 0,
      prevalence: parseFloat(info['Prevalence of overweight among children and adolescents']) || 0
    }));
    setData(transformedData);

    // Generate and set colors for entities
    const entityColors = {};
    const entities = [...new Set(transformedData.map(d => d.entity))];
    entities.forEach(entity => {
      entityColors[entity] = getColor();
    });
    setColors(entityColors);
  }, []);

  const groupedData = data.reduce((acc, cur) => {
    if (!acc[cur.year]) {
      acc[cur.year] = {};
    }
    acc[cur.year][cur.entity] = cur.prevalence;
    return acc;
  }, {});

  const chartData = Object.keys(groupedData).map(year => {
    const entry = { year };
    Object.keys(groupedData[year]).forEach(entity => {
      entry[entity] = groupedData[year][entity];
    });
    return entry;
  }).filter(entry => currentYear === null || entry.year <= currentYear);

  useEffect(() => {
    let interval;
    if (isAnimating) {
      interval = setInterval(() => {
        setCurrentYear(year => {
          const nextYear = year + 1;
          const maxYear = Math.max(...data.map(d => d.year));
          if (nextYear > maxYear) {
            setIsAnimating(false);
            clearInterval(interval);
            return maxYear;
          }
          return nextYear;
        });
      }, 500); // Adjust time as needed
    }
    return () => clearInterval(interval);
  }, [isAnimating, data]);

  function handlePlay() {
    if (!isAnimating) {
      setCurrentYear(Math.min(...data.map(d => d.year)));
      setIsAnimating(true);
    }
  }

  function handleReset() {
    setIsAnimating(false);
    setCurrentYear(null);
  }

  // Function to generate colors for the lines
  function getColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Custom tooltip component that shows the country name and orders by highest percentage
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      // Sort payload by value in descending order
      const sortedPayload = [...payload].sort((a, b) => b.value - a.value);
      return (
        <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
          <p className="label">{`Year: ${label}`}</p>
          {sortedPayload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }}>{`${entry.name}: ${entry.value}%`}</p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <button
      onClick={handlePlay}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50', // Green color for "Play"
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        marginRight: '10px', // Adds space between the buttons
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)' // Adds a subtle shadow
      }}
    >
      Play
    </button>
    <button
      onClick={handleReset}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#F44336', // Red color for "Reset"
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)' // Adds a subtle shadow
      }}
    >
      Reset
    </button>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          {Object.keys(colors).map(entity => (
            <Line key={entity} type="monotone" dataKey={entity} name={entity} stroke={colors[entity]}>
              <Label
                position="top"
                content={({ x, y, stroke, index, payload, viewBox }) => {
                  // Only show label for the last entry in the data array
                  if (index === chartData.length - 1) {
                    return (
                      <text x={viewBox.width + 35} y={y} fill={stroke} fontSize={12} textAnchor="end">
                        {payload.entity}
                      </text>
                    );
                  }
                  return null;
                }}
              />
            </Line>
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChildObeseTrend;
