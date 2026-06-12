import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import TagsRow from './components/TagsRow';
import VideoGrid from './components/VideoGrid';
import VideoDetail from './components/VideoDetail';
import { VideoProvider, useVideos } from './context/VideoContext';
import './App.css';

function MainLayout() {
  const { activeVideo } = useVideos();

  return (
    <div className="app-container">
      <Header />
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar />
        <main className="main-wrapper">
          {activeVideo ? (
            <VideoDetail />
          ) : (
            <>
              <TagsRow />
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
