import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Share2, Download, MessageSquare } from 'lucide-react';
import { useVideos } from '../context/VideoContext';

export default function VideoDetail() {
  const { 
    activeVideo, 
    setActiveVideo, 
    videos, 
    subscribedChannels, 
    toggleSubscribe, 
    likedVideos, 
    toggleLike, 
    comments, 
    addComment 
  } = useVideos();

  const [commentText, setCommentText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  if (!activeVideo) return null;

  const isSubscribed = subscribedChannels.has(activeVideo.channelName);
  const isLiked = likedVideos.has(activeVideo.id);

  // Recommendations: all other videos except the current one
  const recommendations = videos.filter(v => v.id !== activeVideo.id);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim()) {
      addComment(activeVideo.id, commentText);
      setCommentText('');
      setIsFocused(false);
    }
  };

  const handleCommentCancel = () => {
    setCommentText('');
    setIsFocused(false);
  };

  const videoComments = comments[activeVideo.id] || [];

  return (
    <div className="detail-container">
      {/* Main Player Column */}
      <div className="detail-main">
        <div className="player-wrapper">
          <iframe
            className="player-iframe"
            src={`https://www.youtube.com/embed/${activeVideo.id}?autoplay=1`}
            title={activeVideo.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <h1 className="detail-title">{activeVideo.title}</h1>

        <div className="action-bar">
          {/* Channel metadata & Subscribe */}
          <div className="channel-info-group">
            <img 
              src={activeVideo.channelAvatar} 
              alt={activeVideo.channelName} 
              className="detail-channel-avatar"
            />
            <div className="channel-name-meta">
              <span className="detail-channel-name">{activeVideo.channelName}</span>
              <span className="detail-sub-count">1.4M subscribers</span>
            </div>
            <button 
              className={`sub-btn ${isSubscribed ? 'subscribed' : ''}`}
              onClick={() => toggleSubscribe(activeVideo.channelName)}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>

          {/* Likes, Share, Download actions */}
          <div className="action-buttons-group">
            <div className="action-pill">
              <button 
                className={`action-pill-btn ${isLiked ? 'active' : ''}`}
                onClick={() => toggleLike(activeVideo.id)}
                aria-label="Like this video"
              >
                <ThumbsUp size={16} />
                <span>{activeVideo.likes.toLocaleString()}</span>
              </button>
              <div className="action-pill-divider"></div>
              <button className="action-pill-btn" aria-label="Dislike this video">
                <ThumbsDown size={16} />
              </button>
            </div>

            <button className="action-pill-btn action-pill" style={{ borderRadius: '20px', padding: '8px 16px' }}>
              <Share2 size={16} />
              <span>Share</span>
            </button>

            <button className="action-pill-btn action-pill" style={{ borderRadius: '20px', padding: '8px 16px' }}>
              <Download size={16} />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Video Description Box */}
        <div className="description-box">
          <div className="description-meta">
            <span>{activeVideo.views}</span>
            <span>{activeVideo.publishedTime}</span>
          </div>
          <div className="description-text">
            {activeVideo.description || 'No description provided.'}
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments-section">
          <div className="comments-header">
            <MessageSquare size={20} />
            <span>{videoComments.length} Comments</span>
          </div>

          {/* Comment input form */}
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <div className="profile-avatar" style={{ width: '36px', height: '36px', fontSize: '14px' }}>S</div>
            <div className="comment-input-container">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="comment-input"
              />
              {isFocused && (
                <div className="comment-form-actions">
                  <button 
                    type="button" 
                    onClick={handleCommentCancel}
                    className="comment-cancel-btn"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    disabled={!commentText.trim()}
                    className="comment-submit-btn"
                  >
                    Comment
                  </button>
                </div>
              )}
            </div>
          </form>

          {/* Comments list */}
          <div className="comment-list">
            {videoComments.map((comment) => (
              <div key={comment.id} className="comment-item">
                <img src={comment.avatar} alt={comment.author} className="comment-avatar" />
                <div className="comment-content">
                  <div className="comment-author-time">
                    <span className="comment-author">{comment.author}</span>
                    <span className="comment-time">{comment.time}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                  <div className="comment-actions">
                    <button className="comment-action-btn">
                      <ThumbsUp size={12} />
                      <span>{comment.likes}</span>
                    </button>
                    <button className="comment-action-btn">
                      <ThumbsDown size={12} />
                    </button>
                    <button className="comment-action-btn" style={{ fontWeight: '600' }}>Reply</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar Recommendation Column */}
      <div className="detail-sidebar">
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>Up next</h3>
        {recommendations.map((video) => (
          <div 
            key={video.id} 
            className="recommend-card"
            onClick={() => {
              setActiveVideo(video);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="recommend-thumb">
              <img src={video.thumbnail} alt={video.title} />
              <span className="video-duration" style={{ fontSize: '10px', padding: '2px 4px' }}>
                {video.duration}
              </span>
            </div>
            <div className="recommend-meta">
              <h4 className="recommend-title" title={video.title}>{video.title}</h4>
              <span className="recommend-channel">{video.channelName}</span>
              <span className="recommend-channel" style={{ opacity: 0.7 }}>{video.views}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
