import React, { useState, useEffect } from 'react';
import { Search, Download, Calendar, User, FileText } from 'lucide-react';

const AuditLog = () => {
  const [logs, setLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const mockLogs = [
      {
        id: 1,
        timestamp: '2024-01-15T14:30:25Z',
        user: 'john.doe@company.com',
        action: 'FILE_UPLOAD',
        resource: 'project-documentation.pdf',
        details: 'File uploaded to documentation category',
        status: 'SUCCESS'
      },
      {
        id: 2,
        timestamp: '2024-01-15T14:25:12Z',
        user: 'admin@company.com',
        action: 'FILE_APPROVAL',
        resource: 'test-results-2024.xlsx',
        details: 'File approved for download',
        status: 'SUCCESS'
      },
      {
        id: 3,
        timestamp: '2024-01-15T14:20:45Z',
        user: 'jane.smith@company.com',
        action: 'FILE_DOWNLOAD',
        resource: 'user-manual.pdf',
        details: 'File downloaded by external user',
        status: 'SUCCESS'
      }
    ];
    setLogs(mockLogs);
  }, []);

  const filteredLogs = logs.filter(log =>
    log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.resource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS': return '#28a745';
      case 'WARNING': return '#ffc107';
      case 'FAILURE': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>Audit Log</h2>
        <p style={{ color: '#6c757d', margin: 0 }}>System activity and security events</p>
      </div>

      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '250px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%', padding: '8px 12px 8px 40px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px' }}
            />
          </div>
          <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '1rem', color: '#6c757d', fontSize: '0.875rem' }}>
        Showing {filteredLogs.length} of {logs.length} events
      </div>

      <div className="card">
        <table className="table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Resource</th>
              <th>Details</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map(log => (
              <tr key={log.id}>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                  <Calendar size={14} color="#6c757d" />
                  {formatTimestamp(log.timestamp)}
                </td>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                  <User size={14} color="#6c757d" />
                  {log.user}
                </td>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}>
                  <FileText size={14} color="#6c757d" />
                  {log.action.replace(/_/g, ' ')}
                </td>
                <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                  {log.resource}
                </td>
                <td style={{ maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {log.details}
                </td>
                <td>
                  <span 
                    style={{
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.7rem',
                      fontWeight: '500',
                      textTransform: 'uppercase',
                      backgroundColor: getStatusColor(log.status)
                    }}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditLog;