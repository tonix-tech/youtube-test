import React from 'react';
import { useNotification } from '../context/NotificationContext';

export default function NotificationsPage() {
  const { notificationHistory, setSelectedSubscriber, readNotifs, markItemAsRead } = useNotification();

  return (
    <div className="notifications-page" style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ marginBottom: '24px', color: 'var(--text-primary)', fontSize: '24px' }}>Notifications</h2>
      
      {notificationHistory.length === 0 ? (
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '40px' }}>
          No notifications yet.
        </div>
      ) : (
        <div className="notifications-container">
          {notificationHistory.map(notif => {
            const isRead = readNotifs.includes(notif.id);
            return (
            <div 
              key={notif.id} 
              className="notification-item-page"
              onClick={() => {
                markItemAsRead(notif.id);
                setSelectedSubscriber(notif);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '16px',
                paddingLeft: isRead ? '16px' : '28px',
                backgroundColor: isRead ? 'var(--bg-card)' : 'rgba(62, 166, 255, 0.08)',
                borderRadius: '8px',
                marginBottom: '12px',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                position: 'relative'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = isRead ? 'var(--bg-card-hover)' : 'rgba(62, 166, 255, 0.12)'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = isRead ? 'var(--bg-card)' : 'rgba(62, 166, 255, 0.08)'}
            >
              {!isRead && (
                <div style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#3ea6ff' }} />
              )}
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
          )})}
        </div>
      )}
    </div>
  );
}
