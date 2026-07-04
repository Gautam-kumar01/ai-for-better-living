import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Community() {
  const [activities, setActivities] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [activitiesRes, servicesRes] = await Promise.all([
        axios.get('/api/community/activities'),
        axios.get('/api/community/services')
      ]);
      setActivities(activitiesRes.data);
      setServices(servicesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      'Good': 'badge-good',
      'Needs Improvement': 'badge-warning',
      'Excellent': 'badge-excellent'
    };
    return badges[status] || 'badge-good';
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>👥 Community</h1>
        <p>Engage with local events, services, and community resources</p>
      </div>

      <div className="content-section">
        <h2>📅 Upcoming Events</h2>
        <div className="grid-2">
          {activities.map(activity => (
            <div key={activity.id} className="card">
              <h3>{activity.title}</h3>
              <p>📅 {activity.date}</p>
              <p>👥 {activity.participants} participants</p>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>🏛️ Community Services</h2>
        <div className="grid-2">
          {services.map((service, idx) => (
            <div key={idx} className="card">
              <h3>{service.name}</h3>
              <p>Rating: ⭐ {service.rating}</p>
              <span className={`badge ${getStatusBadge(service.status)}`}>
                {service.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Community;