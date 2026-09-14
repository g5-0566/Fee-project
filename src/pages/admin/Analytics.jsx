import { useMemo } from 'react';
import { BarChart3, Clock, TrendingUp, Users, Calendar, Award } from 'lucide-react';
import Sidebar from '../../components/Sidebar.jsx';
import StatsCard from '../../components/StatsCard.jsx';
import { useQueue } from '../../context/QueueContext.jsx';

/**
 * Admin Analytics Component
 * Demonstrates accessible, pure CSS/HTML bar charts for key operational metrics:
 * 1. Peak Queue Hours (Hourly distribution)
 * 2. Average Waiting Time by Category
 * 3. Busiest Facilities Ranked
 * 4. Daily Tokens Served Throughput
 */
export function Analytics() {
  const { organisations } = useQueue();

  // 1. Peak Queue Hours Data
  const hourlyData = [
    { hour: '8 AM', count: 18 },
    { hour: '9 AM', count: 42 },
    { hour: '10 AM', count: 85 },
    { hour: '11 AM', count: 110, peak: true },
    { hour: '12 PM', count: 96 },
    { hour: '1 PM', count: 64 },
    { hour: '2 PM', count: 78 },
    { hour: '3 PM', count: 92 },
    { hour: '4 PM', count: 58 },
    { hour: '5 PM', count: 32 }
  ];

  const maxHourly = Math.max(...hourlyData.map((d) => d.count));

  // 2. Average Waiting Time by Category (dynamically calculated from live orgs)
  const categoryWaitTimes = useMemo(() => {
    const map = {};
    organisations.forEach((org) => {
      if (!map[org.category]) {
        map[org.category] = { totalWait: 0, count: 0 };
      }
      map[org.category].totalWait += org.estimatedWait;
      map[org.category].count += 1;
    });

    return Object.entries(map).map(([category, data]) => ({
      category,
      avgWait: Math.round(data.totalWait / data.count)
    }));
  }, [organisations]);

  const maxWait = Math.max(...categoryWaitTimes.map((c) => c.avgWait), 1);

  // 3. Busiest Organisations
  const busiestOrgs = useMemo(() => {
    return [...organisations].sort((a, b) => b.queue - a.queue).slice(0, 5);
  }, [organisations]);

  // 4. Daily tokens throughput this week
  const dailyThroughput = [
    { day: 'Mon', tokens: 340 },
    { day: 'Tue', tokens: 412 },
    { day: 'Wed', tokens: 388 },
    { day: 'Thu', tokens: 460 },
    { day: 'Fri', tokens: 520, peak: true },
    { day: 'Sat', tokens: 290 },
    { day: 'Sun', tokens: 115 }
  ];

  const maxDaily = Math.max(...dailyThroughput.map((d) => d.tokens));

  return (
    <div className="dashboard-shell">
      <Sidebar type="admin" />

      <main className="dashboard-content" role="region" aria-label="Operational Analytics & Trends">
        <div style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            System Analytics & Flow Trends
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
            Queue congestion patterns, peak service hours, and department benchmarks
          </p>
        </div>

        {/* Analytics Top Cards */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            marginBottom: '2rem'
          }}
        >
          <StatsCard
            icon={Clock}
            label="Peak Congestion"
            value="11:00 AM"
            description="Peak wait threshold"
            variant="warning"
          />
          <StatsCard
            icon={TrendingUp}
            label="Weekly Tokens"
            value="2,525"
            description="+14% vs last week"
            variant="success"
          />
          <StatsCard
            icon={Award}
            label="Fastest Sector"
            value="Salons"
            description="Avg wait 12 mins"
            variant="primary"
          />
          <StatsCard
            icon={Users}
            label="Busiest Sector"
            value="Hospital"
            description="Avg wait 44 mins"
            variant="danger"
          />
        </section>

        <div className="grid grid-cols-1 grid-cols-md-2 gap-6" style={{ marginBottom: '2rem' }}>
          {/* Chart 1: Peak Hours Bar Chart */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Peak Queue Volume by Hour
              </h2>
              <span className="badge badge-warning">Peak: 11 AM</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Shows customer check-ins per hour across all facilities.
            </p>

            {/* Pure CSS Bar Chart */}
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                height: '180px',
                gap: '8px',
                paddingTop: '1rem',
                borderBottom: '2px solid var(--border)'
              }}
              aria-label="Hourly queue bar chart"
            >
              {hourlyData.map((d) => {
                const heightPercent = (d.count / maxHourly) * 100;
                return (
                  <div
                    key={d.hour}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      {d.count}
                    </span>
                    <div
                      style={{
                        width: '100%',
                        height: `${heightPercent}%`,
                        backgroundColor: d.peak ? 'var(--danger)' : 'var(--primary)',
                        borderRadius: '4px 4px 0 0',
                        transition: 'height 0.4s ease'
                      }}
                      title={`${d.hour}: ${d.count} people`}
                    />
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                      {d.hour.replace(' ', '')}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Chart 2: Average Waiting Time by Category */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <div className="flex justify-between items-center" style={{ marginBottom: '1.25rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Average Waiting Time by Sector
              </h2>
              <span className="badge badge-primary">Minutes</span>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Average waiting times derived from live counter statistics.
            </p>

            <div className="flex flex-col gap-3">
              {categoryWaitTimes.map((cat) => {
                const percent = Math.min(100, Math.round((cat.avgWait / maxWait) * 100));
                return (
                  <div key={cat.category}>
                    <div className="flex justify-between items-center" style={{ fontSize: '0.85rem', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{cat.category}</span>
                      <strong style={{ color: 'var(--primary)' }}>{cat.avgWait} mins</strong>
                    </div>
                    <div className="progress-bar-bg" style={{ height: '8px' }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${percent}%`,
                          backgroundColor:
                            cat.avgWait > 35
                              ? 'var(--danger)'
                              : cat.avgWait > 20
                              ? 'var(--warning)'
                              : 'var(--success)'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 grid-cols-md-2 gap-6">
          {/* Chart 3: Busiest Facilities Ranked */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              Top 5 Busiest Facilities Right Now
            </h2>

            <div className="flex flex-col gap-3">
              {busiestOrgs.map((org, index) => (
                <div
                  key={org.id}
                  className="flex items-center justify-between"
                  style={{
                    padding: '0.75rem 1rem',
                    backgroundColor: 'var(--bg-subtle)',
                    borderRadius: 'var(--radius-md)'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--primary-light)',
                        color: 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '0.8rem'
                      }}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        {org.name}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {org.category} • {org.location}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--danger)' }}>
                      {org.queue} waiting
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      ~{org.estimatedWait} min wait
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 4: Daily Tokens Throughput */}
          <div className="card" style={{ padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1.25rem' }}>
              Weekly Tokens Throughput
            </h2>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              Total successful customer visits served daily this week.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                height: '180px',
                gap: '12px',
                borderBottom: '2px solid var(--border)'
              }}
            >
              {dailyThroughput.map((d) => {
                const heightPercent = (d.tokens / maxDaily) * 100;
                return (
                  <div
                    key={d.day}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      height: '100%',
                      justifyContent: 'flex-end'
                    }}
                  >
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      {d.tokens}
                    </span>
                    <div
                      style={{
                        width: '100%',
                        height: `${heightPercent}%`,
                        backgroundColor: 'var(--success)',
                        borderRadius: '4px 4px 0 0'
                      }}
                      title={`${d.day}: ${d.tokens} tokens`}
                    />
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '6px', fontWeight: 600 }}>
                      {d.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Analytics;
