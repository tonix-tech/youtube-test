import React from 'react';
import { Home, Compass, PlaySquare, Folder, History, Clock, ThumbsUp, ChevronRight, User, Film, Menu } from 'lucide-react';
import { useVideos } from '../context/VideoContext';

export default function Sidebar() {
  const { 
    activeVideo, 
    setActiveVideo, 
    searchQuery, 
    setSearchQuery, 
    activeTag, 
    setActiveTag,
    activePage,
    setActivePage,
    subscribedChannels,
    videos,
    sidebarOpen,
    setSidebarOpen
  } = useVideos();

  const handleHomeClick = () => {
    setSearchQuery('');
    setActiveTag('All');
    setActiveVideo(null);
    setActivePage('home');
    setSidebarOpen(false);
  };

  // Get list of unique channels the user is subscribed to with their details
  const getSubscribedChannelDetails = () => {
    const channelMap = {};
    videos.forEach(video => {
      if (subscribedChannels.has(video.channelName) && !channelMap[video.channelName]) {
        channelMap[video.channelName] = {
          name: video.channelName,
          avatar: video.channelAvatar
        };
      }
    });
    return Object.values(channelMap);
  };

  const handleChannelClick = (channelName) => {
    setSearchQuery(channelName);
    setActiveVideo(null);
    setSidebarOpen(false);
  };

  const subs = getSubscribedChannelDetails();

  // ===== MINI SIDEBAR (collapsed, always visible) =====
  const MiniSidebar = () => (
    <aside className="sidebar sidebar-mini">
      <nav className="sidebar-nav">
        <button 
          onClick={handleHomeClick} 
          className={`sidebar-link ${!activeVideo && searchQuery === '' && activeTag === 'All' && activePage === 'home' ? 'active' : ''}`}
          aria-label="Home"
        >
          <Home size={20} />
          <span>Home</span>
        </button>

        <button 
          onClick={() => { setSearchQuery('shorts'); setActiveVideo(null); setActivePage('home'); setSidebarOpen(false); }} 
          className={`sidebar-link ${searchQuery === 'shorts' && activePage === 'home' ? 'active' : ''}`}
          aria-label="Shorts"
        >
          <Compass size={20} />
          <span>Shorts</span>
        </button>

        <button 
          onClick={() => { setSearchQuery(''); setActiveTag('All'); setActiveVideo(null); setActivePage('home'); setSidebarOpen(false); }}
          className={`sidebar-link`}
          aria-label="Subscriptions"
        >
          <PlaySquare size={20} />
          <span>Subscriptions</span>
        </button>

        <div className="sidebar-divider"></div>

        <button 
          onClick={() => { setActivePage('library'); setActiveVideo(null); }}
          className={`sidebar-link ${activePage === 'library' ? 'active' : ''}`}
          aria-label="Library"
        >
          <Folder size={22} />
          <span>Library</span>
        </button>

        <button 
          onClick={() => { setSearchQuery('__history__'); setActiveTag('All'); setActiveVideo(null); setActivePage('home'); }}
          className={`sidebar-link ${searchQuery === '__history__' ? 'active' : ''}`}
          aria-label="History"
        >
          <History size={22} />
          <span>History</span>
        </button>

        <button 
          onClick={() => { setSearchQuery('__watchlater__'); setActiveTag('All'); setActiveVideo(null); setActivePage('home'); }}
          className={`sidebar-link ${searchQuery === '__watchlater__' ? 'active' : ''}`} 
          aria-label="Watch Later"
        >
          <Clock size={22} />
          <span>Watch Later</span>
        </button>

        <button 
          onClick={() => { setSearchQuery('__liked__'); setActiveTag('All'); setActiveVideo(null); setActivePage('home'); }}
          className={`sidebar-link ${searchQuery === '__liked__' ? 'active' : ''}`}
          aria-label="Liked Videos"
        >
          <ThumbsUp size={22} />
          <span>Liked</span>
        </button>
        <button 
          onClick={() => { setActivePage('library'); setActiveVideo(null); setSidebarOpen(false); }} 
          className={`sidebar-link ${activePage === 'library' ? 'active' : ''}`}
          aria-label="You"
        >
          <User size={20} />
          <span>You</span>
        </button>
      </nav>
    </aside>
  );

  // ===== EXPANDED SIDEBAR (full, shown on menu toggle) =====
  const ExpandedSidebar = () => (
    <>
      {/* Overlay backdrop */}
      <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      
      <aside className="sidebar sidebar-expanded">
        <div className="sidebar-expanded-header">
          <button className="menu-btn" aria-label="Close menu" onClick={() => setSidebarOpen(false)}>
            <Menu size={20} />
          </button>
          <a href="/" onClick={(e) => { e.preventDefault(); handleHomeClick(); }} className="logo">
            <span className="logo-icon">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
                <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.516 0-9.387.507A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.507 9.387.507 9.387.507s7.517 0 9.387-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000" />
              </svg>
            </span>
            <span style={{ fontFamily: '"Roboto", sans-serif', letterSpacing: '-0.8px', fontWeight: 'bold' }}>YouTube</span>
          </a>
        </div>
        <nav className="sidebar-nav-expanded">
          {/* Main navigation */}
          <div className="sidebar-section">
            <button 
              onClick={handleHomeClick} 
              className={`sidebar-expanded-link ${!activeVideo && searchQuery === '' && activeTag === 'All' && activePage === 'home' ? 'active' : ''}`}
            >
              <Home size={20} />
              <span>Home</span>
            </button>

            <button 
              onClick={() => { setSearchQuery('shorts'); setActiveVideo(null); setActivePage('home'); setSidebarOpen(false); }} 
              className={`sidebar-expanded-link ${searchQuery === 'shorts' && activePage === 'home' ? 'active' : ''}`}
            >
              <Compass size={20} />
              <span>Shorts</span>
            </button>
          </div>

          <div className="sidebar-expanded-divider" />

          {/* Subscriptions Section */}
          <div className="sidebar-section">
            <div className="sidebar-section-header">
              <span>Subscriptions</span>
              <ChevronRight size={16} />
            </div>
            {subs.map(sub => (
              <button 
                key={sub.name}
                className="sidebar-expanded-link sidebar-sub-link"
                onClick={() => handleChannelClick(sub.name)}
              >
                <img 
                  src={sub.avatar} 
                  alt={sub.name} 
                  className="sidebar-expanded-avatar"
                />
                <span className="sidebar-expanded-channel-name">{sub.name}</span>
                <span className="sidebar-sub-dot" />
              </button>
            ))}
            {subs.length > 5 && (
              <button className="sidebar-expanded-link sidebar-show-more">
                <ChevronRight size={18} style={{ transform: 'rotate(90deg)' }} />
                <span>Show more</span>
              </button>
            )}
          </div>

          <div className="sidebar-expanded-divider" />

          {/* You Section */}
          <div className="sidebar-section">
            <div className="sidebar-section-header">
              <span>You</span>
              <ChevronRight size={16} />
            </div>

            <button 
              className="sidebar-expanded-link"
              onClick={() => { setActivePage('channel'); setActiveVideo(null); setSidebarOpen(false); }}
            >
              <User size={20} />
              <span>Your channel</span>
            </button>

            <button 
              onClick={() => { setSearchQuery('__history__'); setActiveTag('All'); setActiveVideo(null); setActivePage('home'); setSidebarOpen(false); }}
              className={`sidebar-expanded-link ${searchQuery === '__history__' ? 'active' : ''}`}
            >
              <History size={20} />
              <span>History</span>
            </button>

            <button 
              className="sidebar-expanded-link"
              onClick={() => { setActivePage('library'); setActiveVideo(null); setSidebarOpen(false); }}
            >
              <Folder size={20} />
              <span>Library</span>
            </button>

            <button 
              className={`sidebar-expanded-link ${searchQuery === '__watchlater__' ? 'active' : ''}`}
              onClick={() => { setSearchQuery('__watchlater__'); setActiveTag('All'); setActiveVideo(null); setActivePage('home'); setSidebarOpen(false); }}
            >
              <Clock size={20} />
              <span>Watch Later</span>
            </button>

            <button 
              className={`sidebar-expanded-link ${searchQuery === '__liked__' ? 'active' : ''}`}
              onClick={() => { setSearchQuery('__liked__'); setActiveTag('All'); setActiveVideo(null); setActivePage('home'); setSidebarOpen(false); }}
            >
              <ThumbsUp size={20} />
              <span>Liked videos</span>
            </button>

            <button 
              className="sidebar-expanded-link"
              onClick={() => { setActivePage('library'); setActiveVideo(null); setSidebarOpen(false); }}
            >
              <Film size={20} />
              <span>Your videos</span>
            </button>
          </div>
        </nav>
      </aside>
    </>
  );

  return (
    <>
      {!sidebarOpen && <MiniSidebar />}
      {sidebarOpen && <ExpandedSidebar />}
    </>
  );
}
