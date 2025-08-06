import React, { useState, useEffect } from 'react';
import DashboardInternal from './components/DashboardInternal';
import DashboardExternal from './components/DashboardExternal';
import './App.css';

function App() {
  const [userType, setUserType] = useState('external'); // 'internal' or 'external'
  const [user, setUser] = useState({
    name: 'John Doe',
    role: 'admin', // 'admin', 'user', 'viewer'
    permissions: ['upload', 'view', 'audit', 'rbac']
  });

  // Simulate authentication check
  useEffect(() => {
    // In a real app, this would check authentication status
    const savedUserType = localStorage.getItem('userType') || 'external';
    setUserType(savedUserType);
  }, []);

  const switchUserType = (type) => {
    setUserType(type);
    localStorage.setItem('userType', type);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Test Upload Centre</h1>
        <div className="user-controls">
          <span>Welcome, {user.name}</span>
          <div className="user-type-switcher">
            <button 
              className={`btn ${userType === 'internal' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => switchUserType('internal')}
            >
              Internal
            </button>
            <button 
              className={`btn ${userType === 'external' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => switchUserType('external')}
            >
              External
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        {userType === 'internal' ? (
          <DashboardInternal user={user} />
        ) : (
          <DashboardExternal user={user} />
        )}
      </main>
    </div>
  );
}

export default App;