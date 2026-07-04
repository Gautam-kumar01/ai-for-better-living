require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Get API key from environment variables
const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.use(cors());
app.use(express.json());

// Serve static files (our HTML page)
app.use(express.static(__dirname));

// Community context for AI
const communityContext = `You are a helpful AI assistant for H2S Smart Communities. Here's some context about the community:
- Population: 85,420
- Upcoming events: Community Cleanup Day (7/15), Neighborhood Festival (7/20), Tech Workshop for Seniors (7/25)
- Healthcare facilities: City General Hospital, Westside Clinic, Downtown Medical Center
- Emergency resources: Fire Station 1, Police Precinct 5, Hospital Central
- Services: Waste Management (4.2 stars), Public Transport (3.8 stars), Parks & Recreation (4.5 stars)

Respond helpfully to user questions about the community, safety, healthcare, events, etc.`;

// Chat endpoint with real Groq API
app.get('/api/chat', async (req, res) => {
  const { q } = req.query;
  
  try {
    console.log('Calling Groq API with:', q);
    
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: communityContext },
        { role: 'user', content: q }
      ],
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('Groq API response received');
    
    res.json({
      response: response.data.choices[0].message.content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message);
    
    // Fallback responses
    const responses = {
      'events': 'Upcoming events: Community Cleanup on 7/15, Neighborhood Festival on 7/20, Tech Workshop for Seniors on 7/25.',
      'safety': 'Current safety status: Low risk. All emergency services (Fire Station 1, Police Precinct 5, Hospital Central) are active.',
      'healthcare': 'Healthcare facilities: City General Hospital (4.3 stars), Westside Clinic (4.5 stars), Downtown Medical Center (4.0 stars).',
      'transport': 'Bus routes 12 and 15 are on schedule. Traffic congestion expected to be medium tomorrow.',
      'energy': 'Energy usage predicted to rise 10% due to heatwave. Consider setting thermostats 2 degrees higher to conserve energy.'
    };

    let key = Object.keys(responses).find(k => q && q.toLowerCase().includes(k));
    
    res.json({
      response: key ? responses[key] : "I'm your AI assistant for smart communities. Ask about events, safety, healthcare, or transport!",
      timestamp: new Date().toISOString()
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   🌆 H2S Smart Communities Server is Running!             ║
║                                                            ║
║   Open your browser and go to:                            ║
║   http://localhost:${PORT}                                   ║
║                                                            ║
║   Press Ctrl+C to stop the server                         ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
  `);
});
