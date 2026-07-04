import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [predictions, setPredictions] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [metricsRes, predictionsRes] = await Promise.all([
        axios.get('/api/community/metrics'),
        axios.get('/ai/predictions')
      ]);
      setMetrics(metricsRes.data);
      setPredictions(predictionsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const statCards = [
    { icon: '👥', label: 'Population', value: metrics?.population || 0, color: '#667eea' },
    { icon: '🏠', label: 'Households', value: metrics?.households || 0, color: '#764ba2' },
    { icon: '🏢', label: 'Businesses', value: metrics?.businesses || 0, color: '#f59e0b' },
    { icon: '🏫', label: 'Schools', value: metrics?.schools || 0, color: '#10b981' }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🏙️ AI for Better Living & Smarter Communities</h1>
        <p>Intelligent Decision Intelligence Platform transforming urban living</p>
      </div>

      <div className="stats-grid">
        {statCards.map((stat, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-icon" style={{ background: `${stat.color}20` }}>
              {stat.icon}
            </div>
            <div className="stat-value">{stat.value?.toLocaleString()}</div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid-2">
        <div className="content-section">
          <h2>🌤️ AI Predictions</h2>
          {predictions ? (
            <>
              <div className="card">
                <h3>Weather</h3>
                <p>Temperature: {predictions.weather.temp}°C</p>
                <p>Condition: {predictions.weather.condition}</p>
                <p>Humidity: {predictions.weather.humidity}%</p>
              </div>
              <div className="card">
                <h3>Traffic</h3>
                <p>Congestion: {predictions.traffic.congestion}</p>
                <p>Suggested Routes: {predictions.traffic.suggestedRoutes}</p>
              </div>
            </>
          ) : (
            <div className="loading">Loading predictions...</div>
          )}
        </div>

        <div className="content-section">
          <h2>🎯 Quick Features</h2>
          <div className="card">
            <h3>🤖 AI Assistant</h3>
            <p>Get instant answers about community services, events, safety, and more.</p>
          </div>
          <div className="card">
            <h3>📊 Real-time Analytics</h3>
            <p>Monitor community metrics and make data-driven decisions.</p>
          </div>
          <div className="card">
            <h3>🔔 Smart Alerts</h3>
            <p>Stay informed about important community updates and safety notices.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;