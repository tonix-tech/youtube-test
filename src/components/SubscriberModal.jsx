import React from 'react';
import { useNotification } from '../context/NotificationContext';

export default function SubscriberModal() {
  const { selectedSubscriber, setSelectedSubscriber } = useNotification();

  if (!selectedSubscriber) return null;

  return (
    <div className="modal-overlay" onClick={() => setSelectedSubscriber(null)}>
      <div className="modal-content subscriber-modal animate-slide-up" onClick={e => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={() => setSelectedSubscriber(null)}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
        
        <div className="subscriber-modal-header">
          <img src={selectedSubscriber.profilePicture} alt="Avatar" className="modal-avatar" />
          <div className="modal-channel-info">
            <h2>{selectedSubscriber.name}</h2>
            <p className="modal-subs-count">1.2K subscribers</p>
          </div>
          <button className="sub-btn subscribed">Subscribed</button>
        </div>
        
        <div className="subscriber-modal-body">
          <p className="modal-welcome-text">
            <strong>{selectedSubscriber.name}</strong> recently subscribed to your channel. You can view their channel, check out their public playlists, or interact with their latest videos.
          </p>
          
          <div className="modal-recent-activity">
            <h3>Recent Activity</h3>
            <div className="activity-item">
              <div className="activity-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/></svg>
              </div>
              <div className="activity-text">Watched your latest video</div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/></svg>
              </div>
              <div className="activity-text">Liked "Building a YouTube Clone"</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
