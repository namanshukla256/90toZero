import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';

interface Transaction {
    id: string;
    type: 'loan_disbursement' | 'emi_payment' | 'platform_fee' | 'commission' | 'refund';
    fromEntity: string;
    toEntity: string;
    amount: number;
    status: 'completed' | 'pending' | 'failed' | 'processing';
    timestamp: string;
    paymentMethod: string;
    referenceId: string;
    isFlagged: boolean;
    notes?: string;
}

const AdminTransactions: React.FC = () => {
    const [filterType, setFilterType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    // Dummy transaction data
    const allTransactions: Transaction[] = [
        {
            id: 'txn001',
            type: 'loan_disbursement',
            fromEntity: 'QuickLoan Finance',
            toEntity: 'Current Employer of Rajesh Kumar',
            amount: 95000,
            status: 'completed',
            timestamp: '2024-01-28T10:30:00',
            paymentMethod: 'NEFT',
            referenceId: 'NEFT2024012810301234',
            isFlagged: false,
        },
        {
            id: 'txn002',
            type: 'emi_payment',
            fromEntity: 'Rajesh Kumar',
            toEntity: 'QuickLoan Finance',
            amount: 26500,
            status: 'completed',
            timestamp: '2024-01-27T14:20:00',
            paymentMethod: 'Auto Debit',
            referenceId: 'EMI2024012714201234',
            isFlagged: false,
        },
        {
            id: 'txn003',
            type: 'platform_fee',
            fromEntity: 'Tech Solutions Pvt Ltd',
            toEntity: '90toZero Platform',
            amount: 5000,
            status: 'completed',
            timestamp: '2024-01-27T09:15:00',
            paymentMethod: 'Razorpay',
            referenceId: 'RPY2024012709151234',
            isFlagged: false,
        },
        {
            id: 'txn004',
            type: 'commission',
            fromEntity: 'QuickLoan Finance',
            toEntity: '90toZero Platform',
            amount: 1425,
            status: 'completed',
            timestamp: '2024-01-26T16:45:00',
            paymentMethod: 'Bank Transfer',
            referenceId: 'COM2024012616451234',
            isFlagged: false,
            notes: '1.5% commission on ₹95,000 loan disbursement',
        },
        {
            id: 'txn005',
            type: 'loan_disbursement',
            fromEntity: 'FastCredit NBFC',
            toEntity: 'Current Employer of Sneha Reddy',
            amount: 73333,
            status: 'processing',
            timestamp: '2024-01-26T11:30:00',
            paymentMethod: 'RTGS',
            referenceId: 'RTGS2024012611301234',
            isFlagged: false,
        },
        {
            id: 'txn006',
            type: 'emi_payment',
            fromEntity: 'Arjun Mehta',
            toEntity: 'QuickLoan Finance',
            amount: 28500,
            status: 'failed',
            timestamp: '2024-01-25T08:00:00',
            paymentMethod: 'Auto Debit',
            referenceId: 'EMI2024012508001234',
            isFlagged: true,
            notes: 'Insufficient balance - retry scheduled',
        },
        {
            id: 'txn007',
            type: 'loan_disbursement',
            fromEntity: 'InstantLoan Partners',
            toEntity: 'Current Employer of Priya Sharma',
            amount: 120000,
            status: 'pending',
            timestamp: '2024-01-25T13:20:00',
            paymentMethod: 'NEFT',
            referenceId: 'NEFT2024012513201234',
            isFlagged: false,
        },
        {
            id: 'txn008',
            type: 'platform_fee',
            fromEntity: 'Innovate Tech Pvt Ltd',
            toEntity: '90toZero Platform',
            amount: 8000,
            status: 'completed',
            timestamp: '2024-01-24T10:00:00',
            paymentMethod: 'Razorpay',
            referenceId: 'RPY2024012410001234',
            isFlagged: false,
        },
        {
            id: 'txn009',
            type: 'emi_payment',
            fromEntity: 'Amit Verma',
            toEntity: 'FastCredit NBFC',
            amount: 24000,
            status: 'completed',
            timestamp: '2024-01-24T07:30:00',
            paymentMethod: 'UPI',
            referenceId: 'UPI2024012407301234',
            isFlagged: false,
        },
        {
            id: 'txn010',
            type: 'refund',
            fromEntity: '90toZero Platform',
            toEntity: 'Digital Marketing Co',
            amount: 5000,
            status: 'completed',
            timestamp: '2024-01-23T15:45:00',
            paymentMethod: 'Bank Transfer',
            referenceId: 'REF2024012315451234',
            isFlagged: false,
            notes: 'Verification failed - subscription refunded',
        },
        {
            id: 'txn011',
            type: 'loan_disbursement',
            fromEntity: 'QuickLoan Finance',
            toEntity: 'Unknown Account',
            amount: 250000,
            status: 'pending',
            timestamp: '2024-01-23T18:30:00',
            paymentMethod: 'RTGS',
            referenceId: 'RTGS2024012318301234',
            isFlagged: true,
            notes: 'Flagged: Unusually high amount for new account',
        },
    ];

    // Filter transactions
    const filteredTransactions = allTransactions.filter(txn => {
        const matchesType = filterType === 'all' || txn.type === filterType;
        const matchesStatus = filterStatus === 'all' || txn.status === filterStatus;
        const matchesSearch = txn.fromEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
            txn.toEntity.toLowerCase().includes(searchQuery.toLowerCase()) ||
            txn.referenceId.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesType && matchesStatus && matchesSearch;
    });

    // Stats
    const stats = {
        total: allTransactions.length,
        completed: allTransactions.filter(t => t.status === 'completed').length,
        pending: allTransactions.filter(t => t.status === 'pending').length,
        failed: allTransactions.filter(t => t.status === 'failed').length,
        flagged: allTransactions.filter(t => t.isFlagged).length,
        totalVolume: allTransactions.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0),
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'loan_disbursement': return '💸';
            case 'emi_payment': return '💰';
            case 'platform_fee': return '💵';
            case 'commission': return '💳';
            case 'refund': return '↩️';
            default: return '📄';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'processing': return 'bg-blue-100 text-blue-800';
            case 'failed': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatAmount = (amount: number) => {
        return `₹${amount.toLocaleString('en-IN')}`;
    };

    const formatDate = (timestamp: string) => {
        return new Date(timestamp).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <DashboardLayout
            title="Transaction Monitoring"
            showBackButton={true}
            backTo="/admin/dashboard"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin/dashboard' },
                { label: 'Transactions' }
            ]}
        >
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Transaction Monitoring</h1>
                    <p className="mt-2 text-gray-600">Track all financial transactions and audit trails</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                        <div className="text-sm text-gray-600">Total Transactions</div>
                    </div>
                    <div className="bg-green-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-green-900">{stats.completed}</div>
                        <div className="text-sm text-green-700">Completed</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-yellow-900">{stats.pending}</div>
                        <div className="text-sm text-yellow-700">Pending</div>
                    </div>
                    <div className="bg-red-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-red-900">{stats.failed}</div>
                        <div className="text-sm text-red-700">Failed</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-orange-900">{stats.flagged}</div>
                        <div className="text-sm text-orange-700">Flagged</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg shadow p-4">
                        <div className="text-xl font-bold text-purple-900">{formatAmount(stats.totalVolume)}</div>
                        <div className="text-sm text-purple-700">Total Volume</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                            <input
                                type="text"
                                placeholder="Search by entity or reference ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Types</option>
                                <option value="loan_disbursement">Loan Disbursement</option>
                                <option value="emi_payment">EMI Payment</option>
                                <option value="platform_fee">Platform Fee</option>
                                <option value="commission">Commission</option>
                                <option value="refund">Refund</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="completed">Completed</option>
                                <option value="pending">Pending</option>
                                <option value="processing">Processing</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredTransactions.map((txn) => (
                                    <tr key={txn.id} className={`hover:bg-gray-50 ${txn.isFlagged ? 'bg-orange-50' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="text-2xl">{getTypeIcon(txn.type)}</div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 capitalize">
                                                        {txn.type.replace('_', ' ')}
                                                    </div>
                                                    <div className="text-xs text-gray-500">{txn.referenceId}</div>
                                                </div>
                                                {txn.isFlagged && (
                                                    <span className="text-orange-500" title="Flagged for review">⚠️</span>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{txn.fromEntity}</td>
                                        <td className="px-6 py-4 text-sm text-gray-900">{txn.toEntity}</td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">{formatAmount(txn.amount)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(txn.status)} capitalize`}>
                                                {txn.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{formatDate(txn.timestamp)}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedTransaction(txn)}
                                                className="text-blue-600 hover:text-blue-900 font-medium text-sm"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* No Results */}
                    {filteredTransactions.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-5xl mb-4">💳</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>

                {/* Transaction Details Modal */}
                {selectedTransaction && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-gray-900">Transaction Details</h2>
                                    <button
                                        onClick={() => setSelectedTransaction(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="text-2xl">×</span>
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-6">
                                    {/* Transaction Info */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Transaction Information</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Transaction ID</label>
                                                <p className="mt-1 text-gray-900">{selectedTransaction.id}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Reference ID</label>
                                                <p className="mt-1 text-gray-900">{selectedTransaction.referenceId}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Type</label>
                                                <p className="mt-1 capitalize">{selectedTransaction.type.replace('_', ' ')}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Payment Method</label>
                                                <p className="mt-1">{selectedTransaction.paymentMethod}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Amount</label>
                                                <p className="mt-1 text-xl font-bold text-gray-900">{formatAmount(selectedTransaction.amount)}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Status</label>
                                                <p className="mt-1">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTransaction.status)} capitalize`}>
                                                        {selectedTransaction.status}
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">From</label>
                                                <p className="mt-1 text-gray-900">{selectedTransaction.fromEntity}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">To</label>
                                                <p className="mt-1 text-gray-900">{selectedTransaction.toEntity}</p>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="text-sm font-medium text-gray-600">Timestamp</label>
                                                <p className="mt-1 text-gray-900">{formatDate(selectedTransaction.timestamp)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Flagged Alert */}
                                    {selectedTransaction.isFlagged && (
                                        <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                            <div className="flex items-center gap-2 mb-2">
                                                <span className="text-orange-500 text-xl">⚠️</span>
                                                <h4 className="font-semibold text-orange-900">Flagged for Review</h4>
                                            </div>
                                            <p className="text-sm text-orange-700">
                                                This transaction has been flagged for manual review due to suspicious activity.
                                            </p>
                                        </div>
                                    )}

                                    {/* Notes */}
                                    {selectedTransaction.notes && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Notes</label>
                                            <p className="mt-2 p-3 bg-gray-50 rounded-lg text-gray-900">{selectedTransaction.notes}</p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                                            Download Receipt
                                        </button>
                                        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                                            View Audit Trail
                                        </button>
                                        {selectedTransaction.isFlagged && (
                                            <>
                                                <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                                    Clear Flag
                                                </button>
                                                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                                                    Block Transaction
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default AdminTransactions;
