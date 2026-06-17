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
    subscribedChannels,
    videos
  } = useVideos();

  const handleHomeClick = () => {
    setSearchQuery('');
    setActiveTag('All');
    setActiveVideo(null);
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
    <aside className="sidebar">
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
          onClick={() => { setSearchQuery('shorts'); setActiveVideo(null); }} 
          className={`sidebar-link ${searchQuery === 'shorts' ? 'active' : ''}`}
          aria-label="Shorts"
        >
          <Compass size={22} />
          <span>Shorts</span>
        </button>

        <button 
          onClick={() => { setSearchQuery(''); setActiveTag('All'); setActiveVideo(null); }}
          className="sidebar-link"
          aria-label="Subscriptions"
        >
          <PlaySquare size={22} />
          <span>Subscriptions</span>
        </button>

        <div className="sidebar-divider"></div>

        <button className="sidebar-link" aria-label="Library">
          <Folder size={22} />
          <span>Library</span>
        </button>

        <button 
          onClick={() => { setSearchQuery('__history__'); setActiveTag('All'); setActiveVideo(null); }}
          className={`sidebar-link ${searchQuery === '__history__' ? 'active' : ''}`}
          aria-label="History"
        >
          <History size={22} />
          <span>History</span>
        </button>

        <button className="sidebar-link" aria-label="Watch Later">
          <Clock size={22} />
          <span>Watch Later</span>
        </button>

        <button className="sidebar-link" aria-label="Liked Videos">
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
