# QUEUELESS — "Know the Queue Before You Go"

> **Academic Project V1** | 2nd Year Computer Science & Engineering  
> A smart, accessible web application designed to reduce physical waiting room congestion, display real-time queue metrics, and allow citizens to check queue status and take digital tokens before travelling.

---

## 1. Problem Statement
In developing and urban areas, people routinely visit hospitals, diagnostic laboratories, public banks, municipal licensing offices (RTO), college registrar desks, and customer service centres without prior knowledge of how crowded they are. 

### The Real-World Consequences:
- **Severe Time Wastage:** Citizens spend 45 minutes to 3 hours sitting idle in crowded waiting halls.
- **Health Risks & Infection Transmission:** Overcrowded hospital and pathology waiting rooms accelerate the transmission of airborne illnesses.
- **Frustration & Unpredictability:** Lack of transparency regarding active counter throughput leads to anxiety and dispute at reception desks.

---

## 2. Proposed Solution
**QueueLess** bridges the information gap between physical service centres and citizens:
1. **Live Queue Monitoring:** View current waiting counts, currently serving token numbers, and active service counters before leaving home.
2. **Dynamic Waiting Time Calculation:** Real-time waiting time estimation based on:
   $$\text{Estimated Wait Time} = \frac{\text{People Waiting} \times \text{Average Service Time}}{\text{Active Counters}}$$
3. **Digital Queue Tokens:** Citizens can join the virtual queue remotely, receive a live digital token ticket, and arrive "just-in-time" when their turn is called.
4. **Role-Based Management:** Dedicated operational consoles for service staff to call next tokens and manage counters, alongside administrative oversight and traffic analytics.

---

## 3. Key Features by User Role

### 👤 Customer (Citizen)
- **Home & Search Portal:** Instant search by name, category, and city location with filter chips and sorting (Shortest Wait, Longest Wait, Smallest Queue, Largest Queue).
- **Facility Live Details (`/organisation/:id`):** View active counters, services offered, estimated service duration, and real-time status (LOW, MODERATE, BUSY).
- **Service Selection & Remote Queue Joining:** Choose a specific service desk and take an instant digital token.
- **Live Ticket Tracker (`/dashboard/queue`):** Real-time progress bar, people ahead countdown, and automated situational alert banners ("Your turn is approaching!", "Your turn has arrived!").
- **Favourites Bookmarking (`/dashboard/favourites`):** Save frequently visited places to LocalStorage for quick access.
- **Profile & Activity History:** View past completed visits and contact information.

### 💼 Service Staff Desk
- **Queue Operator Console (`/staff`):** Hero token display showing currently serving token with **"Call Next Token"** and **"Call Previous"** controls.
- **Queue Ticket Table (`/staff/queue`):** Status tabs (`ALL`, `WAITING`, `SERVING`, `COMPLETED`, `CANCELLED`) with quick actions (Serve, Complete, Skip).
- **Counter Operations (`/staff/counters`):** Activate and deactivate physical service counters. Toggling a counter automatically updates the live wait time calculation across the entire platform.
- **Historic Logs (`/staff/history`):** Review turnaround duration, timestamps, and completed customer sessions.

### 🛡️ System Administrator
- **Network Operations Center (`/admin`):** High-level KPI cards (Total Facilities, Total in Queues, Active Counters, Enrolled Users).
- **Organisation Management (`/admin/organisations`):** Full CRUD modal interface to add new facilities, edit parameters, configure service times, or remove organisations.
- **User Directory (`/admin/users`):** View enrolled customers, staff, and admins with role-based filtering and instant search.
- **Analytics & Trends (`/admin/analytics`):** Pure HTML/CSS accessible charts showing peak queue hours (8 AM - 5 PM), sector waiting time benchmarks, and daily token throughput.

---

## 4. Technology Stack (2nd-Year CSE Syllabus)

