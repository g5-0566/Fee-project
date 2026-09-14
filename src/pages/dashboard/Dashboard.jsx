import { Link } from 'react-router-dom';
import {
  Clock,
  Heart,
  Search,
  User,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  MapPin
} from 'lucide-react';
import StatsCard from '../../components/StatsCard.jsx';
import QueueCard from '../../components/QueueCard.jsx';
import OrganisationCard from '../../components/OrganisationCard.jsx';
import EmptyState from '../../components/EmptyState.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import Button from '../../components/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useQueue } from '../../context/QueueContext.jsx';

/**
 * Customer Dashboard Overview
 * Demonstrates component composition, dashboard shell layout, and live customer state
 */
export function Dashboard() {
  const { user } = useAuth();
  const { activeTicket, cancelQueue, organisations, favourites } = useQueue();

  const favoriteOrgs = organisations.filter((org) => favourites.includes(org.id));

  return (
    <div className="dashboard-shell">
      <Sidebar type="customer" />

      <main className="dashboard-content" role="region" aria-label="Customer Dashboard Overview">
        {/* Welcome Section */}
        <section
          className="card"
          style={{
            marginBottom: '1.75rem',
            padding: '1.75rem',
            background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-subtle) 100%)'
          }}
        >
          <div className="flex justify-between items-center flex-wrap gap-3">
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>
                Customer Account
              </span>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Welcome back, {user?.name || 'Customer'}!
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: '0.2rem' }}>
                Track your active digital queue tokens and explore waiting durations in your area.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 flex-wrap">
              <Link to="/search" className="btn btn-primary btn-sm">
                <Search size={15} /> Find Places & Join
              </Link>
              <Link to="/dashboard/favourites" className="btn btn-secondary btn-sm">
                <Heart size={15} /> Favourites ({favourites.length})
              </Link>
            </div>
          </div>
        </section>

        {/* Statistics Cards Row */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '1.75rem'
          }}
          aria-label="Queue Statistics"
        >
          <StatsCard
            icon={Clock}
            label="Active Token"
            value={activeTicket && activeTicket.status !== 'COMPLETED' ? `#${activeTicket.tokenNumber}` : 'None'}
            description={activeTicket && activeTicket.status !== 'COMPLETED' ? `Serving #${activeTicket.currentToken}` : 'No active line'}
            variant={activeTicket && activeTicket.status !== 'COMPLETED' ? 'primary' : 'neutral'}
          />
          <StatsCard
            icon={TrendingUp}
            label="Est. Wait Time"
            value={activeTicket && activeTicket.status !== 'COMPLETED' ? `~${activeTicket.estimatedWait}m` : '0m'}
            description={activeTicket && activeTicket.status !== 'COMPLETED' ? `${activeTicket.peopleAhead} people ahead` : 'Instant entry'}
            variant="warning"
          />
          <StatsCard
            icon={Heart}
            label="Saved Favourites"
            value={favourites.length}
            description="Bookmarked locations"
            variant="success"
          />
          <StatsCard
            icon={ShieldCheck}
            label="System Status"
            value="Online"
            description="Browser simulation"
            variant="success"
          />
        </section>

        {/* Active Queue Spotlight */}
        <section style={{ marginBottom: '2rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Current Active Queue
            </h2>
            {activeTicket && (
              <Link to="/dashboard/queue" className="btn btn-outline btn-sm">
                Full View & Details <ArrowRight size={14} />
              </Link>
            )}
          </div>

          {activeTicket ? (
            <QueueCard ticket={activeTicket} onCancel={cancelQueue} />
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '2.5rem 1.5rem' }}>
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--bg-subtle)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1rem auto'
                }}
              >
                <Clock size={24} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                You Haven't Joined Any Queue
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto 1.25rem auto' }}>
                Browse hospitals, diagnostic centres, clinics, or banks to check waiting crowds and generate a live token before travelling.
              </p>
              <Link to="/search" className="btn btn-primary btn-sm">
                <Search size={15} /> Find Places to Join
              </Link>
            </div>
          )}
        </section>

        {/* Saved Favourite Organisations */}
        <section style={{ marginBottom: '2rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Your Favourite Locations
            </h2>
            <Link to="/dashboard/favourites" className="btn btn-secondary btn-sm">
              Manage Favourites
            </Link>
          </div>

          {favoriteOrgs.length > 0 ? (
            <div className="grid grid-cols-1 grid-cols-md-2 gap-4">
              {favoriteOrgs.slice(0, 2).map((org) => (
                <OrganisationCard key={org.id} organisation={org} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No Favourites Saved"
              description="Click the heart icon on any organisation card to quickly access their live queues from your dashboard."
              actionText="Browse Locations"
              actionLink="/search"
            />
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
