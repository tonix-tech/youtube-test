import React, { useState } from 'react';
import { useVideos } from '../context/VideoContext';
import './AuthPage.css'; // Optional: we can put styles in index.css

export default function AuthPage() {
  const { login, register, setActivePage } = useVideos();
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (isLoginView) {
      const result = await login(email, password);
      if (result.success) {
        setActivePage('home');
      } else {
        setError(result.message);
      }
    } else {
      const result = await register(email, password);
      if (result.success) {
        setActivePage('home');
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="auth-page-container">
      <div className="auth-page-card">
        <div className="auth-logo-container">
          <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
            <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000" />
          </svg>
        </div>
        <h2>{isLoginView ? 'Sign in' : 'Create a Google Account'}</h2>
        <p className="auth-page-subtitle">to continue to YouTube</p>

        <form className="auth-page-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}
          
          <div className="auth-input-group">
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="auth-input"
            />
          </div>
          <div className="auth-input-group">
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="auth-input"
            />
          </div>
          
          {!isLoginView && (
            <p className="auth-info-text">
              You can use any letters and numbers. This is a simulated local account.
            </p>
          )}

          <div className="auth-actions">
            <button 
              type="button" 
              className="auth-toggle-btn" 
              onClick={() => { setIsLoginView(!isLoginView); setError(''); setEmail(''); setPassword(''); }}
            >
              {isLoginView ? 'Create account' : 'Sign in instead'}
            </button>
            <button type="submit" className="auth-submit-btn">
              {isLoginView ? 'Next' : 'Register'}
            </button>
          </div>
        </form>
        
        <div className="auth-page-footer">
          <button className="auth-back-btn" onClick={() => setActivePage('home')}>
            Back to YouTube
          </button>
        </div>
      </div>
    </div>
  );
}
