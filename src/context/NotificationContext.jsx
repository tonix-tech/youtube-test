import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [activeNotifications, setActiveNotifications] = useState([]);
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [selectedSubscriber, setSelectedSubscriber] = useState(null);

  const [readNotifs, setReadNotifs] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('readNotifs') || '[]');
    } catch {
      return [];
    }
  });

  const markItemAsRead = useCallback((id) => {
    setReadNotifs(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem('readNotifs', JSON.stringify(next));
      return next;
    });
  }, []);

  // Fetch initial history and set up realtime subscription on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (data) {
          const mapped = data.map(item => ({
            id: item.id,
            name: item.name,
            profilePicture: item.profile_picture,
            timestamp: new Date(item.created_at)
          }));
          setNotificationHistory(mapped);
        }
      } catch (error) {
        console.error('Failed to fetch notification history:', error);
      }
    };

    fetchHistory();

    // Subscribe to INSERT events in the public.notifications table
    const channel = supabase
      .channel('public_notifications_realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications' },
        (payload) => {
          const newNotif = {
            id: payload.new.id,
            name: payload.new.name,
            profilePicture: payload.new.profile_picture,
            timestamp: new Date(payload.new.created_at)
          };

          // Play sound immediately when notification is triggered
          const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3'); 
          audio.volume = 0.5;
          audio.play().catch(e => console.error('Audio play failed', e));

          // Set as active toast alert
          setActiveNotifications((prev) => [...prev, newNotif]);
          // Prepends to history list
          setNotificationHistory((prev) => [newNotif, ...prev]);
          // Increment unread count
          setUnreadCount((prev) => prev + 1);

          // Automatically remove the notification toast from active screen after 5.5 seconds 
          setTimeout(() => {
            setActiveNotifications((prev) => prev.filter((n) => n.id !== newNotif.id));
          }, 5500);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Inserts a new subscriber notification into Supabase
  const triggerNotification = useCallback(async (data) => {
    try {
      const { error } = await supabase
        .from('notifications')
        .insert([
          {
            name: data.name,
            profile_picture: data.profilePicture
          }
        ]);
      if (error) throw error;
    } catch (e) {
      console.error('Error triggering/inserting notification:', e);
    }
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
      markAsRead,
      readNotifs,
      markItemAsRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => useContext(NotificationContext);

