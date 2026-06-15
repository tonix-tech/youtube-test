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
    id: 'FaILnmUYS_U',
    title: 'Creating my own OS to run Tetris',
    duration: '22:37',
    thumbnail: 'https://img.youtube.com/vi/FaILnmUYS_U/maxresdefault.jpg',
    channelName: 'jdh',
    channelAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&h=100&q=80',
    views: '1.7M views',
    publishedTime: '8 months ago',
    likes: 95000,
    category: 'Software Design',
    description: 'Writing an entire operating system in assembly and C from scratch with the sole purpose of playing Tetris. No bootloaders, no standard libraries.'
  },
  {
    id: 'WOZgEvJbnlc',
    title: 'F1 Aerodynamics - 1: The Basics',
    duration: '7:57',
    thumbnail: 'https://img.youtube.com/vi/WOZgEvJbnlc/maxresdefault.jpg',
    channelName: 'Chain Bear',
    channelAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80',
    views: '1.1M views',
    publishedTime: '4 years ago',
    likes: 41000,
    category: 'Formula 1',
    description: 'How do aerodynamics work on a Formula 1 car? Exploring downforce, wings, and how air flows around the vehicle to generate grip.'
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
    id: 'r5pFyBHO8Fk',
    title: 'F1 Aerodynamics - 2: Turbulence, Drag & Vortices',
    duration: '8:55',
    thumbnail: 'https://img.youtube.com/vi/r5pFyBHO8Fk/maxresdefault.jpg',
    channelName: 'Chain Bear',
    channelAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=100&h=100&q=80',
    views: '890K views',
    publishedTime: '3 years ago',
    likes: 32000,
    category: 'Formula 1',
    description: 'What is turbulence and how does it affect the drag on a Formula 1 car? Stuart Taylor explains drag, wake, and aerodynamic design in F1.'
  },
  {
    id: 'nej-5GhPqtw',
    title: 'How GOTYE created a song we used to know',
    duration: '10:49',
    thumbnail: 'https://img.youtube.com/vi/nej-5GhPqtw/maxresdefault.jpg',
    channelName: 'Middle 8',
    channelAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&h=100&q=80',
    views: '920K views',
    publishedTime: '6 months ago',
    likes: 62000,
    category: 'Software Design', // categorized for general study
    description: 'An analysis of Gotyes mega-hit "Somebody That I Used To Know", its composition, the sample usage, and why it became an international phenomenon.'
  },
  {
    id: 'RzWB5jL5RX0',
    title: 'Cracking Enigma in 2021',
    duration: '22:15',
    thumbnail: 'https://img.youtube.com/vi/RzWB5jL5RX0/maxresdefault.jpg',
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
  'oCL8h9J_z7I': [
    { id: 1, author: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=50&h=50&q=80', text: 'This is the clearest explanation of the progress bar problem I have ever seen! Tom Scott does it again.', time: '2 days ago', likes: 342 },
    { id: 2, author: 'John Doe', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=50&h=50&q=80', text: 'Always wondered why Windows installs spend 90% of the time sitting at 99%. Now I finally know!', time: '1 week ago', likes: 118 }
  ],
  'Gq5-V9Q5Cq0': [
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
    new Set(['Tom Scott', 'Mumbo Jumbo', 'Chain Bear', 'Lindybeige'])
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
