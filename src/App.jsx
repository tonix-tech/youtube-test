import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TagsRow from './components/TagsRow';
import VideoGrid from './components/VideoGrid';
import VideoDetail from './components/VideoDetail';
import Library from './components/Library';
import Channel from './components/Channel';
import Shorts from './components/Shorts';
import AuthPage from './components/AuthPage';
import UploadModal from './components/UploadModal';
import { VideoProvider, useVideos } from './context/VideoContext';
import { NotificationProvider } from './context/NotificationContext';
import SubscriberNotification from './components/SubscriberNotification';
import SubscriberModal from './components/SubscriberModal';
import NotificationsPage from './components/NotificationsPage';
import { useSubscriberStream } from './hooks/useSubscriberStream';
import './App.css';

function MainLayout() {
  const { activeVideo, activePage, searchQuery, isSidebarExpanded, showUploadModal, setShowUploadModal } = useVideos();
  useSubscriberStream(); // Starts the mock stream
  const { activeVideo, activePage, searchQuery } = useVideos();

  if (activePage === 'auth') {
    return <AuthPage />;
  }

  return (
    <div className="app-container">
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main className={`main-wrapper ${isSidebarExpanded ? 'sidebar-expanded' : ''}`} style={{ height: searchQuery === 'shorts' ? 'calc(100vh - 56px)' : 'auto', overflow: searchQuery === 'shorts' ? 'hidden' : 'auto' }}>
          {activePage === 'library' ? (
            <Library />
          ) : activePage === 'channel' ? (
            <Channel />
          ) : activeVideo ? (
            <VideoDetail />
          ) : searchQuery === 'shorts' ? (
            <Shorts />
          ) : searchQuery === 'notifications' ? (
            <NotificationsPage />
          ) : (
            <>
              {!searchQuery.startsWith('__') && <TagsRow />}
              <div className="video-content-area">
                <VideoGrid />
              </div>
            </>
          )}
        </main>
      </div>

      <UploadModal 
        isOpen={showUploadModal} 
        onClose={() => setShowUploadModal(false)} 
      />
    </div>
  );
}

function App() {
  return (
    <VideoProvider>
      <NotificationProvider>
        <MainLayout />
        <SubscriberNotification />
        <SubscriberModal />
      </NotificationProvider>
    </VideoProvider>
  );
}

export default App;
