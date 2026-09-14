import {
  Code2,
  Database,
  Layers,
  Sparkles,
  CheckCircle2,
  Server,
  Workflow,
  Cpu,
  ShieldCheck
} from 'lucide-react';

/**
 * About Page Component
 * Outlines the project architecture, problem statement, and 2nd-year CSE syllabus mapping
 */
export function About() {
  return (
    <div className="about-page" style={{ maxWidth: '960px', margin: '0 auto' }}>
      {/* Header */}
      <section style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>
          Academic Project Overview
        </span>
        <h1 style={{ fontSize: '2.4rem', fontWeight: 900, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          QUEUELESS — "Know the Queue Before You Go"
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '720px', margin: '0.5rem auto 0 auto' }}>
          A smart, accessible web platform built to solve overcrowding and eliminate blind waiting times at healthcare, financial, and civic service counters.
        </p>
      </section>

      {/* Problem & Solution Cards */}
      <div className="grid grid-cols-1 grid-cols-md-2" style={{ marginBottom: '2.5rem' }}>
        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ color: 'var(--danger)', marginBottom: '0.75rem', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>The Challenge</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            People visit diagnostic labs, hospitals, banks, and RTO offices completely unaware of current crowd density. They travel across town only to discover 30+ person lines, long waiting hours, and congested hallways, causing immense stress, fatigue, and lost productivity.
          </p>
        </div>

        <div className="card" style={{ padding: '1.75rem' }}>
          <div style={{ color: 'var(--success)', marginBottom: '0.75rem', fontWeight: 800, fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>The QueueLess Solution</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            QueueLess provides live transparency. Users check queue numbers, token progress, active service counters, and calculated wait times from home. They generate digital queue tokens remotely and arrive right when their turn approaches.
          </p>
        </div>
      </div>

      {/* Syllabus Mapping Section */}
      <section className="card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '1.25rem' }}>
          <Code2 size={24} color="var(--primary)" />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            2nd-Year CSE Syllabus Implementation Mapping
          </h2>
        </div>

        <div className="grid grid-cols-1 grid-cols-md-2 gap-4">
          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
              HTML5 & Semantic Structure
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Proper semantic landmarks (<code>&lt;header&gt;</code>, <code>&lt;nav&gt;</code>, <code>&lt;main&gt;</code>, <code>&lt;section&gt;</code>, <code>&lt;article&gt;</code>, <code>&lt;aside&gt;</code>, <code>&lt;footer&gt;</code>), fully accessible form controls with explicit labels, and WCAG AA contrast standards.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
              CSS3 & Responsive Design
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              CSS Custom Properties (Variables) for theme switching, mobile-first media queries, Flexbox alignments, CSS Grid responsive layouts, card patterns, and zero external CSS frameworks.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
              JavaScript & ES6+ Concepts
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Arrow functions, object/array destructuring, rest/spread operators, ES modules (import/export), Promises with <code>async/await</code> for the API layer, and array transformations (<code>filter</code>, <code>map</code>, <code>sort</code>, <code>includes</code>).
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
              React 19 & Component Architecture
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Functional components, unidirectional data flow, state lifting, controlled forms, custom hooks (<code>useLocalStorage</code>, <code>useQueue</code>), <code>useMemo</code> for search filtering, <code>useCallback</code> for event handlers, and <code>useRef</code> for search input focus.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
              React Router
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Single-page routing, dynamic route parameters (<code>/organisation/:id</code>), role-based protected routes (Customer, Staff, Admin), search params sync, and custom 404 handler.
            </p>
          </div>

          <div style={{ padding: '1rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '0.4rem' }}>
              Browser Storage & State
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Robust <code>localStorage</code> persistence for user credentials, saved favourite locations, generated queue tickets, and dark mode preferences with safe JSON parsing and fallback error handling.
            </p>
          </div>
        </div>
      </section>

      {/* Future-Proof Architecture Roadmap */}
      <section className="card" style={{ padding: '2rem', marginBottom: '2.5rem' }}>
        <div className="flex items-center gap-2" style={{ marginBottom: '1.25rem' }}>
          <Database size={24} color="var(--primary)" />
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Future Development Roadmap & DBMS Entity Design
          </h2>
        </div>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
          Although Version 1 is strictly restricted to a frontend academic prototype, the entity relationships and data structures are mathematically aligned to map directly to relational DBMS tables in upcoming semester phases:
        </p>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', padding: '1.25rem', backgroundColor: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', marginBottom: '1.5rem', overflowX: 'auto' }}>
          USER (user_id, name, email, role, phone)
          <br />
          &nbsp;&nbsp;└── TOKEN (token_id, user_id, queue_id, token_no, status, joined_at)
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── QUEUE (queue_id, service_id, current_token, people_waiting)
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── SERVICE (service_id, branch_id, name, avg_time)
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── BRANCH (branch_id, org_id, location, address)
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── ORGANISATION (org_id, name, category)
        </div>

        <div className="grid grid-cols-1 grid-cols-md-3 gap-3">
          <div style={{ padding: '0.85rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <strong>Phase V2: Backend</strong>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              REST API service replacing <code>api.js</code> with actual HTTP fetch requests.
            </p>
          </div>
          <div style={{ padding: '0.85rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <strong>Phase V3: DBMS</strong>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              Relational MySQL database schemas, foreign keys, and normalized joins.
            </p>
          </div>
          <div style={{ padding: '0.85rem', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <strong>Phase V4: WebSockets</strong>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
              True multi-user event-driven token broadcasts and SMS push notifications.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
