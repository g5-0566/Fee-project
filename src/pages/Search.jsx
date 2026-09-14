import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, ArrowUpDown, SlidersHorizontal, RotateCcw, MapPin } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import OrganisationCard from '../components/OrganisationCard.jsx';
import EmptyState from '../components/EmptyState.jsx';
import Button from '../components/Button.jsx';
import { useQueue } from '../context/QueueContext.jsx';
import { CATEGORIES } from '../data/mockData.js';

/**
 * Search Page Component
 * Demonstrates useMemo for performant client-side filtering, searching, and sorting
 */
export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { organisations } = useQueue();

  // Search filter states
  const [searchQuery, setSearchQuery] = useState(() => searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(() => searchParams.get('category') || 'all');
  const [selectedStatus, setSelectedStatus] = useState('all'); // 'all' | 'LOW' | 'MODERATE' | 'BUSY'
  const [sortBy, setSortBy] = useState('wait-asc'); // 'wait-asc' | 'wait-desc' | 'queue-asc' | 'queue-desc' | 'name'

  // Synchronize state when URL search params change
  useEffect(() => {
    const q = searchParams.get('q');
    const cat = searchParams.get('category');
    if (q !== null) setSearchQuery(q);
    if (cat !== null) setSelectedCategory(cat);
  }, [searchParams]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedStatus('all');
    setSortBy('wait-asc');
    setSearchParams({});
  };

  /**
   * Filter and Sort pipeline using useMemo
   * Demonstrates JavaScript filter(), map(), sort(), includes(), toLowerCase()
   */
  const filteredOrganisations = useMemo(() => {
    return organisations
      .filter((org) => {
        // Text search across name, category, location, and services
        const query = searchQuery.trim().toLowerCase();
        const matchesQuery =
          !query ||
          org.name.toLowerCase().includes(query) ||
          org.category.toLowerCase().includes(query) ||
          org.location.toLowerCase().includes(query) ||
          (org.services && org.services.some((s) => s.toLowerCase().includes(query)));

        // Category filter
        const matchesCategory =
          selectedCategory === 'all' || org.category.toLowerCase() === selectedCategory.toLowerCase();

        // Status filter (LOW, MODERATE, BUSY)
        const matchesStatus =
          selectedStatus === 'all' || org.statusInfo?.code === selectedStatus;

        return matchesQuery && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'wait-asc':
            return a.estimatedWait - b.estimatedWait; // Shortest waiting time
          case 'wait-desc':
            return b.estimatedWait - a.estimatedWait; // Longest waiting time
          case 'queue-asc':
            return a.queue - b.queue; // Smallest queue
          case 'queue-desc':
            return b.queue - a.queue; // Largest queue
          case 'name':
            return a.name.localeCompare(b.name);
          default:
            return 0;
        }
      });
  }, [organisations, searchQuery, selectedCategory, selectedStatus, sortBy]);

  return (
    <div className="search-page">
      {/* Search Header */}
      <section style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
          Search & Live Queue Directory
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>
          Real-time waiting durations, counter availability, and live crowd monitoring.
        </p>

        <div style={{ marginTop: '1.25rem', maxWidth: '720px' }}>
          <SearchBar
            value={searchQuery}
            onChange={(val) => {
              setSearchQuery(val);
              if (val) {
                setSearchParams((prev) => {
                  prev.set('q', val);
                  return prev;
                });
              } else {
                setSearchParams((prev) => {
                  prev.delete('q');
                  return prev;
                });
              }
            }}
            placeholder="Search by hospital, clinic, bank, service or location..."
            size="md"
          />
        </div>
      </section>

      {/* Filter and Sorting Controls Bar */}
      <section
        className="card"
        style={{
          padding: '1.25rem',
          marginBottom: '2rem',
          backgroundColor: 'var(--bg-surface)'
        }}
        aria-label="Filter Controls"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          {/* Category Dropdown Filter */}
          <div className="flex items-center gap-2 flex-wrap" style={{ flex: 1, minWidth: '220px' }}>
            <label htmlFor="category-select" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              Category:
            </label>
            <select
              id="category-select"
              value={selectedCategory}
              onChange={(e) => {
                const cat = e.target.value;
                setSelectedCategory(cat);
                setSearchParams((prev) => {
                  if (cat === 'all') prev.delete('category');
                  else prev.set('category', cat);
                  return prev;
                });
              }}
              className="form-select"
              style={{ width: 'auto', minWidth: '160px', padding: '0.45rem 0.8rem' }}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2" style={{ flexWrap: 'wrap' }}>
            <label htmlFor="status-select" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              Queue Load:
            </label>
            <select
              id="status-select"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '0.45rem 0.8rem' }}
            >
              <option value="all">All Statuses</option>
              <option value="LOW">LOW (Fast &lt;15m)</option>
              <option value="MODERATE">MODERATE (15-45m)</option>
              <option value="BUSY">BUSY (&gt;45m)</option>
            </select>
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2" style={{ flexWrap: 'wrap' }}>
            <label htmlFor="sort-select" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              Sort By:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="form-select"
              style={{ width: 'auto', padding: '0.45rem 0.8rem' }}
            >
              <option value="wait-asc">Shortest Waiting Time</option>
              <option value="wait-desc">Longest Waiting Time</option>
              <option value="queue-asc">Smallest Queue</option>
              <option value="queue-desc">Largest Queue</option>
              <option value="name">Alphabetical (A - Z)</option>
            </select>
          </div>

          {(searchQuery || selectedCategory !== 'all' || selectedStatus !== 'all' || sortBy !== 'wait-asc') && (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleResetFilters}
              icon={RotateCcw}
              title="Reset all filters"
            >
              Reset
            </Button>
          )}
        </div>
      </section>

      {/* Results Count Summary */}
      <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          Showing <strong>{filteredOrganisations.length}</strong> of {organisations.length} verified locations
        </p>
      </div>

      {/* Results Grid or Empty State */}
      {filteredOrganisations.length > 0 ? (
        <div className="grid grid-cols-1 grid-cols-sm-2 grid-cols-md-2 grid-cols-lg-3">
          {filteredOrganisations.map((org) => (
            <OrganisationCard key={org.id} organisation={org} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Matching Organisations Found"
          description={`No places found matching "${searchQuery || selectedCategory}". Try adjusting your query or category filters.`}
          actionText="Reset All Filters"
          onAction={handleResetFilters}
        />
      )}
    </div>
  );
}

export default SearchPage;
