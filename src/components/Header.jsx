import React, { useState, useRef, useEffect } from 'react';
import { 
  Menu, Search, Video, Grid, Bell, 
  ChevronRight, LogOut, PlaySquare, DollarSign, 
  Shield, Moon, Languages, UserX, Globe, 
  Keyboard, Settings, HelpCircle, MessageSquareWarning, UserCircle
} from 'lucide-react';
import { useVideos } from '../context/VideoContext';

export default function Header() {
  const { searchQuery, setSearchQuery, setActiveVideo, setActiveTag, setActivePage, user, logout, sidebarOpen, setSidebarOpen } = useVideos();
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
        <button className="menu-btn" aria-label="Main menu" onClick={() => setSidebarOpen(!sidebarOpen)}>
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
        
        {user ? (
          <>
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
                {user.avatar}
              </div>

              {/* Profile Dropdown Menu */}
              {showProfileMenu && (
                <div className="profile-dropdown" ref={profileMenuRef}>
                  <div className="profile-dropdown-card">
                    <div className="profile-dropdown-avatar">
                      {user.avatar}
                    </div>
                    <div className="profile-dropdown-info">
                      <h3 className="profile-dropdown-name">{user.username}</h3>
                      <div className="profile-dropdown-meta">
                        <span>{user.handle}</span>
                      </div>
                      <a 
                        href="#" 
                        className="profile-dropdown-channel-link" 
                        style={{ marginTop: '4px', display: 'inline-block' }}
                        onClick={(e) => {
                          e.preventDefault();
                          setActivePage('channel');
                          setShowProfileMenu(false);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                      >
                        View your channel
                      </a>
                    </div>
                  </div>
                  
                  <div className="profile-dropdown-actions">
                    <button className="profile-dropdown-btn" onClick={() => { setShowProfileMenu(false); alert('Opening Google Account settings...'); }}>
                      <span className="profile-dropdown-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"></path>
                          <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"></path>
                          <path d="M12 2v2"></path>
                          <path d="M12 20v2"></path>
                          <path d="M4.22 4.22l1.42 1.42"></path>
                          <path d="M18.36 18.36l1.42 1.42"></path>
                          <path d="M2 12h2"></path>
                          <path d="M20 12h2"></path>
                          <path d="M4.22 19.78l1.42-1.42"></path>
                          <path d="M18.36 5.64l1.42-1.42"></path>
                        </svg>
                      </span>
                      Google Account
                    </button>
                    <button className="profile-dropdown-btn" onClick={() => { setShowProfileMenu(false); logout(); setActivePage('auth'); }}>
                      <span className="profile-dropdown-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                          <circle cx="9" cy="7" r="4"/>
                          <path d="M20 8v6M23 11h-6"/>
                        </svg>
                      </span>
                      Switch account
                      <ChevronRight size={16} className="profile-chevron" />
                    </button>
                    <button className="profile-dropdown-btn" onClick={() => { setShowProfileMenu(false); logout(); }}>
                      <LogOut size={20} className="profile-dropdown-icon" />
                      Sign out
                    </button>
                  </div>

              <div className="profile-dropdown-divider"></div>

              <div className="profile-dropdown-actions">
                <button className="profile-dropdown-btn">
                  <PlaySquare size={20} className="profile-dropdown-icon" />
                  YouTube Studio
                </button>
                <button className="profile-dropdown-btn">
                  <DollarSign size={20} className="profile-dropdown-icon" />
                  Purchases and memberships
                </button>
              </div>

              <div className="profile-dropdown-divider"></div>

              <div className="profile-dropdown-actions">
                <button className="profile-dropdown-btn">
                  <Shield size={20} className="profile-dropdown-icon" />
                  Your data in YouTube
                </button>
                <button className="profile-dropdown-btn">
                  <Moon size={20} className="profile-dropdown-icon" />
                  Appearance: Device theme
                  <ChevronRight size={16} className="profile-chevron" />
                </button>
                <button className="profile-dropdown-btn">
                  <Languages size={20} className="profile-dropdown-icon" />
                  Display language: British Engl...
                  <ChevronRight size={16} className="profile-chevron" />
                </button>
                <button className="profile-dropdown-btn">
                  <UserX size={20} className="profile-dropdown-icon" />
                  Restricted Mode: Off
                  <ChevronRight size={16} className="profile-chevron" />
                </button>
                <button className="profile-dropdown-btn">
                  <Globe size={20} className="profile-dropdown-icon" />
                  Location: United States
                  <ChevronRight size={16} className="profile-chevron" />
                </button>
                <button className="profile-dropdown-btn">
                  <Keyboard size={20} className="profile-dropdown-icon" />
                  Keyboard shortcuts
                </button>
              </div>

              <div className="profile-dropdown-divider"></div>

              <div className="profile-dropdown-actions">
                <button className="profile-dropdown-btn">
                  <Settings size={20} className="profile-dropdown-icon" />
                  Settings
                </button>
              </div>

              <div className="profile-dropdown-divider"></div>

              <div className="profile-dropdown-actions">
                <button className="profile-dropdown-btn">
                  <HelpCircle size={20} className="profile-dropdown-icon" />
                  Help
                </button>
                <button className="profile-dropdown-btn">
                  <MessageSquareWarning size={20} className="profile-dropdown-icon" />
                  Send feedback
                </button>
              </div>
            </div>
          )}
        </div>
          </>
        ) : (
          <button className="header-signin-btn" onClick={() => setActivePage('auth')}>
            <UserCircle size={20} />
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}
