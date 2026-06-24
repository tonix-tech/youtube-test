import React from 'react';
import { Home, Compass, PlaySquare, Folder, History, Clock, ThumbsUp, Settings } from 'lucide-react';
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
    isSidebarExpanded,
    setShowUploadModal
  } = useVideos();

  const handleHomeClick = () => {
    setSearchQuery('');
    setActiveTag('All');
    setActiveVideo(null);
    setActivePage('home');
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
  };

  const subs = getSubscribedChannelDetails();

  return (
    <aside className={`sidebar ${isSidebarExpanded ? 'expanded' : ''}`}>
      <nav className="sidebar-nav">
        <button 
          onClick={handleHomeClick} 
          className={`sidebar-link ${!activeVideo && searchQuery === '' && activeTag === 'All' ? 'active' : ''}`}
          aria-label="Home"
        >
          <Home size={22} />
          <span>Home</span>
        </button>

        <button 
          onClick={() => { setSearchQuery('shorts'); setActiveVideo(null); setActivePage('home'); }} 
          className={`sidebar-link ${searchQuery === 'shorts' && activePage === 'home' ? 'active' : ''}`}
          aria-label="Shorts"
        >
          <Compass size={22} />
          <span>Shorts</span>
        </button>

        <button 
          onClick={() => { setSearchQuery(''); setActiveTag('All'); setActiveVideo(null); setActivePage('home'); }}
          className="sidebar-link"
          aria-label="Subscriptions"
        >
          <PlaySquare size={22} />
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
          onClick={() => setShowUploadModal(true)} 
          className="sidebar-link"
          aria-label="Add"
        >
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '22px', height: '22px', borderRadius: '50%',
            border: '1.5px solid var(--text-primary)'
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <span>Add</span>
        </button>

        <button 
          onClick={() => { setSearchQuery('__history__'); setActiveTag('All'); setActiveVideo(null); }}
          className={`sidebar-link ${searchQuery === '__history__' ? 'active' : ''}`}
          aria-label="History"
        >
          <History size={22} />
          <span>History</span>
        </button>

        <button 
          onClick={() => { setSearchQuery('__watch_later__'); setActiveTag('All'); setActiveVideo(null); setActivePage('home'); }}
          className={`sidebar-link ${searchQuery === '__watch_later__' ? 'active' : ''}`}
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

        <div className="sidebar-divider"></div>

        {/* Dynamic Subscriptions List with avatars matching screenshot side panel */}
        <div className="sidebar-subscriptions">
          {subs.map(sub => (
            <img 
              key={sub.name}
              src={sub.avatar} 
              alt={sub.name} 
              title={sub.name}
              className="sidebar-sub-item"
              onClick={() => handleChannelClick(sub.name)}
            />
          ))}
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="sidebar-link" aria-label="Settings">
          <Settings size={22} />
        </button>
      </div>
    </aside>
  );
}
