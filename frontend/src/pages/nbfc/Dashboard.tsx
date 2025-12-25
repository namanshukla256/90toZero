import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';
import PendingLoansWidget from '../../components/nbfc/PendingLoansWidget';
import CibilDetailedView from '../../components/nbfc/CibilDetailedView';
import LoanApprovalModal from '../../components/nbfc/LoanApprovalModal';

interface StatCard {
    label: string;
    value: number | string;
    change: number;
    changeType: 'increase' | 'decrease';
    icon: string;
    color: string;
}

interface LoanApplication {
    id: string;
    candidateName: string;
    loanAmount: number;
    creditScore: number;
    status: string;
    appliedDate: string;
}

interface ActiveLoan {
    id: string;
    candidateName: string;
    principalAmount: number;
    outstandingAmount: number;
    nextDueDate: string;
    status: string;
}

const NBFCDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [showCibilModal, setShowCibilModal] = useState(false);
    const [showApprovalModal, setShowApprovalModal] = useState(false);
    const [selectedApp, setSelectedApp] = useState<any>(null);
    const [cibilCandidate, setCibilCandidate] = useState<{ name: string; score: number } | null>(null);

    // Stats data
    const stats: StatCard[] = [
        { label: 'Total Applications', value: 24, change: 20, changeType: 'increase', icon: '📋', color: 'bg-blue-500' },
        { label: 'Pending Review', value: 8, change: 15, changeType: 'increase', icon: '⏳', color: 'bg-yellow-500' },
        { label: 'Active Loans', value: 32, change: 12, changeType: 'increase', icon: '💼', color: 'bg-green-500' },
        { label: 'Portfolio Value', value: '₹42.8L', change: 22, changeType: 'increase', icon: '💰', color: 'bg-purple-500' },
        { label: 'Collection Rate', value: '96.5%', change: 3, changeType: 'increase', icon: '✅', color: 'bg-emerald-500' },
        { label: 'Overdue Loans', value: 4, change: 25, changeType: 'decrease', icon: '⚠️', color: 'bg-orange-500' },
    ];

    // Pending applications
    const pendingApplications: LoanApplication[] = [
        { id: 'loan1', candidateName: 'Rajesh Kumar', loanAmount: 80000, creditScore: 750, status: 'pending', appliedDate: '2024-01-28' },
        { id: 'loan2', candidateName: 'Sneha Reddy', loanAmount: 73333, creditScore: 640, status: 'pending', appliedDate: '2024-01-26' },
        { id: 'loan3', candidateName: 'Arjun Mehta', loanAmount: 95000, creditScore: 720, status: 'under_review', appliedDate: '2024-01-27' },
    ];

    const handleViewCibil = (app: any) => {
        setCibilCandidate({ name: app.candidateName, score: app.creditScore });
        setShowCibilModal(true);
    };

    const handleReview = (app: any) => {
        setSelectedApp(app);
        setShowApprovalModal(true);
    };

    const handleApprove = (decision: any) => {
        console.log('Approved:', decision);
        alert(`Loan approved for ${selectedApp?.candidateName}!`);
        setShowApprovalModal(false);
        setSelectedApp(null);
    };

    const handleReject = (reason: string) => {
        console.log('Rejected:', reason);
        alert(`Loan rejected for ${selectedApp?.candidateName}`);
        setShowApprovalModal(false);
        setSelectedApp(null);
    };

    // Active loans requiring attention
    const activeLoans: ActiveLoan[] = [
        { id: 'loan3', candidateName: 'Sneha Reddy', principalAmount: 73333, outstandingAmount: 65000, nextDueDate: '2024-01-15', status: 'overdue' },
        { id: 'loan1', candidateName: 'Amit Patel', principalAmount: 140000, outstandingAmount: 115700, nextDueDate: '2024-02-05', status: 'active' },
        { id: 'loan2', candidateName: 'Vikram Singh', principalAmount: 100000, outstandingAmount: 50400, nextDueDate: '2024-02-10', status: 'active' },
    ];

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            under_review: 'bg-blue-100 text-blue-800',
            active: 'bg-green-100 text-green-800',
            overdue: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <DashboardLayout title="NBFC Dashboard">
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">NBFC Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back! Here's your portfolio overview</p>
                </div>

                {/* Quick Actions - Moved to top */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Link
                            to="/nbfc/applications"
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-lg transition-all text-center"
                        >
                            <div className="text-3xl mb-2">📋</div>
                            <p className="font-semibold">Review Applications</p>
                        </Link>
                        <Link
                            to="/nbfc/loans"
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-lg transition-all text-center"
                        >
                            <div className="text-3xl mb-2">💼</div>
                            <p className="font-semibold">Manage Loans</p>
                        </Link>
                        <Link
                            to="/nbfc/collections"
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-lg transition-all text-center"
                        >
                            <div className="text-3xl mb-2">💳</div>
                            <p className="font-semibold">Collections</p>
                        </Link>
                        <Link
                            to="/nbfc/analytics"
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-lg transition-all text-center"
                        >
                            <div className="text-3xl mb-2">📊</div>
                            <p className="font-semibold">Analytics</p>
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center text-2xl`}>
                                    {stat.icon}
                                </div>
                                <div className={`text-sm font-semibold ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                                    {stat.changeType === 'increase' ? '↑' : '↓'} {stat.change}%
                                </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pending Applications */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Pending Applications</h2>
                            <Link to="/nbfc/applications" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                View All →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {pendingApplications.map((app) => (
                                <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{app.candidateName}</h3>
                                            <p className="text-sm text-gray-600">₹{app.loanAmount.toLocaleString()}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(app.status)}`}>
                                            {app.status.replace('_', ' ').toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <p className="text-gray-600">Credit Score: <span className="font-semibold">{app.creditScore}</span></p>
                                        <p className="text-gray-500">{new Date(app.appliedDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link
                            to="/nbfc/applications"
                            className="block mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                        >
                            Review Applications
                        </Link>
                    </div>

                    {/* Active Loans Requiring Attention */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Loans Requiring Attention</h2>
                            <Link to="/nbfc/portfolio" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                View All →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {activeLoans.map((loan) => (
                                <div key={loan.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{loan.candidateName}</h3>
                                            <p className="text-sm text-gray-600">Loan #{loan.id}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(loan.status)}`}>
                                            {loan.status.toUpperCase()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <p className="text-gray-600">Outstanding: <span className="font-semibold">₹{loan.outstandingAmount.toLocaleString()}</span></p>
                                        <p className="text-gray-500">Due: {new Date(loan.nextDueDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link
                            to="/nbfc/portfolio"
                            className="block mt-4 w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center font-medium"
                        >
                            Manage Portfolio
                        </Link>
                    </div>
                </div>

                {/* Alerts & Performance Card */}
                <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-lg shadow">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Portfolio Performance</h2>
                            <p className="text-gray-600 mb-4">Your lending portfolio is performing well</p>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <p className="text-sm text-gray-600">Active Loans</p>
                                    <p className="text-2xl font-bold text-green-600">32</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Collection Rate</p>
                                    <p className="text-2xl font-bold text-blue-600">96.5%</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Default Rate</p>
                                    <p className="text-2xl font-bold text-purple-600">2.1%</p>
                                </div>
                            </div>
                        </div>
                        <Link
                            to="/nbfc/analytics"
                            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            View Full Analytics
                        </Link>
                    </div>
                </div>

                {/* Pending Loans Widget */}
                <div className="mt-8">
                    <PendingLoansWidget
                        applications={pendingApplications.map(app => ({ ...app, riskCategory: app.creditScore >= 700 ? 'low' : app.creditScore >= 650 ? 'medium' : 'high' }))}
                        onViewCibil={handleViewCibil}
                        onReview={handleReview}
                    />
                </div>

                {/* Alerts Section */}
                <div className="mt-8 space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
                        <span className="text-2xl mr-3">⚠️</span>
                        <div>
                            <p className="font-semibold text-yellow-900">4 Loans Overdue</p>
                            <p className="text-sm text-yellow-700">Total overdue amount: ₹22,800. Take action to improve collection rate.</p>
                        </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
                        <span className="text-2xl mr-3">📋</span>
                        <div>
                            <p className="font-semibold text-blue-900">8 Applications Pending Review</p>
                            <p className="text-sm text-blue-700">Review pending applications to maintain fast turnaround time.</p>
                        </div>
                    </div>
                </div>

                {/* CIBIL Modal */}
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

                {/* Approval Modal */}
                {showApprovalModal && selectedApp && (
                    <LoanApprovalModal
                        application={{
                            id: selectedApp.id,
                            candidateName: selectedApp.candidateName,
                            loanAmount: selectedApp.loanAmount,
                            creditScore: selectedApp.creditScore,
                            currentCTC: 1200000,
                            noticePeriod: 60,
                            tenure: 12,
                            riskCategory: selectedApp.creditScore >= 700 ? 'low' : selectedApp.creditScore >= 650 ? 'medium' : 'high',
                        }}
                        onClose={() => {
                            setShowApprovalModal(false);
                            setSelectedApp(null);
                        }}
                        onApprove={handleApprove}
                        onReject={handleReject}
                    />
                )}
            </div>
        </DashboardLayout>
    );
};

export default NBFCDashboard;
