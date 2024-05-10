import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import JsonData2 from './data/stage_2.json';

function DeathFactors() {
  const [data, setData] = useState([]);
  const [selectedVariables, setSelectedVariables] = useState({
    'Diet low in whole grains': true,
    'Diet low in fruits': true,
    'Diet low in vegetables': true,
    'Obesity': true,
    'Low physical activities': true
  });

  useEffect(() => {
    setData(JsonData2);
  }, []);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedVariables(prev => ({ ...prev, [name]: checked }));
  };

  const variables = [
    'Diet low in whole grains',
    'Diet low in fruits',
    'Diet low in vegetables',
    'Obesity',
    'Low physical activities'
  ];

  // Define colors for the bars
  const colors = {
    'Diet low in whole grains': '#8884d8',
    'Diet low in fruits': '#82ca9d',
    'Diet low in vegetables': '#ffc658',
    'Obesity': '#ff8042',
    'Low physical activities': '#41ead4'
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        {variables.map(variable => (
          <label key={variable} style={{ 
            display: 'flex',
            alignItems: 'center', 
            margin: '5px', 
            fontSize: '16px',
            whiteSpace: 'nowrap' 
          }}>
            <input
              type="checkbox"
              name={variable}
              checked={selectedVariables[variable]}
              onChange={handleCheckboxChange}
              style={{ 
                marginRight: '5px',
                cursor: 'pointer' 
              }}
            />
            {variable}
          </label>
        ))}
      </div>
      
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
          barCategoryGap="10%"
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Year" />
          <YAxis />
          <Tooltip />
          <Legend />
          {variables.map((variable) => selectedVariables[variable] && (
            <Bar
              key={variable}
              dataKey={variable}
              fill={colors[variable]}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DeathFactors;
