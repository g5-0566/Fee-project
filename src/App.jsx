import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { QueueProvider } from './context/QueueContext.jsx';

// Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Pages
import Home from './pages/Home.jsx';
import SearchPage from './pages/Search.jsx';
import Organisation from './pages/Organisation.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

// Customer Pages
import Dashboard from './pages/dashboard/Dashboard.jsx';
import MyQueue from './pages/dashboard/MyQueue.jsx';
import Favourites from './pages/dashboard/Favourites.jsx';
import Profile from './pages/dashboard/Profile.jsx';

// Staff Pages
import StaffDashboard from './pages/staff/StaffDashboard.jsx';
import StaffQueue from './pages/staff/StaffQueue.jsx';
import Counters from './pages/staff/Counters.jsx';
import QueueHistory from './pages/staff/QueueHistory.jsx';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminOrganisations from './pages/admin/Organisations.jsx';
import AdminUsers from './pages/admin/Users.jsx';
import Analytics from './pages/admin/Analytics.jsx';

/**
 * ScrollToTop helper
 * Ensures view scrolls to top upon page navigation
 */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

/**
 * Main Layout wrapper with sticky Navbar and semantic Footer
 */
function Layout() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <main className="main-content" id="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <QueueProvider>
            <ScrollToTop />
            <Routes>
              {/* Public & Customer Routes under main Layout */}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="organisation/:id" element={<Organisation />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="about" element={<About />} />

                {/* Protected Customer Routes */}
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute allowedRoles={['CUSTOMER', 'STAFF', 'ADMIN']}>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="dashboard/queue"
                  element={
                    <ProtectedRoute allowedRoles={['CUSTOMER', 'STAFF', 'ADMIN']}>
                      <MyQueue />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="dashboard/favourites"
                  element={
                    <ProtectedRoute allowedRoles={['CUSTOMER', 'STAFF', 'ADMIN']}>
                      <Favourites />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="dashboard/profile"
                  element={
                    <ProtectedRoute allowedRoles={['CUSTOMER', 'STAFF', 'ADMIN']}>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Staff Routes */}
                <Route
                  path="staff"
                  element={
                    <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
                      <StaffDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="staff/queue"
                  element={
                    <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
                      <StaffQueue />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="staff/counters"
                  element={
                    <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
                      <Counters />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="staff/history"
                  element={
                    <ProtectedRoute allowedRoles={['STAFF', 'ADMIN']}>
                      <QueueHistory />
                    </ProtectedRoute>
                  }
                />

                {/* Protected Admin Routes */}
                <Route
                  path="admin"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/organisations"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminOrganisations />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/users"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <AdminUsers />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="admin/analytics"
                  element={
                    <ProtectedRoute allowedRoles={['ADMIN']}>
                      <Analytics />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Catch-All */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </QueueProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
