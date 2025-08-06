import React, { useState } from 'react';
import UploadModal from './UploadModal';
import AuditLog from './AuditLog';
import RBACPanel from './RBACPanel';
import { FileText, Upload, Users, Activity, Settings } from 'lucide-react';

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

      <style jsx>{`
        .dashboard-internal {
          max-width: 1200px;
          margin: 0 auto;
        }

        .dashboard-header {
          margin-bottom: 2rem;
        }

        .dashboard-header h1 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .dashboard-header p {
          color: #6c757d;
          margin: 0;
        }

        .dashboard-tabs {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
          border-bottom: 2px solid #e9ecef;
        }

        .tab-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: none;
          border: none;
          padding: 1rem 1.5rem;
          cursor: pointer;
          color: #6c757d;
          font-size: 0.9rem;
          font-weight: 500;
          border-bottom: 2px solid transparent;
          transition: all 0.2s;
        }

        .tab-button:hover {
          color: #007bff;
        }

        .tab-button.active {
          color: #007bff;
          border-bottom-color: #007bff;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
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
          background: #e3f2fd;
          color: #1976d2;
          padding: 1rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .stat-content h3 {
          margin: 0 0 0.5rem 0;
          color: #6c757d;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .stat-number {
          margin: 0;
          font-size: 2rem;
          font-weight: bold;
          color: #2c3e50;
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
        }

        .section-header h2 {
          margin: 0;
          color: #2c3e50;
        }

        .files-table-container {
          overflow-x: auto;
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .status-badge {
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          font-weight: 500;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-small {
          padding: 0.25rem 0.75rem;
          font-size: 0.75rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          color: white;
        }

        .btn-success {
          background-color: #28a745;
        }

        .btn-success:hover {
          background-color: #218838;
        }

        .settings-panel {
          max-width: 600px;
        }

        .settings-panel h2 {
          color: #2c3e50;
          margin-bottom: 1.5rem;
        }

        .settings-panel h3 {
          color: #495057;
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
};

export default DashboardInternal;