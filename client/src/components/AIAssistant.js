import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AIAssistant() {
  const [messages, setMessages] = useState([
    { type: 'ai', text: "Hello! I'm your AI assistant for smarter communities. Ask me about events, safety, healthcare, or transportation!" }
  ]);
  const [input, setInput] = useState('');
  const [insights, setInsights] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    fetchAIInsights();
  }, []);

  const fetchAIInsights = async () => {
    try {
      const response = await axios.post('/ai/analyze', { query: 'community' });
      setInsights(response.data.insights);
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('Error fetching insights:', error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await axios.get('/ai/chat', { params: { q: input } });
      const aiMessage = { type: 'ai', text: response.data.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'ai', text: 'Sorry, I encountered an error. Please try again.' }]);
    }

    setIsTyping(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>🤖 AI Assistant</h1>
        <p>Your intelligent guide for smarter community living</p>
      </div>

      <div className="ai-container">
        <div className="chat-box">
          <h3 style={{ marginBottom: '1rem', color: '#333' }}>💬 Chat with AI</h3>
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="message ai">
                Typing...
              </div>
            )}
          </div>
          <div className="chat-input-container">
            <input
              type="text"
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about events, safety, healthcare..."
            />
            <button className="send-btn" onClick={sendMessage}>Send</button>
          </div>
        </div>

        <div>
          <div className="insights-card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>📊 AI Insights</h3>
            {insights.map((insight, idx) => (
              <div key={idx} className="insight-item">
                {insight}
              </div>
            ))}
          </div>

          <div className="insights-card">
            <h3 style={{ marginBottom: '1rem', color: '#333' }}>💡 Smart Recommendations</h3>
            {recommendations.map((rec, idx) => (
              <div key={idx} className="recommendation-item">
                {rec}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AIAssistant;