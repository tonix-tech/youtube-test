import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Plus, MoreVertical, Lock } from 'lucide-react';
import { useVideos } from '../context/VideoContext';

export default function Library() {
  const { 
    watchHistory, 
    videos, 
    likedVideos, 
    setActiveVideo, 
    setActivePage,
    setShowUploadModal,
    setSearchQuery,
    setActiveTag
  } = useVideos();

  const historyScrollRef = useRef(null);
  const playlistScrollRef = useRef(null);

  const scrollContainer = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleVideoClick = (video) => {
    setActiveVideo(video);
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Get liked videos list
  const likedVideosList = videos.filter(v => likedVideos.has(v.id));

  return (
    <div className="library-page">
      {/* Profile Section */}
      <div className="library-profile-section">
        <div className="library-profile-avatar">
          T
        </div>
        <div className="library-profile-info">
          <h1 className="library-profile-name">Tonix_aep7</h1>
          <div className="library-profile-meta">
            <span className="library-profile-handle">@Tonix_aep7</span>
            <span className="library-profile-dot">•</span>
            <a 
              href="#" 
              className="library-view-channel"
              onClick={(e) => {
                e.preventDefault();
                setActivePage('channel');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              View channel
            </a>
          </div>
          <div className="library-profile-actions">
            <button className="library-profile-btn" onClick={() => setShowUploadModal(true)} style={{ backgroundColor: 'var(--text-primary)', color: 'var(--bg-primary)' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Upload Video
            </button>
            <button className="library-profile-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M20 8v6M23 11h-6"/>
              </svg>
              Switch account
            </button>
            <button className="library-profile-btn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.76h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google Account
            </button>
          </div>
        </div>
      </div>

      {/* History Section */}
      <div className="library-section">
        <div className="library-section-header">
          <h2 className="library-section-title">History</h2>
          <div className="library-section-controls">
            <button className="library-view-all-btn" onClick={() => { setSearchQuery('__history__'); setActiveTag('All'); setActiveVideo(null); setActivePage('home'); }}>View all</button>
            <button 
              className="library-scroll-btn"
              onClick={() => scrollContainer(historyScrollRef, 'left')}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="library-scroll-btn"
              onClick={() => scrollContainer(historyScrollRef, 'right')}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="library-horizontal-scroll" ref={historyScrollRef}>
          {watchHistory.map((video) => (
            <div 
              key={video.id} 
              className="library-history-card"
              onClick={() => handleVideoClick(video)}
            >
              <div className="library-history-thumb">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  loading="lazy"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/240x320?text=No+Thumb'; }}
                />
                <span className="library-shorts-badge">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22.95.25 1.45.03.5.04 1.05.04 1.64 0 .59-.01 1.14-.04 1.64-.03.5-.12.98-.25 1.45-.27.98-.87 1.58-1.85 1.85-.47.13-.95.22-1.45.25-.5.03-1.05.04-1.64.04H7.38c-.59 0-1.14-.01-1.64-.04-.5-.03-.98-.12-1.45-.25-.98-.27-1.58-.87-1.85-1.85-.13-.47-.22-.95-.25-1.45-.03-.5-.04-1.05-.04-1.64 0-.59.01-1.14.04-1.64.03-.5.12-.98.25-1.45.27-.98.87-1.58 1.85-1.85.47-.13.95-.22 1.45-.25.5-.03 1.05-.04 1.64-.04h9.24c.59 0 1.14.01 1.64.04.5.03.98.12 1.45.25.98.27 1.58.87 1.85 1.85z"/>
                  </svg>
                  SHORTS
                </span>
              </div>
              <div className="library-history-info">
                <div className="library-history-title-row">
                  <img 
                    src={video.channelAvatar} 
                    alt={video.channelName}
                    className="library-history-channel-avatar"
                  />
                  <span className="library-history-title">{video.title}</span>
                  <button className="library-more-btn" onClick={(e) => e.stopPropagation()}>
                    <MoreVertical size={16} />
                  </button>
                </div>
                <span className="library-history-channel">{video.channelName}</span>
                <span className="library-history-meta">{video.views} • {video.publishedTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Playlists Section */}
      <div className="library-section">
        <div className="library-section-header">
          <h2 className="library-section-title">Playlists</h2>
          <div className="library-section-controls">
            <button className="library-add-btn">
              <Plus size={20} />
            </button>
            <button className="library-view-all-btn">View all</button>
            <button 
              className="library-scroll-btn"
              onClick={() => scrollContainer(playlistScrollRef, 'left')}
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              className="library-scroll-btn"
              onClick={() => scrollContainer(playlistScrollRef, 'right')}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div className="library-horizontal-scroll" ref={playlistScrollRef}>
          {/* Liked Videos Playlist Card */}
          <div className="library-playlist-card" onClick={() => { setSearchQuery('__liked__'); setActiveTag('All'); setActiveVideo(null); setActivePage('home'); }}>
            <div className="library-playlist-thumb">
              {likedVideosList.length > 0 ? (
                <img 
                  src={likedVideosList[0].thumbnail} 
                  alt="Liked videos" 
                  loading="lazy"
                />
              ) : (
                <div className="library-playlist-empty-thumb">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                </div>
              )}
              <div className="library-playlist-count">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" style={{ marginRight: '4px' }}>
                  <path d="M4 6H2v14a2 2 0 0 0 2 2h14v-2H4V6zm16-4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/>
                </svg>
                {likedVideosList.length > 0 ? likedVideosList.length : 801} videos
              </div>
            </div>
            <div className="library-playlist-info">
              <span className="library-playlist-title">Liked videos</span>
              <div className="library-playlist-privacy">
                <Lock size={12} />
                <span>Private</span>
                <span className="library-playlist-dot">•</span>
                <span>Playlist</span>
              </div>
            </div>
          </div>

          {/* Watch Later Playlist Card */}
          <div className="library-playlist-card" onClick={() => { setSearchQuery('__watchlater__'); setActiveTag('All'); setActiveVideo(null); setActivePage('home'); }}>
            <div className="library-playlist-thumb">
              {videos.length > 3 ? (
                <img 
                  src={videos[3].thumbnail} 
                  alt="Watch later" 
                  loading="lazy"
                />
              ) : (
                <div className="library-playlist-empty-thumb">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12,6 12,12 16,14"/>
                  </svg>
                </div>
              )}
              <div className="library-playlist-count">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white" style={{ marginRight: '4px' }}>
                  <path d="M4 6H2v14a2 2 0 0 0 2 2h14v-2H4V6zm16-4H8a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-1 9h-4v4h-2v-4H9V9h4V5h2v4h4v2z"/>
                </svg>
                2 videos
              </div>
            </div>
            <div className="library-playlist-info">
              <span className="library-playlist-title">Watch later</span>
              <div className="library-playlist-privacy">
                <Lock size={12} />
                <span>Private</span>
                <span className="library-playlist-dot">•</span>
                <span>Playlist</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
