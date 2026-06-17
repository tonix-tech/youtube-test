import React, { useState, useRef, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Share2, MoreVertical, Play, Volume2, VolumeX, FastForward, X, ArrowLeft, Search, Camera, Repeat, Disc } from 'lucide-react';
import { useVideos } from '../context/VideoContext';
import './Shorts.css';

export default function Shorts() {
  const { shorts, likedVideos, dislikedVideos, toggleLike, toggleDislike, comments, addComment, subscribedChannels, toggleSubscribe, addToHistory } = useVideos();
  const [activeShortId, setActiveShortId] = useState(shorts[0]?.id);
  
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, clientHeight } = containerRef.current;
      const activeIndex = Math.round(scrollTop / clientHeight);
      if (shorts[activeIndex]) {
        setActiveShortId(shorts[activeIndex].id);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [shorts]);

  useEffect(() => {
    if (addToHistory && activeShortId) {
      const activeShort = shorts.find(s => s.id === activeShortId);
      if (activeShort) {
        addToHistory(activeShort);
      }
    }
  }, [activeShortId, shorts, addToHistory]);

  return (
    <div className="shorts-container" ref={containerRef}>
      {shorts.map((short) => (
        <ShortVideo 
          key={short.id} 
          short={short} 
          isActive={activeShortId === short.id}
          isLiked={likedVideos.has(short.id)}
          isDisliked={dislikedVideos.has(short.id)}
          onLike={() => toggleLike(short.id)}
          onDislike={() => toggleDislike(short.id)}
          comments={comments[short.id] || []}
          onAddComment={(text) => addComment(short.id, text)}
          isSubscribed={subscribedChannels.has(short.channelName)}
          onSubscribe={() => toggleSubscribe(short.channelName)}
        />
      ))}
    </div>
  );
}

