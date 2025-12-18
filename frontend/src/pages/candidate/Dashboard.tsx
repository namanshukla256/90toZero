import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { candidateService } from '../../services/profile.service';
import { useProfileStore } from '../../store';

const CandidateDashboard = () => {
    const navigate = useNavigate();
    const { candidateProfile, setCandidateProfile } = useProfileStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Mock stats - in production, these would come from API
    const [stats] = useState({
        applications: 4,
        interviews: 1,
        offers: 1,
        loans: 1,
        documentsUploaded: 3,
        profileCompletion: 85,
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profile = await candidateService.getProfile();
                setCandidateProfile(profile);
            } catch (err: any) {
                if (err.response?.status === 404) {
                    // Profile doesn't exist, redirect will happen
                } else {
                    setError('Failed to load profile');
                }
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [setCandidateProfile]);

    if (loading) {
        return (
            <DashboardLayout title="Dashboard">
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500">Loading...</div>
                </div>
            </DashboardLayout>
        );
    }

    if (!candidateProfile) {
        return (
            <DashboardLayout title="Dashboard">
                <div className="card text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
                    <p className="text-gray-600 mb-6">
                        Please complete your profile to access all features
                    </p>
                    <Link to="/candidate/profile/create" className="btn-primary inline-block">
                        Create Profile
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const calculateBuyoutAmount = () => {
        if (!candidateProfile.current_ctc || !candidateProfile.notice_period_days) return 0;
        const monthlySalary = candidateProfile.current_ctc / 12;
        const dailySalary = monthlySalary / 30;
        return Math.round(dailySalary * candidateProfile.notice_period_days);
    };

    return (
        <DashboardLayout title="Candidate Dashboard">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-sm p-6 mb-6 text-white">
                <h2 className="text-2xl font-bold mb-2">Welcome back, {candidateProfile.full_name}!</h2>
                <p className="opacity-90">Ready to find your next opportunity?</p>
            </div>

            {/* Quick Actions - Moved to top */}
            <div className="card mb-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button
                        onClick={() => navigate('/candidate/jobs')}
                        className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">Browse Jobs</span>
                    </button>
                    <button
                        onClick={() => navigate('/candidate/calculator')}
                        className="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">Calculator</span>
                    </button>
                    <button
                        onClick={() => navigate('/candidate/applications')}
                        className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                        <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">Applications</span>
                    </button>
                    <button
                        onClick={() => navigate('/candidate/loans')}
                        className="flex flex-col items-center gap-2 p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors"
                    >
                        <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <span className="text-sm font-medium text-gray-900">My Loans</span>
                    </button>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div
                    onClick={() => navigate('/candidate/applications')}
                    className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl font-bold text-gray-900">{stats.applications}</div>
                        <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div className="text-sm text-gray-600">Applications</div>
                </div>

                <div
                    onClick={() => navigate('/candidate/applications')}
                    className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl font-bold text-gray-900">{stats.interviews}</div>
                        <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <div className="text-sm text-gray-600">Interviews</div>
                </div>

                <div
                    onClick={() => navigate('/candidate/applications')}
                    className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl font-bold text-gray-900">{stats.offers}</div>
                        <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="text-sm text-gray-600">Offers</div>
                </div>

                <div
                    onClick={() => navigate('/candidate/loans')}
                    className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl font-bold text-gray-900">{stats.loans}</div>
                        <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div className="text-sm text-gray-600">Active Loans</div>
                </div>
            </div>

            {/* Profile Summary & Actions */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div className="card">
                    <div className="text-sm text-gray-600 mb-1">Current CTC</div>
                    <div className="text-2xl font-bold text-primary-600">
                        {candidateProfile.current_ctc ? formatCurrency(candidateProfile.current_ctc) : 'Not set'}
                    </div>
                </div>

                <div className="card">
                    <div className="text-sm text-gray-600 mb-1">Expected CTC</div>
                    <div className="text-2xl font-bold text-green-600">
                        {candidateProfile.expected_ctc ? formatCurrency(candidateProfile.expected_ctc) : 'Not set'}
                    </div>
                </div>

                <div className="card">
                    <div className="text-sm text-gray-600 mb-1">Notice Period</div>
                    <div className="text-2xl font-bold text-orange-600">
                        {candidateProfile.notice_period_days || 0} days
                    </div>
                </div>
            </div>

            {/* Buyout Calculator Card */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Estimated Buyout Amount</h3>
                        <div className="text-3xl font-bold text-green-600 mb-3">
                            {formatCurrency(calculateBuyoutAmount())}
                        </div>
                        <p className="text-sm text-gray-700 mb-4">
                            Based on your current salary and {candidateProfile.notice_period_days} days notice period
                        </p>
                        <button
                            onClick={() => navigate('/candidate/calculator')}
                            className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
                        >
                            Calculate EMI Options
                        </button>
                    </div>
                    <svg className="w-20 h-20 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                </div>
            </div>

            {/* Profile Completion & Documents */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="card">
                    <h3 className="text-xl font-bold mb-4">Profile Completion</h3>
                    <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                            <span>Profile Strength</span>
                            <span className="font-semibold">{stats.profileCompletion}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3">
                            <div
                                className="bg-blue-600 h-3 rounded-full transition-all"
                                style={{ width: `${stats.profileCompletion}%` }}
                            />
                        </div>
                    </div>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">Basic Information Complete</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">Skills Added</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span className="text-gray-700">Upload more documents</span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/candidate/profile/edit')}
                        className="mt-4 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                        Edit Profile
                    </button>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold">Documents</h3>
                        <span className="text-sm font-medium text-blue-600">{stats.documentsUploaded} uploaded</span>
                    </div>
                    <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm font-medium text-gray-900">Resume</span>
                            </div>
                            <span className="text-xs text-green-600 font-medium">Verified</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm font-medium text-gray-900">Aadhaar Card</span>
                            </div>
                            <span className="text-xs text-green-600 font-medium">Verified</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm font-medium text-gray-900">PAN Card</span>
                            </div>
                            <span className="text-xs text-yellow-600 font-medium">Pending</span>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate('/candidate/documents')}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Manage Documents
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CandidateDashboard;
