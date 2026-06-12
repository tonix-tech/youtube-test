import React from 'react';
import { useVideos } from '../context/VideoContext';

const TAGS = [
  'All',
  'Formula 1',
  'Computers',
  'History',
  'Python',
  'Tanks',
  'Gadgets',
  'Vsauce',
  'Extraterrestrial',
  'SpaceX',
  'Software Design',
  'Java'
];

export default function TagsRow() {
  const { activeTag, setActiveTag, setActiveVideo } = useVideos();

  const handleTagClick = (tag) => {
    setActiveTag(tag);
    setActiveVideo(null); // Return to home grid if viewing detailed page
  };

  return (
    <div className="tags-container">
      {TAGS.map((tag) => (
        <button
          key={tag}
          className={`tag-btn ${activeTag === tag ? 'active' : ''}`}
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
