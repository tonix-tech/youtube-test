import React from 'react';
import { useNotification } from '../context/NotificationContext';

export default function NotificationsPage() {
  const { notificationHistory, setSelectedSubscriber } = useNotification();

  return (
    <div className="notifications-page" style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '24px' }}>Notifications</h2>
      
      {notificationHistory.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
          No notifications yet.
        </div>
      ) : (
        <div className="notifications-container">
          {notificationHistory.map(notif => (
            <div 
              key={notif.id} 
              className="notification-item-page"
              onClick={() => setSelectedSubscriber(notif)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                backgroundColor: 'var(--bg-card)',
                borderRadius: '8px',
                marginBottom: '12px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-card-hover)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'var(--bg-card)'}
            >
              <img 
                src={notif.profilePicture} 
                alt="avatar" 
                style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, color: 'var(--text-primary)', fontSize: '15px' }}>
                  <strong>{notif.name}</strong> subscribed to your channel.
                </p>
                <span style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: '4px', display: 'block' }}>
                  {notif.timestamp ? new Date(notif.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
