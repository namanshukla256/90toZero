import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';
import CibilDetailedView from '../../components/nbfc/CibilDetailedView';
import LoanApprovalModal from '../../components/nbfc/LoanApprovalModal';

interface LoanApplication {
    id: string;
    candidateName: string;
    candidateEmail: string;
    jobTitle: string;
    companyName: string;
    loanAmount: number;
    tenure: number;
    currentCTC: number;
    creditScore: number;
    riskCategory: 'low' | 'medium' | 'high';
    status: 'pending' | 'under_review' | 'approved' | 'rejected';
    appliedDate: string;
    noticePeriod: number;
    experience: number;
    employmentStatus: 'verified' | 'pending' | 'not_verified';
    monthlyEMI?: number;
    interestRate?: number;
}

const LoanApplications: React.FC = () => {
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedRisk, setSelectedRisk] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedApplication, setSelectedApplication] = useState<LoanApplication | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showCibilModal, setShowCibilModal] = useState(false);
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [cibilCandidate, setCibilCandidate] = useState<{ name: string; score: number } | null>(null);

    // Dummy loan applications data
    const [applications] = useState<LoanApplication[]>([
        {
            id: 'loan1',
            candidateName: 'Rajesh Kumar',
            candidateEmail: 'rajesh.k@email.com',
            jobTitle: 'Senior Full Stack Developer',
            companyName: 'TechCorp India',
            loanAmount: 80000,
            tenure: 12,
            currentCTC: 1200000,
            creditScore: 750,
            riskCategory: 'low',
            status: 'pending',
            appliedDate: '2024-01-28',
            noticePeriod: 60,
            experience: 6,
            employmentStatus: 'verified',
            monthlyEMI: 7100,
            interestRate: 12,
        },
        {
            id: 'loan2',
            candidateName: 'Priya Sharma',
            candidateEmail: 'priya.s@email.com',
            jobTitle: 'Frontend Developer',
            companyName: 'WebSolutions Ltd',
            loanAmount: 50000,
            tenure: 9,
            currentCTC: 1000000,
            creditScore: 680,
            riskCategory: 'medium',
            status: 'under_review',
            appliedDate: '2024-01-27',
            noticePeriod: 45,
            experience: 4,
            employmentStatus: 'verified',
            monthlyEMI: 5800,
            interestRate: 13,
        },
        {
            id: 'loan3',
            candidateName: 'Amit Patel',
            candidateEmail: 'amit.p@email.com',
            jobTitle: 'DevOps Engineer',
            companyName: 'CloudSys Inc',
            loanAmount: 140000,
            tenure: 18,
            currentCTC: 1400000,
            creditScore: 720,
            riskCategory: 'low',
            status: 'approved',
            appliedDate: '2024-01-25',
            noticePeriod: 90,
            experience: 7,
            employmentStatus: 'verified',
            monthlyEMI: 8900,
            interestRate: 11.5,
        },
        {
            id: 'loan4',
            candidateName: 'Sneha Reddy',
            candidateEmail: 'sneha.r@email.com',
            jobTitle: 'Backend Developer',
            companyName: 'DataCore Systems',
            loanAmount: 73333,
            tenure: 12,
            currentCTC: 1100000,
            creditScore: 640,
            riskCategory: 'medium',
            status: 'pending',
            appliedDate: '2024-01-26',
            noticePeriod: 60,
            experience: 5,
            employmentStatus: 'pending',
            monthlyEMI: 6500,
            interestRate: 13.5,
        },
        {
            id: 'loan5',
            candidateName: 'Vikram Singh',
            candidateEmail: 'vikram.s@email.com',
            jobTitle: 'Product Manager',
            companyName: 'InnovateTech',
            loanAmount: 100000,
            tenure: 15,
            currentCTC: 1800000,
            creditScore: 780,
            riskCategory: 'low',
            status: 'approved',
            appliedDate: '2024-01-24',
            noticePeriod: 60,
            experience: 8,
            employmentStatus: 'verified',
            monthlyEMI: 7200,
            interestRate: 11,
        },
        {
            id: 'loan6',
            candidateName: 'Kavya Iyer',
            candidateEmail: 'kavya.i@email.com',
            jobTitle: 'UI/UX Designer',
            companyName: 'DesignHub',
            loanAmount: 45000,
            tenure: 9,
            currentCTC: 900000,
            creditScore: 600,
            riskCategory: 'high',
            status: 'rejected',
            appliedDate: '2024-01-23',
            noticePeriod: 45,
            experience: 3,
            employmentStatus: 'not_verified',
            monthlyEMI: 5300,
            interestRate: 15,
        },
    ]);

    // Filter applications
    const filteredApplications = applications.filter((app) => {
        const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
        const matchesRisk = selectedRisk === 'all' || app.riskCategory === selectedRisk;
        const matchesSearch =
            searchQuery === '' ||
            app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.companyName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesRisk && matchesSearch;
    });

    // Stats
    const stats = {
        total: applications.length,
        pending: applications.filter((a) => a.status === 'pending').length,
        underReview: applications.filter((a) => a.status === 'under_review').length,
        approved: applications.filter((a) => a.status === 'approved').length,
        rejected: applications.filter((a) => a.status === 'rejected').length,
        avgLoanAmount: Math.round(applications.reduce((sum, a) => sum + a.loanAmount, 0) / applications.length),
        avgCreditScore: Math.round(applications.reduce((sum, a) => sum + a.creditScore, 0) / applications.length),
    };

    const getRiskColor = (risk: string) => {
        const colors: Record<string, string> = {
            low: 'bg-green-100 text-green-800',
            medium: 'bg-yellow-100 text-yellow-800',
            high: 'bg-red-100 text-red-800',
        };
        return colors[risk] || 'bg-gray-100 text-gray-800';
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            under_review: 'bg-blue-100 text-blue-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getEmploymentStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            verified: 'bg-green-100 text-green-800',
            pending: 'bg-yellow-100 text-yellow-800',
            not_verified: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const handleViewDetails = (app: LoanApplication) => {
        setSelectedApplication(app);
        setShowModal(true);
    };

    const handleReview = (app: LoanApplication) => {
        setSelectedApplication(app);
        setShowApprovalModal(true);
    };

    const handleViewCibil = (app: LoanApplication) => {
        setCibilCandidate({ name: app.candidateName, score: app.creditScore });
        setShowCibilModal(true);
    };

    const handleApprove = (decision: any) => {
        console.log('Loan approved:', decision);
        alert(`Loan approved for ${selectedApplication?.candidateName}!`);
        setShowApprovalModal(false);
        setSelectedApplication(null);
    };

    const handleReject = (reason: string) => {
        console.log('Loan rejected:', reason);
        alert(`Loan rejected for ${selectedApplication?.candidateName}`);
        setShowApprovalModal(false);
        setSelectedApplication(null);
    };

    const calculateEMI = (principal: number, rate: number, tenure: number) => {
        const monthlyRate = rate / (12 * 100);
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
        return Math.round(emi);
    };

    return (
        <DashboardLayout
            title="Loan Applications"
            showBackButton={true}
            backTo="/nbfc/dashboard"
            breadcrumbs={[
                { label: 'Dashboard', href: '/nbfc/dashboard' },
                { label: 'Loan Applications' }
            ]}
        >
            <div className="p-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Loan Applications</h1>
                    <p className="text-gray-600 mt-1">Review and process loan applications</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Pending</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Under Review</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.underReview}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Approved</p>
                        <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Rejected</p>
                        <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Avg Loan</p>
                        <p className="text-2xl font-bold text-purple-600">₹{(stats.avgLoanAmount / 1000).toFixed(0)}K</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Avg Score</p>
                        <p className="text-2xl font-bold text-indigo-600">{stats.avgCreditScore}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search by candidate or company..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Status
                            </label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Statuses</option>
                                <option value="pending">Pending</option>
                                <option value="under_review">Under Review</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Risk Category
                            </label>
                            <select
                                value={selectedRisk}
                                onChange={(e) => setSelectedRisk(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Risk Levels</option>
                                <option value="low">Low Risk</option>
                                <option value="medium">Medium Risk</option>
                                <option value="high">High Risk</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                    {filteredApplications.length === 0 ? (
                        <div className="bg-white p-12 rounded-lg shadow text-center">
                            <p className="text-gray-500 text-lg">No applications found</p>
                        </div>
                    ) : (
                        filteredApplications.map((app) => (
                            <div key={app.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-gray-900">{app.candidateName}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                                                {app.status.replace('_', ' ').toUpperCase()}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(app.riskCategory)}`}>
                                                {app.riskCategory.toUpperCase()} RISK
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getEmploymentStatusColor(app.employmentStatus)}`}>
                                                {app.employmentStatus.replace('_', ' ').toUpperCase()}
                                            </span>
                                        </div>
                                        <p className="text-gray-600">{app.jobTitle} at {app.companyName}</p>
                                        <p className="text-sm text-gray-500 mt-1">Applied on {new Date(app.appliedDate).toLocaleDateString()}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-blue-600">₹{app.loanAmount.toLocaleString()}</p>
                                        <p className="text-sm text-gray-600">{app.tenure} months</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Credit Score</p>
                                        <p className="font-semibold text-gray-900 text-lg">{app.creditScore}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Current CTC</p>
                                        <p className="font-semibold text-gray-900">₹{(app.currentCTC / 100000).toFixed(1)}L</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Experience</p>
                                        <p className="font-semibold text-gray-900">{app.experience} years</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Notice Period</p>
                                        <p className="font-semibold text-gray-900">{app.noticePeriod} days</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Monthly EMI</p>
                                        <p className="font-semibold text-gray-900">₹{app.monthlyEMI?.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <p className="text-blue-700">EMI/CTC Ratio</p>
                                            <p className="font-semibold text-blue-900">{((app.monthlyEMI! / (app.currentCTC / 12)) * 100).toFixed(1)}%</p>
                                        </div>
                                        <div>
                                            <p className="text-blue-700">Loan/Annual CTC</p>
                                            <p className="font-semibold text-blue-900">{((app.loanAmount / app.currentCTC) * 100).toFixed(1)}%</p>
                                        </div>
                                        <div>
                                            <p className="text-blue-700">Interest Rate</p>
                                            <p className="font-semibold text-blue-900">{app.interestRate}% p.a.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleViewCibil(app)}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                        CIBIL Report
                                    </button>
                                    {(app.status === 'pending' || app.status === 'under_review') && (
                                        <button
                                            onClick={() => handleReview(app)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            Review & Approve
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleViewDetails(app)}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Full Details
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Details Modal */}
                {showModal && selectedApplication && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{selectedApplication.candidateName}</h2>
                                        <p className="text-gray-600 mt-1">{selectedApplication.jobTitle}</p>
                                    </div>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-gray-400 hover:text-gray-600 text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Loan Details</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Loan Amount</p>
                                                <p className="font-semibold text-lg">₹{selectedApplication.loanAmount.toLocaleString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Tenure</p>
                                                <p className="font-semibold text-lg">{selectedApplication.tenure} months</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Interest Rate</p>
                                                <p className="font-semibold text-lg">{selectedApplication.interestRate}% p.a.</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Monthly EMI</p>
                                                <p className="font-semibold text-lg">₹{selectedApplication.monthlyEMI?.toLocaleString()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Candidate Profile</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Current CTC</p>
                                                <p className="font-semibold">₹{(selectedApplication.currentCTC / 100000).toFixed(1)}L</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Experience</p>
                                                <p className="font-semibold">{selectedApplication.experience} years</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Notice Period</p>
                                                <p className="font-semibold">{selectedApplication.noticePeriod} days</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Email</p>
                                                <p className="font-semibold text-sm">{selectedApplication.candidateEmail}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Risk Assessment</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Credit Score</p>
                                                <p className="font-semibold text-2xl">{selectedApplication.creditScore}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Risk Category</p>
                                                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getRiskColor(selectedApplication.riskCategory)}`}>
                                                    {selectedApplication.riskCategory.toUpperCase()}
                                                </span>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">EMI/Income Ratio</p>
                                                <p className="font-semibold">{((selectedApplication.monthlyEMI! / (selectedApplication.currentCTC / 12)) * 100).toFixed(1)}%</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Employment Status</p>
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getEmploymentStatusColor(selectedApplication.employmentStatus)}`}>
                                                    {selectedApplication.employmentStatus.replace('_', ' ').toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">New Employer</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Company</p>
                                                <p className="font-semibold">{selectedApplication.companyName}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Position</p>
                                                <p className="font-semibold">{selectedApplication.jobTitle}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Close
                                    </button>
                                    {(selectedApplication.status === 'pending' || selectedApplication.status === 'under_review') && (
                                        <button
                                            onClick={() => {
                                                setShowModal(false);
                                                handleReview(selectedApplication);
                                            }}
                                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                        >
                                            Review Application
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Review Modal */}
                {showReviewModal && selectedApplication && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Review Loan Application</h2>
                                        <p className="text-gray-600 mt-1">{selectedApplication.candidateName} - ₹{selectedApplication.loanAmount.toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => setShowReviewModal(false)}
                                        className="text-gray-400 hover:text-gray-600 text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Decision
                                        </label>
                                        <select
                                            value={reviewForm.decision}
                                            onChange={(e) => setReviewForm({ ...reviewForm, decision: e.target.value as 'approved' | 'rejected' })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="approved">Approve</option>
                                            <option value="rejected">Reject</option>
                                        </select>
                                    </div>

                                    {reviewForm.decision === 'approved' && (
                                        <>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Interest Rate (% p.a.)
                                                </label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={reviewForm.interestRate}
                                                    onChange={(e) => setReviewForm({ ...reviewForm, interestRate: Number(e.target.value) })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Tenure (months)
                                                </label>
                                                <input
                                                    type="number"
                                                    value={reviewForm.tenure}
                                                    onChange={(e) => setReviewForm({ ...reviewForm, tenure: Number(e.target.value) })}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>

                                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                <p className="text-sm text-blue-900 mb-2">
                                                    <span className="font-semibold">Calculated EMI:</span> ₹
                                                    {calculateEMI(selectedApplication.loanAmount, reviewForm.interestRate, reviewForm.tenure).toLocaleString()}
                                                </p>
                                                <p className="text-xs text-blue-700">
                                                    Total Interest: ₹{(calculateEMI(selectedApplication.loanAmount, reviewForm.interestRate, reviewForm.tenure) * reviewForm.tenure - selectedApplication.loanAmount).toLocaleString()}
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Comments
                                        </label>
                                        <textarea
                                            value={reviewForm.comments}
                                            onChange={(e) => setReviewForm({ ...reviewForm, comments: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Add any comments or conditions..."
                                        />
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => setShowReviewModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleReviewSubmit}
                                        className={`flex-1 px-4 py-2 text-white rounded-lg transition-colors font-medium ${reviewForm.decision === 'approved'
                                            ? 'bg-green-600 hover:bg-green-700'
                                            : 'bg-red-600 hover:bg-red-700'
                                            }`}
                                    >
                                        Submit {reviewForm.decision === 'approved' ? 'Approval' : 'Rejection'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CIBIL Detailed View Modal */}
                {showCibilModal && cibilCandidate && (
                    <CibilDetailedView
                        score={cibilCandidate.score}
                        candidateName={cibilCandidate.name}
                        onClose={() => {
                            setShowCibilModal(false);
                            setCibilCandidate(null);
                        }}
                    />
                )}

                {/* Loan Approval Modal */}
                {showApprovalModal && selectedApplication && (
                    <LoanApprovalModal
                        application={{
                            id: selectedApplication.id,
                            candidateName: selectedApplication.candidateName,
                            loanAmount: selectedApplication.loanAmount,
                            creditScore: selectedApplication.creditScore,
                            currentCTC: selectedApplication.currentCTC,
                            noticePeriod: selectedApplication.noticePeriod,
                            tenure: selectedApplication.tenure,
                            riskCategory: selectedApplication.riskCategory,
                        }}
                        onClose={() => {
                            setShowApprovalModal(false);
                            setSelectedApplication(null);
                        }}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                )}
            </div>
        </DashboardLayout>
    );
};

export default LoanApplications;