| Technology | Implementation Scope |
|---|---|
| **HTML5** | Semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`), accessible form controls with explicit `<label>` bindings, WCAG AA contrast. |
| **CSS3** | CSS Custom Properties (Variables) for instant light/dark mode theming, mobile-first responsive flexbox, responsive CSS grid, card designs, and button states. **Zero external CSS frameworks.** |
| **JavaScript (ES6+)** | Arrow functions, template literals, destructuring, spread/rest operators, modules (`import`/`export`), Promises, `async/await`, Array methods (`filter`, `map`, `sort`, `reduce`, `some`, `includes`). |
| **React 19** | Functional components, state lifting, controlled forms, custom hooks (`useLocalStorage`, `useQueue`, `useAuth`, `useTheme`), `useMemo` for search filters, `useRef` for search focus, `useCallback`. |
| **React Router** | Client-side SPA routing, dynamic route parameters (`/organisation/:id`), query string state (`useSearchParams`), role-based protected routes, and custom 404 page. |
| **Browser Storage** | `localStorage` persistence for authentication sessions, queue token states, saved favourites, and user preferences. |

---

## 5. Project Directory Structure

```
queueless/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Button.jsx           # Reusable accessible button variants
│   │   ├── Input.jsx            # Form input with accessible labels and errors
│   │   ├── Navbar.jsx           # Role-adaptive top navigation + theme toggle
│   │   ├── Footer.jsx           # Semantic footer with academic notices
│   │   ├── SearchBar.jsx        # Search input with clear button and focus ref
│   │   ├── OrganisationCard.jsx # Live queue cards with real-time stats
│   │   ├── CategoryCard.jsx     # Category browser card
│   │   ├── QueueCard.jsx        # Active live ticket card with progress bar
│   │   ├── QueueStats.jsx       # 4-metric counter summary grid
│   │   ├── StatusBadge.jsx      # Accessible status indicator (LOW, MODERATE, BUSY)
│   │   ├── ServiceCard.jsx      # Service selection card with radio state
│   │   ├── StatsCard.jsx        # Dashboard metric tile
│   │   ├── Sidebar.jsx          # Modular dashboard sidebar navigation
│   │   ├── ProtectedRoute.jsx   # Role-based route guard
│   │   ├── LoadingState.jsx     # Accessible spinner state
│   │   └── EmptyState.jsx       # Fallback empty message card
│   ├── context/
│   │   ├── AuthContext.jsx      # Simulated user session context
│   │   ├── QueueContext.jsx     # Real-time simulated queue state & interval loop
│   │   └── ThemeContext.jsx     # Light / Dark theme switcher
│   ├── data/
│   │   └── mockData.js          # Entities: 12 organisations, users, counters, history
│   ├── hooks/
│   │   ├── useLocalStorage.js   # Custom hook for persistent LocalStorage state
│   │   └── useQueue.js          # Convenience hook for queue context
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── AdminDashboard.jsx  # System overview
│   │   │   ├── Analytics.jsx       # Pure CSS/HTML bar charts & trends
│   │   │   ├── Organisations.jsx   # Facility CRUD modal manager
│   │   │   └── Users.jsx           # User directory with role filters
│   │   ├── dashboard/
│   │   │   ├── Dashboard.jsx       # Customer portal overview
│   │   │   ├── Favourites.jsx      # Bookmarked locations
│   │   │   ├── MyQueue.jsx         # Live active ticket tracker
│   │   │   └── Profile.jsx         # Personal contact details
│   │   ├── staff/
│   │   │   ├── Counters.jsx        # Physical counter activation controls
│   │   │   ├── QueueHistory.jsx    # Completed turnaround logs
│   │   │   ├── StaffDashboard.jsx  # Token calling console (Next / Prev)
│   │   │   └── StaffQueue.jsx      # Ticket management table
│   │   ├── About.jsx            # Project architecture & syllabus mapping
│   │   ├── Home.jsx             # Landing page with hero, sectors & live queues
│   │   ├── Login.jsx            # Simulated sign in with 1-click demo accounts
│   │   ├── NotFound.jsx         # 404 error page
│   │   ├── Organisation.jsx     # Facility details & queue joining
│   │   ├── Register.jsx         # Controlled registration form
│   │   └── Search.jsx           # Directory filter, search & sort
│   ├── services/
│   │   └── api.js               # Mock API layer simulating async network calls
│   ├── App.tsx                  # Master router and layout hierarchy
│   ├── index.css                # Pure CSS design system and variables
│   └── main.tsx                 # React DOM mount point
├── index.html                   # HTML entry point with metadata and Google Fonts
├── metadata.json                # Project metadata
└── README.md                    # Project documentation & viva guide
```

---

## 6. Demo Accounts (1-Click Login Available)

On the **Login page (`/login`)**, click any of the one-click credential buttons or enter:

| Role | Email | Password | Access Rights |
|---|---|---|---|
| **Customer** | `user@example.com` | `123456` | Search queues, join digital line, track tickets, favourites |
| **Staff** | `staff@example.com` | `123456` | Operator console, call next token, activate/deactivate counters |
| **Admin** | `admin@example.com` | `123456` | Operations center, add/edit organisations, user directory, analytics |

---

## 7. Real-Time Simulation Engine (How It Works)

In this **Academic V1** prototype, queue updates are generated locally inside the browser:
- `QueueContext.jsx` runs an automated background cycle (`setInterval` at 7-second intervals).
- Each cycle randomly selects an active organisation, increments its `currentToken`, and decrements its waiting queue count.
- If a customer holds an active ticket for that organisation, their `peopleAhead` count decrements automatically in real-time.
- When `peopleAhead` reaches 0, the ticket status changes to `SERVING` and displays:  
  **"Your turn has arrived! Please proceed to the active counter."**
- A **Simulation Toggle button** in the navigation header allows teachers and evaluators to pause or resume the background loop during presentations.

---

## 8. Academic Evaluation & Viva Voce Q&A Guide

### Q1: Why was React selected instead of plain HTML/Vanilla JS?
**Answer:** React enables a declarative component-driven architecture. In a real-time queue application, state changes frequently (tokens incrementing, wait times recalculating). React's virtual DOM reconciliation and unidirectional data flow ensure that only the affected metric badges re-render without reloading the page, creating a smooth and responsive user experience.

### Q2: Why is a browser-side simulation used instead of a real backend in V1?
**Answer:** In the 2nd-year CSE curriculum, the primary evaluation objective is mastering frontend design systems, client-side routing, state lifting, React Hooks, and component hierarchy. Simulating the backend via `setInterval` and `LocalStorage` allows comprehensive testing of all dynamic UI states (empty, loading, queue progression, alerts) without dependency on external server infrastructure.

### Q3: How is the estimated waiting time calculated mathematically?
**Answer:**
$$\text{Estimated Wait Time (mins)} = \max\left(1, \text{round}\left(\frac{\text{Queue Length} \times \text{Average Service Time}}{\text{Number of Active Counters}}\right)\right)$$
If a clinic has 20 people waiting, an average consultation time of 6 minutes, and 2 active doctor counters:
$$\text{Wait Time} = \frac{20 \times 6}{2} = 60 \text{ minutes}$$
If a 3rd counter is activated via the Staff Counter panel, the wait time automatically drops to $40\text{ minutes}$.

### Q4: How is data persisted across browser refreshes?
**Answer:** We implemented a custom hook `useLocalStorage(key, initialValue)` that interfaces with the browser's Web Storage API. It serializes state into JSON strings upon mutation and safely parses stored records with `try...catch` fallback handling upon initialization.

### Q5: What is the future scope for subsequent semesters?
**Answer:**
1. **Phase V2 (Backend API):** Replace `services/api.js` with an Express.js / Node.js REST API.
2. **Phase V3 (Relational DBMS):** Connect to MySQL using normalized schemas for `USERS`, `ORGANISATIONS`, `SERVICES`, `COUNTERS`, and `TOKENS`.
3. **Phase V4 (WebSockets & Hardware):** Implement Socket.io for bi-directional live broadcasting, Twilio for SMS token alerts, and QR code token scanners at physical reception kiosks.
