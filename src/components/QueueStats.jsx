import { Users, Clock, Hash, ShieldCheck } from 'lucide-react';

/**
 * QueueStats Component
 * Displays four key queue metrics in a clean responsive grid
 */
export function QueueStats({
  queue = 0,
  currentToken = 0,
  estimatedWait = 0,
  activeCounters = 1
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '1rem',
        padding: '1.25rem',
        backgroundColor: 'var(--bg-subtle)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)'
      }}
    >
      <div className="flex flex-col">
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Users size={14} /> People Waiting
        </span>
        <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          {queue}
        </span>
      </div>

      <div className="flex flex-col">
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Hash size={14} /> Current Token
        </span>
        <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
          #{currentToken}
        </span>
      </div>

      <div className="flex flex-col">
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <Clock size={14} /> Estimated Wait
        </span>
        <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary)' }}>
          {estimatedWait} min
        </span>
      </div>

      <div className="flex flex-col">
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <ShieldCheck size={14} /> Active Counters
        </span>
        <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--success)' }}>
          {activeCounters}
        </span>
      </div>
    </div>
  );
}

export default QueueStats;
