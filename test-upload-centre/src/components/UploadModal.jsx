import React, { useState } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';

const UploadModal = ({ onClose, onUpload }) => {
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState('documentation');
  const [description, setDescription] = useState('');

  const categories = [
    { value: 'documentation', label: 'Documentation' },
    { value: 'test-results', label: 'Test Results' },
    { value: 'configuration', label: 'Configuration' },
    { value: 'data', label: 'Data Files' },
    { value: 'reports', label: 'Reports' },
    { value: 'other', label: 'Other' }
  ];

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleUpload = () => {
    if (files.length > 0) {
      files.forEach(file => {
        onUpload({
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
          category,
          description: description || 'No description provided'
        });
      });
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Upload Files</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Category *</label>
            <select 
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              className="form-control"
              rows="3"
              placeholder="Optional description for your files..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div style={{ 
            border: '2px dashed #ced4da', 
            borderRadius: '8px', 
            padding: '3rem 2rem', 
            textAlign: 'center', 
            backgroundColor: '#f8f9fa',
            marginBottom: '1rem'
          }}>
            <Upload size={48} color="#007bff" style={{ marginBottom: '1rem' }} />
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#495057' }}>Choose Files to Upload</h3>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.875rem', color: '#6c757d' }}>
              Select files from your computer
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              style={{ marginBottom: '1rem' }}
            />
          </div>

          {files.length > 0 && (
            <div style={{ border: '1px solid #dee2e6', borderRadius: '8px', padding: '1rem', backgroundColor: '#f8f9fa' }}>
              <h4 style={{ margin: '0 0 1rem 0', color: '#495057' }}>Selected Files ({files.length})</h4>
              {Array.from(files).map((file, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  padding: '0.75rem', 
                  background: 'white', 
                  borderRadius: '6px', 
                  marginBottom: '0.5rem',
                  border: '1px solid #dee2e6'
                }}>
                  <FileText size={20} color="#007bff" />
                  <div>
                    <div style={{ fontWeight: '500', color: '#495057' }}>{file.name}</div>
                    <div style={{ fontSize: '0.875rem', color: '#6c757d' }}>
                      {(file.size / 1024 / 1024).toFixed(1)} MB
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          gap: '1rem', 
          paddingTop: '1.5rem', 
          borderTop: '1px solid #dee2e6', 
          marginTop: '1.5rem' 
        }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={files.length === 0}
          >
            Upload {files.length} file{files.length !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;