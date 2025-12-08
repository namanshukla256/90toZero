import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BuyoutCalculator from './pages/BuyoutCalculator';

// Protected Route
import ProtectedRoute from './components/ProtectedRoute';
import { UserType } from './types';

// Dashboard placeholders (to be created)
import CandidateDashboard from './pages/candidate/Dashboard.tsx';
import CompanyDashboard from './pages/company/Dashboard.tsx';
import NBFCDashboard from './pages/nbfc/Dashboard.tsx';
import AdminDashboard from './pages/admin/Dashboard.tsx';

// Profile creation pages (to be created)
import CandidateProfileCreate from './pages/candidate/ProfileCreate.tsx';
import CompanyProfileCreate from './pages/company/ProfileCreate.tsx';
import NBFCProfileCreate from './pages/nbfc/ProfileCreate.tsx';

function App() {
  const { checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/calculator" element={<BuyoutCalculator />} />

        {/* Candidate Routes */}
        <Route
          path="/candidate/dashboard"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.CANDIDATE]}>
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/profile/create"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.CANDIDATE]}>
              <CandidateProfileCreate />
            </ProtectedRoute>
          }
        />

        {/* Company Routes */}
        <Route
          path="/company/dashboard"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.COMPANY]}>
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/profile/create"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.COMPANY]}>
              <CompanyProfileCreate />
            </ProtectedRoute>
          }
        />

        {/* NBFC Routes */}
        <Route
          path="/nbfc/dashboard"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.NBFC]}>
              <NBFCDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nbfc/profile/create"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.NBFC]}>
              <NBFCProfileCreate />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.ADMIN]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<div className="p-8 text-center">404 - Page Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
