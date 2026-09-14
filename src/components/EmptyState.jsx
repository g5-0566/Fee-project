import { Inbox } from 'lucide-react';
import Button from './Button.jsx';

/**
 * EmptyState Component
 * Displays an icon, title, description, and optional action button
 */
export function EmptyState({
  title = 'No items found',
  description = 'There are no records to display at this moment.',
  icon: Icon = Inbox,
  actionText,
  onAction,
  actionLink
}) {
  return (
    <div className="state-box" role="region" aria-label={title}>
      <div className="state-icon">
        <Icon size={28} aria-hidden="true" />
      </div>
      <h3 className="state-title">{title}</h3>
      <p className="state-desc">{description}</p>
      {actionText && (
        actionLink ? (
          <a href={actionLink} className="btn btn-primary btn-sm">
            {actionText}
          </a>
        ) : (
          <Button variant="primary" size="sm" onClick={onAction}>
            {actionText}
          </Button>
        )
      )}
    </div>
  );
}

export default EmptyState;
