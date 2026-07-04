# 🌆 H2S Smart Communities - Google Gen AI Submission

**AI for Better Living & Smarter Communities**
An intelligent Decision Intelligence Platform transforming urban living

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or later)
- Google Gen AI API Key

### Get Your Google Gen AI API Key
1. Visit: https://makersuite.google.com/app/apikey
2. Create a new project or select existing one
3. Click "Create API Key"
4. Copy your API key

### Installation & Setup

#### Option 1: Quick Start (Recommended)
1. Open the project folder
2. **Double-click `START_GOOGLE_GENAI.bat`** (Windows)
3. The script will install dependencies and start the server
4. Open your browser to: http://localhost:3000

#### Option 2: Manual Setup
```bash
# 1. Install dependencies
npm install express cors axios

# 2. Set your Google Gen AI API key
# Open google-genai-server.js and replace:
# const GOOGLE_GENAI_API_KEY = "YOUR_GOOGLE_GENAI_API_KEY"
# with your actual API key

# 3. Start the server
node google-genai-server.js

# 4. Open browser
http://localhost:3000
```

---

## ✨ Features

### 🏠 Dashboard
- **Real-time Statistics**: Population, Households, Businesses, Schools
- **AI Predictions**: Weather, Traffic, Energy, Safety
- **Quick Features Overview**: Get started fast

### 👥 Community
- **Upcoming Events**: Cleanup Day, Festival, Tech Workshop
- **Community Services**: Ratings and status
- **Interactive Cards**: Hover effects and animations

### 🛡️ Safety
- **Active Alerts**: Real-time notifications
- **Recent Incidents**: Detailed reports
- **Emergency Resources**: Fire, Police, Hospitals

### 🏥 Healthcare
- **Facility Information**: Hospitals, Clinics, Medical Centers
- **Availability Data**: Beds, ER, ICU, Appointments
- **Statistics**: Patients, Vaccinations, Satisfaction

### 🤖 AI Assistant (Google Gemini)
- **Natural Language Chat**: Ask anything about the community
- **Context-aware Responses**: Knows community data
- **Fallback System**: Works even without API

---

## 🛠️ Technology Stack

- **Frontend**: Vanilla JavaScript + Modern CSS3
- **Backend**: Node.js + Express
- **AI**: Google Gen AI (Gemini 2.0 Flash)
- **APIs**: RESTful architecture
- **Styling**: Gradients, Glassmorphism, Animations

---

## 📁 Project Structure

```
H2S project/
├── google-genai-server.js     # Main server with Google AI
├── index-genai.html          # Advanced frontend (competition version)
├── simple-server.js          # Simple Groq version
├── index.html                # Basic version
├── package.json              # Dependencies
├── START_GOOGLE_GENAI.bat    # Quick start (Windows)
├── START.bat                 # Basic quick start
└── PROJECT_README.md         # This file
```

---

## 🎯 Google Gen AI Integration

### API Endpoints

#### `/api/google-genai` (POST)
Main AI chat endpoint using Google Gemini.

```javascript
// Request
POST /api/google-genai
{
  "prompt": "What events are coming up?"
}

// Response
{
  "success": true,
  "response": "Upcoming events: Community Cleanup on 7/15, Festival on 7/20..."
}
```

#### `/api/data` (GET)
Get all community data.

#### `/api/predictions` (GET)
Get AI predictions and insights.

---

## 🌈 Design Highlights

- **Modern Gradients**: Professional color scheme
- **Glassmorphism Effects**: Frosted glass UI
- **Smooth Animations**: Hover, slide, fade effects
- **Responsive**: Works on all devices
- **Professional Typography**: Clean, readable fonts

---

## 📊 Competition Submission Features

### ✅ Key Elements Required for Google Gen AI Academy
1. **Problem Statement**: Building smarter communities with AI
2. **Solution Areas**: Urban planning, public safety, healthcare, education, environment, accessibility
3. **Technology**: Google Gen AI (Gemini), Node.js, Express
4. **Working Prototype**: Yes, fully functional
5. **Video Demo**: Record yourself using the app
6. **GitHub Repository**: Create one and push the code
7. **Project URL**: Deploy to Vercel, Netlify, or similar

---

## 🚀 Deployment

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Connect to Vercel (https://vercel.com)
3. Deploy automatically

### Option 2: Netlify
1. Push to GitHub
2. Connect to Netlify (https://netlify.com)
3. Deploy

---

## 🎥 Demo Video Tips

Record a 3-minute video showing:
1. **Dashboard Overview**: Explain the stats
2. **Navigation**: Show different tabs
3. **AI Chat**: Ask 3-5 questions
4. **Key Features**: Highlight community, safety, healthcare
5. **Outro**: Explain the impact

---

## 📝 Submission Checklist

- [ ] Project is working correctly
- [ ] Google Gen AI API key is set
- [ ] Video demo recorded (max 3 minutes)
- [ ] GitHub repository created
- [ ] All files pushed to GitHub
- [ ] Project deployed (Vercel/Netlify)
- [ ] Submission form filled out
- [ ] Screenshots ready
- [ ] README is complete

---

## 🔧 Troubleshooting

### API Not Working?
1. Check your API key is correct
2. Make sure you're using http://localhost:3000 (not file://)
3. Check server console for errors
4. Try restarting the server

### CORS Errors?
- Always use the local server (http://localhost:3000)
- Never open the HTML file directly (file://)

### Node.js Not Found?
- Download from: https://nodejs.org
- Install and restart terminal

---

## 📚 Resources

- Google Gen AI: https://makersuite.google.com
- Google Gemini Docs: https://ai.google.dev/docs
- Express.js: https://expressjs.com
- Node.js: https://nodejs.org

---

## 💡 Future Enhancements

- Real database integration (Firebase, MongoDB)
- User authentication
- Real-time data streaming
- Mobile app version
- Multi-language support
- IoT sensor integration
- Advanced analytics and charts

---

## 📄 License

MIT License - feel free to use this project!

---

## 🤝 Contributing

Built for Google Gen AI Academy submission. Good luck! 🍀

---

**Built with ❤️ and Google Gen AI**
