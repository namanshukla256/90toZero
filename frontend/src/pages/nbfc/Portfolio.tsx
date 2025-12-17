import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';

interface Loan {
    id: string;
    candidateName: string;
    candidateEmail: string;
    companyName: string;
    principalAmount: number;
    disbursedAmount: number;
    interestRate: number;
    tenure: number;
    emiAmount: number;
    paidEMIs: number;
    totalEMIs: number;
    nextDueDate: string;
    status: 'active' | 'overdue' | 'closed' | 'defaulted';
    disbursementDate: string;
    outstandingAmount: number;
    lastPaymentDate?: string;
    overdueAmount?: number;
    overdueDays?: number;
}

interface EMIPayment {
    emiNumber: number;
    dueDate: string;
    paidDate?: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
}

const Portfolio: React.FC = () => {
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
    const [showModal, setShowModal] = useState(false);

    // Dummy loan portfolio data
    const [loans] = useState<Loan[]>([
        {
            id: 'loan1',
            candidateName: 'Amit Patel',
            candidateEmail: 'amit.p@email.com',
            companyName: 'CloudSys Inc',
            principalAmount: 140000,
            disbursedAmount: 140000,
            interestRate: 11.5,
            tenure: 18,
            emiAmount: 8900,
            paidEMIs: 5,
            totalEMIs: 18,
            nextDueDate: '2024-02-05',
            status: 'active',
            disbursementDate: '2023-09-05',
            outstandingAmount: 115700,
            lastPaymentDate: '2024-01-05',
        },
        {
            id: 'loan2',
            candidateName: 'Vikram Singh',
            candidateEmail: 'vikram.s@email.com',
            companyName: 'InnovateTech',
            principalAmount: 100000,
            disbursedAmount: 100000,
            interestRate: 11,
            tenure: 15,
            emiAmount: 7200,
            paidEMIs: 8,
            totalEMIs: 15,
            nextDueDate: '2024-02-10',
            status: 'active',
            disbursementDate: '2023-06-10',
            outstandingAmount: 50400,
            lastPaymentDate: '2024-01-10',
        },
        {
            id: 'loan3',
            candidateName: 'Sneha Reddy',
            candidateEmail: 'sneha.r@email.com',
            companyName: 'DataCore Systems',
            principalAmount: 73333,
            disbursedAmount: 73333,
            interestRate: 13.5,
            tenure: 12,
            emiAmount: 6500,
            paidEMIs: 2,
            totalEMIs: 12,
            nextDueDate: '2024-01-15',
            status: 'overdue',
            disbursementDate: '2023-11-15',
            outstandingAmount: 65000,
            lastPaymentDate: '2023-12-15',
            overdueAmount: 6500,
            overdueDays: 14,
        },
        {
            id: 'loan4',
            candidateName: 'Rajesh Kumar',
            candidateEmail: 'rajesh.k@email.com',
            companyName: 'TechCorp India',
            principalAmount: 80000,
            disbursedAmount: 80000,
            interestRate: 12,
            tenure: 12,
            emiAmount: 7100,
            paidEMIs: 12,
            totalEMIs: 12,
            nextDueDate: '2023-12-28',
            status: 'closed',
            disbursementDate: '2023-01-28',
            outstandingAmount: 0,
            lastPaymentDate: '2023-12-28',
        },
        {
            id: 'loan5',
            candidateName: 'Priya Sharma',
            candidateEmail: 'priya.s@email.com',
            companyName: 'WebSolutions Ltd',
            principalAmount: 50000,
            disbursedAmount: 50000,
            interestRate: 13,
            tenure: 9,
            emiAmount: 5800,
            paidEMIs: 4,
            totalEMIs: 9,
            nextDueDate: '2024-02-01',
            status: 'active',
            disbursementDate: '2023-10-01',
            outstandingAmount: 29000,
            lastPaymentDate: '2024-01-01',
        },
        {
            id: 'loan6',
            candidateName: 'Arjun Mehta',
            candidateEmail: 'arjun.m@email.com',
            companyName: 'StartupCo',
            principalAmount: 60000,
            disbursedAmount: 60000,
            interestRate: 14,
            tenure: 12,
            emiAmount: 5400,
            paidEMIs: 0,
            totalEMIs: 12,
            nextDueDate: '2023-11-20',
            status: 'defaulted',
            disbursementDate: '2023-10-20',
            outstandingAmount: 64800,
            overdueAmount: 16200,
            overdueDays: 70,
        },
    ]);

    // EMI schedule for selected loan
    const generateEMISchedule = (loan: Loan): EMIPayment[] => {
        const schedule: EMIPayment[] = [];
        const startDate = new Date(loan.disbursementDate);

        for (let i = 1; i <= loan.totalEMIs; i++) {
            const dueDate = new Date(startDate);
            dueDate.setMonth(dueDate.getMonth() + i);

            schedule.push({
                emiNumber: i,
                dueDate: dueDate.toISOString().split('T')[0],
                amount: loan.emiAmount,
                status: i <= loan.paidEMIs ? 'paid' : i === loan.paidEMIs + 1 && loan.status === 'overdue' ? 'overdue' : 'pending',
                paidDate: i <= loan.paidEMIs ? dueDate.toISOString().split('T')[0] : undefined,
            });
        }

        return schedule;
    };

    // Filter loans
    const filteredLoans = loans.filter((loan) => {
        const matchesStatus = selectedStatus === 'all' || loan.status === selectedStatus;
        const matchesSearch =
            searchQuery === '' ||
            loan.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            loan.companyName.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    // Stats
    const stats = {
        totalLoans: loans.length,
        activeLoans: loans.filter((l) => l.status === 'active').length,
        overdueLoans: loans.filter((l) => l.status === 'overdue').length,
        closedLoans: loans.filter((l) => l.status === 'closed').length,
        defaultedLoans: loans.filter((l) => l.status === 'defaulted').length,
        totalDisbursed: loans.reduce((sum, l) => sum + l.disbursedAmount, 0),
        totalOutstanding: loans.reduce((sum, l) => sum + l.outstandingAmount, 0),
        totalOverdue: loans.reduce((sum, l) => sum + (l.overdueAmount || 0), 0),
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            active: 'bg-green-100 text-green-800',
            overdue: 'bg-orange-100 text-orange-800',
            closed: 'bg-gray-100 text-gray-800',
            defaulted: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getEMIStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            paid: 'bg-green-100 text-green-800',
            pending: 'bg-blue-100 text-blue-800',
            overdue: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const handleViewDetails = (loan: Loan) => {
        setSelectedLoan(loan);
        setShowModal(true);
    };

    const handleSendReminder = (loanId: string) => {
        console.log('Sending reminder for loan:', loanId);
    };

    const handleRecordPayment = (loanId: string) => {
        console.log('Recording payment for loan:', loanId);
    };

    return (
        <DashboardLayout title="Loan Portfolio">
            <div className="p-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Loan Portfolio</h1>
                    <p className="text-gray-600 mt-1">Manage active loans and collections</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Total Loans</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.totalLoans}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Active</p>
                        <p className="text-2xl font-bold text-green-600">{stats.activeLoans}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Overdue</p>
                        <p className="text-2xl font-bold text-orange-600">{stats.overdueLoans}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Closed</p>
                        <p className="text-2xl font-bold text-gray-600">{stats.closedLoans}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Defaulted</p>
                        <p className="text-2xl font-bold text-red-600">{stats.defaultedLoans}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Disbursed</p>
                        <p className="text-2xl font-bold text-blue-600">₹{(stats.totalDisbursed / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Outstanding</p>
                        <p className="text-2xl font-bold text-purple-600">₹{(stats.totalOutstanding / 100000).toFixed(1)}L</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Overdue Amt</p>
                        <p className="text-2xl font-bold text-red-600">₹{(stats.totalOverdue / 1000).toFixed(0)}K</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                <option value="active">Active</option>
                                <option value="overdue">Overdue</option>
                                <option value="closed">Closed</option>
                                <option value="defaulted">Defaulted</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Loans List */}
                <div className="space-y-4">
                    {filteredLoans.length === 0 ? (
                        <div className="bg-white p-12 rounded-lg shadow text-center">
                            <p className="text-gray-500 text-lg">No loans found</p>
                        </div>
                    ) : (
                        filteredLoans.map((loan) => (
                            <div key={loan.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-gray-900">{loan.candidateName}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(loan.status)}`}>
                                                {loan.status.toUpperCase()}
                                            </span>
                                            {loan.status === 'overdue' && (
                                                <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-semibold">
                                                    {loan.overdueDays} days overdue
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600">{loan.companyName}</p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            Loan ID: {loan.id} • Disbursed on {new Date(loan.disbursementDate).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-600">Outstanding</p>
                                        <p className="text-2xl font-bold text-blue-600">₹{loan.outstandingAmount.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Principal</p>
                                        <p className="font-semibold text-gray-900">₹{loan.principalAmount.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">EMI Amount</p>
                                        <p className="font-semibold text-gray-900">₹{loan.emiAmount.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Interest Rate</p>
                                        <p className="font-semibold text-gray-900">{loan.interestRate}%</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Tenure</p>
                                        <p className="font-semibold text-gray-900">{loan.tenure} months</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">EMIs Paid</p>
                                        <p className="font-semibold text-green-600">
                                            {loan.paidEMIs}/{loan.totalEMIs}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Next Due</p>
                                        <p className="font-semibold text-gray-900">{new Date(loan.nextDueDate).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                                        <span>Repayment Progress</span>
                                        <span>{Math.round((loan.paidEMIs / loan.totalEMIs) * 100)}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className={`h-3 rounded-full transition-all ${loan.status === 'closed' ? 'bg-green-600' : loan.status === 'overdue' ? 'bg-orange-500' : 'bg-blue-600'
                                                }`}
                                            style={{ width: `${(loan.paidEMIs / loan.totalEMIs) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                {loan.status === 'overdue' && (
                                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-red-900">Overdue Payment</p>
                                                <p className="text-lg font-bold text-red-700">₹{loan.overdueAmount?.toLocaleString()}</p>
                                            </div>
                                            <button
                                                onClick={() => handleSendReminder(loan.id)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                            >
                                                Send Reminder
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleViewDetails(loan)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        View EMI Schedule
                                    </button>
                                    {loan.status === 'active' || loan.status === 'overdue' ? (
                                        <button
                                            onClick={() => handleRecordPayment(loan.id)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                        >
                                            Record Payment
                                        </button>
                                    ) : null}
                                    <a
                                        href={`mailto:${loan.candidateEmail}`}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Contact Candidate
                                    </a>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* EMI Schedule Modal */}
                {showModal && selectedLoan && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">EMI Payment Schedule</h2>
                                        <p className="text-gray-600 mt-1">
                                            {selectedLoan.candidateName} - Loan #{selectedLoan.id}
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-gray-400 hover:text-gray-600 text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>

                                {/* Loan Summary */}
                                <div className="grid grid-cols-4 gap-4 mb-6">
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">Principal</p>
                                        <p className="font-semibold text-lg">₹{selectedLoan.principalAmount.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">EMI Amount</p>
                                        <p className="font-semibold text-lg">₹{selectedLoan.emiAmount.toLocaleString()}</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">Total Payable</p>
                                        <p className="font-semibold text-lg">
                                            ₹{(selectedLoan.emiAmount * selectedLoan.totalEMIs).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-lg">
                                        <p className="text-sm text-gray-600">Outstanding</p>
                                        <p className="font-semibold text-lg">₹{selectedLoan.outstandingAmount.toLocaleString()}</p>
                                    </div>
                                </div>

                                {/* EMI Schedule Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">EMI #</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Due Date</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Amount</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                                                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Paid Date</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {generateEMISchedule(selectedLoan).map((emi) => (
                                                <tr key={emi.emiNumber} className="hover:bg-gray-50">
                                                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{emi.emiNumber}</td>
                                                    <td className="px-4 py-3 text-sm text-gray-900">
                                                        {new Date(emi.dueDate).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                                                        ₹{emi.amount.toLocaleString()}
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <span
                                                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getEMIStatusColor(emi.status)}`}
                                                        >
                                                            {emi.status.toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td className="px-4 py-3 text-sm text-gray-600">
                                                        {emi.paidDate ? new Date(emi.paidDate).toLocaleDateString() : '-'}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Close
                                    </button>
                                    <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                        Download Schedule
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Portfolio;
