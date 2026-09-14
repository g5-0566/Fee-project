import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogIn, User, Shield, Briefcase, AlertCircle, CheckCircle2 } from 'lucide-react';
import Input from '../components/Input.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Login Page Component
 * Demonstrates simulated frontend authentication with role-based redirects and one-click demo credentials
 */
export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect path if arrived from protected route, or default role route
  const from = location.state?.from?.pathname;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please fill in both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      const loggedUser = await login(email, password);

      // Route based on role
      if (from) {
        navigate(from, { replace: true });
      } else if (loggedUser.role === 'STAFF') {
        navigate('/staff', { replace: true });
      } else if (loggedUser.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  // Quick fill helper for teachers & evaluators
  const fillCredentials = (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError('');
  };

  return (
    <div style={{ maxWidth: '480px', margin: '2rem auto', padding: '0 1rem' }}>
      <div className="card" style={{ padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 0.75rem auto'
            }}
          >
            <LogIn size={24} aria-hidden="true" />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Sign In to QueueLess
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
            Choose a demo account or enter your credentials
          </p>
        </div>

        {error && (
          <div className="alert alert-danger" role="alert">
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Input
            id="login-email"
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. user@example.com"
            required
            autoFocus
          />

          <Input
            id="login-password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password (e.g. 123456)"
            required
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={loading}
            style={{ width: '100%', marginTop: '0.75rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </Button>
        </form>

        {/* Demo Accounts Quick-Fill Section */}
        <div
          style={{
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border)'
          }}
        >
          <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.75rem', textAlign: 'center' }}>
            Instant Demo Logins (Click to Fill)
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              className="btn btn-secondary btn-sm flex items-center justify-between"
              onClick={() => fillCredentials('user@example.com', '123456')}
            >
              <span className="flex items-center gap-2">
                <User size={15} color="var(--primary)" />
                <strong>Customer Demo</strong> (user@example.com)
              </span>
              <span className="badge badge-primary">Customer</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm flex items-center justify-between"
              onClick={() => fillCredentials('staff@example.com', '123456')}
            >
              <span className="flex items-center gap-2">
                <Briefcase size={15} color="var(--warning)" />
                <strong>Staff Demo</strong> (staff@example.com)
              </span>
              <span className="badge badge-moderate">Staff</span>
            </button>

            <button
              type="button"
              className="btn btn-secondary btn-sm flex items-center justify-between"
              onClick={() => fillCredentials('admin@example.com', '123456')}
            >
              <span className="flex items-center gap-2">
                <Shield size={15} color="var(--danger)" />
                <strong>Admin Demo</strong> (admin@example.com)
              </span>
              <span className="badge badge-busy">Admin</span>
            </button>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
          Don't have an account yet?{' '}
          <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 700 }}>
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