function ShortVideo({ short, isActive, isLiked, isDisliked, onLike, onDislike, comments, onAddComment, isSubscribed, onSubscribe }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true); // Must be true for autoplay to work in browsers
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [likedComments, setLikedComments] = useState(new Set());
  const [dislikedComments, setDislikedComments] = useState(new Set());
  const commentInputRef = useRef(null);

  useEffect(() => {
    if (isActive) {
      videoRef.current?.play().then(() => setIsPlaying(true)).catch(e => console.log('Autoplay prevented', e));
    } else {
      videoRef.current?.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  const togglePlay = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  const toggleSpeed = (e) => {
    e.stopPropagation();
    const newRate = playbackRate === 1 ? 2 : 1;
    setPlaybackRate(newRate);
    if (videoRef.current) {
      videoRef.current.playbackRate = newRate;
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: short.title,
        text: 'Check out this short!',
        url: window.location.href,
      }).catch(console.error);
    } else {
      alert('Link copied to clipboard!');
    }
  };

  const handleLikeComment = (commentId) => {
    setLikedComments(prev => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
        setDislikedComments(d => {
          const nd = new Set(d);
          nd.delete(commentId);
          return nd;
        });
      }
      return next;
    });
  };

  const handleDislikeComment = (commentId) => {
    setDislikedComments(prev => {
      const next = new Set(prev);
      if (next.has(commentId)) {
        next.delete(commentId);
      } else {
        next.add(commentId);
        setLikedComments(l => {
          const nl = new Set(l);
          nl.delete(commentId);
          return nl;
        });
      }
      return next;
    });
  };

  const handleReply = (authorName) => {
    setNewComment(`@${authorName} `);
    if (commentInputRef.current) {
      commentInputRef.current.focus();
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <div className="short-video-wrapper">
      <div className="short-video-player" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={short.videoUrl}
          className="short-video-el"
          loop
          muted={isMuted}
          playsInline
          autoPlay={isActive}
          preload="auto"
        />
        
        {/* Top Navigation */}
        <div className="short-top-nav">
          <div className="short-top-nav-left">
            <ArrowLeft size={24} />
            <span className="short-top-nav-title">Shorts</span>
          </div>
          <div className="short-top-nav-right">
            <Search size={24} />
            <Camera size={24} />
            <MoreVertical size={24} />
          </div>
        </div>

        {/* Mute Toggle Button */}
        <button 
          className="short-mute-btn" 
          onClick={toggleMute}
          style={{
            position: 'absolute',
            top: '70px',
            right: '16px',
            background: 'rgba(0, 0, 0, 0.6)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            cursor: 'pointer',
            zIndex: 15
          }}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>

        {!isPlaying && (
          <div className="short-play-indicator">
            <Play size={48} fill="white" />
          </div>
        )}

        {/* Bottom Info Overlay */}
        <div className="short-info-overlay">
          <button className="short-super-thanks">
            <span style={{ fontSize: '14px', marginRight: '6px' }}>🤍</span>
            Super Thanks kaufen
          </button>
          <div className="short-channel-info">
            <img src={short.channelAvatar} alt={short.channelName} className="short-channel-avatar" />
            <span className="short-channel-name">@{short.channelName}</span>
            <button 
              className={`short-subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
              onClick={(e) => { e.stopPropagation(); onSubscribe(); }}
            >
              {isSubscribed ? 'Subscribed' : 'Subscribe'}
            </button>
          </div>
          <p className="short-title">{short.title}</p>
        </div>
      </div>

      {/* Right Side Action Bar */}
      <div className="short-actions-bar">
        <div className="short-action-item">
          <button className={`short-action-btn ${isLiked ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); onLike(); }}>
            <ThumbsUp size={28} fill={isLiked ? 'currentColor' : 'none'} />
          </button>
          <span className="short-action-text">{short.likes}</span>
        </div>

        <div className="short-action-item">
          <button className={`short-action-btn ${isDisliked ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); onDislike(); }}>
            <ThumbsDown size={28} fill={isDisliked ? 'currentColor' : 'none'} />
          </button>
          <span className="short-action-text">Dislike</span>
        </div>

        <div className="short-action-item">
          <button className="short-action-btn" onClick={(e) => { e.stopPropagation(); setShowComments(true); }}>
            <MessageSquare size={28} />
          </button>
          <span className="short-action-text">{short.commentsCount + comments.length}</span>
        </div>

        <div className="short-action-item">
          <button className="short-action-btn" onClick={handleShare}>
            <Share2 size={28} />
          </button>
          <span className="short-action-text">Share</span>
        </div>

        <div className="short-action-item">
          <button className={`short-action-btn ${playbackRate === 2 ? 'active' : ''}`} onClick={toggleSpeed}>
            <FastForward size={28} />
          </button>
          <span className="short-action-text">{playbackRate}x</span>
        </div>
      </div>

      {/* Comments Drawer */}
      {showComments && (
        <div className="short-comments-drawer">
          <div className="short-comments-header">
            <h3>Comments</h3>
            <button className="short-close-comments" onClick={() => setShowComments(false)}>
              <X size={24} />
            </button>
          </div>
          
          <div className="short-comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="short-comment-item">
                <img src={comment.avatar} alt={comment.author} className="short-comment-avatar" />
                <div className="short-comment-content">
                  <div className="short-comment-meta">
                    <span className="short-comment-author">@{comment.author}</span>
                    <span className="short-comment-time">{comment.time}</span>
                  </div>
                  <p className="short-comment-text">{comment.text}</p>
                  <div className="short-comment-actions">
                    <button className={`short-comment-action-btn ${likedComments.has(comment.id) ? 'active' : ''}`} onClick={() => handleLikeComment(comment.id)}>
                      <ThumbsUp size={14} fill={likedComments.has(comment.id) ? 'currentColor' : 'none'} />
                      <span className="short-comment-action-count">{comment.likes + (likedComments.has(comment.id) ? 1 : 0) || ''}</span>
                    </button>
                    <button className={`short-comment-action-btn ${dislikedComments.has(comment.id) ? 'active' : ''}`} onClick={() => handleDislikeComment(comment.id)}>
                      <ThumbsDown size={14} fill={dislikedComments.has(comment.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button className="short-comment-reply-btn" onClick={() => handleReply(comment.author)}>
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <form className="short-comment-form" onSubmit={handleCommentSubmit}>
            <input 
              ref={commentInputRef}
              type="text" 
              placeholder="Add a comment..." 
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="short-comment-input"
            />
            <button type="submit" className="short-comment-submit" disabled={!newComment.trim()}>
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
