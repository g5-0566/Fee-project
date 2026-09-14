import { useState } from 'react';
import {
  Users,
  Clock,
  CheckCircle2,
  Play,
  SkipForward,
  RotateCcw,
  Sliders,
  ShieldCheck,
  Building2,
  AlertCircle
} from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';
import StatsCard from '../../components/StatsCard.jsx';
import Button from '../../components/Button.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQueue } from '../../context/QueueContext.jsx';

/**
 * Staff Dashboard Overview
 * Control panel for desk staff to advance queue tokens, manage wait lines, and monitor speed
 */
export function StaffDashboard() {
  const { user } = useAuth();
  const {
    organisations,
    advanceNextToken,
    revertPreviousToken,
    advanceQueueSimulation,
    lastUpdated
  } = useQueue();

  // Pick assigned organisation (defaults to ABC Diagnostic Centre or first org)
  const [selectedOrgId, setSelectedOrgId] = useState(() => {
    return user?.organisationId || organisations[0]?.id || 1;
  });

  const org = organisations.find((o) => o.id === selectedOrgId) || organisations[0];

  const handleNext = () => {
    if (org) advanceNextToken(org.id);
  };

  const handlePrev = () => {
    if (org) revertPreviousToken(org.id);
  };

  const handleSimulateBatch = () => {
    advanceQueueSimulation();
  };

  return (
    <div className="dashboard-shell">
      <Sidebar type="staff" />

      <main className="dashboard-content" role="region" aria-label="Staff Dashboard Overview">
        {/* Header with facility switcher */}
        <div className="flex justify-between items-center flex-wrap gap-3" style={{ marginBottom: '1.75rem' }}>
          <div>
            <span className="badge badge-warning" style={{ marginBottom: '0.4rem' }}>
              Service Staff Desk
            </span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Queue Operator Console
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Logged in as <strong>{user?.name}</strong> • Facility: <strong>{org?.name}</strong>
            </p>
          </div>

          {/* Org switch selector for multi-branch demonstration */}
          <div className="flex items-center gap-2">
            <label htmlFor="staff-org-select" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Assigned Facility:
            </label>
            <select
              id="staff-org-select"
              value={selectedOrgId}
              onChange={(e) => setSelectedOrgId(Number(e.target.value))}
              className="form-select"
              style={{ width: 'auto', minWidth: '200px' }}
            >
              {organisations.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Live Operator Metric Cards */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '1.75rem'
          }}
          aria-label="Key Performance Indicators"
        >
          <StatsCard
            icon={Clock}
            label="Current Serving Token"
            value={`#${org?.currentToken}`}
            description="Active at counter"
            variant="primary"
          />
          <StatsCard
            icon={Users}
            label="Waiting in Queue"
            value={org?.queue}
            description="Customers in line"
            variant={org?.queue > 20 ? 'danger' : 'warning'}
          />
          <StatsCard
            icon={CheckCircle2}
            label="Est. Customer Wait"
            value={`~${org?.estimatedWait}m`}
            description={`${org?.averageServiceTime}m avg service time`}
            variant="warning"
          />
          <StatsCard
            icon={Sliders}
            label="Active Counters"
            value={org?.activeCounters}
            description="Desks open"
            variant="success"
          />
        </section>

        {/* Hero Token Control Console */}
        <section
          className="card"
          style={{
            padding: '2.25rem',
            marginBottom: '2rem',
            textAlign: 'center',
            backgroundColor: 'var(--bg-surface)'
          }}
        >
          <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              Desk Operator Controls
            </span>
            <StatusBadge status={org?.statusInfo} />
          </div>

          <div style={{ margin: '1rem 0' }}>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
              Now Serving
            </div>
            <div
              style={{
                fontSize: 'clamp(3.5rem, 8vw, 5rem)',
                fontWeight: 900,
                color: 'var(--primary)',
                lineHeight: 1.1,
                fontFamily: 'var(--font-mono)'
              }}
            >
              #{org?.currentToken}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginTop: '0.5rem' }}>
              <strong>{org?.queue}</strong> people waiting in queue line
            </div>
          </div>

          {/* Big Action Buttons */}
          <div
            className="flex items-center justify-center gap-3 flex-wrap"
            style={{ marginTop: '2rem' }}
          >
            <Button
              variant="secondary"
              size="lg"
              onClick={handlePrev}
              disabled={org?.currentToken <= 1}
              icon={RotateCcw}
              style={{ minWidth: '150px' }}
            >
              Call Previous
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={handleNext}
              disabled={org?.queue <= 0}
              icon={SkipForward}
              style={{ minWidth: '180px' }}
            >
              Call Next Token
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleSimulateBatch}
              icon={Play}
              title="Advances simulated queue step for testing"
            >
              Step Sim Cycle
            </Button>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1.25rem' }}>
            Calling next customer decrements waiting count by 1 and increments token number by 1. Real-time changes sync instantly to customers.
          </p>
        </section>

        {/* Available Services at this Counter */}
        <section className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Active Services at {org?.name}
          </h2>
          <div className="flex gap-2 flex-wrap">
            {org?.services?.map((s) => (
              <span key={s} className="badge badge-neutral" style={{ fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}>
                {s} (~{org.averageServiceTime} mins)
              </span>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default StaffDashboard;
