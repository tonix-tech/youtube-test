import React, { useState } from 'react';
import { Menu, Search, Video, Grid, Bell } from 'lucide-react';
import { useVideos } from '../context/VideoContext';

export default function Header() {
  const { searchQuery, setSearchQuery, setActiveVideo, setActiveTag } = useVideos();
  const [localSearch, setLocalSearch] = useState(searchQuery);

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
  };

  const handleInputChange = (e) => {
    setLocalSearch(e.target.value);
    // Real-time search filter
    setSearchQuery(e.target.value);
  };

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
        <div className="profile-avatar" title="Your Profile" id="profile-btn">
          S
        </div>
      </div>
    </header>
  );
}
