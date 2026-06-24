import { useEffect } from 'react';
import { useNotification } from '../context/NotificationContext';

const MOCK_SUBSCRIBERS = [
  { name: 'Alice Smith', profilePicture: 'https://i.pravatar.cc/150?u=alice' },
  { name: 'John Doe', profilePicture: 'https://i.pravatar.cc/150?u=john' },
  { name: 'Tech Ninja', profilePicture: 'https://i.pravatar.cc/150?u=ninja' },
  { name: 'Gamer Pro 99', profilePicture: 'https://i.pravatar.cc/150?u=gamer' },
  { name: 'Sarah Codes', profilePicture: 'https://i.pravatar.cc/150?u=sarah' },
  { name: 'Music Maker', profilePicture: 'https://i.pravatar.cc/150?u=music' },
];

export function useSubscriberStream() {
  const { triggerNotification } = useNotification();

  useEffect(() => {
    // Start interval to simulate new subscribers randomly between 3 to 10 seconds
    const scheduleNext = () => {
      const delay = Math.floor(Math.random() * 7000) + 3000;
      return setTimeout(() => {
        const randomSub = MOCK_SUBSCRIBERS[Math.floor(Math.random() * MOCK_SUBSCRIBERS.length)];
        triggerNotification(randomSub);
        
        // Loop recursively
        timerId = scheduleNext();
      }, delay);
    };

    let timerId = scheduleNext();

    return () => clearTimeout(timerId);
  }, [triggerNotification]);
}
