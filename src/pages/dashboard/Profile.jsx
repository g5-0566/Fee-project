import { useState } from 'react';
import { User, Mail, Phone, ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';
import Input from '../../components/Input.jsx';
import Button from '../../components/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

/**
 * Profile Page Component
 * Allows user to view and update contact details with LocalStorage persistence
 */
export function Profile() {
  const { user, updateUser, logout } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const handleSave = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setNotification({ message: 'Name cannot be blank.', type: 'danger' });
      return;
    }

    try {
      updateUser({ name, email, phone });
      setNotification({ message: 'Profile information updated successfully.', type: 'success' });
      setTimeout(() => setNotification({ message: '', type: '' }), 4000);
    } catch (err) {
      setNotification({ message: 'Failed to update profile.', type: 'danger' });
    }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar type="customer" />

      <main className="dashboard-content" role="region" aria-label="Customer Profile">
        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            My Profile & Preferences
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Manage your personal contact details and role settings.
          </p>
        </div>

        {notification.message && (
          <div className={`alert alert-${notification.type}`} role="alert">
            {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
            <span>{notification.message}</span>
          </div>
        )}

        <div className="grid grid-cols-1 grid-cols-md-3 gap-6">
          <div className="card" style={{ gridColumn: 'span 2', padding: '1.75rem' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              Personal Details
            </h2>

            <form onSubmit={handleSave}>
              <Input
                id="profile-name"
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <Input
                id="profile-email"
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                id="profile-phone"
                label="Contact Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />

              <div className="form-group">
                <label className="form-label">Role Assignment</label>
                <div style={{ padding: '0.65rem 0.85rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {user?.role || 'CUSTOMER'}
                </div>
              </div>

              <div className="flex items-center gap-3" style={{ marginTop: '1.5rem' }}>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>

          <div>
            <div className="card" style={{ padding: '1.5rem' }}>
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem'
                }}
              >
                <User size={28} />
              </div>

              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {user?.name}
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                {user?.email}
              </p>

              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                <div>Status: <strong style={{ color: 'var(--success)' }}>Active Session</strong></div>
                <div>Storage: <strong>Browser LocalStorage</strong></div>
                <div>Role: <strong>{user?.role}</strong></div>
              </div>

              <Button
                variant="secondary"
                size="sm"
                onClick={logout}
                style={{ width: '100%', marginTop: '1.25rem', color: 'var(--danger)', borderColor: 'var(--danger-border)' }}
              >
                Log Out
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Profile;
