import React, { useState, useRef } from 'react';
import { Upload, X, FileText, AlertCircle } from 'lucide-react';

const UploadModal = ({ onClose, onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState('documentation');
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const categories = [
    { value: 'documentation', label: 'Documentation' },
    { value: 'test-results', label: 'Test Results' },
    { value: 'configuration', label: 'Configuration' },
    { value: 'data', label: 'Data Files' },
    { value: 'reports', label: 'Reports' },
    { value: 'other', label: 'Other' }
  ];

  const allowedTypes = [
    '.pdf', '.doc', '.docx', '.txt', '.rtf',
    '.xls', '.xlsx', '.csv',
    '.ppt', '.pptx',
    '.json', '.xml', '.yaml', '.yml',
    '.zip', '.rar', '.7z',
    '.jpg', '.jpeg', '.png', '.gif', '.bmp',
    '.mp4', '.avi', '.mov', '.wmv'
  ];

  const maxFileSize = 100 * 1024 * 1024; // 100MB

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = Array.from(fileList).map(file => {
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      return {
        file,
        name: file.name,
        size: formatFileSize(file.size),
        type: file.type,
        extension: fileExtension,
        valid: validateFile(file, fileExtension),
        id: Math.random().toString(36).substr(2, 9)
      };
    });
    
    setFiles(prev => [...prev, ...newFiles]);
  };

  const validateFile = (file, extension) => {
    const errors = [];
    
    if (!allowedTypes.includes(extension)) {
      errors.push('File type not allowed');
    }
    
    if (file.size > maxFileSize) {
      errors.push('File size exceeds 100MB limit');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = (fileId) => {
    setFiles(files.filter(f => f.id !== fileId));
  };

  const handleUpload = async () => {
    const validFiles = files.filter(f => f.valid.isValid);
    
    if (validFiles.length === 0) {
      alert('Please select at least one valid file to upload.');
      return;
    }

    setUploading(true);
    
    try {
      // Simulate upload process
      for (const fileData of validFiles) {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
        
        onUpload({
          name: fileData.name,
          size: fileData.size,
          category,
          description: description || 'No description provided'
        });
      }
      
      onClose();
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const validFilesCount = files.filter(f => f.valid.isValid).length;
  const hasInvalidFiles = files.some(f => !f.valid.isValid);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal upload-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Upload Files</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          <div className="upload-form">
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

            <div 
              className={`upload-zone ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={onButtonClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleChange}
                style={{ display: 'none' }}
                accept={allowedTypes.join(',')}
              />
              
              <div className="upload-content">
                <Upload size={48} />
                <h3>Drop files here or click to browse</h3>
                <p>
                  Supported formats: PDF, DOC, XLS, PPT, Images, Videos, Archives
                  <br />
                  Maximum file size: 100MB
                </p>
              </div>
            </div>

            {files.length > 0 && (
              <div className="files-list">
                <h4>Selected Files ({files.length})</h4>
                {files.map(fileData => (
                  <div 
                    key={fileData.id} 
                    className={`file-item ${!fileData.valid.isValid ? 'invalid' : ''}`}
                  >
                    <div className="file-info">
                      <FileText size={20} />
                      <div className="file-details">
                        <span className="file-name">{fileData.name}</span>
                        <span className="file-size">{fileData.size}</span>
                      </div>
                    </div>
                    
                    {!fileData.valid.isValid && (
                      <div className="file-errors">
                        <AlertCircle size={16} />
                        <span>{fileData.valid.errors.join(', ')}</span>
                      </div>
                    )}
                    
                    <button 
                      className="remove-file-btn"
                      onClick={() => removeFile(fileData.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {hasInvalidFiles && (
              <div className="validation-warning">
                <AlertCircle size={16} />
                <span>Some files cannot be uploaded due to validation errors. Only valid files will be uploaded.</span>
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button 
            className="btn btn-secondary"
            onClick={onClose}
            disabled={uploading}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={validFilesCount === 0 || uploading}
          >
            {uploading ? 'Uploading...' : `Upload ${validFilesCount} file${validFilesCount !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>

      <style jsx>{`
        .upload-modal {
          max-width: 600px;
          width: 95%;
        }

        .modal-body {
          max-height: 70vh;
          overflow-y: auto;
        }

        .upload-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .upload-zone {
          border: 2px dashed #ced4da;
          border-radius: 8px;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s;
          background-color: #f8f9fa;
        }

        .upload-zone:hover,
        .upload-zone.drag-active {
          border-color: #007bff;
          background-color: #e3f2fd;
        }

        .upload-content {
          color: #6c757d;
        }

        .upload-content svg {
          color: #007bff;
          margin-bottom: 1rem;
        }

        .upload-content h3 {
          margin: 0 0 0.5rem 0;
          color: #495057;
        }

        .upload-content p {
          margin: 0;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .files-list {
          border: 1px solid #dee2e6;
          border-radius: 8px;
          padding: 1rem;
          background-color: #f8f9fa;
        }

        .files-list h4 {
          margin: 0 0 1rem 0;
          color: #495057;
          font-size: 1rem;
        }

        .file-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.75rem;
          background: white;
          border-radius: 6px;
          margin-bottom: 0.5rem;
          border: 1px solid #dee2e6;
        }

        .file-item.invalid {
          border-color: #dc3545;
          background-color: #f8d7da;
        }

        .file-item:last-child {
          margin-bottom: 0;
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          flex: 1;
        }

        .file-info svg {
          color: #007bff;
          flex-shrink: 0;
        }

        .file-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .file-name {
          font-weight: 500;
          color: #495057;
        }

        .file-size {
          font-size: 0.875rem;
          color: #6c757d;
        }

        .file-errors {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #dc3545;
          font-size: 0.875rem;
          margin-left: 1rem;
        }

        .remove-file-btn {
          background: none;
          border: none;
          color: #6c757d;
          cursor: pointer;
          padding: 0.25rem;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .remove-file-btn:hover {
          background-color: #e9ecef;
          color: #495057;
        }

        .validation-warning {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background-color: #fff3cd;
          border: 1px solid #ffeaa7;
          border-radius: 6px;
          color: #856404;
          font-size: 0.875rem;
        }

        .modal-footer {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          padding-top: 1.5rem;
          border-top: 1px solid #dee2e6;
          margin-top: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default UploadModal;