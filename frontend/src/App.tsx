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

// Profile creation pages
import CandidateProfileCreate from './pages/candidate/ProfileCreate.tsx';
import CompanyProfileCreate from './pages/company/ProfileCreate.tsx';
import NBFCProfileCreate from './pages/nbfc/ProfileCreate.tsx';

// Candidate feature pages
import CandidateBuyoutCalculator from './pages/candidate/BuyoutCalculator.tsx';
import CandidateJobs from './pages/candidate/Jobs.tsx';
import CandidateApplications from './pages/candidate/Applications.tsx';
import CandidateLoans from './pages/candidate/Loans.tsx';
import CandidateDocuments from './pages/candidate/Documents.tsx';

// Company feature pages
import CompanyJobs from './pages/company/Jobs.tsx';
import CompanyCandidates from './pages/company/CandidateSearch.tsx';
import CompanyApplications from './pages/company/Applications.tsx';
import CompanyAnalytics from './pages/company/Analytics.tsx';

// NBFC feature pages
import NBFCApplications from './pages/nbfc/LoanApplications.tsx';
import NBFCPortfolio from './pages/nbfc/Portfolio.tsx';
import NBFCAnalytics from './pages/nbfc/Analytics.tsx';
import NBFCSettings from './pages/nbfc/Settings.tsx';

// Admin feature pages
import AdminUsers from './pages/admin/Users.tsx';
import AdminVerifications from './pages/admin/Verifications.tsx';
import AdminTransactions from './pages/admin/Transactions.tsx';
import AdminAnalytics from './pages/admin/Analytics.tsx';
import AdminSettings from './pages/admin/Settings.tsx';

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
        <Route
          path="/candidate/calculator"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.CANDIDATE]}>
              <CandidateBuyoutCalculator />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/jobs"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.CANDIDATE]}>
              <CandidateJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/applications"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.CANDIDATE]}>
              <CandidateApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/loans"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.CANDIDATE]}>
              <CandidateLoans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidate/documents"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.CANDIDATE]}>
              <CandidateDocuments />
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
        <Route
          path="/company/jobs"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.COMPANY]}>
              <CompanyJobs />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/candidates"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.COMPANY]}>
              <CompanyCandidates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/applications"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.COMPANY]}>
              <CompanyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company/analytics"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.COMPANY]}>
              <CompanyAnalytics />
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
        <Route
          path="/nbfc/applications"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.NBFC]}>
              <NBFCApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nbfc/portfolio"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.NBFC]}>
              <NBFCPortfolio />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nbfc/analytics"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.NBFC]}>
              <NBFCAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/nbfc/settings"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.NBFC]}>
              <NBFCSettings />
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
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.ADMIN]}>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/verifications"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.ADMIN]}>
              <AdminVerifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/transactions"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.ADMIN]}>
              <AdminTransactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/analytics"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.ADMIN]}>
              <AdminAnalytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute allowedUserTypes={[UserType.ADMIN]}>
              <AdminSettings />
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
