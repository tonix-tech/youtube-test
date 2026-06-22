import React from 'react';
import { Clock } from 'lucide-react';
import { useVideos } from '../context/VideoContext';

export default function VideoCard({ video }) {
  const { setActiveVideo, watchLaterVideos, toggleWatchLater, setSearchQuery } = useVideos();

  const handleCardClick = () => {
    if (video.isShort) {
      setSearchQuery('shorts');
      setActiveVideo(null);
    } else {
      setActiveVideo(video);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleWatchLaterClick = (e) => {
    e.stopPropagation();
    toggleWatchLater(video.id);
  };

  const isSaved = watchLaterVideos?.has(video.id);

  return (
    <div className="video-card" onClick={handleCardClick} id={`video-card-${video.id}`}>
      <div className="thumbnail-container">
        <img 
  src={video.thumbnail} 
  alt={video.title} 
  className="thumbnail-img" 
  loading="lazy"
  onError={(e) => { e.target.src = 'https://via.placeholder.com/480x360?text=No+Thumbnail'; }}
/>
        <button 
          className={`watch-later-btn ${isSaved ? 'saved' : ''}`}
          onClick={handleWatchLaterClick}
          aria-label={isSaved ? "Remove from Watch Later" : "Watch Later"}
          title={isSaved ? "Remove from Watch Later" : "Watch Later"}
        >
          <Clock size={16} fill={isSaved ? 'currentColor' : 'none'} />
        </button>
        <span className="video-duration">{video.duration}</span>
        {video.isShort && video.videoUrl ? (
          <video 
            src={`${video.videoUrl}#t=5.0`}
            className="thumbnail-img" 
            style={{ objectFit: 'cover', width: '100%', height: '100%', pointerEvents: 'none' }}
            muted 
            playsInline 
            preload="metadata"
          />
        ) : (
          <img 
            src={video.thumbnail || 'https://via.placeholder.com/480x360?text=No+Thumbnail'} 
            alt={video.title} 
            className="thumbnail-img" 
            loading="lazy"
            onError={(e) => { e.target.src = 'https://via.placeholder.com/480x360?text=No+Thumbnail'; }}
          />
        )}
        {video.isShort ? (
          <span className="video-duration" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#cc0000', padding: '2px 6px' }}>
            <svg viewBox="0 0 24 24" fill="currentColor" height="14" width="14" style={{ marginRight: '4px' }}><path d="M10 14.65v-5.3L15 12l-5 2.65zm7.77-4.27c-.42-.18-.8-.39-1.35-.58l1.35-.68c1.78-.89 2.5-3.05 1.62-4.82-.89-1.78-3.05-2.5-4.82-1.62L5.8 7.06C4.08 7.91 3.25 9.84 3.91 11.6c.38 1.03 1.13 1.76 2.05 2.14-.15.06-.59.23-1.12.44L3.49 14.9c-1.78.89-2.5 3.05-1.62 4.82.89 1.78 3.05 2.5 4.82 1.62l8.77-4.38c1.72-.86 2.55-2.79 1.89-4.55-.38-1.04-1.13-1.77-2.05-2.15z" /></svg>
            SHORTS
          </span>
        ) : (
          <span className="video-duration">{video.duration || '0:00'}</span>
        )}
      </div>
      
      {/* Visual representation matching user design */}
      <div className="card-details-box">
        <img 
          src={video.channelAvatar} 
          alt={video.channelName} 
          className="card-avatar"
          title={video.channelName}
        />
        <div className="card-title-text" title={video.title}>
          {video.title}
        </div>
      </div>
    </div>
  );
}
