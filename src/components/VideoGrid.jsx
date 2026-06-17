import React from 'react';
import VideoCard from './VideoCard';
import { useVideos } from '../context/VideoContext';

export default function VideoGrid() {
  const { filteredVideos, searchQuery } = useVideos();

  if (filteredVideos.length === 0) {
    if (searchQuery === 'watch_later') {
      return (
        <div className="no-results">
          <h3>No videos in Watch Later</h3>
          <p style={{ marginTop: '8px', color: '#aaaaaa', fontSize: '14px' }}>
            Click the clock icon on a video to save it for later.
          </p>
        </div>
      );
    }
    
    return (
      <div className="no-results">
        <h3>No videos found</h3>
        <p style={{ marginTop: '8px', color: '#aaaaaa', fontSize: '14px' }}>
          Try checking your spelling or search for another topic.
        </p>
      </div>
    );
  }

  return (
    <div className="video-grid">
      {filteredVideos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
