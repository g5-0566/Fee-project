import { Link } from 'react-router-dom';
import { Clock, ShieldCheck, Heart } from 'lucide-react';

/**
 * Footer Component
 * Accessible semantic footer with project attribution, quick links, and academic disclaimer
 */
export function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-grid">
        {/* Brand & Purpose */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2" style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>
            <div
              style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--primary)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Clock size={16} aria-hidden="true" />
            </div>
            <span>QueueLess</span>
          </div>

          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '340px' }}>
            <strong>"Know the Queue Before You Go"</strong> — A modern queue-management web application allowing citizens and customers to check live crowd status, estimated waiting times, and active counters before travelling.
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.78rem',
              padding: '0.35rem 0.65rem',
              backgroundColor: 'var(--bg-subtle)',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border)',
              width: 'fit-content'
            }}
          >
            <ShieldCheck size={14} color="var(--success)" />
            <span>Academic CSE Project • 2nd Year Curriculum</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Quick Navigation
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
            <li><Link to="/" style={{ color: 'var(--text-secondary)' }}>Home Overview</Link></li>
            <li><Link to="/search" style={{ color: 'var(--text-secondary)' }}>Live Queue Search</Link></li>
            <li><Link to="/about" style={{ color: 'var(--text-secondary)' }}>About & Architecture</Link></li>
            <li><Link to="/login" style={{ color: 'var(--text-secondary)' }}>Role Login Portal</Link></li>
            <li><Link to="/register" style={{ color: 'var(--text-secondary)' }}>Register Account</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Popular Sectors
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.88rem' }}>
            <li><Link to="/search?category=Hospital" style={{ color: 'var(--text-secondary)' }}>General Hospitals</Link></li>
            <li><Link to="/search?category=Diagnostic" style={{ color: 'var(--text-secondary)' }}>Diagnostic Labs</Link></li>
            <li><Link to="/search?category=Bank" style={{ color: 'var(--text-secondary)' }}>Commercial Banks</Link></li>
            <li><Link to="/search?category=Government" style={{ color: 'var(--text-secondary)' }}>RTO & Passport Offices</Link></li>
            <li><Link to="/search?category=College" style={{ color: 'var(--text-secondary)' }}>College Registrar</Link></li>
          </ul>
        </div>

        {/* Technology & Simulation Note */}
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Architecture Note
          </h4>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            This Academic V1 utilizes an in-browser frontend real-time simulation powered by React Hooks (<code>useState</code>, <code>useEffect</code>, <code>setInterval</code>), LocalStorage persistence, and standard CSS3.
          </p>
          <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Future-proof schema structured for V2 REST API and V3 MySQL relational models.
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          &copy; {new Date().getFullYear()} QueueLess. Built for Computer Science Engineering Academic Evaluation.
        </div>
        <div className="flex items-center gap-1">
          <span>Crafted with</span>
          <Heart size={14} color="var(--danger)" fill="var(--danger)" aria-hidden="true" />
          <span>using React, ES6+ & pure CSS3</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
