import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Clock,
  ShieldCheck,
  Building2,
  Users,
  Heart,
  ArrowLeft,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge.jsx';
import QueueStats from '../components/QueueStats.jsx';
import ServiceCard from '../components/ServiceCard.jsx';
import Button from '../components/Button.jsx';
import EmptyState from '../components/EmptyState.jsx';
import { useQueue } from '../context/QueueContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

/**
 * Organisation Details Page Component
 * Shows live queue status, details, services, and allows joining the queue
 */
export function Organisation() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { organisations, joinQueue, activeTicket, toggleFavourite, isFavourite, lastUpdated } = useQueue();
  const { isAuthenticated } = useAuth();

  const org = organisations.find((o) => o.id === Number(id));

  // State for chosen service
  const [selectedService, setSelectedService] = useState(() => {
    return org?.services?.[0] || '';
  });
  const [isJoining, setIsJoining] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!org) {
    return (
      <div style={{ padding: '2rem 0' }}>
        <EmptyState
          title="Organisation Not Found"
          description={`We couldn't locate any facility with ID #${id}.`}
          actionText="Back to Search Directory"
          actionLink="/search"
        />
      </div>
    );
  }

  const favorited = isFavourite(org.id);
  const alreadyInThisQueue = activeTicket && activeTicket.organisationId === org.id && activeTicket.status !== 'COMPLETED';

  const handleJoinQueue = () => {
    setErrorMessage('');

    if (!selectedService) {
      setErrorMessage('Please select a service from the list below before joining.');
      return;
    }

    setIsJoining(true);
    try {
      joinQueue({
        organisationId: org.id,
        organisationName: org.name,
        service: selectedService
      });

      // Redirect immediately to My Queue page according to spec
      navigate('/dashboard/queue');
    } catch (err) {
      setErrorMessage(err.message || 'Failed to generate queue ticket.');
      setIsJoining(false);
    }
  };

  return (
    <div className="organisation-page">
      {/* Back breadcrumb */}
      <div style={{ marginBottom: '1.5rem' }}>
        <Link to="/search" className="btn btn-secondary btn-sm" style={{ gap: '0.4rem' }}>
          <ArrowLeft size={16} /> Back to Directory
        </Link>
      </div>

      {/* Facility Header Card */}
      <div className="card" style={{ marginBottom: '2rem', padding: '1.75rem' }}>
        <div className="flex justify-between items-start flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2" style={{ marginBottom: '0.5rem' }}>
              <span className="badge badge-primary">{org.category}</span>
              <StatusBadge status={org.statusInfo} />
            </div>

            <h1 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
              {org.name}
            </h1>

            <div className="flex items-center gap-4 flex-wrap" style={{ marginTop: '0.75rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              <span className="flex items-center gap-1">
                <MapPin size={16} color="var(--primary)" /> {org.location}
              </span>
              {org.phone && (
                <span className="flex items-center gap-1">
                  <Phone size={16} color="var(--primary)" /> {org.phone}
                </span>
              )}
              {org.operatingHours && (
                <span className="flex items-center gap-1">
                  <Clock size={16} color="var(--primary)" /> {org.operatingHours}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => toggleFavourite(org.id)}
              style={{ color: favorited ? 'var(--danger)' : 'var(--text-secondary)' }}
              aria-label={favorited ? 'Remove from favourites' : 'Save to favourites'}
            >
              <Heart size={18} fill={favorited ? 'currentColor' : 'none'} />
              <span>{favorited ? 'Favourited' : 'Save'}</span>
            </button>
          </div>
        </div>

        <p style={{ marginTop: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.96rem', lineHeight: 1.6, maxWidth: '800px' }}>
          {org.description}
        </p>

        {/* Live status bar */}
        <div
          style={{
            marginTop: '1.5rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--divider)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.82rem',
            color: 'var(--text-muted)'
          }}
        >
          <span>Address: <strong>{org.address}</strong></span>
          <span>Live simulation synced at: <strong>{lastUpdated}</strong></span>
        </div>
      </div>

      {/* Main Queue & Services Grid */}
      <div className="grid grid-cols-1 grid-cols-md-3 gap-6">
        {/* Left 2 Columns: Services Selection & Queue Action */}
        <div style={{ gridColumn: 'span 2' }}>
          <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Select Required Service
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
              Choose the specific desk or consultation you need to join the queue line.
            </p>

            {errorMessage && (
              <div className="alert alert-danger" role="alert">
                <AlertCircle size={18} />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="flex flex-col gap-3">
              {org.services?.map((serviceName) => (
                <ServiceCard
                  key={serviceName}
                  serviceName={serviceName}
                  estimatedTime={org.averageServiceTime}
                  isSelected={selectedService === serviceName}
                  onSelect={() => setSelectedService(serviceName)}
                />
              ))}
            </div>

            {/* Join Queue Action Button */}
            <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
              {alreadyInThisQueue ? (
                <div className="alert alert-info">
                  <CheckCircle2 size={18} />
                  <div>
                    <span>You already hold an active token for this facility! </span>
                    <Link to="/dashboard/queue" style={{ fontWeight: 700, textDecoration: 'underline' }}>
                      View My Queue Ticket (#{activeTicket.tokenNumber})
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Selected: <strong>{selectedService || 'None'}</strong>
                    </div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                      Estimated waiting time: <strong>~{org.estimatedWait} minutes</strong>
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleJoinQueue}
                    disabled={isJoining}
                    icon={Sparkles}
                  >
                    {isJoining ? 'Generating Token...' : 'Join Live Queue Now'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Column: Real-Time Queue Metrics & Advice */}
        <div>
          <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              Live Counter Summary
            </h3>

            <QueueStats
              queue={org.queue}
              currentToken={org.currentToken}
              estimatedWait={org.estimatedWait}
              activeCounters={org.activeCounters}
            />

            <div style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
              <h4 style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                How Waiting Time is Estimated
              </h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Formula: <code>(People Waiting × Avg Time) ÷ Active Counters</code>.
                Currently: <code>({org.queue} × {org.averageServiceTime}m) ÷ {org.activeCounters} counters = ~{org.estimatedWait} min</code>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Organisation;
