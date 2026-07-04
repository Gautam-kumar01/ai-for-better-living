const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const communityData = {
  metrics: { population: 85420, households: 32150, businesses: 5230, schools: 124 },
  activities: [
    { id: 1, title: 'Community Cleanup Day', date: '2025-07-15', participants: 234 },
    { id: 2, title: 'Neighborhood Festival', date: '2025-07-20', participants: 1500 },
    { id: 3, title: 'Tech Workshop for Seniors', date: '2025-07-25', participants: 45 }
  ],
  services: [
    { name: 'Waste Management', rating: 4.2, status: 'Good' },
    { name: 'Public Transport', rating: 3.8, status: 'Needs Improvement' },
    { name: 'Parks & Recreation', rating: 4.5, status: 'Excellent' }
  ]
};

const safetyData = {
  incidents: [
    { id: 1, type: 'Traffic', location: 'Downtown', severity: 'Low', date: '2025-07-03' },
    { id: 2, type: 'Theft', location: 'Westside', severity: 'Medium', date: '2025-07-02' },
    { id: 3, type: 'Noise', location: 'Eastside', severity: 'Low', date: '2025-07-01' }
  ],
  emergencyResources: [
    { name: 'Fire Station 1', responseTime: '4.2 min', status: 'Active' },
    { name: 'Police Precinct 5', responseTime: '3.8 min', status: 'Active' },
    { name: 'Hospital Central', responseTime: '5.1 min', status: 'Active' }
  ],
  alerts: [
    { id: 1, message: 'Road maintenance on Main St until 7/10', type: 'Warning', active: true }
  ]
};

const healthcareData = {
  facilities: [
    { name: 'City General Hospital', type: 'Hospital', beds: 450, rating: 4.3 },
    { name: 'Westside Clinic', type: 'Clinic', doctors: 12, rating: 4.5 },
    { name: 'Downtown Medical Center', type: 'Medical Center', beds: 200, rating: 4.0 }
  ],
  availability: {
    'City General Hospital': { ER: 85, ICU: 60, Beds: 70 },
    'Westside Clinic': { Appointments: 40 },
    'Downtown Medical Center': { Beds: 55 }
  },
  statistics: { dailyPatients: 1250, vaccinations: 45200, satisfaction: 4.2 }
};

app.get('/api/community/metrics', (req, res) => res.json(communityData.metrics));
app.get('/api/community/activities', (req, res) => res.json(communityData.activities));
app.get('/api/community/services', (req, res) => res.json(communityData.services));

app.get('/api/safety/incidents', (req, res) => res.json(safetyData.incidents));
app.get('/api/safety/resources', (req, res) => res.json(safetyData.emergencyResources));
app.get('/api/safety/alerts', (req, res) => res.json(safetyData.alerts));

app.get('/api/healthcare/facilities', (req, res) => res.json(healthcareData.facilities));
app.get('/api/healthcare/availability', (req, res) => res.json(healthcareData.availability));
app.get('/api/healthcare/stats', (req, res) => res.json(healthcareData.statistics));

app.post('/ai/analyze', (req, res) => {
  res.json({
    insights: [
      'Traffic congestion expected to increase by 15% during rush hour tomorrow',
      'Weather conditions favorable for outdoor community events this weekend',
      'Energy usage predicted to rise 10% due to heatwave',
      'Public transit delays likely on Line 3 due to maintenance'
    ],
    recommendations: [
      'Consider carpooling or using bike lanes tomorrow',
      'Schedule outdoor activities between 9 AM - 4 PM',
      'Set thermostats 2 degrees higher to conserve energy',
      'Plan alternative routes or leave 15 minutes earlier'
    ],
    timestamp: new Date().toISOString()
  });
});

app.get('/ai/predictions', (req, res) => {
  res.json({
    weather: { temp: 28, condition: 'Sunny', humidity: 45 },
    traffic: { congestion: 'Medium', suggestedRoutes: 3 },
    energy: { demand: 'High', peakHours: '18-22' },
    safety: { riskLevel: 'Low', patrolAreas: 5 }
  });
});

app.get('/ai/chat', (req, res) => {
  const { q } = req.query;
  const responses = {
    'events': 'Upcoming events: Community Cleanup on 7/15, Neighborhood Festival on 7/20',
    'safety': 'Current safety status: Low risk. All emergency services active.',
    'healthcare': 'City General Hospital has 70% bed availability.',
    'transport': 'Bus routes 12 and 15 are on schedule.'
  };
  let key = Object.keys(responses).find(k => q && q.toLowerCase().includes(k));
  res.json({
    response: key ? responses[key] : "I'm your AI assistant for smart communities. Ask about events, safety, healthcare, or transport!",
    timestamp: new Date().toISOString()
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
  console.log(`Open your browser and visit http://localhost:${PORT}`);
});