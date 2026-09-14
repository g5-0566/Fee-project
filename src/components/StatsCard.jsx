/**
 * StatsCard Component
 * Metric visual card used in dashboards and analytics
 */
export function StatsCard({
  icon: Icon,
  label,
  value,
  description,
  variant = 'primary',
  id
}) {
  return (
    <div className="stat-card" id={id}>
      {Icon && (
        <div
          className="stat-icon-wrapper"
          style={
            variant === 'success'
              ? { backgroundColor: 'var(--success-light)', color: 'var(--success)' }
              : variant === 'warning'
              ? { backgroundColor: 'var(--warning-light)', color: 'var(--warning)' }
              : variant === 'danger'
              ? { backgroundColor: 'var(--danger-light)', color: 'var(--danger)' }
              : undefined
          }
        >
          <Icon size={24} aria-hidden="true" />
        </div>
      )}
      <div className="stat-content">
        <span className="stat-label">{label}</span>
        <div className="stat-value">{value}</div>
        {description && <div className="stat-desc">{description}</div>}
      </div>
    </div>
  );
}

export default StatsCard;
