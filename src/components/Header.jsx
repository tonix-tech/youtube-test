import React, { useState, useRef, useEffect } from 'react';
import { Menu, Search, Video, Grid, Bell } from 'lucide-react';
import { useVideos } from '../context/VideoContext';

export default function Header() {
  const { searchQuery, setSearchQuery, setActiveVideo, setActiveTag, setActivePage } = useVideos();
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);
  const profileBtnRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    setActiveVideo(null); // return to grid view
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    setLocalSearch('');
    setSearchQuery('');
    setActiveTag('All');
    setActiveVideo(null);
    setActivePage('home');
  };

  const handleInputChange = (e) => {
    setLocalSearch(e.target.value);
    // Real-time search filter
    setSearchQuery(e.target.value);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileMenuRef.current && 
        !profileMenuRef.current.contains(e.target) &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(e.target)
      ) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-btn" aria-label="Main menu">
          <Menu size={20} />
        </button>
        <a href="/" onClick={handleLogoClick} className="logo" id="logo-link">
          <span className="logo-icon">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000" />
            </svg>
          </span>
          <span style={{ fontFamily: '"Roboto", sans-serif', letterSpacing: '-0.8px', fontWeight: 'bold' }}>YouTube</span>
        </a>
      </div>

      <div className="header-center">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search"
            value={localSearch}
            onChange={handleInputChange}
            className="search-input"
            id="search-input"
          />
          <button type="submit" className="search-btn" aria-label="Search button">
            <Search size={18} />
          </button>
        </form>
      </div>

      <div className="header-right">
        <button className="icon-btn" aria-label="Create video">
          <Video size={20} />
        </button>
        <button className="icon-btn" aria-label="YouTube apps">
          <Grid size={20} />
        </button>
        <button className="icon-btn" aria-label="Notifications">
          <Bell size={20} />
          <span className="badge">3</span>
        </button>
        <div className="profile-wrapper">
          <div 
            className="profile-avatar" 
            title="Your Profile" 
            id="profile-btn"
            ref={profileBtnRef}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            T
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="profile-dropdown" ref={profileMenuRef}>
              <div className="profile-dropdown-card">
                <div className="profile-dropdown-avatar">
                  T
                </div>
                <div className="profile-dropdown-info">
                  <h3 className="profile-dropdown-name">Tonix_aep7</h3>
                  <div className="profile-dropdown-meta">
                    <span>@Tonix_aep7</span>
                    <span className="profile-dropdown-dot">•</span>
                    <a href="#" className="profile-dropdown-channel-link">View channel</a>
                  </div>
                </div>
              </div>
              <div className="profile-dropdown-actions">
                <button className="profile-dropdown-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                    <circle cx="9" cy="7" r="4"/>
                    <path d="M20 8v6M23 11h-6"/>
                  </svg>
                  Switch account
                </button>
                <button className="profile-dropdown-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
