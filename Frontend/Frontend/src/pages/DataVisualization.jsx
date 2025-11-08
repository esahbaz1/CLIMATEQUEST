import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';


const DataVisualization = () => {
  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    axios.get('http://localhost:5000/api/missions/data')
      .then(res => {
        setData({
          labels: res.data.years,
          datasets: [
            {
              label: 'CO₂ Emissions',
              data: res.data.co2,
              borderColor: 'green',
              fill: false
            }
          ]
        });
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="data-visualization-page">
      <h2>📊 Real Climate Data</h2>
      <Line data={data} />
    </div>
  );
};

export default DataVisualization;
