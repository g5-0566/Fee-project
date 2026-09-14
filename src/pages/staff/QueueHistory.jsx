import { useState, useMemo } from 'react';
import { History, Search, Download, CheckCircle2 } from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';
import SearchBar from '../../components/SearchBar.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQueue } from '../../context/QueueContext.jsx';
import { MOCK_HISTORY } from '../../data/mockData.js';

/**
 * Queue History Component
 * Displays historic queue visits, duration served, and allows search filtering
 */
export function QueueHistory() {
  const { user } = useAuth();
  const { queueHistory } = useQueue();
  const [searchTerm, setSearchTerm] = useState('');

  // Combine mock seed history + current session completed tickets
  const combinedHistory = useMemo(() => {
    const sessionMapped = queueHistory.map((item) => ({
      id: `session-${item.id}`,
      tokenNumber: item.tokenNumber,
      organisationName: item.organisationName,
      service: item.service,
      duration: '7 mins',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: item.status
    }));

    return [...sessionMapped, ...MOCK_HISTORY];
  }, [queueHistory]);

  const filteredHistory = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return combinedHistory;
    return combinedHistory.filter(
      (item) =>
        item.organisationName.toLowerCase().includes(term) ||
        item.service.toLowerCase().includes(term) ||
        String(item.tokenNumber).includes(term)
    );
  }, [combinedHistory, searchTerm]);

  return (
    <div className="dashboard-shell">
      <Sidebar type="staff" />

      <main className="dashboard-content" role="region" aria-label="Completed Queue History">
        <div className="flex justify-between items-center flex-wrap gap-3" style={{ marginBottom: '1.75rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Completed Queue Logs
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Historical token turnaround times and customer throughput records
            </p>
          </div>
        </div>

        {/* Search */}
        <div style={{ maxWidth: '420px', marginBottom: '1.25rem' }}>
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search by token #, service or place..."
            size="sm"
          />
        </div>

        {/* History Table */}
        <div className="card" style={{ padding: '1rem' }}>
          {filteredHistory.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Token #</th>
                    <th>Organisation</th>
                    <th>Service Provided</th>
                    <th>Duration</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHistory.map((h) => (
                    <tr key={h.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, color: 'var(--primary)' }}>
                        #{h.tokenNumber}
                      </td>
                      <td style={{ fontWeight: 600 }}>{h.organisationName}</td>
                      <td>{h.service}</td>
                      <td>{h.duration}</td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{h.date}</td>
                      <td>
                        <span className="badge badge-low">
                          <CheckCircle2 size={12} /> {h.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title="No records found"
              description={`No historical visits match "${searchTerm}".`}
              actionText="Clear Search"
              onAction={() => setSearchTerm('')}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default QueueHistory;
