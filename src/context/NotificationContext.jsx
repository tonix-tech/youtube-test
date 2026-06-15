import React, { createContext, useState, useContext, useCallback, useRef } from 'react';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);
  const notificationIdCounter = useRef(0);

  const triggerNotification = useCallback((data) => {
    const id = notificationIdCounter.current++;
    
    // Play sound immediately when notification is triggered
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); // A nice pleasant bell ding
    audio.volume = 0.5;
    audio.play().catch(e => console.error('Audio play failed', e));

    const newNotification = { id, ...data };
    
    setNotifications((prev) => [...prev, newNotification]);

    // Automatically remove the notification after 5 seconds
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, triggerNotification }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);
