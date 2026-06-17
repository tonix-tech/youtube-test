import React from 'react';
import { useNotification } from '../context/NotificationContext';
import './SubscriberNotification.css';

const SubscriberNotification = () => {
  const { activeNotifications, setSelectedSubscriber } = useNotification();

  if (activeNotifications.length === 0) return null;

  return (
    <div className="subscriber-notification-container">
      {activeNotifications.map((notif) => (
        <div 
          key={notif.id} 
          className="subscriber-notification animate-slide-in"
          onClick={() => setSelectedSubscriber(notif)}
          style={{ cursor: 'pointer' }}
        >
          <img src={notif.profilePicture} alt={`${notif.name}'s avatar`} className="subscriber-avatar" />
          <div className="subscriber-info">
            <span className="subscriber-name">{notif.name}</span>
            <span className="subscriber-action">just subscribed!</span>
          </div>
          <div className="subscriber-bell-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" height="24" width="24">
              <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SubscriberNotification;
