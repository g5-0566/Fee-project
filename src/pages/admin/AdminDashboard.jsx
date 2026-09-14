import { Link } from 'react-router-dom';
import {
  Building2,
  Users,
  Activity,
  Clock,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Layers,
  ArrowRight
} from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';
import StatsCard from '../../components/StatsCard.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import Button from '../../components/Button.jsx';
import { useQueue } from '../../context/QueueContext.jsx';
import { MOCK_USERS } from '../../data/mockData.js';

/**
 * Admin Dashboard Overview
 * System-wide supervisory dashboard providing high-level metrics and health indicators
 */
export function AdminDashboard() {
  const { organisations, lastUpdated, simulationActive } = useQueue();

  const totalPeopleWaiting = organisations.reduce((sum, o) => sum + o.queue, 0);
  const totalCountersActive = organisations.reduce((sum, o) => sum + o.activeCounters, 0);
  const busiestOrg = [...organisations].sort((a, b) => b.queue - a.queue)[0];

  return (
    <div className="dashboard-shell">
      <Sidebar type="admin" />

      <main className="dashboard-content" role="region" aria-label="Admin Super-Console Overview">
        <div className="flex justify-between items-center flex-wrap gap-3" style={{ marginBottom: '1.75rem' }}>
          <div>
            <span className="badge badge-busy" style={{ marginBottom: '0.4rem' }}>
              System Administrator Portal
            </span>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Network Operations Center
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Real-time monitoring across all enrolled public & private service facilities
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link to="/admin/organisations" className="btn btn-primary btn-sm">
              <Building2 size={16} /> Manage Organisations
            </Link>
          </div>
        </div>

        {/* Global Statistics Cards */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '1.75rem'
          }}
          aria-label="Platform Wide Statistics"
        >
          <StatsCard
            icon={Building2}
            label="Total Facilities"
            value={organisations.length}
            description="Verified locations"
            variant="primary"
          />
          <StatsCard
            icon={Users}
            label="Total in Queues"
            value={totalPeopleWaiting}
            description="Across all branches"
            variant="warning"
          />
          <StatsCard
            icon={Activity}
            label="Active Counters"
            value={totalCountersActive}
            description="Service desks open"
            variant="success"
          />
          <StatsCard
            icon={ShieldCheck}
            label="Enrolled Users"
            value={MOCK_USERS.length}
            description="Active accounts"
            variant="neutral"
          />
        </section>

        {/* Real-Time Facility Queue Summary Table */}
        <section className="card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Live Facility Queue Activity
              </h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Simulation heartbeat synced at: {lastUpdated} ({simulationActive ? 'Active' : 'Paused'})
              </p>
            </div>
            <Link to="/admin/analytics" className="btn btn-outline btn-sm">
              View Analytics <ArrowRight size={14} />
            </Link>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Facility Name</th>
                  <th>Category</th>
                  <th>Waiting Count</th>
                  <th>Current Token</th>
                  <th>Est. Wait</th>
                  <th>Desks Open</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {organisations.map((org) => (
                  <tr key={org.id}>
                    <td>
                      <strong style={{ color: 'var(--text-primary)' }}>{org.name}</strong>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{org.location}</div>
                    </td>
                    <td>
                      <span className="badge badge-neutral">{org.category}</span>
                    </td>
                    <td style={{ fontWeight: 700, fontSize: '1.05rem' }}>
                      {org.queue}
                    </td>
                    <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      #{org.currentToken}
                    </td>
                    <td style={{ color: 'var(--primary)', fontWeight: 700 }}>
                      ~{org.estimatedWait} min
                    </td>
                    <td>{org.activeCounters}</td>
                    <td>
                      <StatusBadge status={org.statusInfo} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
