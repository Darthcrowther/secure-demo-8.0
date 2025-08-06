import React, { useState, useEffect } from 'react';
import { Search, Filter, Download, Calendar, User, FileText, Shield, Settings } from 'lucide-react';

const AuditLog = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    action: '',
    user: '',
    dateFrom: '',
    dateTo: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [logsPerPage] = useState(20);

  // Mock audit log data
  useEffect(() => {
    const mockLogs = [
      {
        id: 1,
        timestamp: '2024-01-15T14:30:25Z',
        user: 'john.doe@company.com',
        action: 'FILE_UPLOAD',
        resource: 'project-documentation.pdf',
        details: 'File uploaded to documentation category',
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        status: 'SUCCESS'
      },
      {
        id: 2,
        timestamp: '2024-01-15T14:25:12Z',
        user: 'admin@company.com',
        action: 'FILE_APPROVAL',
        resource: 'test-results-2024.xlsx',
        details: 'File approved for download',
        ipAddress: '192.168.1.50',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        status: 'SUCCESS'
      },
      {
        id: 3,
        timestamp: '2024-01-15T14:20:45Z',
        user: 'jane.smith@company.com',
        action: 'FILE_DOWNLOAD',
        resource: 'user-manual.pdf',
        details: 'File downloaded by external user',
        ipAddress: '203.0.113.45',
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
        status: 'SUCCESS'
      },
      {
        id: 4,
        timestamp: '2024-01-15T14:15:33Z',
        user: 'admin@company.com',
        action: 'USER_ROLE_CHANGE',
        resource: 'mike.johnson@company.com',
        details: 'User role changed from viewer to admin',
        ipAddress: '192.168.1.50',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        status: 'SUCCESS'
      },
      {
        id: 5,
        timestamp: '2024-01-15T14:10:18Z',
        user: 'system',
        action: 'FILE_SCAN',
        resource: 'suspicious-file.exe',
        details: 'Malware scan detected threat - file quarantined',
        ipAddress: '127.0.0.1',
        userAgent: 'System Scanner v2.1',
        status: 'WARNING'
      },
      {
        id: 6,
        timestamp: '2024-01-15T14:05:07Z',
        user: 'bob.wilson@company.com',
        action: 'LOGIN_ATTEMPT',
        resource: 'authentication',
        details: 'Failed login attempt - invalid password',
        ipAddress: '198.51.100.25',
        userAgent: 'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36',
        status: 'FAILURE'
      },
      {
        id: 7,
        timestamp: '2024-01-15T14:00:55Z',
        user: 'admin@company.com',
        action: 'SYSTEM_CONFIG',
        resource: 'upload_settings',
        details: 'Maximum file size limit changed to 100MB',
        ipAddress: '192.168.1.50',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        status: 'SUCCESS'
      },
      {
        id: 8,
        timestamp: '2024-01-15T13:55:42Z',
        user: 'sarah.davis@company.com',
        action: 'FILE_DELETE',
        resource: 'old-document.docx',
        details: 'File permanently deleted from system',
        ipAddress: '192.168.1.75',
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
        status: 'SUCCESS'
      }
    ];
    setLogs(mockLogs);
    setFilteredLogs(mockLogs);
  }, []);

  // Filter logs based on current filters
  useEffect(() => {
    let filtered = logs.filter(log => {
      const matchesSearch = !filters.search || 
        log.user.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.action.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.resource.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.details.toLowerCase().includes(filters.search.toLowerCase());

      const matchesAction = !filters.action || log.action === filters.action;
      const matchesUser = !filters.user || log.user.includes(filters.user);

      const logDate = new Date(log.timestamp).toISOString().split('T')[0];
      const matchesDateFrom = !filters.dateFrom || logDate >= filters.dateFrom;
      const matchesDateTo = !filters.dateTo || logDate <= filters.dateTo;

      return matchesSearch && matchesAction && matchesUser && matchesDateFrom && matchesDateTo;
    });

    setFilteredLogs(filtered);
    setCurrentPage(1);
  }, [filters, logs]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      action: '',
      user: '',
      dateFrom: '',
      dateTo: ''
    });
  };

  const exportLogs = () => {
    const csv = [
      ['Timestamp', 'User', 'Action', 'Resource', 'Details', 'IP Address', 'Status'],
      ...filteredLogs.map(log => [
        new Date(log.timestamp).toLocaleString(),
        log.user,
        log.action,
        log.resource,
        log.details,
        log.ipAddress,
        log.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-log-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getActionIcon = (action) => {
    switch (action) {
      case 'FILE_UPLOAD':
      case 'FILE_DOWNLOAD':
      case 'FILE_DELETE':
      case 'FILE_APPROVAL':
      case 'FILE_SCAN':
        return <FileText size={16} />;
      case 'USER_ROLE_CHANGE':
      case 'LOGIN_ATTEMPT':
        return <User size={16} />;
      case 'SYSTEM_CONFIG':
        return <Settings size={16} />;
      default:
        return <Shield size={16} />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'SUCCESS': return '#28a745';
      case 'WARNING': return '#ffc107';
      case 'FAILURE': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Pagination
  const indexOfLastLog = currentPage * logsPerPage;
  const indexOfFirstLog = indexOfLastLog - logsPerPage;
  const currentLogs = filteredLogs.slice(indexOfFirstLog, indexOfLastLog);
  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const uniqueActions = [...new Set(logs.map(log => log.action))];
  const uniqueUsers = [...new Set(logs.map(log => log.user))];

  return (
    <div className="audit-log">
      <div className="audit-header">
        <h2>Audit Log</h2>
        <p>System activity and security events</p>
      </div>

      <div className="filters-section">
        <div className="filters-row">
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search logs..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>

          <div className="filter-group">
            <select
              value={filters.action}
              onChange={(e) => handleFilterChange('action', e.target.value)}
            >
              <option value="">All Actions</option>
              {uniqueActions.map(action => (
                <option key={action} value={action}>
                  {action.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <select
              value={filters.user}
              onChange={(e) => handleFilterChange('user', e.target.value)}
            >
              <option value="">All Users</option>
              {uniqueUsers.map(user => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>

          <div className="date-filters">
            <input
              type="date"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
              title="From Date"
            />
            <input
              type="date"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
              title="To Date"
            />
          </div>

          <div className="filter-actions">
            <button className="btn btn-secondary" onClick={clearFilters}>
              Clear
            </button>
            <button className="btn btn-primary" onClick={exportLogs}>
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="logs-summary">
        <span>Showing {currentLogs.length} of {filteredLogs.length} events</span>
      </div>

      <div className="logs-table-container">
        <table className="logs-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>User</th>
              <th>Action</th>
              <th>Resource</th>
              <th>Details</th>
              <th>IP Address</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentLogs.map(log => (
              <tr key={log.id}>
                <td className="timestamp-cell">
                  <Calendar size={14} />
                  {formatTimestamp(log.timestamp)}
                </td>
                <td className="user-cell">
                  <User size={14} />
                  {log.user}
                </td>
                <td className="action-cell">
                  {getActionIcon(log.action)}
                  {log.action.replace(/_/g, ' ')}
                </td>
                <td className="resource-cell">{log.resource}</td>
                <td className="details-cell" title={log.details}>
                  {log.details}
                </td>
                <td className="ip-cell">{log.ipAddress}</td>
                <td className="status-cell">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(log.status) }}
                  >
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="btn btn-secondary"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <div className="page-numbers">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <button
                  key={pageNum}
                  className={`btn ${currentPage === pageNum ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => paginate(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          
          <button 
            className="btn btn-secondary"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <style jsx>{`
        .audit-log {
          max-width: 1400px;
          margin: 0 auto;
        }

        .audit-header {
          margin-bottom: 2rem;
        }

        .audit-header h2 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .audit-header p {
          color: #6c757d;
          margin: 0;
        }

        .filters-section {
          background: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          margin-bottom: 1.5rem;
        }

        .filters-row {
          display: flex;
          gap: 1rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .search-box {
          position: relative;
          flex: 1;
          min-width: 250px;
        }

        .search-box svg {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }

        .search-box input {
          width: 100%;
          padding: 8px 12px 8px 40px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .filter-group select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
          min-width: 150px;
        }

        .date-filters {
          display: flex;
          gap: 0.5rem;
        }

        .date-filters input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 14px;
        }

        .filter-actions {
          display: flex;
          gap: 0.5rem;
        }

        .filter-actions .btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 8px 16px;
          font-size: 14px;
        }

        .logs-summary {
          margin-bottom: 1rem;
          color: #6c757d;
          font-size: 0.875rem;
        }

        .logs-table-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          overflow-x: auto;
        }

        .logs-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.875rem;
        }

        .logs-table th {
          background-color: #f8f9fa;
          padding: 1rem;
          text-align: left;
          font-weight: 600;
          color: #495057;
          border-bottom: 2px solid #dee2e6;
          white-space: nowrap;
        }

        .logs-table td {
          padding: 1rem;
          border-bottom: 1px solid #dee2e6;
          vertical-align: top;
        }

        .logs-table tr:hover {
          background-color: #f8f9fa;
        }

        .timestamp-cell,
        .user-cell,
        .action-cell {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
        }

        .timestamp-cell svg,
        .user-cell svg,
        .action-cell svg {
          color: #6c757d;
          flex-shrink: 0;
        }

        .resource-cell {
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-family: monospace;
          font-size: 0.8rem;
        }

        .details-cell {
          max-width: 300px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .ip-cell {
          font-family: monospace;
          font-size: 0.8rem;
          color: #6c757d;
        }

        .status-badge {
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
        }

        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin-top: 2rem;
        }

        .page-numbers {
          display: flex;
          gap: 0.25rem;
        }

        .pagination .btn {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .filters-row {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box {
            min-width: auto;
          }

          .filter-actions {
            justify-content: center;
          }

          .logs-table-container {
            font-size: 0.75rem;
          }

          .logs-table th,
          .logs-table td {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AuditLog;