import { Heart, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.jsx';
import OrganisationCard from '../../components/OrganisationCard.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import { useQueue } from '../../context/QueueContext.jsx';

/**
 * Favourites Page Component
 * Displays bookmarked locations persisted in LocalStorage
 */
export function Favourites() {
  const { organisations, favourites } = useQueue();

  const favoriteOrgs = organisations.filter((org) => favourites.includes(org.id));

  return (
    <div className="dashboard-shell">
      <Sidebar type="customer" />

      <main className="dashboard-content" role="region" aria-label="Bookmarked Organisations">
        <div className="flex justify-between items-center flex-wrap gap-2" style={{ marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Saved Favourites
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Quick-access to live queues of your frequently visited facilities.
            </p>
          </div>

          <Link to="/search" className="btn btn-secondary btn-sm">
            <Search size={15} /> Find More Places
          </Link>
        </div>

        {favoriteOrgs.length > 0 ? (
          <div className="grid grid-cols-1 grid-cols-sm-2 grid-cols-md-2 grid-cols-lg-3">
            {favoriteOrgs.map((org) => (
              <OrganisationCard key={org.id} organisation={org} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Favourite Organisations Yet"
            description="You haven't bookmarked any hospitals, diagnostic labs, or banks. Click the heart icon on any place card to save it here for instant monitoring."
            icon={Heart}
            actionText="Browse Locations"
            actionLink="/search"
          />
        )}
      </main>
    </div>
  );
}

export default Favourites;
