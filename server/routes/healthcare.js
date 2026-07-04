const express = require('express');
const router = express.Router();

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
  statistics: {
    dailyPatients: 1250,
    vaccinations: 45200,
    satisfaction: 4.2
  }
};

router.get('/facilities', (req, res) => {
  res.json(healthcareData.facilities);
});

router.get('/availability', (req, res) => {
  res.json(healthcareData.availability);
});

router.get('/stats', (req, res) => {
  res.json(healthcareData.statistics);
});

module.exports = router;