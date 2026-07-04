import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Safety() {
  const [incidents, setIncidents] = useState([]);
  const [resources, setResources] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [incidentsRes, resourcesRes, alertsRes] = await Promise.all([
        axios.get('/api/safety/incidents'),
        axios.get('/api/safety/resources'),
        axios.get('/api/safety/alerts')
      ]);
      setIncidents(incidentsRes.data);
      setResources(resourcesRes.data);
      setAlerts(alertsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Low': return '#10b981';
      case 'Medium': return '#f59e0b';
      case 'High': return '#ef4444';
      default: return '#667eea';
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🛡️ Public Safety</h1>
        <p>Monitor safety incidents, emergency resources, and alerts</p>
      </div>

      {alerts.length > 0 && (
        <div className="content-section">
          <h2>🔔 Active Alerts</h2>
          {alerts.map(alert => (
            <div key={alert.id} className="card" style={{ borderLeftColor: '#ef4444' }}>
              <h3>{alert.type}</h3>
              <p>{alert.message}</p>
            </div>
          ))}
        </div>
      )}

      <div className="grid-2">
        <div className="content-section">
          <h2>📋 Recent Incidents</h2>
          {incidents.map(incident => (
            <div key={incident.id} className="card" style={{ borderLeftColor: getSeverityColor(incident.severity) }}>
              <h3>{incident.type} - {incident.location}</h3>
              <p>📍 {incident.location}</p>
              <p>📅 {incident.date}</p>
              <span className={`badge ${incident.severity === 'Low' ? 'badge-good' : 'badge-warning'}`}>
                {incident.severity}
              </span>
            </div>
          ))}
        </div>

        <div className="content-section">
          <h2>🚒 Emergency Resources</h2>
          {resources.map((resource, idx) => (
            <div key={idx} className="card">
              <h3>{resource.name}</h3>
              <p>⏱️ Response Time: {resource.responseTime}</p>
              <span className="badge badge-good">{resource.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Safety;