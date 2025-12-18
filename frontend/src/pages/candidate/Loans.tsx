import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../services/api';

interface Loan {
    id: string;
    principal_amount: number;
    interest_rate: number;
    tenure_months: number;
    emi_amount: number;
    status: 'applied' | 'under_review' | 'approved' | 'disbursed' | 'active' | 'closed' | 'defaulted';
    disbursement_date: string | null;
    first_emi_date: string | null;
    nbfc_name: string;
    buyout_request_id: string;
    job_title: string;
    company_name: string;
    created_at: string;
}

interface EMIPayment {
    id: string;
    emi_number: number;
    due_date: string;
    paid_date: string | null;
    amount_due: number;
    amount_paid: number;
    status: 'pending' | 'paid' | 'overdue' | 'waived';
}

const Loans = () => {
    const navigate = useNavigate();
    const [loans, setLoans] = useState<Loan[]>([]);
    const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
    const [emiSchedule, setEmiSchedule] = useState<EMIPayment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            const response = await api.get('/loans/my-loans');
            setLoans(response.data);
        } catch (error) {
            console.error('Failed to fetch loans:', error);
            // Use dummy data if API fails
            setLoans(dummyLoans);
        } finally {
            setLoading(false);
        }
    };

    const fetchEMISchedule = async (loanId: string) => {
        try {
            const response = await api.get(`/loans/${loanId}/schedule`);
            setEmiSchedule(response.data);
        } catch (error) {
            console.error('Failed to fetch EMI schedule:', error);
            setEmiSchedule(generateDummyEMISchedule());
        }
    };

    const handleViewDetails = (loan: Loan) => {
        setSelectedLoan(loan);
        fetchEMISchedule(loan.id);
    };

    const handleMakePayment = (_emiId: string) => {
        alert('Payment gateway integration coming soon!');
        // Implement payment logic
    };

    const getStatusColor = (status: string) => {
        const colors = {
            applied: 'bg-blue-100 text-blue-800',
            under_review: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            disbursed: 'bg-green-100 text-green-800',
            active: 'bg-blue-100 text-blue-800',
            closed: 'bg-gray-100 text-gray-800',
            defaulted: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status: string) => {
        return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    const calculateLoanStats = (loan: Loan) => {
        const totalAmount = loan.emi_amount * loan.tenure_months;
        const totalInterest = totalAmount - loan.principal_amount;
        const paidEMIs = emiSchedule.filter(e => e.status === 'paid').length;
        const paidAmount = paidEMIs * loan.emi_amount;
        const remainingAmount = totalAmount - paidAmount;

        return {
            totalAmount,
            totalInterest,
            paidAmount,
            remainingAmount,
            paidEMIs,
            remainingEMIs: loan.tenure_months - paidEMIs,
            completionPercentage: (paidEMIs / loan.tenure_months) * 100,
        };
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <DashboardLayout
                title="My Loans"
                showBackButton={true}
                backTo="/candidate"
                breadcrumbs={[{ label: 'Loans' }]}
            >
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading loans...</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="My Loans"
            showBackButton={true}
            backTo="/candidate"
            breadcrumbs={[{ label: 'Loans' }]}
        >
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Loan Management</h1>
                <p className="text-gray-600">Track your buyout loans and EMI payments</p>
            </div>

            {loans.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No loans yet</h3>
                    <p className="text-gray-600 mb-4">Apply for jobs with buyout support to get started</p>
                    <button
                        onClick={() => navigate('/candidate/jobs')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Browse Jobs
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Loans List */}
                    <div className="lg:col-span-1 space-y-4">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Loans</h2>
                        {loans.map((loan) => (
                            <div
                                key={loan.id}
                                onClick={() => handleViewDetails(loan)}
                                className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-all ${selectedLoan?.id === loan.id ? 'ring-2 ring-blue-500' : 'hover:shadow-md'
                                    }`}
                            >
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{loan.job_title}</h3>
                                        <p className="text-sm text-gray-600">{loan.company_name}</p>
                                    </div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(loan.status)}`}>
                                        {getStatusText(loan.status)}
                                    </span>
                                </div>
                                <div className="text-2xl font-bold text-gray-900 mb-2">
                                    ₹{loan.principal_amount.toLocaleString('en-IN')}
                                </div>
                                <div className="flex items-center justify-between text-sm text-gray-600">
                                    <span>EMI: ₹{loan.emi_amount.toLocaleString('en-IN')}</span>
                                    <span>{loan.tenure_months} months</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Loan Details */}
                    {selectedLoan ? (
                        <div className="lg:col-span-2 space-y-6">
                            {/* Loan Summary Card */}
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="text-lg font-medium mb-1 opacity-90">Loan Summary</h3>
                                        <p className="text-sm opacity-80">{selectedLoan.nbfc_name}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium bg-white ${selectedLoan.status === 'active' ? 'text-blue-600' : 'text-gray-700'
                                        }`}>
                                        {getStatusText(selectedLoan.status)}
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <div className="text-sm opacity-80 mb-1">Principal Amount</div>
                                        <div className="text-2xl font-bold">₹{selectedLoan.principal_amount.toLocaleString('en-IN')}</div>
                                    </div>
                                    <div>
                                        <div className="text-sm opacity-80 mb-1">Monthly EMI</div>
                                        <div className="text-2xl font-bold">₹{selectedLoan.emi_amount.toLocaleString('en-IN')}</div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/20">
                                    <div>
                                        <div className="text-sm opacity-80 mb-1">Interest Rate</div>
                                        <div className="text-lg font-semibold">{selectedLoan.interest_rate}%</div>
                                    </div>
                                    <div>
                                        <div className="text-sm opacity-80 mb-1">Tenure</div>
                                        <div className="text-lg font-semibold">{selectedLoan.tenure_months} months</div>
                                    </div>
                                    <div>
                                        <div className="text-sm opacity-80 mb-1">Total Amount</div>
                                        <div className="text-lg font-semibold">
                                            ₹{(selectedLoan.emi_amount * selectedLoan.tenure_months).toLocaleString('en-IN')}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Progress Card */}
                            {selectedLoan.status === 'active' && emiSchedule.length > 0 && (
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Repayment Progress</h3>
                                    {(() => {
                                        const stats = calculateLoanStats(selectedLoan);
                                        return (
                                            <>
                                                <div className="mb-4">
                                                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                                                        <span>{stats.paidEMIs} of {selectedLoan.tenure_months} EMIs paid</span>
                                                        <span>{stats.completionPercentage.toFixed(0)}%</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                                        <div
                                                            className="bg-green-500 h-3 rounded-full transition-all"
                                                            style={{ width: `${stats.completionPercentage}%` }}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-green-50 rounded-lg p-4">
                                                        <div className="text-sm text-green-800 mb-1">Amount Paid</div>
                                                        <div className="text-xl font-semibold text-green-900">
                                                            ₹{stats.paidAmount.toLocaleString('en-IN')}
                                                        </div>
                                                    </div>
                                                    <div className="bg-blue-50 rounded-lg p-4">
                                                        <div className="text-sm text-blue-800 mb-1">Amount Remaining</div>
                                                        <div className="text-xl font-semibold text-blue-900">
                                                            ₹{stats.remainingAmount.toLocaleString('en-IN')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            )}

                            {/* EMI Schedule */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">EMI Schedule</h3>
                                <div className="space-y-2 max-h-96 overflow-y-auto">
                                    {emiSchedule.map((emi) => (
                                        <div
                                            key={emi.id}
                                            className={`flex items-center justify-between p-4 rounded-lg border ${emi.status === 'paid'
                                                ? 'bg-green-50 border-green-200'
                                                : emi.status === 'overdue'
                                                    ? 'bg-red-50 border-red-200'
                                                    : 'bg-gray-50 border-gray-200'
                                                }`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${emi.status === 'paid'
                                                    ? 'bg-green-500 text-white'
                                                    : emi.status === 'overdue'
                                                        ? 'bg-red-500 text-white'
                                                        : 'bg-gray-300 text-gray-700'
                                                    }`}>
                                                    {emi.emi_number}
                                                </div>
                                                <div>
                                                    <div className="font-medium text-gray-900">EMI #{emi.emi_number}</div>
                                                    <div className="text-sm text-gray-600">
                                                        Due: {formatDate(emi.due_date)}
                                                        {emi.paid_date && ` • Paid: ${formatDate(emi.paid_date)}`}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <div className="text-right">
                                                    <div className="font-semibold text-gray-900">
                                                        ₹{emi.amount_due.toLocaleString('en-IN')}
                                                    </div>
                                                    <div className={`text-xs font-medium ${emi.status === 'paid'
                                                        ? 'text-green-600'
                                                        : emi.status === 'overdue'
                                                            ? 'text-red-600'
                                                            : 'text-yellow-600'
                                                        }`}>
                                                        {getStatusText(emi.status)}
                                                    </div>
                                                </div>
                                                {emi.status === 'pending' && (
                                                    <button
                                                        onClick={() => handleMakePayment(emi.id)}
                                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                                    >
                                                        Pay Now
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Loan Details */}
                            <div className="bg-white rounded-lg shadow-sm p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Loan Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Disbursement Date:</span>
                                        <span className="ml-2 font-medium text-gray-900">{formatDate(selectedLoan.disbursement_date)}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">First EMI Date:</span>
                                        <span className="ml-2 font-medium text-gray-900">{formatDate(selectedLoan.first_emi_date)}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Loan ID:</span>
                                        <span className="ml-2 font-mono text-xs text-gray-900">{selectedLoan.id.slice(0, 8)}...</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">NBFC Partner:</span>
                                        <span className="ml-2 font-medium text-gray-900">{selectedLoan.nbfc_name}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-12 text-center">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                            </svg>
                            <p className="text-gray-500">Select a loan to view details</p>
                        </div>
                    )}
                </div>
            )}
        </DashboardLayout>
    );
};

// Dummy data for development
const dummyLoans: Loan[] = [
    {
        id: '1',
        principal_amount: 300000,
        interest_rate: 12,
        tenure_months: 12,
        emi_amount: 26625,
        status: 'active',
        disbursement_date: '2025-01-01T00:00:00Z',
        first_emi_date: '2025-02-01T00:00:00Z',
        nbfc_name: 'QuickFunds NBFC',
        buyout_request_id: 'br-001',
        job_title: 'Senior Full Stack Developer',
        company_name: 'TechCorp India',
        created_at: '2024-12-20T00:00:00Z',
    },
    {
        id: '2',
        principal_amount: 250000,
        interest_rate: 11,
        tenure_months: 18,
        emi_amount: 15200,
        status: 'approved',
        disbursement_date: null,
        first_emi_date: null,
        nbfc_name: 'LendSmart Finance',
        buyout_request_id: 'br-002',
        job_title: 'DevOps Engineer',
        company_name: 'CloudScale Solutions',
        created_at: '2025-01-15T00:00:00Z',
    },
];

const generateDummyEMISchedule = (): EMIPayment[] => {
    return Array.from({ length: 12 }, (_, i) => ({
        id: `emi-${i + 1}`,
        emi_number: i + 1,
        due_date: new Date(2025, 1 + i, 1).toISOString(),
        paid_date: i < 3 ? new Date(2025, 1 + i, 1).toISOString() : null,
        amount_due: 26625,
        amount_paid: i < 3 ? 26625 : 0,
        status: i < 3 ? 'paid' : i === 3 ? 'pending' : 'pending',
    }));
};

export default Loans;
