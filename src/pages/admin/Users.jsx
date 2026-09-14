import { useState, useMemo } from 'react';
import { Users, Search, ShieldCheck, Mail, Phone, UserCheck } from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';
import SearchBar from '../../components/SearchBar.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import { MOCK_USERS } from '../../data/mockData.js';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';

/**
 * Admin User Directory Page
 * Displays enrolled platform users, allows filtering by role and searching
 */
export function AdminUsers() {
  const [usersList] = useLocalStorage('queueless_users', MOCK_USERS);
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = useMemo(() => {
    return usersList.filter((u) => {
      const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
      const query = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !query ||
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query);

      return matchesRole && matchesQuery;
    });
  }, [usersList, roleFilter, searchQuery]);

  return (
    <div className="dashboard-shell">
      <Sidebar type="admin" />

      <main className="dashboard-content" role="region" aria-label="Admin User Directory">
        <div className="flex justify-between items-center flex-wrap gap-3" style={{ marginBottom: '1.75rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Enrolled User Directory
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              System roles, assigned permissions, and contact records
            </p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex items-center justify-between flex-wrap gap-3" style={{ marginBottom: '1.25rem' }}>
          <div className="flex items-center gap-2 flex-wrap">
            {['ALL', 'CUSTOMER', 'STAFF', 'ADMIN'].map((role) => (
              <button
                key={role}
                type="button"
                onClick={() => setRoleFilter(role)}
                className={`btn btn-sm ${roleFilter === role ? 'btn-primary' : 'btn-secondary'}`}
              >
                {role} ({role === 'ALL' ? usersList.length : usersList.filter((u) => u.role === role).length})
              </button>
            ))}
          </div>

          <div style={{ maxWidth: '300px', width: '100%' }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search user name or email..."
              size="sm"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="card" style={{ padding: '1rem' }}>
          {filteredUsers.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Email Address</th>
                    <th>Phone</th>
                    <th>Assigned Role</th>
                    <th>Account Created</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td>
                        <strong style={{ color: 'var(--text-primary)' }}>{u.name}</strong>
                      </td>
                      <td>
                        <span className="flex items-center gap-1" style={{ fontSize: '0.88rem' }}>
                          <Mail size={13} color="var(--text-muted)" /> {u.email}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {u.phone || 'N/A'}
                      </td>
                      <td>
                        <span
                          className={`badge ${
                            u.role === 'ADMIN'
                              ? 'badge-busy'
                              : u.role === 'STAFF'
                              ? 'badge-warning'
                              : 'badge-primary'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                        {u.createdAt}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title="No users found"
              description={`No account records found matching the current search parameters.`}
              actionText="Reset Filter"
              onAction={() => {
                setRoleFilter('ALL');
                setSearchQuery('');
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default AdminUsers;
