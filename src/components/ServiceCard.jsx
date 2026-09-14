import { CheckCircle2, Circle } from 'lucide-react';

/**
 * ServiceCard Component
 * Displays an available service for an organisation and handles selection
 */
export function ServiceCard({
  serviceName,
  estimatedTime = 5,
  isSelected,
  onSelect
}) {
  return (
    <div
      onClick={onSelect}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className="card card-hover flex items-center justify-between"
      style={{
        cursor: 'pointer',
        padding: '1.1rem 1.25rem',
        borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
        backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-card)',
        transition: 'var(--transition)'
      }}
      aria-selected={isSelected}
    >
      <div className="flex items-center gap-3">
        <div style={{ color: isSelected ? 'var(--primary)' : 'var(--text-muted)' }}>
          {isSelected ? (
            <CheckCircle2 size={22} aria-hidden="true" />
          ) : (
            <Circle size={22} aria-hidden="true" />
          )}
        </div>
        <div>
          <h4 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
            {serviceName}
          </h4>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
            Average consultation: ~{estimatedTime} minutes
          </p>
        </div>
      </div>

      <span
        className={`badge ${isSelected ? 'badge-primary' : 'badge-neutral'}`}
        style={{ fontSize: '0.75rem' }}
      >
        {isSelected ? 'Selected' : 'Select'}
      </span>
    </div>
  );
}

export default ServiceCard;
