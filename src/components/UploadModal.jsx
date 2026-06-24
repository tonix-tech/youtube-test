import React, { useState } from 'react';
import { X, Upload, Video, PlaySquare } from 'lucide-react';
import { useVideos } from '../context/VideoContext';

export default function UploadModal({ isOpen, onClose }) {
  const { addVideo, addShort } = useVideos();
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [uploadType, setUploadType] = useState('video'); // 'video' or 'short'
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      // Optional: auto-fill title from filename
      setTitle(e.target.files[0].name.split('.')[0]);
      setStep(2);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFile(null);
    setTitle('');
    setDescription('');
    setThumbnailUrl('');
    setUploadType('video');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) {
      alert("Title is required!");
      return;
    }

    const objectUrl = file ? URL.createObjectURL(file) : '';

    if (uploadType === 'video') {
      addVideo({
        title,
        description,
        thumbnail: thumbnailUrl,
        videoUrl: objectUrl
      });
      alert("Video added successfully! It will appear on your Home page.");
    } else {
      addShort({
        title,
        videoUrl: objectUrl,
        thumbnail: thumbnailUrl
      });
      alert("Short added successfully! It will appear in Shorts.");
    }

    handleClose();
  };

  return (
    <div className="upload-modal-overlay">
      <div className="upload-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="upload-modal-header">
          <h2>{step === 1 ? 'Select file to upload' : 'Add details'}</h2>
          <button className="upload-close-btn" onClick={handleClose}>
            <X size={24} />
          </button>
        </div>

        {step === 1 ? (
          <div style={{ padding: '60px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '120px', height: '120px', backgroundColor: '#1f1f1f', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Upload size={48} color="#aaa" />
            </div>
            <p style={{ color: '#aaa', fontSize: '15px' }}>Drag and drop video files to upload</p>
            <label 
              style={{ 
                backgroundColor: '#3ea6ff', color: '#000', padding: '10px 24px', 
                borderRadius: '18px', fontWeight: '500', cursor: 'pointer', marginTop: '16px' 
              }}
            >
              SELECT FILE
              <input 
                type="file" 
                accept="video/*" 
                onChange={handleFileChange} 
                style={{ display: 'none' }} 
              />
            </label>
          </div>
        ) : (
          <form className="upload-form" onSubmit={handleSubmit}>
          <div className="upload-type-selector">
            <button 
              type="button"
              className={`upload-type-btn ${uploadType === 'video' ? 'active' : ''}`}
              onClick={() => setUploadType('video')}
            >
              <Video size={20} />
              Video
            </button>
            <button 
              type="button"
              className={`upload-type-btn ${uploadType === 'short' ? 'active' : ''}`}
              onClick={() => setUploadType('short')}
            >
              <PlaySquare size={20} />
              Short
            </button>
          </div>

          <div className="upload-input-group">
            <label>Title (required)</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add a title that describes your video" 
              className="upload-input"
              required
            />
          </div>

          {uploadType === 'video' && (
            <div className="upload-input-group">
              <label>Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell viewers about your video" 
                className="upload-textarea"
                rows="4"
              />
            </div>
          )}

          <div className="upload-input-group">
            <label>Thumbnail Image URL (optional)</label>
            <input 
              type="url" 
              value={thumbnailUrl}
              onChange={(e) => setThumbnailUrl(e.target.value)}
              placeholder="https://..." 
              className="upload-input"
            />
          </div>

          <div className="upload-actions">
            <button type="submit" className="upload-submit-btn">
              <Upload size={18} style={{ marginRight: '8px' }} />
              Upload
            </button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
}
