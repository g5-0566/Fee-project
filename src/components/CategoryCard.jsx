import { Link } from 'react-router-dom';
import {
  Building2,
  HeartPulse,
  Landmark,
  FileText,
  Activity,
  Scissors,
  GraduationCap,
  Wrench,
  Grid
} from 'lucide-react';

const ICON_MAP = {
  Building2,
  HeartPulse,
  Landmark,
  FileText,
  Activity,
  Scissors,
  GraduationCap,
  Wrench,
  Grid
};

/**
 * CategoryCard Component
 * Visual interactive category card for browsing organisations
 */
export function CategoryCard({ category, count = 0, isSelected = false, onClick }) {
  const Icon = ICON_MAP[category.icon] || Grid;

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`card card-hover flex items-center gap-3`}
        style={{
          padding: '1rem',
          textAlign: 'left',
          width: '100%',
          borderColor: isSelected ? 'var(--primary)' : 'var(--border)',
          backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-card)'
        }}
        aria-pressed={isSelected}
      >
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isSelected ? 'var(--primary)' : 'var(--bg-subtle)',
            color: isSelected ? '#ffffff' : 'var(--primary)'
          }}
        >
          <Icon size={20} aria-hidden="true" />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            {category.name}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            {count} places listed
          </div>
        </div>
      </button>
    );
  }

  return (
    <Link
      to={`/search?category=${category.id}`}
      className="card card-hover flex items-center gap-3"
      style={{ padding: '1.1rem' }}
    >
      <div
        style={{
          width: '46px',
          height: '46px',
          borderRadius: 'var(--radius-md)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--primary-light)',
          color: 'var(--primary)'
        }}
      >
        <Icon size={22} aria-hidden="true" />
      </div>
      <div>
        <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
          {category.name}
        </div>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {category.count || count} locations
        </div>
      </div>
    </Link>
  );
}

export default CategoryCard;
