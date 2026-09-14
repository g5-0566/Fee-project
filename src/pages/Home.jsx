import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Users,
  Building2,
  ShieldCheck,
  Search,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  Compass
} from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import CategoryCard from '../components/CategoryCard.jsx';
import OrganisationCard from '../components/OrganisationCard.jsx';
import Button from '../components/Button.jsx';
import { useQueue } from '../context/QueueContext.jsx';
import { CATEGORIES } from '../data/mockData.js';

/**
 * Home Page Component
 * Showcases core mission, search input, categories, live simulated queues, and benefits.
 */
export function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const { organisations, lastUpdated, simulationActive } = useQueue();
  const navigate = useNavigate();

  const handleSearchSubmit = (query) => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    } else {
      navigate('/search');
    }
  };

  // Select 4 diverse featured organisations to highlight live updates
  const featuredOrgs = organisations.slice(0, 4);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section
        style={{
          padding: '3rem 0 2.5rem 0',
          textAlign: 'center',
          backgroundColor: 'var(--bg-surface)',
          borderBottom: '1px solid var(--border)'
        }}
        aria-labelledby="hero-title"
      >
        <div className="container" style={{ maxWidth: '840px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '1.25rem'
            }}
          >
            <Sparkles size={16} aria-hidden="true" />
            <span>Smart Queue Management for Every City</span>
          </div>

          <h1
            id="hero-title"
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
              fontWeight: 900,
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              marginBottom: '1.25rem'
            }}
          >
            Know the Queue <br />
            <span style={{ color: 'var(--primary)' }}>Before You Go</span>
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '680px',
              margin: '0 auto 2rem auto'
            }}
          >
            Check live queue status, estimated waiting times, and active counters at hospitals, diagnostic labs, banks, and government offices before you step out of your door.
          </p>

          {/* Search Bar in Hero */}
          <div style={{ maxWidth: '640px', margin: '0 auto 1.5rem auto' }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearchSubmit}
              size="lg"
              placeholder="Search by place name, doctor, branch or service..."
            />
          </div>

          {/* Quick Tag Pills */}
          <div
            className="flex items-center justify-center gap-2 flex-wrap"
            style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}
          >
            <span>Popular searches:</span>
            {['General Hospital', 'Blood Test', 'Driving Licence', 'Bank KYC', 'Dental'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => navigate(`/search?q=${encodeURIComponent(tag)}`)}
                className="badge badge-neutral"
                style={{ cursor: 'pointer', textTransform: 'none', fontWeight: 600 }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES BROWSER */}
      <section className="container" style={{ padding: '3.5rem 1rem' }} aria-labelledby="categories-heading">
        <div className="flex justify-between items-center" style={{ marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <h2 id="categories-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Browse by Sector
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
              Explore live waiting queues categorized by department
            </p>
          </div>
          <Link to="/search" className="btn btn-outline btn-sm">
            View All Places <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 grid-cols-sm-2 grid-cols-md-4">
          {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 3. LIVE QUEUES SHOWCASE (Real-time simulated cards) */}
      <section
        style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '3.5rem 1rem',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)'
        }}
        aria-labelledby="live-queues-heading"
      >
        <div className="container">
          <div className="flex justify-between items-center" style={{ marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
                <span className="status-dot status-dot-low pulse" aria-hidden="true" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--success)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Live Queue Updates
                </span>
              </div>
              <h2 id="live-queues-heading" style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Active Queues Near You
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                Numbers reflect simulated customer processing. Last cycle: <strong>{lastUpdated}</strong>
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link to="/search" className="btn btn-primary btn-sm">
                <Compass size={16} /> Explore All Queues
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 grid-cols-sm-2 grid-cols-md-2 grid-cols-lg-4">
            {featuredOrgs.map((org) => (
              <OrganisationCard key={org.id} organisation={org} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOW QUEUELESS WORKS */}
      <section className="container" style={{ padding: '4rem 1rem' }} aria-labelledby="how-it-works-heading">
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 2.5rem auto' }}>
          <h2 id="how-it-works-heading" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            How QueueLess Works
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
            Three straightforward steps to reclaim productive hours spent sitting in physical waiting rooms.
          </p>
        </div>

        <div className="grid grid-cols-1 grid-cols-md-3">
          <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                fontSize: '1.3rem',
                fontWeight: 800
              }}
            >
              1
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Check Before You Travel
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Search any hospital, laboratory, bank, or licensing office. See live numbers of people waiting and estimated wait durations.
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                fontSize: '1.3rem',
                fontWeight: 800
              }}
            >
              2
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Join the Digital Queue
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Select your required service and generate an electronic queue token instantly with live position tracking on your phone.
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.25rem auto',
                fontSize: '1.3rem',
                fontWeight: 800
              }}
            >
              3
            </div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
              Arrive Just-in-Time
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Monitor live updates as tokens advance. Receive timely alerts when your turn is approaching and step directly up to the counter.
            </p>
          </div>
        </div>
      </section>

      {/* 5. WHY QUEUELESS (Value Proposition) */}
      <section
        style={{
          backgroundColor: 'var(--bg-surface)',
          padding: '3.5rem 1rem',
          borderTop: '1px solid var(--border)'
        }}
        aria-labelledby="why-heading"
      >
        <div className="container">
          <div style={{ maxWidth: '640px', margin: '0 auto 2.5rem auto', textAlign: 'center' }}>
            <h2 id="why-heading" style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
              Why Choose QueueLess?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
              Designed to solve overcrowding, reduce stress, and bring transparency to public service facilities.
            </p>
          </div>

          <div className="grid grid-cols-1 grid-cols-md-3">
            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--primary)', marginBottom: '0.75rem' }}>
                <Clock size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                Eliminate Idle Waiting Time
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Average users save over 45 minutes per visit by scheduling departure precisely when their turn approaches.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--success)', marginBottom: '0.75rem' }}>
                <Users size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                Decentralize Crowded Rooms
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Reduces physical hallway congestion at diagnostic labs and clinics, promoting infection control and calmer environments.
              </p>
            </div>

            <div className="card" style={{ padding: '1.5rem' }}>
              <div style={{ color: 'var(--warning)', marginBottom: '0.75rem' }}>
                <ShieldCheck size={28} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                Transparent Service Counters
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                Full visibility into how many desks are actively serving and current throughput per counter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="container" style={{ padding: '4rem 1rem' }}>
        <div
          className="card"
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, #1d4ed8 100%)',
            color: '#ffffff',
            borderRadius: 'var(--radius-lg)',
            padding: '3rem 1.5rem',
            textAlign: 'center'
          }}
        >
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.75rem', color: '#ffffff' }}>
            Ready to Skip the Waiting Room?
          </h2>
          <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '560px', margin: '0 auto 1.75rem auto' }}>
            Join thousands of citizens saving time daily. Search your destination now or log in to track your queue tokens.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link to="/search" className="btn btn-secondary btn-lg" style={{ color: 'var(--primary)' }}>
              Find a Queue Now
            </Link>
            <Link to="/register" className="btn btn-outline btn-lg" style={{ color: '#ffffff', borderColor: '#ffffff' }}>
              Create Free Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
