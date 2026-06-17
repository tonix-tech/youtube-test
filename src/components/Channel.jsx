import React, { useState } from 'react';
import { Search, MoreVertical, X } from 'lucide-react';
import { useVideos } from '../context/VideoContext';

export default function Channel() {
  const { setActiveVideo, setActivePage } = useVideos();
  const [activeTab, setActiveTab] = useState('shorts');
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAboutModal, setShowAboutModal] = useState(false);

  const shortsData = [
    {
      id: 's1',
      title: 'бездомный хомячок часть-2 #шортс #хом...',
      views: '15 views',
      thumbnail: 'https://images.unsplash.com/photo-1548846221-a3930b200b2a?w=400&h=700&fit=crop',
      channelName: 'Tonix_aep7',
      channelAvatar: '',
      description: 'Short video'
    },
    {
      id: 's2',
      title: 'бездомный хомячок часть-1 #шорст ...',
      views: '22 views',
      thumbnail: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=700&fit=crop',
      channelName: 'Tonix_aep7',
      channelAvatar: '',
      description: 'Short video'
    },
    {
      id: 's3',
      title: 'from ishowspeed to hamster ...  #viral #ai ...',
      views: '14 views',
      thumbnail: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=700&fit=crop',
      channelName: 'Tonix_aep7',
      channelAvatar: '',
      description: 'Short video'
    },
    {
      id: 's4',
      title: '...  #viral #edit #technology ...',
      views: '633 views',
      thumbnail: 'https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?w=400&h=700&fit=crop',
      channelName: 'Tonix_aep7',
      channelAvatar: '',
      description: 'Short video'
    }
  ];

  const handleShortClick = (short) => {
    setActiveVideo(short);
    setActivePage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomiseClick = () => {
    alert("Redirecting to YouTube Studio Customisation...");
  };

  const handleManageClick = () => {
    alert("Redirecting to YouTube Studio Content Manager...");
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showSearch) setSearchQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Searching channel for: ${searchQuery}`);
  };

  // Filter shorts based on local search query if on Shorts tab
  const displayedShorts = shortsData.filter(short => 
    short.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="channel-page">
      <div className="channel-header-container">
        <div className="channel-header-content">
          <div className="channel-avatar-large">
            T
          </div>
          <div className="channel-info-large">
            <h1 className="channel-name-large">Tonix_aep7</h1>
            <div className="channel-meta-large">
              <span>@Tonix_aep7</span>
              <span className="channel-dot">•</span>
              <span>4 videos</span>
            </div>
            <div className="channel-about">
              More about this channel{' '}
              <span 
                className="channel-more-link" 
                onClick={() => setShowAboutModal(true)}
              >
                ...more
              </span>
            </div>
            <div className="channel-actions-large">
              <button className="channel-action-btn" onClick={handleCustomiseClick}>Customise channel</button>
              <button className="channel-action-btn" onClick={handleManageClick}>Manage videos</button>
            </div>
          </div>
        </div>

        <div className="channel-tabs">
          <button 
            className={`channel-tab ${activeTab === 'shorts' ? 'active' : ''}`}
            onClick={() => setActiveTab('shorts')}
          >
            Shorts
          </button>
          <button 
            className={`channel-tab ${activeTab === 'posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            Posts
          </button>
          
          {showSearch ? (
            <form onSubmit={handleSearchSubmit} className="channel-search-form" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
              <input 
                type="text" 
                placeholder="Search channel" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  background: 'var(--bg-card)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  padding: '6px 12px',
                  borderRadius: '16px',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
              <button type="button" onClick={toggleSearch} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex' }}>
                <X size={20} />
              </button>
            </form>
          ) : (
            <button className="channel-tab-icon" onClick={toggleSearch}>
              <Search size={20} />
            </button>
          )}
        </div>
      </div>

      <div className="channel-content-area">
        {activeTab === 'shorts' && (
          <div className="channel-shorts-grid">
            {displayedShorts.length > 0 ? (
              displayedShorts.map((short) => (
                <div 
                  key={short.id} 
                  className="channel-short-card"
                  onClick={() => handleShortClick(short)}
                >
                  <div className="channel-short-thumb">
                    <img src={short.thumbnail} alt={short.title} loading="lazy" />
                  </div>
                  <div className="channel-short-details">
                    <h3 className="channel-short-title">{short.title}</h3>
                    <button className="channel-short-more" onClick={(e) => { e.stopPropagation(); alert("More options clicked"); }}>
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  <span className="channel-short-views">{short.views}</span>
                </div>
              ))
            ) : (
              <div style={{ padding: '40px 0', color: 'var(--text-secondary)' }}>No shorts matched your search.</div>
            )}
          </div>
        )}

        {activeTab === 'posts' && (
          <div className="channel-posts-area" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 0', color: 'var(--text-secondary)' }}>
            <div style={{ width: '120px', height: '120px', backgroundColor: 'var(--bg-card)', borderRadius: '50%', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MoreVertical size={40} color="var(--border-color)" />
            </div>
            <h2>No posts yet</h2>
            <p>This channel hasn't posted anything to their Community tab.</p>
          </div>
        )}
      </div>

      {/* About Modal */}
      {showAboutModal && (
        <div 
          className="channel-about-modal-overlay" 
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}
          onClick={() => setShowAboutModal(false)}
        >
          <div 
            className="channel-about-modal"
            style={{
              backgroundColor: 'var(--bg-card)',
              padding: '24px',
              borderRadius: '12px',
              maxWidth: '500px',
              width: '90%',
              color: 'var(--text-primary)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>About</h2>
              <button onClick={() => setShowAboutModal(false)} style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>
                <X size={24} />
              </button>
            </div>
            <p style={{ lineHeight: '1.5', marginBottom: '24px' }}>
              Welcome to the Tonix_aep7 channel! Here you will find short videos about hamsters, edits, viral trends, and AI technology.
            </p>
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '8px' }}>Channel details</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '8px' }}>www.youtube.com/@Tonix_aep7</p>
              <p style={{ color: 'var(--text-secondary)' }}>Joined Jun 17, 2026</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
