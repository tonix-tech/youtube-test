import React, { createContext, useContext, useState, useEffect } from 'react';

export const VideoContext = createContext();

const INITIAL_SHORTS = [
  {
    id: 's1',
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    channelName: 'Speed Racer',
    channelAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80',
    title: 'Drifting into the weekend like... 🏎️💨 #shorts #racing',
    likes: 12500,
    dislikes: 120,
    commentsCount: 342,
  },
  {
    id: 's2',
    videoUrl: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
    channelName: 'Tech Meltdown',
    channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
    title: 'When your code compiles on the first try 🤯 #programming',
    likes: 8400,
    dislikes: 45,
    commentsCount: 89,
  },
  {
    id: 's3',
    videoUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4',
    channelName: 'Cinema Shorts',
    channelAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100&q=80',
    title: 'Epic animation behind the scenes! 🐘✨ #animation #cgi',
    likes: 45200,
    dislikes: 300,
    commentsCount: 1205,
  }
];

// Mock Initial Video Data matching screenshot
const INITIAL_VIDEOS = [
  {
    id: 'tV5R3B_B55w',
    title: 'Why progress bars dont move smoothly',
    duration: '5:11',
    thumbnail: 'https://img.youtube.com/vi/tV5R3B_B55w/maxresdefault.jpg',
    channelName: 'Tom Scott',
    channelAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80',
    views: '2.4M views',
    publishedTime: '3 years ago',
    likes: 184000,
    category: 'Computers',
    description: 'Why do progress bars halt, skip, jump, or get stuck at 99%? It turns out predicting the future is hard, especially when computers are involved.'
  },
  {
    id: 'kYF5w2E_4x0',
    title: 'Gladiators - Fighting to impress the mob',
    duration: '1:50:02',
    thumbnail: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=800&q=80', // Gladiator theme fallback
    channelName: 'Lindybeige',
    channelAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&h=100&q=80',
    views: '890K views',
    publishedTime: '1 year ago',
    likes: 42000,
    category: 'History',
    description: 'Did Roman gladiators actually fight to the death? How did they train, and what was their role in Roman politics and entertainment?'
  },
  {
    id: '2PdB4LoqDvE',
    title: 'What if Minecraft was mechanical?',
    duration: '15:32',
    thumbnail: 'https://img.youtube.com/vi/2PdB4LoqDvE/maxresdefault.jpg',
    channelName: 'Mumbo Jumbo',
    channelAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&h=100&q=80',
    views: '4.1M views',
    publishedTime: '2 weeks ago',
    likes: 310000,
    category: 'Tanks', // categorized to show Minecraft builds
    description: 'Today, we look at what would happen if Minecraft blocks followed mechanical engineering rules. Gears, pistons, and fully automated machinery.'
  },
  {
    id: 'Hx7Sr2ZTqcI',
    title: 'Creating my own OS to run Tetris',
    duration: '22:37',
    thumbnail: 'https://img.youtube.com/vi/Hx7Sr2ZTqcI/maxresdefault.jpg',
    channelName: 'jdh',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    views: '1.7M views',
    publishedTime: '8 months ago',
    likes: 95000,
    category: 'Software Design',
    description: 'Writing an entire operating system in assembly and C from scratch with the sole purpose of playing Tetris. No bootloaders, no standard libraries.'
  },
  {
    id: 'y1K_R8w6eY0',
    title: 'The race so fast Drivers blacked out!',
    duration: '8:30',
    thumbnail: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80', // Racing fallback
    channelName: 'Formula 1',
    channelAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80',
    views: '5.2M views',
    publishedTime: '5 days ago',
    likes: 290000,
    category: 'Formula 1',
    description: 'What happened when racecars pulled so many Gs that professional drivers began losing consciousness? Investigating the limits of human physiology in motorsports.'
  },
  {
    id: 'oBt53YbR9Kk',
    title: 'Dynamic Programming Intermediate Course',
    duration: '5:10:02',
    thumbnail: 'https://img.youtube.com/vi/oBt53YbR9Kk/maxresdefault.jpg',
    channelName: 'freeCodeCamp',
    channelAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=100&h=100&q=80',
    views: '3.6M views',
    publishedTime: '4 months ago',
    likes: 180000,
    category: 'Python',
    description: 'An in-depth, interactive course on dynamic programming. Master memoization and tabulation techniques with practical algorithmic examples.'
  },
  {
    id: 'A8eLpL2h1e0',
    title: 'INSIDE STORY: Ocons first win in Hungary',
    duration: '20:03',
    thumbnail: 'https://img.youtube.com/vi/A8eLpL2h1e0/maxresdefault.jpg',
    channelName: 'Formula 1',
    channelAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80',
    views: '1.2M views',
    publishedTime: '2 years ago',
    likes: 84000,
    category: 'Formula 1',
    description: 'How Esteban Ocon and Alpine pulled off an incredible, history-making victory at the thrilling 2021 Hungarian Grand Prix.'
  },
  {
    id: 'k429m1r2k4U',
    title: 'How GOTYE created a song we used to know',
    duration: '10:49',
    thumbnail: 'https://img.youtube.com/vi/k429m1r2k4U/maxresdefault.jpg',
    channelName: 'Middle 8',
    channelAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80',
    views: '920K views',
    publishedTime: '6 months ago',
    likes: 62000,
    category: 'Software Design', // categorized for general study
    description: 'An analysis of Gotyes mega-hit "Somebody That I Used To Know", its composition, the sample usage, and why it became an international phenomenon.'
  },
  {
    id: 'd2G-5scrvAU',
    title: 'Cracking Enigma in 2021',
    duration: '22:15',
    thumbnail: 'https://img.youtube.com/vi/d2G-5scrvAU/maxresdefault.jpg',
    channelName: 'Computerphile',
    channelAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&h=100&q=80',
    views: '1.1M views',
    publishedTime: '2 years ago',
    likes: 71000,
    category: 'Java',
    description: 'Can we crack the famous German Enigma machine in seconds using modern computers? Mike Pound shows how the code works and writes a crack script.'
  }
];

