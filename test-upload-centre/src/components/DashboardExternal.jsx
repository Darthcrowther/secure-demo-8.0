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

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h1 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>External Dashboard</h1>
        <p style={{ color: '#6c757d', margin: 0 }}>Upload and manage your files</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#f8f9fa', color: '#007bff', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <FileText size={20} />
          </div>
          <div>
            <div style={{ color: '#6c757d', fontSize: '0.875rem' }}>My Files</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c3e50' }}>{files.length}</div>
          </div>
        </div>
        
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ background: '#f8f9fa', color: '#007bff', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckCircle size={20} />
          </div>
          <div>
            <div style={{ color: '#6c757d', fontSize: '0.875rem' }}>Approved</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c3e50' }}>{files.filter(f => f.status === 'approved').length}</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ textAlign: 'center', padding: '3rem', border: '2px dashed #e9ecef', marginBottom: '2rem' }}>
        <Upload size={48} color="#007bff" style={{ marginBottom: '1rem' }} />
        <h2 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Upload New File</h2>
        <p style={{ color: '#6c757d', marginBottom: '2rem' }}>Upload documents, spreadsheets, and other files for review</p>
        <button 
          className="btn btn-primary"
          style={{ padding: '1rem 2rem', fontSize: '1rem' }}
          onClick={() => setShowUploadModal(true)}
        >
          <Upload size={20} style={{ marginRight: '8px' }} />
          Choose Files
        </button>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e9ecef' }}>
          <h2 style={{ margin: 0, color: '#2c3e50' }}>My Files</h2>
          <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>{files.length} files</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {files.map(file => (
            <div key={file.id} style={{ border: '1px solid #e9ecef', borderRadius: '8px', padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <FileText size={24} color="#007bff" />
                {getStatusIcon(file.status)}
              </div>
              
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50', fontSize: '1rem' }}>
                {file.name}
              </h3>
              <div style={{ display: 'flex', gap: '1rem', color: '#6c757d', fontSize: '0.875rem', marginBottom: '0.5rem' }}>
                <span>{file.size}</span>
                <span>{file.uploadDate}</span>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ background: '#e9ecef', color: '#495057', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', textTransform: 'capitalize' }}>
                  {file.category}
                </span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <span 
                  style={{ 
                    color: 'white', 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '1rem', 
                    fontSize: '0.75rem', 
                    fontWeight: '500',
                    backgroundColor: file.status === 'approved' ? '#28a745' : file.status === 'pending' ? '#ffc107' : '#dc3545'
                  }}
                >
                  {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button 
                  className="btn btn-primary btn-small"
                  disabled={file.status !== 'approved'}
                  style={{ opacity: file.status !== 'approved' ? 0.5 : 1 }}
                >
                  <Download size={14} style={{ marginRight: '4px' }} />
                  Download
                </button>
                {file.status === 'approved' && (
                  <span style={{ color: '#6c757d', fontSize: '0.75rem' }}>
                    {file.downloadCount} downloads
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showUploadModal && (
        <UploadModal 
          onClose={() => setShowUploadModal(false)}
          onUpload={handleFileUpload}
        />
      )}
    </div>
  );
};

export default DashboardExternal;