import React, { useState } from 'react';
import UploadModal from './UploadModal';
import AuditLog from './AuditLog';
import RBACPanel from './RBACPanel';
import { FileText, Upload, Users, Activity, Settings } from 'lucide-react';
import './DashboardInternal.css';

const DashboardInternal = ({ user }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [files, setFiles] = useState([
    {
      id: 1,
      name: 'test-results-2024.xlsx',
      size: '2.5 MB',
      uploadedBy: 'Jane Smith',
      uploadDate: '2024-01-15',
      status: 'approved',
      category: 'test-results'
    },
    {
      id: 2,
      name: 'configuration.json',
      size: '45 KB',
      uploadedBy: 'Mike Johnson',
      uploadDate: '2024-01-14',
      status: 'pending',
      category: 'configuration'
    },
    {
      id: 3,
      name: 'user-manual.pdf',
      size: '1.2 MB',
      uploadedBy: 'Sarah Wilson',
      uploadDate: '2024-01-13',
      status: 'rejected',
      category: 'documentation'
    }
  ]);

  const handleFileUpload = (fileData) => {
    const newFile = {
      id: files.length + 1,
      ...fileData,
      uploadedBy: user.name,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    setFiles([newFile, ...files]);
  };

  const handleStatusChange = (fileId, newStatus) => {
    setFiles(files.map(file => 
      file.id === fileId ? { ...file, status: newStatus } : file
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return '#28a745';
      case 'pending': return '#ffc107';
      case 'rejected': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const renderOverview = () => (
    <div className="dashboard-overview">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <FileText size={24} />
          </div>
          <div className="stat-content">
            <h3>Total Files</h3>
            <p className="stat-number">{files.length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Upload size={24} />
          </div>
          <div className="stat-content">
            <h3>Pending Review</h3>
            <p className="stat-number">{files.filter(f => f.status === 'pending').length}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Users size={24} />
          </div>
          <div className="stat-content">
            <h3>Active Users</h3>
            <p className="stat-number">24</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Activity size={24} />
          </div>
          <div className="stat-content">
            <h3>Today's Uploads</h3>
            <p className="stat-number">7</p>
          </div>
        </div>
      </div>

      <div className="files-section">
        <div className="section-header">
          <h2>Recent Files</h2>
          <button 
            className="btn btn-primary"
            onClick={() => setShowUploadModal(true)}
          >
            <Upload size={16} style={{ marginRight: '8px' }} />
            Upload File
          </button>
        </div>
        
        <div className="files-table-container">
          <table className="table">
            <thead>
              <tr>
                <th>File Name</th>
                <th>Size</th>
                <th>Uploaded By</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map(file => (
                <tr key={file.id}>
                  <td>
                    <div className="file-info">
                      <FileText size={16} />
                      <span>{file.name}</span>
                    </div>
                  </td>
                  <td>{file.size}</td>
                  <td>{file.uploadedBy}</td>
                  <td>{file.uploadDate}</td>
                  <td>
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(file.status) }}
                    >
                      {file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      {file.status === 'pending' && (
                        <>
                          <button 
                            className="btn-small btn-success"
                            onClick={() => handleStatusChange(file.id, 'approved')}
                          >
                            Approve
                          </button>
                          <button 
                            className="btn-small btn-danger"
                            onClick={() => handleStatusChange(file.id, 'rejected')}
                          >
                            Reject
                          </button>
                        </>
                      )}
                      <button className="btn-small btn-secondary">
                        Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="dashboard-internal">
      <div className="dashboard-header">
        <h1>Internal Dashboard</h1>
        <p>Administrator View - Full System Access</p>
      </div>

      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <FileText size={16} />
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'audit' ? 'active' : ''}`}
          onClick={() => setActiveTab('audit')}
        >
          <Activity size={16} />
          Audit Log
        </button>
        <button 
          className={`tab-button ${activeTab === 'rbac' ? 'active' : ''}`}
          onClick={() => setActiveTab('rbac')}
        >
          <Users size={16} />
          User Management
        </button>
        <button 
          className={`tab-button ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={16} />
          Settings
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'audit' && <AuditLog />}
        {activeTab === 'rbac' && <RBACPanel />}
        {activeTab === 'settings' && (
          <div className="settings-panel">
            <h2>System Settings</h2>
            <div className="card">
              <h3>Upload Configuration</h3>
              <div className="form-group">
                <label className="form-label">Maximum File Size (MB)</label>
                <input type="number" className="form-control" defaultValue="100" />
              </div>
              <div className="form-group">
                <label className="form-label">Allowed File Types</label>
                <input type="text" className="form-control" defaultValue=".pdf,.doc,.docx,.xlsx,.json" />
              </div>
              <button className="btn btn-primary">Save Settings</button>
            </div>
          </div>
        )}
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

export default DashboardInternal;