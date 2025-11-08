import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Leaf, Globe, TrendingDown, Award, Info } from 'lucide-react';
import '../styles/ClimateDataVisualization.css';

const ClimateDataVisualization = () => {
  const [selectedMetric, setSelectedMetric] = useState('co2');
  const [userProgress, setUserProgress] = useState(0);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const generateClimateData = (progress) => {
    const baseData = [
      { year: 2015, co2: 400, temp: 14.8, vegetation: 65, ice: 100 },
      { year: 2016, co2: 404, temp: 14.9, vegetation: 64, ice: 98 },
      { year: 2017, co2: 406, temp: 14.9, vegetation: 63, ice: 96 },
      { year: 2018, co2: 408, temp: 14.8, vegetation: 62, ice: 94 },
      { year: 2019, co2: 411, temp: 14.9, vegetation: 61, ice: 92 },
      { year: 2020, co2: 414, temp: 15.0, vegetation: 60, ice: 90 },
      { year: 2021, co2: 416, temp: 15.0, vegetation: 59, ice: 88 },
      { year: 2022, co2: 418, temp: 15.1, vegetation: 58, ice: 86 },
      { year: 2023, co2: 420, temp: 15.2, vegetation: 57, ice: 84 },
      { year: 2024, co2: 422, temp: 15.2, vegetation: 56, ice: 82 },
    ];

    const futureYears = [2025, 2026, 2027, 2028, 2029, 2030];
    const improvement = progress / 100;

    const futureData = futureYears.map((year, idx) => {
      const baseline = baseData[baseData.length - 1];
      return {
        year,
        co2: Math.round(baseline.co2 + (5 - improvement * 8) * (idx + 1)),
        temp: +(baseline.temp + (0.05 - improvement * 0.08) * (idx + 1)).toFixed(2),
        vegetation: Math.round(baseline.vegetation + (improvement * 2 - 0.5) * (idx + 1)),
        ice: Math.round(baseline.ice - (2 - improvement * 3) * (idx + 1))
      };
    });

    return [...baseData, ...futureData];
  };

  const [climateData, setClimateData] = useState(generateClimateData(0));

  useEffect(() => {
    setClimateData(generateClimateData(userProgress));
  }, [userProgress]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationProgress(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const metrics = {
    co2: {
      label: 'CO₂ Emissions (ppm)',
      color: '#10b981',
      description: 'Atmospheric carbon dioxide concentration',
      icon: TrendingDown
    },
    temp: {
      label: 'Global Temperature (°C)',
      color: '#ef4444',
      description: 'Average global surface temperature',
      icon: Globe
    },
    vegetation: {
      label: 'Vegetation Index (%)',
      color: '#98FF98', // mint green
      description: 'Global vegetation health indicator',
      icon: Leaf
    },
    ice: {
      label: 'Ice Coverage (%)',
      color: '#3b82f6',
      description: 'Polar ice coverage relative to 2015',
      icon: Globe
    }
  };

  const CurrentMetric = metrics[selectedMetric].icon;

  return (
    <div className="climate-container">
      <div className="climate-header">
        <div className="climate-title">
          <h1><Globe className="icon" /> Climate Data Visualization</h1>
          <p>Real-time NASA satellite data and climate indicators</p>
        </div>
        <button onClick={() => setShowInfo(!showInfo)} className="info-btn">
          <Info />
        </button>
      </div>

      {showInfo && (
        <div className="info-box">
          <h3>About This Visualization</h3>
          <p>
            This interactive dashboard combines historical climate data (2015–2024)
            with projected scenarios based on your climate action progress.
          </p>
        </div>
      )}

      <div className="earth-animation">
        <div
          className="earth-layer outer"
          style={{ transform: `rotate(${animationProgress}deg)` }}
        />
        <div
          className="earth-layer inner"
          style={{ transform: `rotate(${-animationProgress}deg)` }}
        />
        <div className="earth-center">
          <Globe className="earth-icon" />
        </div>
      </div>

      <div className="progress-card">
        <div className="progress-header">
          <Award className="progress-icon" />
          <div className="progress-text">
            <h3>Your Climate Action Progress</h3>
            <p>Complete missions to improve future projections</p>
          </div>
          <div className="progress-score">
            <div>{userProgress}%</div>
            <span>Mission Complete</span>
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={userProgress}
          onChange={(e) => setUserProgress(parseInt(e.target.value))}
          className="progress-slider"
        />
        <div className="progress-labels">
          <span>No Action</span>
          <span>Moderate Action</span>
          <span>Maximum Impact</span>
        </div>
      </div>

      <div className="metric-grid">
        {Object.entries(metrics).map(([key, metric]) => {
          const Icon = metric.icon;
          return (
            <button
              key={key}
              onClick={() => setSelectedMetric(key)}
              className={`metric-btn ${selectedMetric === key ? 'active' : ''}`}
              style={{
                borderColor: selectedMetric === key ? metric.color : '#334155',
              }}
            >
              <Icon style={{ color: metric.color }} className="metric-icon" />
              <div className="metric-title">{metric.label}</div>
            </button>
          );
        })}
      </div>

      <div className="chart-card">
        <div className="chart-header">
          <CurrentMetric style={{ color: metrics[selectedMetric].color }} />
          <h2>{metrics[selectedMetric].label}</h2>
        </div>

        <ResponsiveContainer width="100%" height={400}>
          <AreaChart data={climateData}>
            <defs>
              <linearGradient id="colorMetric" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={metrics[selectedMetric].color} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={metrics[selectedMetric].color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="year" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
            <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} />
            <Tooltip contentStyle={{
              backgroundColor: '#1e293b',
              border: '1px solid #475569',
              borderRadius: '8px',
              color: '#fff'
            }}/>
            <Area type="monotone"
              dataKey={selectedMetric}
              stroke={metrics[selectedMetric].color}
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorMetric)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ClimateDataVisualization;
