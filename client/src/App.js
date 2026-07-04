import React, { useState } from 'react';
import './App.css';
import Dashboard from './components/Dashboard';
import Community from './components/Community';
import Safety from './components/Safety';
import Healthcare from './components/Healthcare';
import AIAssistant from './components/AIAssistant';
import Navbar from './components/Navbar';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'community':
        return <Community />;
      case 'safety':
        return <Safety />;
      case 'healthcare':
        return <Healthcare />;
      case 'ai':
        return <AIAssistant />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;