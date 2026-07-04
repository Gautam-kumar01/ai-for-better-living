import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Healthcare() {
  const [facilities, setFacilities] = useState([]);
  const [availability, setAvailability] = useState({});
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [facilitiesRes, availabilityRes, statsRes] = await Promise.all([
        axios.get('/api/healthcare/facilities'),
        axios.get('/api/healthcare/availability'),
        axios.get('/api/healthcare/stats')
      ]);
      setFacilities(facilitiesRes.data);
      setAvailability(availabilityRes.data);
      setStats(statsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🏥 Healthcare</h1>
        <p>Access healthcare facilities, availability, and statistics</p>
      </div>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#667eea20' }}>
              👤
            </div>
            <div className="stat-value">{stats.dailyPatients.toLocaleString()}</div>
            <div className="stat-label">Daily Patients</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#764ba220' }}>
              💉
            </div>
            <div className="stat-value">{stats.vaccinations.toLocaleString()}</div>
            <div className="stat-label">Vaccinations</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#10b98120' }}>
              ⭐
            </div>
            <div className="stat-value">{stats.satisfaction}</div>
            <div className="stat-label">Satisfaction</div>
          </div>
        </div>
      )}

      <div className="content-section">
        <h2>🏥 Healthcare Facilities</h2>
        <div className="grid-2">
          {facilities.map((facility, idx) => (
            <div key={idx} className="card">
              <h3>{facility.name}</h3>
              <p>Type: {facility.type}</p>
              {facility.beds && <p>Beds: {facility.beds}</p>}
              {facility.doctors && <p>Doctors: {facility.doctors}</p>}
              <p>Rating: ⭐ {facility.rating}</p>
              {availability[facility.name] && (
                <div style={{ marginTop: '0.8rem' }}>
                  <strong>Availability:</strong>
                  {Object.entries(availability[facility.name]).map(([key, val]) => (
                    <p key={key}>{key}: {val}%</p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Healthcare;