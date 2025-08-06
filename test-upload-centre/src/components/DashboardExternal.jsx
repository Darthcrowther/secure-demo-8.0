import React, { useState } from 'react';
import UploadModal from './UploadModal';
import { FileText, Upload, Download, Clock, CheckCircle, XCircle } from 'lucide-react';

const DashboardExternal = ({ user }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'project-documentation.pdf',
      size: '1.8 MB',
      uploadDate: '2024-01-15',
      status: 'approved',
      category: 'documentation',
      downloadCount: 3
    },
    {
      id: 2,
      name: 'test-data.xlsx',
      size: '850 KB',
      uploadDate: '2024-01-14',
      status: 'pending',
      category: 'data',
      downloadCount: 0
    },
    {
      id: 3,
      name: 'requirements.docx',
      size: '425 KB',
      uploadDate: '2024-01-12',
      status: 'rejected',
      category: 'documentation',
      downloadCount: 0,
      rejectionReason: 'File format not supported for this category'
    }
  ]);

  const handleFileUpload = (fileData) => {
    const newFile = {
      id: files.length + 1,
      ...fileData,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      downloadCount: 0
    };
    setFiles([newFile, ...files]);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} color="#28a745" />;
      case 'pending':
        return <Clock size={16} color="#ffc107" />;
      case 'rejected':
        return <XCircle size={16} color="#dc3545" />;
      default:
        return <Clock size={16} color="#6c757d" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#28a745';
      case 'pending': return '#ffc107';
      case 'rejected': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const canDownload = (file) => {
    return file.status === 'approved';
  };

  return (
    <div className="dashboard-external">
      <div className="dashboard-header">
        <h1>External Dashboard</h1>
        <p>Upload and manage your files</p>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FileText size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">My Files</span>
            <span className="stat-value">{files.length}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <CheckCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Approved</span>
            <span className="stat-value">{files.filter(f => f.status === 'approved').length}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{files.filter(f => f.status === 'pending').length}</span>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <XCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-label">Rejected</span>
            <span className="stat-value">{files.filter(f => f.status === 'rejected').length}</span>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="upload-section">
          <div className="upload-card">
            <div className="upload-icon">
              <Upload size={48} />
            </div>
            <h2>Upload New File</h2>
            <p>Upload documents, spreadsheets, and other files for review</p>
            <button 
              className="btn btn-primary btn-large"
              onClick={() => setShowUploadModal(true)}
            >
              <Upload size={20} style={{ marginRight: '8px' }} />
              Choose Files
            </button>
          </div>
        </div>

        <div className="files-section">
          <div className="section-header">
            <h2>My Files</h2>
            <span className="file-count">{files.length} files</span>
          </div>

          {files.length === 0 ? (
            <div className="empty-state">
              <FileText size={48} color="#6c757d" />
              <h3>No files uploaded yet</h3>
              <p>Start by uploading your first file using the upload button above.</p>
            </div>
          ) : (
            <div className="files-grid">
              {files.map(file => (
                <div key={file.id} className="file-card">
                  <div className="file-header">
                    <div className="file-icon">
                      <FileText size={24} />
                    </div>
                    <div className="file-status">
                      {getStatusIcon(file.status)}
                    </div>
                  </div>
                  
                  <div className="file-info">
                    <h3 className="file-name" title={file.name}>
                      {file.name}
                    </h3>
                    <div className="file-meta">
                      <span className="file-size">{file.size}</span>
                      <span className="file-date">{file.uploadDate}</span>
                    </div>
                    <div className="file-category">
                      <span className="category-badge">
                        {file.category}
                      </span>
                    </div>
                  </div>

                  <div className="file-status-info">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(file.status) }}
                    >
                      {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                    </span>
                    {file.status === 'rejected' && file.rejectionReason && (
                      <p className="rejection-reason">
                        {file.rejectionReason}
                      </p>
                    )}
                  </div>

                  <div className="file-actions">
                    {canDownload(file) ? (
                      <button className="btn btn-primary btn-small">
                        <Download size={14} style={{ marginRight: '4px' }} />
                        Download
                      </button>
                    ) : (
                      <button className="btn btn-secondary btn-small" disabled>
                        <Download size={14} style={{ marginRight: '4px' }} />
                        Download
                      </button>
                    )}
                    {file.status === 'approved' && (
                      <span className="download-count">
                        {file.downloadCount} downloads
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)}
          onUpload={handleFileUpload}
        />
      )}

      <style jsx>{`
        .dashboard-external {
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .dashboard-header h1 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .dashboard-header p {
          color: #6c757d;
          margin: 0;
        }

        .quick-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat-card {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .stat-icon {
          background: #f8f9fa;
          color: #007bff;
          padding: 0.75rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-content {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          color: #6c757d;
          font-size: 0.875rem;
          margin-bottom: 0.25rem;
        }

        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #2c3e50;
        }

        .main-content {
          display: grid;
          gap: 2rem;
        }

        .upload-section {
          display: flex;
          justify-content: center;
        }

        .upload-card {
          background: white;
          border-radius: 12px;
          padding: 3rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          text-align: center;
          border: 2px dashed #e9ecef;
          transition: border-color 0.2s;
          max-width: 400px;
          width: 100%;
        }

        .upload-card:hover {
          border-color: #007bff;
        }

        .upload-icon {
          color: #007bff;
          margin-bottom: 1rem;
        }

        .upload-card h2 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .upload-card p {
          color: #6c757d;
          margin-bottom: 2rem;
        }

        .btn-large {
          padding: 1rem 2rem;
          font-size: 1rem;
        }

        .files-section {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e9ecef;
        }

        .section-header h2 {
          margin: 0;
          color: #2c3e50;
        }

        .file-count {
          color: #6c757d;
          font-size: 0.875rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem;
          color: #6c757d;
        }

        .empty-state h3 {
          margin: 1rem 0 0.5rem 0;
        }

        .files-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }

        .file-card {
          border: 1px solid #e9ecef;
          border-radius: 8px;
          padding: 1.5rem;
          transition: box-shadow 0.2s;
        }

        .file-card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .file-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .file-icon {
          color: #007bff;
        }

        .file-info {
          margin-bottom: 1rem;
        }

        .file-name {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
          font-size: 1rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .file-meta {
          display: flex;
          gap: 1rem;
          color: #6c757d;
          font-size: 0.875rem;
          margin-bottom: 0.5rem;
        }

        .category-badge {
          background: #e9ecef;
          color: #495057;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          text-transform: capitalize;
        }

        .file-status-info {
          margin-bottom: 1rem;
        }

        .status-badge {
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
          display: inline-block;
        }

        .rejection-reason {
          margin: 0.5rem 0 0 0;
          color: #dc3545;
          font-size: 0.75rem;
          font-style: italic;
        }

        .file-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-small {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .download-count {
          color: #6c757d;
          font-size: 0.75rem;
        }
      `}</style>
    </div>
  );
};

export default DashboardExternal;