import { Link } from 'react-router-dom';
import { Home, Search, AlertTriangle } from 'lucide-react';
import Button from '../components/Button.jsx';

/**
 * NotFound (404) Page Component
 * Professional fallback screen when a route cannot be found
 */
export function NotFound() {
  return (
    <div
      className="container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
        padding: '3rem 1rem'
      }}
    >
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          backgroundColor: 'var(--warning-light)',
          color: 'var(--warning)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}
      >
        <AlertTriangle size={36} aria-hidden="true" />
      </div>

      <span
        style={{
          fontSize: '4.5rem',
          fontWeight: 900,
          color: 'var(--primary)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          fontFamily: 'var(--font-mono)'
        }}
      >
        404
      </span>

      <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: '0.75rem 0' }}>
        Page Not Found
      </h1>

      <p style={{ color: 'var(--text-secondary)', maxWidth: '460px', marginBottom: '2rem', fontSize: '1rem' }}>
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>

      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Link to="/" className="btn btn-primary btn-lg" style={{ gap: '0.5rem' }}>
          <Home size={18} /> Back to Home
        </Link>
        <Link to="/search" className="btn btn-secondary btn-lg" style={{ gap: '0.5rem' }}>
          <Search size={18} /> Search Queues
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
