import React, { createContext, useState, useContext, useCallback, useRef } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [activeNotifications, setActiveNotifications] = useState([]);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);
  const notificationIdCounter = useRef(0);

  const triggerNotification = useCallback((data) => {
    const id = notificationIdCounter.current++;
    
    // Play sound immediately when notification is triggered
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); 
    audio.volume = 0.5;
    audio.play().catch(e => console.error('Audio play failed', e));

    const newNotification = { id, timestamp: new Date(), ...data };
    
    setActiveNotifications((prev) => [...prev, newNotification]);
    setNotificationHistory((prev) => [newNotification, ...prev]);
    setUnreadCount((prev) => prev + 1);

    // Automatically remove the notification from active screen after 5.5 seconds 
    setTimeout(() => {
      setActiveNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5500);
  }, []);

  const markAsRead = useCallback(() => {
    setUnreadCount(0);
  }, []);

  return (
    <NotificationContext.Provider value={{ 
      activeNotifications, 
      notificationHistory, 
      unreadCount, 
      selectedSubscriber,
      setSelectedSubscriber,
      triggerNotification, 
      markAsRead 
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
