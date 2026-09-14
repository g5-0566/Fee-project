import { Link } from 'react-router-dom';
import { Clock, Search, RotateCcw, Building2, CheckCircle2 } from 'lucide-react';
import QueueCard from '../../components/QueueCard.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import Button from '../../components/Button.jsx';
import { useQueue } from '../../context/QueueContext.jsx';

/**
 * MyQueue Page Component
 * Live queue tracking dashboard for customer's generated ticket
 */
export function MyQueue() {
  const { activeTicket, cancelQueue, queueHistory, lastUpdated } = useQueue();

  return (
    <div className="dashboard-shell">
      <Sidebar type="customer" />

      <main className="dashboard-content" role="region" aria-label="My Live Queue">
        <div className="flex justify-between items-center flex-wrap gap-2" style={{ marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              My Active Queue Ticket
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Real-time progression updates synchronized every few seconds.
            </p>
          </div>

          <Link to="/search" className="btn btn-secondary btn-sm">
            <Search size={15} /> Explore Other Places
          </Link>
        </div>

        {/* Active Ticket Card */}
        {activeTicket ? (
          <div style={{ maxWidth: '640px', margin: '0 auto 2.5rem auto' }}>
            <QueueCard ticket={activeTicket} onCancel={cancelQueue} />
          </div>
        ) : (
          <div style={{ marginBottom: '2.5rem' }}>
            <EmptyState
              title="You Haven't Joined Any Queue"
              description="You do not currently hold an active digital queue token. Search for a hospital, clinic, bank or municipal office to take a token."
              icon={Clock}
              actionText="Search Organisations"
              actionLink="/search"
            />
          </div>
        )}

        {/* Past Queue History */}
        <section className="card" style={{ padding: '1.5rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
            Recent Queue Visits & Completed Tokens
          </h2>

          {queueHistory && queueHistory.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Token #</th>
                    <th>Organisation</th>
                    <th>Service</th>
                    <th>Joined At</th>
                    <th>Completed At</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {queueHistory.map((item) => (
                    <tr key={item.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                        #{item.tokenNumber}
                      </td>
                      <td style={{ fontWeight: 600 }}>{item.organisationName}</td>
                      <td>{item.service}</td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.joinedTime}</td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.completedTime || 'N/A'}</td>
                      <td>
                        <span className="badge badge-primary">
                          <CheckCircle2 size={12} /> {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              No completed queue visits logged in this session yet.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default MyQueue;
