import { useState } from 'react';
import { Sliders, CheckCircle2, XCircle, User, ShieldCheck } from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';
import Button from '../../components/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQueue } from '../../context/QueueContext.jsx';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';

/**
 * Counter Management Component
 * Allows activating or deactivating service counters. Updates active count in real-time.
 */
export function Counters() {
  const { user } = useAuth();
  const { organisations, setOrganisations } = useQueue();

  const [selectedOrgId, setSelectedOrgId] = useState(() => {
    return user?.organisationId || organisations[0]?.id || 1;
  });

  const org = organisations.find((o) => o.id === selectedOrgId) || organisations[0];

  // Counter entities
  const [counters, setCounters] = useLocalStorage(`queueless_counters_${org?.id}`, () => [
    { id: 1, name: 'Counter 1 (Main Desk)', staffAssigned: 'Ramesh Patel', status: 'ACTIVE' },
    { id: 2, name: 'Counter 2 (Inquiry & Tokens)', staffAssigned: 'Sunita Sharma', status: 'ACTIVE' },
    { id: 3, name: 'Counter 3 (Express Desk)', staffAssigned: 'Karthik Nair', status: 'ACTIVE' },
    { id: 4, name: 'Counter 4 (Senior Citizens)', staffAssigned: 'Unassigned', status: 'INACTIVE' },
    { id: 5, name: 'Counter 5 (Special Services)', staffAssigned: 'Unassigned', status: 'INACTIVE' }
  ]);

  const toggleCounterStatus = (counterId) => {
    const updatedCounters = counters.map((c) => {
      if (c.id === counterId) {
        return {
          ...c,
          status: c.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE'
        };
      }
      return c;
    });

    setCounters(updatedCounters);

    // Calculate new active counters count
    const activeCount = updatedCounters.filter((c) => c.status === 'ACTIVE').length || 1;

    // Recalculate organisation waiting time and update state
    setOrganisations((prevOrgs) =>
      prevOrgs.map((item) => {
        if (item.id === org.id) {
          const estimatedWait = Math.max(1, Math.round((item.queue * item.averageServiceTime) / activeCount));
          return {
            ...item,
            activeCounters: activeCount,
            estimatedWait
          };
        }
        return item;
      })
    );
  };

  const activeCount = counters.filter((c) => c.status === 'ACTIVE').length;

  return (
    <div className="dashboard-shell">
      <Sidebar type="staff" />

      <main className="dashboard-content" role="region" aria-label="Staff Counter Controls">
        <div className="flex justify-between items-center flex-wrap gap-3" style={{ marginBottom: '1.75rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Service Counter Operations
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Facility: <strong>{org?.name}</strong> • <strong>{activeCount}</strong> of {counters.length} counters online
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="counter-org" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Facility:</label>
            <select
              id="counter-org"
              value={selectedOrgId}
              onChange={(e) => setSelectedOrgId(Number(e.target.value))}
              className="form-select"
              style={{ width: 'auto' }}
            >
              {organisations.map((o) => (
                <option key={o.id} value={o.id}>{o.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Counter Wait Time Calculation Banner */}
        <div className="alert alert-info" style={{ marginBottom: '1.5rem' }}>
          <ShieldCheck size={20} />
          <div>
            <strong>Dynamic wait-time formula active:</strong> Opening or closing a counter automatically updates the public estimated wait time for all users from <code>~{org?.estimatedWait}m</code>.
          </div>
        </div>

        {/* Counter Cards Grid */}
        <div className="grid grid-cols-1 grid-cols-sm-2 grid-cols-md-3 gap-4">
          {counters.map((c) => {
            const isActive = c.status === 'ACTIVE';
            return (
              <div
                key={c.id}
                className="card"
                style={{
                  padding: '1.25rem',
                  borderColor: isActive ? 'var(--success-border)' : 'var(--border)',
                  backgroundColor: isActive ? 'var(--bg-surface)' : 'var(--bg-subtle)'
                }}
              >
                <div className="flex justify-between items-start" style={{ marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    {c.name}
                  </h3>
                  <span className={`badge ${isActive ? 'badge-low' : 'badge-neutral'}`}>
                    {c.status}
                  </span>
                </div>

                <div className="flex items-center gap-2" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
                  <User size={15} color="var(--primary)" />
                  <span>Staff: <strong>{c.staffAssigned}</strong></span>
                </div>

                <Button
                  variant={isActive ? 'secondary' : 'primary'}
                  size="sm"
                  onClick={() => toggleCounterStatus(c.id)}
                  style={{ width: '100%' }}
                >
                  {isActive ? 'Deactivate Counter' : 'Activate Counter'}
                </Button>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

export default Counters;
