import React from 'react';
import VideoCard from './VideoCard';
import { useVideos } from '../context/VideoContext';

export default function VideoGrid() {
  const { filteredVideos, searchQuery } = useVideos();

  if (filteredVideos.length === 0) {
    if (searchQuery === '__history__') {
      return (
        <div className="no-results">
          <h3>No watch history found</h3>
          <p style={{ marginTop: '8px', color: '#aaaaaa', fontSize: '14px' }}>
            Videos you watch will show up here.
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
