require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Get API key from environment variables
const GOOGLE_GENAI_API_KEY = process.env.GOOGLE_GENAI_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

// --- Community Data ---
const communityData = {
  population: 85420,
  households: 32150,
  businesses: 5230,
  schools: 124,
  events: [
    { id: 1, title: 'Community Cleanup Day', date: '2025-07-15', participants: 234, location: 'Central Park' },
    { id: 2, title: 'Neighborhood Festival', date: '2025-07-20', participants: 1500, location: 'Downtown Plaza' },
    { id: 3, title: 'Tech Workshop for Seniors', date: '2025-07-25', participants: 45, location: 'Community Center' }
  ],
  services: [
    { name: 'Waste Management', rating: 4.2, status: 'Good' },
    { name: 'Public Transport', rating: 3.8, status: 'Needs Improvement' },
    { name: 'Parks & Recreation', rating: 4.5, status: 'Excellent' }
  ],
  healthcare: {
    facilities: [
      { name: 'City General Hospital', type: 'Hospital', beds: 450, rating: 4.3, availability: { ER: 85, ICU: 60, beds: 70 } },
      { name: 'Westside Clinic', type: 'Clinic', doctors: 12, rating: 4.5, availability: { appointments: 40 } },
      { name: 'Downtown Medical Center', type: 'Medical Center', beds: 200, rating: 4.0, availability: { beds: 55 } }
    ],
    stats: { dailyPatients: 1250, vaccinations: 45200, satisfaction: 4.2 }
  },
  safety: {
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
  },
  predictions: {
    weather: { temp: 28, condition: 'Sunny', humidity: 45 },
    traffic: { congestion: 'Medium', suggestedRoutes: 3 },
    energy: { demand: 'High', peakHours: '18-22' },
    safety: { riskLevel: 'Low', patrolAreas: 5 }
  }
};

// --- System Prompt for Google Gemini ---
const systemPrompt = `You are the AI Assistant for H2S Smart Communities, an intelligent platform for better living and smarter communities. 

Your role is to help citizens with:
- Community events and activities
- Public safety information
- Healthcare services and facilities
- Transportation updates
- Environmental and sustainability tips
- Local business information

Use a friendly, helpful, and professional tone. Keep responses concise but informative.

Community Data:
- Population: ${communityData.population.toLocaleString()}
- Upcoming Events: ${communityData.events.map(e => e.title).join(', ')}
- Healthcare Facilities: ${communityData.healthcare.facilities.map(f => f.name).join(', ')}
- Emergency Services: ${communityData.safety.emergencyResources.map(r => r.name).join(', ')}

Provide intelligent insights and actionable recommendations.`;

// --- Google Gen AI API ---
app.post('/api/google-genai', async (req, res) => {
  const { prompt } = req.body;
  
  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GOOGLE_GENAI_API_KEY}`,
      {
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${systemPrompt}\n\nUser Question: ${prompt}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1024
        }
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text || "I'm here to help!";
    
    res.json({
      success: true,
      response: aiResponse
    });
    
  } catch (error) {
    console.error('Google Gen AI Error:', error.response?.data || error.message);
    
    // Fallback to intelligent responses
    const fallbackResponses = {
      'event': 'Upcoming events: Community Cleanup on 7/15, Neighborhood Festival on 7/20, Tech Workshop for Seniors on 7/25.',
      'safety': 'Current safety status: Low risk. All emergency services (Fire Station 1, Police Precinct 5, Hospital Central) are active.',
      'healthcare': 'Healthcare facilities: City General Hospital (4.3⭐), Westside Clinic (4.5⭐), Downtown Medical Center (4.0⭐).',
      'transport': 'Bus routes 12 and 15 are on schedule. Traffic congestion expected to be medium tomorrow.',
      'energy': 'Energy usage predicted to rise 10% due to heatwave. Set thermostats 2°F higher to conserve energy.',
      'weather': 'Today: 28°C, Sunny, 45% humidity. Perfect weather for outdoor activities!',
      'default': 'I\'m your AI assistant for H2S Smart Communities! Ask about events, safety, healthcare, transport, energy, or weather.'
    };

    let key = 'default';
    const lowerPrompt = prompt.toLowerCase();
    Object.keys(fallbackResponses).forEach(k => {
      if (lowerPrompt.includes(k)) key = k;
    });

    res.json({
      success: true,
      response: fallbackResponses[key]
    });
  }
});

// --- Data API Endpoints ---
app.get('/api/data', (req, res) => res.json(communityData));
app.get('/api/predictions', (req, res) => res.json(communityData.predictions));

// --- Main Route ---
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🌆 H2S Smart Communities with Google Gen AI                  ║
║                                                               ║
║   🚀 Server is running on: http://localhost:${PORT}              ║
║                                                               ║
║   📝 Next Steps:                                              ║
║   1. Get API key: https://makersuite.google.com/app/apikey    ║
║   2. Replace GOOGLE_GENAI_API_KEY in google-genai-server.js   ║
║   3. Open browser to: http://localhost:${PORT}                  ║
║                                                               ║
║   Press Ctrl+C to stop the server                             ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
});
