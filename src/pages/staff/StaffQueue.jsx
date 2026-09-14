import { useState, useMemo } from 'react';
import { Users, Filter, CheckCircle2, Play, XCircle, Clock } from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';
import Button from '../../components/Button.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQueue } from '../../context/QueueContext.jsx';
import { useLocalStorage } from '../../hooks/useLocalStorage.js';

/**
 * Staff Queue Management Table
 * Displays list of tickets with statuses and action buttons (Serve, Complete, Skip)
 */
export function StaffQueue() {
  const { user } = useAuth();
  const { organisations } = useQueue();

  const [selectedOrgId, setSelectedOrgId] = useState(() => {
    return user?.organisationId || organisations[0]?.id || 1;
  });

  const org = organisations.find((o) => o.id === selectedOrgId) || organisations[0];

  // Store queue items in local storage for this org
  const [queueItems, setQueueItems] = useLocalStorage(`queueless_staff_tokens_${org?.id}`, () => [
    { id: 1, tokenNumber: org?.currentToken || 101, customerName: 'Rohan Sharma', service: org?.services?.[0] || 'Consultation', joinedTime: '10:15 AM', status: 'SERVING' },
    { id: 2, tokenNumber: (org?.currentToken || 101) + 1, customerName: 'Priya Patel', service: org?.services?.[1] || org?.services?.[0], joinedTime: '10:18 AM', status: 'WAITING' },
    { id: 3, tokenNumber: (org?.currentToken || 101) + 2, customerName: 'Amit Verma', service: org?.services?.[0], joinedTime: '10:22 AM', status: 'WAITING' },
    { id: 4, tokenNumber: (org?.currentToken || 101) + 3, customerName: 'Sunita Rao', service: org?.services?.[0], joinedTime: '10:28 AM', status: 'WAITING' },
    { id: 5, tokenNumber: (org?.currentToken || 101) + 4, customerName: 'Kiran Reddy', service: org?.services?.[1] || 'General', joinedTime: '10:32 AM', status: 'WAITING' },
    { id: 6, tokenNumber: (org?.currentToken || 101) - 1, customerName: 'Anil Kumar', service: org?.services?.[0], joinedTime: '09:55 AM', status: 'COMPLETED' },
    { id: 7, tokenNumber: (org?.currentToken || 101) - 2, customerName: 'Deepa Shah', service: org?.services?.[0], joinedTime: '09:40 AM', status: 'COMPLETED' }
  ]);

  const [statusFilter, setStatusFilter] = useState('ALL');

  // Actions
  const updateTicketStatus = (ticketId, newStatus) => {
    setQueueItems((prev) =>
      prev.map((item) => (item.id === ticketId ? { ...item, status: newStatus } : item))
    );
  };

  const handleServe = (id) => updateTicketStatus(id, 'SERVING');
  const handleComplete = (id) => updateTicketStatus(id, 'COMPLETED');
  const handleSkip = (id) => updateTicketStatus(id, 'CANCELLED');

  // Filtered tokens
  const filteredItems = useMemo(() => {
    if (statusFilter === 'ALL') return queueItems;
    return queueItems.filter((item) => item.status === statusFilter);
  }, [queueItems, statusFilter]);

  return (
    <div className="dashboard-shell">
      <Sidebar type="staff" />

      <main className="dashboard-content" role="region" aria-label="Staff Queue Management Table">
        <div className="flex justify-between items-center flex-wrap gap-3" style={{ marginBottom: '1.75rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Queue Ticket Management
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Facility: <strong>{org?.name}</strong> • Real-time counter ticket status
            </p>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="staff-filter-org" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Facility:</label>
            <select
              id="staff-filter-org"
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

        {/* Filter Pills */}
        <div className="flex items-center gap-2 flex-wrap" style={{ marginBottom: '1.25rem' }}>
          {['ALL', 'WAITING', 'SERVING', 'COMPLETED', 'CANCELLED'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`btn btn-sm ${statusFilter === st ? 'btn-primary' : 'btn-secondary'}`}
            >
              {st} ({st === 'ALL' ? queueItems.length : queueItems.filter((q) => q.status === st).length})
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="card" style={{ padding: '1rem' }}>
          {filteredItems.length > 0 ? (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Token #</th>
                    <th>Customer Name</th>
                    <th>Service</th>
                    <th>Joined Time</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredItems.map((ticket) => (
                    <tr key={ticket.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1.05rem', color: 'var(--primary)' }}>
                        #{ticket.tokenNumber}
                      </td>
                      <td style={{ fontWeight: 600 }}>{ticket.customerName}</td>
                      <td>{ticket.service}</td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{ticket.joinedTime}</td>
                      <td>
                        <span
                          className={`badge ${
                            ticket.status === 'SERVING'
                              ? 'badge-primary'
                              : ticket.status === 'WAITING'
                              ? 'badge-warning'
                              : ticket.status === 'COMPLETED'
                              ? 'badge-low'
                              : 'badge-busy'
                          }`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="flex items-center justify-end gap-1">
                          {ticket.status === 'WAITING' && (
                            <Button
                              variant="primary"
                              size="sm"
                              onClick={() => handleServe(ticket.id)}
                            >
                              Serve
                            </Button>
                          )}
                          {ticket.status === 'SERVING' && (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleComplete(ticket.id)}
                            >
                              Complete
                            </Button>
                          )}
                          {ticket.status !== 'COMPLETED' && ticket.status !== 'CANCELLED' && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => handleSkip(ticket.id)}
                              style={{ color: 'var(--danger)' }}
                            >
                              Skip
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title={`No ${statusFilter.toLowerCase()} tickets`}
              description={`There are currently no tickets matching "${statusFilter}".`}
              actionText="Show All"
              onAction={() => setStatusFilter('ALL')}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default StaffQueue;
