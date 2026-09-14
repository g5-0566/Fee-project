import { Clock, Users, Building2, MapPin, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
import Button from './Button.jsx';
import { useQueue } from '../context/QueueContext.jsx';

/**
 * QueueCard Component
 * Displays the customer's active token, live queue progress, and situational alerts
 */
export function QueueCard({ ticket, onCancel }) {
  const { lastUpdated } = useQueue();

  if (!ticket) return null;

  const {
    tokenNumber,
    currentToken,
    peopleAhead = 0,
    estimatedWait = 0,
    organisationName,
    service,
    location,
    joinedTime,
    status = 'WAITING'
  } = ticket;

  // Calculate progress percentage (0 to 100)
  // Assuming a standard queue journey from joined tokens ahead
  const totalSteps = Math.max(1, (peopleAhead + (tokenNumber - currentToken)));
  const progressPercent = status === 'COMPLETED'
    ? 100
    : status === 'SERVING'
    ? 95
    : Math.min(90, Math.max(10, Math.round(((totalSteps - peopleAhead) / totalSteps) * 100)));

  return (
    <div className="ticket-card" id={`live-ticket-${ticket.id}`}>
      {/* Top Banner Status */}
      <div className="flex items-center justify-between gap-2" style={{ marginBottom: '1.25rem' }}>
        <div className="flex items-center gap-2">
          <Building2 size={18} color="var(--primary)" aria-hidden="true" />
          <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
            {organisationName}
          </span>
        </div>
        <StatusBadge
          status={
            status === 'SERVING'
              ? 'LOW'
              : peopleAhead <= 10
              ? 'LOW'
              : peopleAhead <= 30
              ? 'MODERATE'
              : 'BUSY'
          }
        />
      </div>

      {service && (
        <div style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          Service: <strong style={{ color: 'var(--text-primary)' }}>{service}</strong>
        </div>
      )}

      {/* Dynamic Status Alert based on proximity */}
      {status === 'COMPLETED' ? (
        <div className="alert alert-success" role="alert">
          <CheckCircle2 size={20} style={{ flexShrink: 0 }} aria-hidden="true" />
          <div style={{ textAlign: 'left' }}>
            <strong>Your queue visit is complete.</strong> Thank you for using QueueLess!
          </div>
        </div>
      ) : status === 'SERVING' ? (
        <div className="alert alert-success" role="alert">
          <CheckCircle2 size={20} style={{ flexShrink: 0 }} aria-hidden="true" />
          <div style={{ textAlign: 'left' }}>
            <strong>Your turn has arrived!</strong> Please proceed directly to the calling counter.
          </div>
        </div>
      ) : peopleAhead <= 3 ? (
        <div className="alert alert-warning" role="alert">
          <AlertCircle size={20} style={{ flexShrink: 0 }} aria-hidden="true" />
          <div style={{ textAlign: 'left' }}>
            <strong>Your turn is approaching!</strong> You are #{peopleAhead} in line. Please be ready.
          </div>
        </div>
      ) : (
        <div className="alert alert-info" role="alert">
          <Clock size={20} style={{ flexShrink: 0 }} aria-hidden="true" />
          <div style={{ textAlign: 'left' }}>
            <strong>You are in queue.</strong> Relax while our real-time simulation tracks your spot.
          </div>
        </div>
      )}

      {/* Hero Token Display */}
      <div style={{ margin: '1rem 0' }}>
        <div style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 600 }}>
          Your Token Number
        </div>
        <div className="ticket-number">#{tokenNumber}</div>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
          <span>Currently Serving: <strong style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>#{currentToken}</strong></span>
        </div>
      </div>

      {/* Visual Queue Progress Bar */}
      <div style={{ margin: '1.5rem 0' }}>
        <div className="flex justify-between" style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          <span>Queue Progress</span>
          <span>{status === 'COMPLETED' ? 'Completed' : `${progressPercent}%`}</span>
        </div>
        <div className="progress-bar-bg" aria-hidden="true">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Metrics Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: 'var(--bg-surface)',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border)',
          marginBottom: '1.5rem'
        }}
      >
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
            <Users size={14} /> People Ahead
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            {peopleAhead}
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
            <Clock size={14} /> Estimated Wait
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
            {status === 'COMPLETED' ? '0 min' : `~${estimatedWait} min`}
          </div>
        </div>
      </div>

      {/* Meta Footer */}
      <div className="flex flex-col gap-2" style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
        <div className="flex justify-between items-center">
          <span>Joined at:</span>
          <strong style={{ color: 'var(--text-primary)' }}>{joinedTime}</strong>
        </div>
        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1">
            <RefreshCw size={12} className="pulse" /> Last updated:
          </span>
          <strong style={{ color: 'var(--text-primary)' }}>{lastUpdated}</strong>
        </div>
        {location && (
          <div className="flex justify-between items-center">
            <span>Location:</span>
            <span style={{ color: 'var(--text-secondary)' }}>{location}</span>
          </div>
        )}
      </div>

      {onCancel && status !== 'COMPLETED' && (
        <Button
          variant="secondary"
          size="sm"
          onClick={onCancel}
          style={{ width: '100%', borderColor: 'var(--danger-border)', color: 'var(--danger)' }}
        >
          Cancel & Leave Queue
        </Button>
      )}
    </div>
  );
}

export default QueueCard;
