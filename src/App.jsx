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
import { VideoProvider, useVideos } from './context/VideoContext';
import './App.css';

function MainLayout() {
  const { activeVideo, activePage, searchQuery } = useVideos();

  if (activePage === 'auth') {
    return <AuthPage />;
  }

  return (
    <div className="app-container">
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main className="main-wrapper" style={{ height: searchQuery === 'shorts' ? 'calc(100vh - 56px)' : 'auto', overflow: searchQuery === 'shorts' ? 'hidden' : 'auto' }}>
          {activePage === 'library' ? (
            <Library />
          ) : activePage === 'channel' ? (
            <Channel />
          ) : activeVideo ? (
            <VideoDetail />
          ) : searchQuery === 'shorts' ? (
            <Shorts />
          ) : (
            <>
              {searchQuery !== '__history__' && <TagsRow />}
              <div className="video-content-area">
                <VideoGrid />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <VideoProvider>
      <MainLayout />
    </VideoProvider>
  );
}

export default App;
