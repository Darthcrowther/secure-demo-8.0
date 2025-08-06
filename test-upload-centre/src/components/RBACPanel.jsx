import React, { useState, useEffect } from 'react';
import { Users, Shield, Edit2, Trash2, Plus, Search, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';

const RBACPanel = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingRole, setEditingRole] = useState(null);

  // Mock data initialization
  useEffect(() => {
    const mockPermissions = [
      { id: 'upload', name: 'Upload Files', description: 'Can upload files to the system' },
      { id: 'download', name: 'Download Files', description: 'Can download approved files' },
      { id: 'approve', name: 'Approve Files', description: 'Can approve/reject uploaded files' },
      { id: 'delete', name: 'Delete Files', description: 'Can delete files from the system' },
      { id: 'audit', name: 'View Audit Logs', description: 'Can view system audit logs' },
      { id: 'user_manage', name: 'Manage Users', description: 'Can create, edit, and delete users' },
      { id: 'role_manage', name: 'Manage Roles', description: 'Can create, edit, and delete roles' },
      { id: 'system_config', name: 'System Configuration', description: 'Can modify system settings' }
    ];

    const mockRoles = [
      {
        id: 1,
        name: 'Super Admin',
        description: 'Full system access',
        permissions: mockPermissions.map(p => p.id),
        userCount: 2,
        createdDate: '2024-01-01'
      },
      {
        id: 2,
        name: 'Admin',
        description: 'Administrative access with file management',
        permissions: ['upload', 'download', 'approve', 'delete', 'audit', 'user_manage'],
        userCount: 5,
        createdDate: '2024-01-01'
      },
      {
        id: 3,
        name: 'Moderator',
        description: 'Can approve and manage files',
        permissions: ['upload', 'download', 'approve', 'audit'],
        userCount: 8,
        createdDate: '2024-01-01'
      },
      {
        id: 4,
        name: 'User',
        description: 'Standard user with upload and download access',
        permissions: ['upload', 'download'],
        userCount: 25,
        createdDate: '2024-01-01'
      },
      {
        id: 5,
        name: 'Viewer',
        description: 'Read-only access to approved files',
        permissions: ['download'],
        userCount: 15,
        createdDate: '2024-01-01'
      }
    ];

    const mockUsers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@company.com',
        role: 'Super Admin',
        roleId: 1,
        status: 'active',
        lastLogin: '2024-01-15T10:30:00Z',
        createdDate: '2024-01-01',
        department: 'IT'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@company.com',
        role: 'Admin',
        roleId: 2,
        status: 'active',
        lastLogin: '2024-01-15T09:45:00Z',
        createdDate: '2024-01-02',
        department: 'Operations'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@company.com',
        role: 'Moderator',
        roleId: 3,
        status: 'active',
        lastLogin: '2024-01-14T16:20:00Z',
        createdDate: '2024-01-03',
        department: 'Quality Assurance'
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@company.com',
        role: 'User',
        roleId: 4,
        status: 'active',
        lastLogin: '2024-01-15T08:15:00Z',
        createdDate: '2024-01-05',
        department: 'Marketing'
      },
      {
        id: 5,
        name: 'Bob Davis',
        email: 'bob.davis@company.com',
        role: 'User',
        roleId: 4,
        status: 'inactive',
        lastLogin: '2024-01-10T14:30:00Z',
        createdDate: '2024-01-08',
        department: 'Sales'
      }
    ];

    setPermissions(mockPermissions);
    setRoles(mockRoles);
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user) => {
    setEditingUser(user);
    setShowUserModal(true);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setShowRoleModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(u => u.id !== userId));
    }
  };

  const handleDeleteRole = (roleId) => {
    const role = roles.find(r => r.id === roleId);
    if (role.userCount > 0) {
      alert('Cannot delete role that is assigned to users.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(r => r.id !== roleId));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: '2-digit'
    });
  };

  const formatLastLogin = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return formatDate(dateString);
  };

  const UserModal = () => (
    <div className="modal-overlay" onClick={() => setShowUserModal(false)}>
      <div className="modal user-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
          <button className="close-btn" onClick={() => setShowUserModal(false)}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Name *</label>
            <input type="text" className="form-control" defaultValue={editingUser?.name || ''} />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" className="form-control" defaultValue={editingUser?.email || ''} />
          </div>
          <div className="form-group">
            <label>Department</label>
            <input type="text" className="form-control" defaultValue={editingUser?.department || ''} />
          </div>
          <div className="form-group">
            <label>Role *</label>
            <select className="form-control" defaultValue={editingUser?.roleId || ''}>
              <option value="">Select a role</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select className="form-control" defaultValue={editingUser?.status || 'active'}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowUserModal(false)}>
            Cancel
          </button>
          <button className="btn btn-primary">
            {editingUser ? 'Update User' : 'Create User'}
          </button>
        </div>
      </div>
    </div>
  );

  const RoleModal = () => (
    <div className="modal-overlay" onClick={() => setShowRoleModal(false)}>
      <div className="modal role-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{editingRole ? 'Edit Role' : 'Create New Role'}</h3>
          <button className="close-btn" onClick={() => setShowRoleModal(false)}>
            ×
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Role Name *</label>
            <input type="text" className="form-control" defaultValue={editingRole?.name || ''} />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="form-control" rows="3" defaultValue={editingRole?.description || ''} />
          </div>
          <div className="form-group">
            <label>Permissions</label>
            <div className="permissions-grid">
              {permissions.map(permission => (
                <div key={permission.id} className="permission-item">
                  <label className="checkbox-label">
                    <input 
                      type="checkbox" 
                      defaultChecked={editingRole?.permissions.includes(permission.id)}
                    />
                    <span className="checkmark"></span>
                    <div className="permission-info">
                      <span className="permission-name">{permission.name}</span>
                      <span className="permission-desc">{permission.description}</span>
                    </div>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowRoleModal(false)}>
            Cancel
          </button>
          <button className="btn btn-primary">
            {editingRole ? 'Update Role' : 'Create Role'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="rbac-panel">
      <div className="rbac-header">
        <h2>User & Role Management</h2>
        <p>Manage users, roles, and permissions</p>
      </div>

      <div className="rbac-tabs">
        <button 
          className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
          onClick={() => setActiveTab('users')}
        >
          <Users size={16} />
          Users ({users.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'roles' ? 'active' : ''}`}
          onClick={() => setActiveTab('roles')}
        >
          <Shield size={16} />
          Roles ({roles.length})
        </button>
      </div>

      <div className="rbac-controls">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            if (activeTab === 'users') {
              setEditingUser(null);
              setShowUserModal(true);
            } else {
              setEditingRole(null);
              setShowRoleModal(true);
            }
          }}
        >
          <Plus size={16} />
          Add {activeTab === 'users' ? 'User' : 'Role'}
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="users-section">
          <div className="users-table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>
                      <div className="user-info">
                        <div className="user-avatar">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="user-details">
                          <span className="user-name">{user.name}</span>
                          <span className="user-email">
                            <Mail size={12} />
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="role-badge">
                        {user.role}
                      </span>
                    </td>
                    <td>{user.department}</td>
                    <td>
                      <span className={`status-badge ${user.status}`}>
                        {user.status === 'active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                        {user.status}
                      </span>
                    </td>
                    <td>
                      <span className="last-login">
                        <Calendar size={12} />
                        {formatLastLogin(user.lastLogin)}
                      </span>
                    </td>
                    <td>{formatDate(user.createdDate)}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn-icon"
                          onClick={() => handleEditUser(user)}
                          title="Edit User"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button 
                          className="btn-icon btn-danger"
                          onClick={() => handleDeleteUser(user.id)}
                          title="Delete User"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'roles' && (
        <div className="roles-section">
          <div className="roles-grid">
            {filteredRoles.map(role => (
              <div key={role.id} className="role-card">
                <div className="role-header">
                  <div className="role-info">
                    <h3>{role.name}</h3>
                    <p>{role.description}</p>
                  </div>
                  <div className="role-actions">
                    <button 
                      className="btn-icon"
                      onClick={() => handleEditRole(role)}
                      title="Edit Role"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      className="btn-icon btn-danger"
                      onClick={() => handleDeleteRole(role.id)}
                      title="Delete Role"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="role-stats">
                  <div className="stat">
                    <Users size={16} />
                    <span>{role.userCount} users</span>
                  </div>
                  <div className="stat">
                    <Shield size={16} />
                    <span>{role.permissions.length} permissions</span>
                  </div>
                </div>

                <div className="role-permissions">
                  <h4>Permissions</h4>
                  <div className="permissions-list">
                    {role.permissions.map(permissionId => {
                      const permission = permissions.find(p => p.id === permissionId);
                      return (
                        <span key={permissionId} className="permission-tag">
                          {permission?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>

                <div className="role-footer">
                  <span className="created-date">
                    Created: {formatDate(role.createdDate)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showUserModal && <UserModal />}
      {showRoleModal && <RoleModal />}

      <style jsx>{`
        .rbac-panel {
          max-width: 1400px;
          margin: 0 auto;
        }

        .rbac-header {
          margin-bottom: 2rem;
        }

        .rbac-header h2 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }

        .rbac-header p {
          color: #6c757d;
          margin: 0;
        }

        .rbac-tabs {
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

        .rbac-controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          gap: 1rem;
        }

        .search-box {
          position: relative;
          flex: 1;
          max-width: 400px;
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
          padding: 10px 12px 10px 40px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
        }

        .users-table-container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          overflow-x: auto;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        .user-details {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .user-name {
          font-weight: 500;
          color: #2c3e50;
        }

        .user-email {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #6c757d;
          font-size: 0.875rem;
        }

        .role-badge {
          background: #e3f2fd;
          color: #1976d2;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .status-badge {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: capitalize;
        }

        .status-badge.active {
          background: #d4edda;
          color: #155724;
        }

        .status-badge.inactive {
          background: #f8d7da;
          color: #721c24;
        }

        .last-login {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          color: #6c757d;
          font-size: 0.875rem;
        }

        .action-buttons {
          display: flex;
          gap: 0.5rem;
        }

        .btn-icon {
          background: none;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          padding: 0.5rem;
          cursor: pointer;
          color: #6c757d;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .btn-icon:hover {
          background: #f8f9fa;
          color: #495057;
        }

        .btn-icon.btn-danger:hover {
          background: #f5c6cb;
          color: #721c24;
          border-color: #f1aeb5;
        }

        .roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
          gap: 2rem;
        }

        .role-card {
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          padding: 1.5rem;
          transition: box-shadow 0.2s;
        }

        .role-card:hover {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .role-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .role-info h3 {
          margin: 0 0 0.5rem 0;
          color: #2c3e50;
          font-size: 1.25rem;
        }

        .role-info p {
          margin: 0;
          color: #6c757d;
          font-size: 0.875rem;
          line-height: 1.4;
        }

        .role-actions {
          display: flex;
          gap: 0.5rem;
        }

        .role-stats {
          display: flex;
          gap: 2rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e9ecef;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #6c757d;
          font-size: 0.875rem;
        }

        .role-permissions h4 {
          margin: 0 0 1rem 0;
          color: #495057;
          font-size: 1rem;
        }

        .permissions-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .permission-tag {
          background: #f8f9fa;
          color: #495057;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
          font-size: 0.75rem;
          border: 1px solid #dee2e6;
        }

        .role-footer {
          padding-top: 1rem;
          border-top: 1px solid #e9ecef;
        }

        .created-date {
          color: #6c757d;
          font-size: 0.875rem;
        }

        .user-modal,
        .role-modal {
          max-width: 500px;
          width: 90%;
        }

        .role-modal {
          max-width: 600px;
        }

        .permissions-grid {
          display: grid;
          gap: 1rem;
          max-height: 300px;
          overflow-y: auto;
          padding: 1rem;
          border: 1px solid #dee2e6;
          border-radius: 6px;
          background: #f8f9fa;
        }

        .permission-item {
          background: white;
          border-radius: 6px;
          padding: 1rem;
          border: 1px solid #e9ecef;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          cursor: pointer;
        }

        .checkbox-label input[type="checkbox"] {
          margin: 0;
        }

        .permission-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .permission-name {
          font-weight: 500;
          color: #2c3e50;
        }

        .permission-desc {
          font-size: 0.875rem;
          color: #6c757d;
          line-height: 1.3;
        }

        @media (max-width: 768px) {
          .rbac-controls {
            flex-direction: column;
            align-items: stretch;
          }

          .search-box {
            max-width: none;
          }

          .roles-grid {
            grid-template-columns: 1fr;
          }

          .role-stats {
            flex-direction: column;
            gap: 1rem;
          }

          .permissions-grid {
            max-height: 250px;
          }
        }
      `}</style>
    </div>
  );
};

export default RBACPanel;