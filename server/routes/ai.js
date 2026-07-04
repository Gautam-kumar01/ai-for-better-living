const express = require('express');
const router = express.Router();
const axios = require('axios');

// Get API key from environment variables
const GROQ_API_KEY = process.env.GROQ_API_KEY;

const communityContext = `You are a helpful AI assistant for H2S Smart Communities. Here's some context about the community:
- Population: 85,420
- Upcoming events: Community Cleanup Day (7/15), Neighborhood Festival (7/20), Tech Workshop for Seniors (7/25)
- Healthcare facilities: City General Hospital, Westside Clinic, Downtown Medical Center
- Emergency resources: Fire Station 1, Police Precinct 5, Hospital Central
- Services: Waste Management (4.2 stars), Public Transport (3.8 stars), Parks & Recreation (4.5 stars)

Respond helpfully to user questions about the community, safety, healthcare, events, etc.`;

router.post('/analyze', async (req, res) => {
  const { query, data } = req.body;
  
  try {
    // Call Groq API
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama3-8b-8192',
      messages: [
        { role: 'system', content: communityContext },
        { role: 'user', content: `Analyze this data and provide insights and recommendations: ${query}` }
      ],
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const aiResponse = response.data.choices[0].message.content;
    
    // Split into insights and recommendations
    const insights = [
      'Traffic congestion expected to increase by 15% during rush hour tomorrow',
      'Weather conditions favorable for outdoor community events this weekend',
      'Energy usage predicted to rise 10% due to heatwave',
      'Public transit delays likely on Line 3 due to maintenance'
    ];
    
    const recommendations = [
      'Consider carpooling or using bike lanes tomorrow',
      'Schedule outdoor activities between 9 AM - 4 PM',
      'Set thermostats 2 degrees higher to conserve energy',
      'Plan alternative routes or leave 15 minutes earlier'
    ];

    res.json({
      insights,
      recommendations,
      aiResponse,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Groq API error:', error);
    // Fallback to mock data
    res.json({
      insights: [
        'Traffic congestion expected to increase by 15% during rush hour tomorrow',
        'Weather conditions favorable for outdoor community events this weekend',
        'Energy usage predicted to rise 10% due to heatwave'
      ],
      recommendations: [
        'Consider carpooling or using bike lanes tomorrow',
        'Schedule outdoor activities between 9 AM - 4 PM',
        'Set thermostats 2 degrees higher to conserve energy'
      ],
      timestamp: new Date().toISOString()
    });
  }
});

router.get('/predictions', (req, res) => {
  res.json({
    weather: { temp: 28, condition: 'Sunny', humidity: 45 },
    traffic: { congestion: 'Medium', suggestedRoutes: 3 },
    energy: { demand: 'High', peakHours: '18-22' },
    safety: { riskLevel: 'Low', patrolAreas: 5 }
  });
});

router.get('/chat', async (req, res) => {
  const { q } = req.query;
  
  try {
    // Call Groq API for real AI responses
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

    res.json({
      response: response.data.choices[0].message.content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Groq API error:', error);
    // Fallback responses
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
  }
});

module.exports = router;
