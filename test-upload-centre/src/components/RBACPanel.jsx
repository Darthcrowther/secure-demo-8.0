import React, { useState, useEffect } from 'react';
import { Users, Shield, Edit2, Trash2, Plus, Search, Mail, Calendar, CheckCircle, XCircle } from 'lucide-react';

const RBACPanel = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [activeTab, setActiveTab] = useState('users');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const mockRoles = [
      {
        id: 1,
        name: 'Super Admin',
        description: 'Full system access',
        permissions: ['upload', 'download', 'approve', 'delete', 'audit', 'user_manage', 'role_manage', 'system_config'],
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
      }
    ];

    setRoles(mockRoles);
    setUsers(mockUsers);
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
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

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ color: '#2c3e50', marginBottom: '0.5rem' }}>User & Role Management</h2>
        <p style={{ color: '#6c757d', margin: 0 }}>Manage users, roles, and permissions</p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '2px solid #e9ecef' }}>
        <button 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            padding: '1rem 1.5rem',
            cursor: 'pointer',
            color: activeTab === 'users' ? '#007bff' : '#6c757d',
            fontSize: '0.9rem',
            fontWeight: '500',
            borderBottom: activeTab === 'users' ? '2px solid #007bff' : '2px solid transparent',
            transition: 'all 0.2s'
          }}
          onClick={() => setActiveTab('users')}
        >
          <Users size={16} />
          Users ({users.length})
        </button>
        <button 
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            padding: '1rem 1.5rem',
            cursor: 'pointer',
            color: activeTab === 'roles' ? '#007bff' : '#6c757d',
            fontSize: '0.9rem',
            fontWeight: '500',
            borderBottom: activeTab === 'roles' ? '2px solid #007bff' : '2px solid transparent',
            transition: 'all 0.2s'
          }}
          onClick={() => setActiveTab('roles')}
        >
          <Shield size={16} />
          Roles ({roles.length})
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem' }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6c757d' }} />
          <input
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 40px', border: '1px solid #ddd', borderRadius: '6px', fontSize: '14px' }}
          />
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} />
          Add {activeTab === 'users' ? 'User' : 'Role'}
        </button>
      </div>

      {activeTab === 'users' && (
        <div className="card">
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '0.875rem'
                      }}>
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div style={{ fontWeight: '500', color: '#2c3e50' }}>{user.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6c757d', fontSize: '0.875rem' }}>
                          <Mail size={12} />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ background: '#e3f2fd', color: '#1976d2', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem', fontWeight: '500' }}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.department}</td>
                  <td>
                    <span style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      textTransform: 'capitalize',
                      background: user.status === 'active' ? '#d4edda' : '#f8d7da',
                      color: user.status === 'active' ? '#155724' : '#721c24'
                    }}>
                      {user.status === 'active' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                      {user.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#6c757d', fontSize: '0.875rem' }}>
                      <Calendar size={12} />
                      {formatLastLogin(user.lastLogin)}
                    </div>
                  </td>
                  <td>{formatDate(user.createdDate)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button style={{
                        background: 'none',
                        border: '1px solid #dee2e6',
                        borderRadius: '4px',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        color: '#6c757d',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Edit2 size={14} />
                      </button>
                      <button style={{
                        background: 'none',
                        border: '1px solid #dee2e6',
                        borderRadius: '4px',
                        padding: '0.5rem',
                        cursor: 'pointer',
                        color: '#6c757d',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'roles' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2rem' }}>
          {filteredRoles.map(role => (
            <div key={role.id} className="card" style={{ transition: 'box-shadow 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50', fontSize: '1.25rem' }}>{role.name}</h3>
                  <p style={{ margin: 0, color: '#6c757d', fontSize: '0.875rem', lineHeight: 1.4 }}>{role.description}</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button style={{
                    background: 'none',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    color: '#6c757d',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Edit2 size={16} />
                  </button>
                  <button style={{
                    background: 'none',
                    border: '1px solid #dee2e6',
                    borderRadius: '4px',
                    padding: '0.5rem',
                    cursor: 'pointer',
                    color: '#6c757d',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e9ecef' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6c757d', fontSize: '0.875rem' }}>
                  <Users size={16} />
                  <span>{role.userCount} users</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#6c757d', fontSize: '0.875rem' }}>
                  <Shield size={16} />
                  <span>{role.permissions.length} permissions</span>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <h4 style={{ margin: '0 0 1rem 0', color: '#495057', fontSize: '1rem' }}>Permissions</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {role.permissions.map(permission => (
                    <span key={permission} style={{
                      background: '#f8f9fa',
                      color: '#495057',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      border: '1px solid #dee2e6'
                    }}>
                      {permission.replace(/_/g, ' ')}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ paddingTop: '1rem', borderTop: '1px solid #e9ecef' }}>
                <span style={{ color: '#6c757d', fontSize: '0.875rem' }}>
                  Created: {formatDate(role.createdDate)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RBACPanel;