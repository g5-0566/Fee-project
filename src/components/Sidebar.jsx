import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Clock,
  Heart,
  User,
  Users,
  Building2,
  BarChart3,
  Sliders,
  History,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useQueue } from '../context/QueueContext.jsx';

/**
 * Sidebar Component
 * Modular navigation sidebar for Customer, Staff, and Admin dashboards
 */
export function Sidebar({ type = 'customer' }) {
  const { user } = useAuth();
  const { activeTicket, favourites } = useQueue();

  const customerLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
    {
      to: '/dashboard/queue',
      label: 'My Queue',
      icon: Clock,
      badge: activeTicket && activeTicket.status !== 'COMPLETED' ? 'LIVE' : null
    },
    {
      to: '/dashboard/favourites',
      label: 'Favourites',
      icon: Heart,
      count: favourites.length
    },
    { to: '/dashboard/profile', label: 'My Profile', icon: User }
  ];

  const staffLinks = [
    { to: '/staff', label: 'Staff Overview', icon: LayoutDashboard, exact: true },
    { to: '/staff/queue', label: 'Live Queue Table', icon: Users },
    { to: '/staff/counters', label: 'Counter Controls', icon: Sliders },
    { to: '/staff/history', label: 'Queue History', icon: History }
  ];

  const adminLinks = [
    { to: '/admin', label: 'Admin Overview', icon: LayoutDashboard, exact: true },
    { to: '/admin/organisations', label: 'Organisations', icon: Building2 },
    { to: '/admin/users', label: 'User Directory', icon: Users },
    { to: '/admin/analytics', label: 'Analytics & Trends', icon: BarChart3 }
  ];

  const links =
    type === 'admin'
      ? adminLinks
      : type === 'staff'
      ? staffLinks
      : customerLinks;

  const title =
    type === 'admin'
      ? 'Admin Portal'
      : type === 'staff'
      ? 'Staff Console'
      : 'Customer Portal';

  return (
    <aside className="sidebar" aria-label={`${title} navigation`}>
      <div style={{ marginBottom: '1.25rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
          {title}
        </div>
        <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
          {user?.name || 'Guest User'}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {user?.role || 'CUSTOMER'}
        </div>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `nav-link flex items-center justify-between ${isActive ? 'active' : ''}`
              }
              style={{ width: '100%' }}
            >
              <span className="flex items-center gap-2">
                <Icon size={18} aria-hidden="true" />
                <span>{item.label}</span>
              </span>

              {item.badge && (
                <span
                  className="badge badge-busy pulse"
                  style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}
                >
                  {item.badge}
                </span>
              )}

              {item.count !== undefined && item.count > 0 && (
                <span
                  className="badge badge-neutral"
                  style={{ fontSize: '0.7rem', padding: '0.1rem 0.45rem' }}
                >
                  {item.count}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
