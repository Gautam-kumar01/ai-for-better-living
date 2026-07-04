import React from 'react';

function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'community', label: 'Community', icon: '👥' },
    { id: 'safety', label: 'Safety', icon: '🛡️' },
    { id: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { id: 'ai', label: 'AI Assistant', icon: '🤖' }
  ];

  return (
    <nav className="navbar">
      <div className="logo">🌆 H2S Smart Communities</div>
      <div className="nav-links">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;