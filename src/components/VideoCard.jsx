import React from 'react';
import { Clock } from 'lucide-react';
import { useVideos } from '../context/VideoContext';

export default function VideoCard({ video }) {
  const { setActiveVideo, watchLaterVideos, toggleWatchLater } = useVideos();

  const handleCardClick = () => {
    setActiveVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
