import React from 'react';
import VideoCard from './VideoCard';
import { useVideos } from '../context/VideoContext';

export default function VideoGrid() {
  const { filteredVideos } = useVideos();

  if (filteredVideos.length === 0) {
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
