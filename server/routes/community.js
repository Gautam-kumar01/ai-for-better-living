const express = require('express');
const router = express.Router();

const communityData = {
  metrics: {
    population: 85420,
    households: 32150,
    businesses: 5230,
    schools: 124
  },
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

router.get('/metrics', (req, res) => {
  res.json(communityData.metrics);
});

router.get('/activities', (req, res) => {
  res.json(communityData.activities);
});

router.get('/services', (req, res) => {
  res.json(communityData.services);
});

module.exports = router;