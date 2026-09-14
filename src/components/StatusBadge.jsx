/**
 * StatusBadge Component
 * Accessible status indicator showing text ("LOW", "MODERATE", "BUSY")
 * alongside an indicator dot. Complies with WCAG AA non-color-only requirement.
 */
export function StatusBadge({ status, size = 'normal' }) {
  if (!status) return null;

  const code = (typeof status === 'string' ? status : status.code || 'LOW').toUpperCase();

  let badgeClass = 'badge-low';
  let dotClass = 'status-dot-low';
  let text = 'LOW';

  if (code === 'MODERATE') {
    badgeClass = 'badge-moderate';
    dotClass = 'status-dot-moderate';
    text = 'MODERATE';
  } else if (code === 'BUSY') {
    badgeClass = 'badge-busy';
    dotClass = 'status-dot-busy';
    text = 'BUSY';
  }

  return (
    <span className={`badge ${badgeClass} ${size === 'large' ? 'btn-lg' : ''}`} role="status">
      <span className={`status-dot ${dotClass} pulse`} aria-hidden="true" />
      <span>{text}</span>
    </span>
  );
}

export default StatusBadge;
