const express = require('express');
const router = express.Router();

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

router.get('/incidents', (req, res) => {
  res.json(safetyData.incidents);
});

router.get('/resources', (req, res) => {
  res.json(safetyData.emergencyResources);
});

router.get('/alerts', (req, res) => {
  res.json(safetyData.alerts);
});

module.exports = router;