// Seed comments for all videos
const INITIAL_COMMENTS = {
  'tV5R3B_B55w': [
    { id: 1, author: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50&h=50&q=80', text: 'This is the clearest explanation of the progress bar problem I have ever seen! Tom Scott does it again.', time: '2 days ago', likes: 342 },
    { id: 2, author: 'John Doe', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&h=50&q=80', text: 'Always wondered why Windows installs spend 90% of the time sitting at 99%. Now I finally know!', time: '1 week ago', likes: 118 }
  ],
  'kYF5w2E_4x0': [
    { id: 1, author: 'Marcus Aurelius', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=50&h=50&q=80', text: 'Stunning historical detail. Lindybeige has such an engaging storytelling style.', time: '3 months ago', likes: 215 }
  ],
  '2PdB4LoqDvE': [
    { id: 1, author: 'Steve Craft', avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=50&h=50&q=80', text: 'Mumbo Jumbo building mechanical gearboxes in Minecraft is the crossover we all needed.', time: '5 days ago', likes: 820 }
  ]
};

export const VideoProvider = ({ children }) => {
  const [videos, setVideos] = useState(INITIAL_VIDEOS);
  const [shorts, setShorts] = useState(INITIAL_SHORTS);
  const [activeVideo, setActiveVideo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  
  // Manage Subscriptions
  const [subscribedChannels, setSubscribedChannels] = useState(
    new Set(['Tom Scott', 'Mumbo Jumbo', 'Formula 1', 'Lindybeige'])
  );

  // Manage Likes/Dislikes
  const [likedVideos, setLikedVideos] = useState(new Set());
  const [dislikedVideos, setDislikedVideos] = useState(new Set());

  // Manage Comments dynamically
  const [comments, setComments] = useState(INITIAL_COMMENTS);

  // Filtered Video Selector
  const getFilteredVideos = () => {
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            video.channelName.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesTag = activeTag === 'All' || video.category === activeTag;
      return matchesSearch && matchesTag;
    });
  };

  // Toggle Subscribed State
  const toggleSubscribe = (channelName) => {
    setSubscribedChannels(prev => {
      const next = new Set(prev);
      if (next.has(channelName)) {
        next.delete(channelName);
      } else {
        next.add(channelName);
      }
      return next;
    });
  };

  // Toggle Like State
  const toggleLike = (videoId) => {
    setLikedVideos(prev => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
        // Decrement likes count
        setVideos(currentVideos =>
          currentVideos.map(v => v.id === videoId ? { ...v, likes: v.likes - 1 } : v)
        );
      } else {
        next.add(videoId);
        // Increment likes count
        setVideos(currentVideos =>
          currentVideos.map(v => v.id === videoId ? { ...v, likes: v.likes + 1 } : v)
        );
        setShorts(currentShorts =>
          currentShorts.map(s => s.id === videoId ? { ...s, likes: s.likes + 1 } : s)
        );
      }
      return next;
    });

    // Remove from dislikes if liked
    setDislikedVideos(prev => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
        setShorts(currentShorts =>
          currentShorts.map(s => s.id === videoId ? { ...s, dislikes: s.dislikes - 1 } : s)
        );
      }
      return next;
    });
  };

  const toggleDislike = (videoId) => {
    setDislikedVideos(prev => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
        setShorts(currentShorts =>
          currentShorts.map(s => s.id === videoId ? { ...s, dislikes: s.dislikes - 1 } : s)
        );
      } else {
        next.add(videoId);
        setShorts(currentShorts =>
          currentShorts.map(s => s.id === videoId ? { ...s, dislikes: s.dislikes + 1 } : s)
        );
      }
      return next;
    });

    // Remove from likes if disliked
    setLikedVideos(prev => {
      const next = new Set(prev);
      if (next.has(videoId)) {
        next.delete(videoId);
        setVideos(currentVideos =>
          currentVideos.map(v => v.id === videoId ? { ...v, likes: v.likes - 1 } : v)
        );
        setShorts(currentShorts =>
          currentShorts.map(s => s.id === videoId ? { ...s, likes: s.likes - 1 } : s)
        );
      }
      return next;
    });
  };

  // Add Comment to Video
  const addComment = (videoId, text) => {
    const newComment = {
      id: Date.now(),
      author: 'You',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=50&h=50&q=80',
      text,
      time: 'Just now',
      likes: 0
    };

    setComments(prev => {
      const videoComments = prev[videoId] || [];
      return {
        ...prev,
        [videoId]: [newComment, ...videoComments]
      };
    });
  };

  return (
    <VideoContext.Provider value={{
      videos,
      activeVideo,
      setActiveVideo,
      searchQuery,
      setSearchQuery,
      activeTag,
      setActiveTag,
      subscribedChannels,
      toggleSubscribe,
      likedVideos,
      toggleLike,
      dislikedVideos,
      toggleDislike,
      comments,
      addComment,
      filteredVideos: getFilteredVideos(),
      shorts,
      setShorts
    }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideos = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideos must be used within a VideoProvider');
  }
  return context;
};
