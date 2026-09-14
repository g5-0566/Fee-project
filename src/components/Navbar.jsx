import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Clock,
  Search,
  LayoutDashboard,
  Heart,
  User,
  Users,
  Sliders,
  History,
  Building2,
  BarChart3,
  LogOut,
  LogIn,
  Sun,
  Moon,
  Menu,
  X,
  Play,
  Pause
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { useQueue } from '../context/QueueContext.jsx';

/**
 * Navbar Component
 * Adaptive navigation bar that updates based on user role (Guest, Customer, Staff, Admin)
 * Includes responsive drawer menu and accessible theme toggle.
 */
export function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { simulationActive, setSimulationActive, activeTicket } = useQueue();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--primary)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Clock size={20} aria-hidden="true" />
          </div>
          <span>QueueLess</span>
          <span className="brand-badge">Academic V1</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Home
          </NavLink>
          <NavLink to="/search" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            Search Places
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
            About
          </NavLink>

          {/* Role-Specific Links */}
          {isAuthenticated && user?.role === 'CUSTOMER' && (
            <>
              <NavLink to="/dashboard" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Dashboard
              </NavLink>
              <NavLink to="/dashboard/queue" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                <span>My Queue</span>
                {activeTicket && activeTicket.status !== 'COMPLETED' && (
                  <span className="badge badge-busy pulse" style={{ fontSize: '0.65rem', padding: '0.1rem 0.4rem' }}>
                    LIVE
                  </span>
                )}
              </NavLink>
              <NavLink to="/dashboard/favourites" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Favourites
              </NavLink>
            </>
          )}

          {isAuthenticated && user?.role === 'STAFF' && (
            <>
              <NavLink to="/staff" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Staff Desk
              </NavLink>
              <NavLink to="/staff/queue" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Queue Table
              </NavLink>
              <NavLink to="/staff/counters" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Counters
              </NavLink>
              <NavLink to="/staff/history" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                History
              </NavLink>
            </>
          )}

          {isAuthenticated && user?.role === 'ADMIN' && (
            <>
              <NavLink to="/admin" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Admin Portal
              </NavLink>
              <NavLink to="/admin/organisations" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Organisations
              </NavLink>
              <NavLink to="/admin/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Users
              </NavLink>
              <NavLink to="/admin/analytics" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Analytics
              </NavLink>
            </>
          )}
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          {/* Simulation Toggle Button for Teacher Demos */}
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setSimulationActive(!simulationActive)}
            title={simulationActive ? 'Pause real-time simulation' : 'Resume real-time simulation'}
            aria-label={simulationActive ? 'Pause real-time queue simulation' : 'Resume real-time queue simulation'}
            style={{ fontSize: '0.78rem', padding: '0.35rem 0.65rem' }}
          >
            {simulationActive ? (
              <>
                <span className="status-dot status-dot-low pulse" aria-hidden="true" />
                <span className="hide-mobile">Sim: Active</span>
                <Pause size={12} aria-hidden="true" />
              </>
            ) : (
              <>
                <span className="status-dot status-dot-neutral" aria-hidden="true" />
                <span className="hide-mobile">Sim: Paused</span>
                <Play size={12} aria-hidden="true" />
              </>
            )}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            className="btn-icon"
            onClick={toggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
          </button>

          {/* Auth State Button */}
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)'
                }}
                className="hide-mobile"
              >
                {user?.name.split(' ')[0]}
              </span>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleLogout}
                title="Log out"
              >
                <LogOut size={16} aria-hidden="true" />
                <span className="hide-mobile">Logout</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary btn-sm">
              <LogIn size={16} aria-hidden="true" />
              <span>Login</span>
            </Link>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-menu" role="dialog" aria-label="Mobile Navigation">
          <NavLink to="/" end onClick={closeMenu} className="nav-link">
            Home
          </NavLink>
          <NavLink to="/search" onClick={closeMenu} className="nav-link">
            Search Places
          </NavLink>
          <NavLink to="/about" onClick={closeMenu} className="nav-link">
            About Project
          </NavLink>

          {isAuthenticated && user?.role === 'CUSTOMER' && (
            <>
              <NavLink to="/dashboard" end onClick={closeMenu} className="nav-link">
                Dashboard Overview
              </NavLink>
              <NavLink to="/dashboard/queue" onClick={closeMenu} className="nav-link">
                My Queue {activeTicket ? '(Active)' : ''}
              </NavLink>
              <NavLink to="/dashboard/favourites" onClick={closeMenu} className="nav-link">
                My Favourites
              </NavLink>
              <NavLink to="/dashboard/profile" onClick={closeMenu} className="nav-link">
                Profile
              </NavLink>
            </>
          )}

          {isAuthenticated && user?.role === 'STAFF' && (
            <>
              <NavLink to="/staff" end onClick={closeMenu} className="nav-link">
                Staff Dashboard
              </NavLink>
              <NavLink to="/staff/queue" onClick={closeMenu} className="nav-link">
                Live Queue Table
              </NavLink>
              <NavLink to="/staff/counters" onClick={closeMenu} className="nav-link">
                Counter Controls
              </NavLink>
              <NavLink to="/staff/history" onClick={closeMenu} className="nav-link">
                Queue History
              </NavLink>
            </>
          )}

          {isAuthenticated && user?.role === 'ADMIN' && (
            <>
              <NavLink to="/admin" end onClick={closeMenu} className="nav-link">
                Admin Dashboard
              </NavLink>
              <NavLink to="/admin/organisations" onClick={closeMenu} className="nav-link">
                Manage Organisations
              </NavLink>
              <NavLink to="/admin/users" onClick={closeMenu} className="nav-link">
                Manage Users
              </NavLink>
              <NavLink to="/admin/analytics" onClick={closeMenu} className="nav-link">
                Queue Analytics
              </NavLink>
            </>
          )}

          {!isAuthenticated ? (
            <div className="flex flex-col gap-2" style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
              <Link to="/login" onClick={closeMenu} className="btn btn-primary" style={{ width: '100%' }}>
                Login to Portal
              </Link>
              <Link to="/register" onClick={closeMenu} className="btn btn-secondary" style={{ width: '100%' }}>
                Register Account
              </Link>
            </div>
          ) : (
            <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)' }}>
              <button
                type="button"
                className="btn btn-secondary"
                style={{ width: '100%', color: 'var(--danger)' }}
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Log Out ({user?.email})</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
