import { Link } from 'react-router-dom';
import { MapPin, Users, Clock, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import StatusBadge from './StatusBadge.jsx';
import { useQueue } from '../context/QueueContext.jsx';

/**
 * OrganisationCard Component
 * Displays live queue metrics, estimated waiting time, and quick actions
 */
export function OrganisationCard({ organisation }) {
  const { toggleFavourite, isFavourite } = useQueue();
  const {
    id,
    name,
    category,
    location,
    queue,
    currentToken,
    estimatedWait,
    activeCounters,
    statusInfo
  } = organisation;

  const favorited = isFavourite(id);

  return (
    <article className="card card-hover flex flex-col justify-between" id={`org-card-${id}`}>
      <div>
        <div className="card-header">
          <div>
            <span className="badge badge-neutral" style={{ marginBottom: '0.4rem' }}>
              {category}
            </span>
            <h3 className="card-title" style={{ marginTop: '0.2rem' }}>
              <Link to={`/organisation/${id}`} style={{ color: 'inherit' }}>
                {name}
              </Link>
            </h3>
            <p className="card-subtitle flex items-center gap-1">
              <MapPin size={14} aria-hidden="true" />
              <span>{location}</span>
            </p>
          </div>

          <button
            type="button"
            className="btn-icon"
            onClick={(e) => {
              e.preventDefault();
              toggleFavourite(id);
            }}
            title={favorited ? 'Remove from favourites' : 'Add to favourites'}
            aria-label={favorited ? `Remove ${name} from favourites` : `Add ${name} to favourites`}
            style={{ color: favorited ? 'var(--danger)' : 'var(--text-muted)' }}
          >
            <Heart size={20} fill={favorited ? 'currentColor' : 'none'} aria-hidden="true" />
          </button>
        </div>

        {/* Live Queue Grid Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.75rem',
            margin: '1.25rem 0',
            padding: '0.85rem',
            backgroundColor: 'var(--bg-subtle)',
            borderRadius: 'var(--radius-md)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Users size={12} /> People Waiting
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {queue}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Clock size={12} /> Estimated Wait
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
              ~{estimatedWait} min
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Current Token
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
              #{currentToken}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <ShieldCheck size={12} /> Counters
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {activeCounters} Active
            </div>
          </div>
        </div>
      </div>

      <div className="card-footer">
        <StatusBadge status={statusInfo} />
        <Link
          to={`/organisation/${id}`}
          className="btn btn-outline btn-sm"
          style={{ gap: '0.35rem' }}
        >
          <span>View Queue</span>
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default OrganisationCard;
