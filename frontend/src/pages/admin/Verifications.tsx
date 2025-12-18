import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';

interface Verification {
    id: string;
    userId: string;
    userName: string;
    userType: 'company' | 'candidate' | 'nbfc';
    verificationType: 'kyc' | 'company' | 'nbfc_license' | 'offer_letter' | 'employment';
    status: 'pending' | 'under_review' | 'approved' | 'rejected';
    priority: 'high' | 'medium' | 'low';
    submittedDate: string;
    documents: {
        type: string;
        url: string;
        status: 'pending' | 'verified' | 'rejected';
    }[];
    notes?: string;
}

const AdminVerifications: React.FC = () => {
    const [filterType, setFilterType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('pending');
    const [filterPriority, setFilterPriority] = useState<string>('all');
    const [selectedVerification, setSelectedVerification] = useState<Verification | null>(null);
    const [reviewNotes, setReviewNotes] = useState('');

    // Dummy verification data
    const allVerifications: Verification[] = [
        {
            id: 'v1',
            userId: 'u1',
            userName: 'Tech Solutions Pvt Ltd',
            userType: 'company',
            verificationType: 'company',
            status: 'pending',
            priority: 'high',
            submittedDate: '2024-01-28',
            documents: [
                { type: 'GST Certificate', url: '/docs/gst1.pdf', status: 'pending' },
                { type: 'CIN Certificate', url: '/docs/cin1.pdf', status: 'pending' },
                { type: 'Company Registration', url: '/docs/reg1.pdf', status: 'pending' },
            ],
        },
        {
            id: 'v2',
            userId: 'u2',
            userName: 'QuickLoan Finance',
            userType: 'nbfc',
            verificationType: 'nbfc_license',
            status: 'pending',
            priority: 'high',
            submittedDate: '2024-01-27',
            documents: [
                { type: 'NBFC License', url: '/docs/license1.pdf', status: 'pending' },
                { type: 'RBI Registration', url: '/docs/rbi1.pdf', status: 'pending' },
                { type: 'Financial Statements', url: '/docs/fin1.pdf', status: 'pending' },
            ],
        },
        {
            id: 'v3',
            userId: 'u3',
            userName: 'Priya Sharma',
            userType: 'candidate',
            verificationType: 'kyc',
            status: 'pending',
            priority: 'medium',
            submittedDate: '2024-01-26',
            documents: [
                { type: 'Aadhaar Card', url: '/docs/aadhaar1.pdf', status: 'pending' },
                { type: 'PAN Card', url: '/docs/pan1.pdf', status: 'pending' },
                { type: 'Address Proof', url: '/docs/address1.pdf', status: 'pending' },
            ],
        },
        {
            id: 'v4',
            userId: 'u4',
            userName: 'Rajesh Kumar',
            userType: 'candidate',
            verificationType: 'employment',
            status: 'under_review',
            priority: 'high',
            submittedDate: '2024-01-25',
            documents: [
                { type: 'Offer Letter', url: '/docs/offer1.pdf', status: 'verified' },
                { type: 'Salary Slips (3 months)', url: '/docs/salary1.pdf', status: 'pending' },
                { type: 'Employment Letter', url: '/docs/emp1.pdf', status: 'pending' },
            ],
        },
        {
            id: 'v5',
            userId: 'u5',
            userName: 'Digital Marketing Co',
            userType: 'company',
            verificationType: 'company',
            status: 'pending',
            priority: 'medium',
            submittedDate: '2024-01-25',
            documents: [
                { type: 'GST Certificate', url: '/docs/gst2.pdf', status: 'pending' },
                { type: 'Company Website', url: 'https://example.com', status: 'pending' },
            ],
        },
        {
            id: 'v6',
            userId: 'u6',
            userName: 'Amit Verma',
            userType: 'candidate',
            verificationType: 'kyc',
            status: 'approved',
            priority: 'low',
            submittedDate: '2024-01-20',
            documents: [
                { type: 'Aadhaar Card', url: '/docs/aadhaar2.pdf', status: 'verified' },
                { type: 'PAN Card', url: '/docs/pan2.pdf', status: 'verified' },
            ],
            notes: 'All documents verified successfully',
        },
        {
            id: 'v7',
            userId: 'u7',
            userName: 'Neha Gupta',
            userType: 'candidate',
            verificationType: 'kyc',
            status: 'rejected',
            priority: 'low',
            submittedDate: '2024-01-18',
            documents: [
                { type: 'Aadhaar Card', url: '/docs/aadhaar3.pdf', status: 'rejected' },
                { type: 'PAN Card', url: '/docs/pan3.pdf', status: 'rejected' },
            ],
            notes: 'Documents are unclear and unreadable. Please resubmit.',
        },
    ];

    // Filter verifications
    const filteredVerifications = allVerifications.filter(v => {
        const matchesType = filterType === 'all' || v.verificationType === filterType;
        const matchesStatus = filterStatus === 'all' || v.status === filterStatus;
        const matchesPriority = filterPriority === 'all' || v.priority === filterPriority;
        return matchesType && matchesStatus && matchesPriority;
    });

    // Stats
    const stats = {
        total: allVerifications.length,
        pending: allVerifications.filter(v => v.status === 'pending').length,
        underReview: allVerifications.filter(v => v.status === 'under_review').length,
        approved: allVerifications.filter(v => v.status === 'approved').length,
        rejected: allVerifications.filter(v => v.status === 'rejected').length,
        highPriority: allVerifications.filter(v => v.priority === 'high' && v.status === 'pending').length,
    };

    const getUserTypeIcon = (type: string) => {
        switch (type) {
            case 'company': return '🏢';
            case 'candidate': return '👤';
            case 'nbfc': return '🏦';
            default: return '📄';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'under_review': return 'bg-blue-100 text-blue-800';
            case 'approved': return 'bg-green-100 text-green-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getDocumentStatusIcon = (status: string) => {
        switch (status) {
            case 'verified': return '✅';
            case 'rejected': return '❌';
            case 'pending': return '⏳';
            default: return '📄';
        }
    };

    const handleReview = (action: 'approve' | 'reject') => {
        if (!selectedVerification) return;
        console.log(`${action} verification:`, selectedVerification.id, 'Notes:', reviewNotes);
        // In production, make API call to update verification status
        alert(`Verification ${action}d: ${selectedVerification.userName}`);
        setSelectedVerification(null);
        setReviewNotes('');
    };

    const handleStartReview = (verificationId: string) => {
        console.log('Start review:', verificationId);
        // In production, update status to under_review
        alert(`Started review for verification: ${verificationId}`);
    };

    return (
        <DashboardLayout
            title="Verifications"
            showBackButton={true}
            backTo="/admin/dashboard"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin/dashboard' },
                { label: 'Verifications' }
            ]}
        >
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Verifications</h1>
                    <p className="mt-2 text-gray-600">Review and manage KYC and document verifications</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                        <div className="text-sm text-gray-600">Total</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-yellow-900">{stats.pending}</div>
                        <div className="text-sm text-yellow-700">Pending</div>
                    </div>
                    <div className="bg-blue-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-blue-900">{stats.underReview}</div>
                        <div className="text-sm text-blue-700">Under Review</div>
                    </div>
                    <div className="bg-green-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-green-900">{stats.approved}</div>
                        <div className="text-sm text-green-700">Approved</div>
                    </div>
                    <div className="bg-red-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-red-900">{stats.rejected}</div>
                        <div className="text-sm text-red-700">Rejected</div>
                    </div>
                    <div className="bg-orange-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-orange-900">{stats.highPriority}</div>
                        <div className="text-sm text-orange-700">High Priority</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Verification Type</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Types</option>
                                <option value="kyc">KYC</option>
                                <option value="company">Company</option>
                                <option value="nbfc_license">NBFC License</option>
                                <option value="offer_letter">Offer Letter</option>
                                <option value="employment">Employment</option>
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
                                <option value="pending">Pending</option>
                                <option value="under_review">Under Review</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                            <select
                                value={filterPriority}
                                onChange={(e) => setFilterPriority(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Priorities</option>
                                <option value="high">High</option>
                                <option value="medium">Medium</option>
                                <option value="low">Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Verifications List */}
                <div className="grid grid-cols-1 gap-4">
                    {filteredVerifications.map((verification) => (
                        <div key={verification.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                            <div className="flex items-start justify-between">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="text-4xl">{getUserTypeIcon(verification.userType)}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-bold text-gray-900">{verification.userName}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(verification.status)}`}>
                                                {verification.status.replace('_', ' ')}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(verification.priority)}`}>
                                                {verification.priority} priority
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                                            <span>Type: <span className="font-medium capitalize">{verification.verificationType.replace('_', ' ')}</span></span>
                                            <span>•</span>
                                            <span>Submitted: {new Date(verification.submittedDate).toLocaleDateString()}</span>
                                            <span>•</span>
                                            <span>User Type: <span className="capitalize">{verification.userType}</span></span>
                                        </div>
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {verification.documents.map((doc, idx) => (
                                                <div key={idx} className="flex items-center gap-2 px-3 py-1 bg-gray-50 rounded-lg text-sm">
                                                    <span>{getDocumentStatusIcon(doc.status)}</span>
                                                    <span>{doc.type}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {verification.notes && (
                                            <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                                                <p className="text-sm text-gray-700"><strong>Notes:</strong> {verification.notes}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        onClick={() => setSelectedVerification(verification)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium whitespace-nowrap"
                                    >
                                        Review Details
                                    </button>
                                    {verification.status === 'pending' && (
                                        <button
                                            onClick={() => handleStartReview(verification.id)}
                                            className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium whitespace-nowrap"
                                        >
                                            Start Review
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* No Results */}
                {filteredVerifications.length === 0 && (
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <div className="text-gray-400 text-5xl mb-4">📋</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No verifications found</h3>
                        <p className="text-gray-500">Try adjusting your filter criteria</p>
                    </div>
                )}

                {/* Review Modal */}
                {selectedVerification && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-gray-900">Review Verification</h2>
                                    <button
                                        onClick={() => {
                                            setSelectedVerification(null);
                                            setReviewNotes('');
                                        }}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="text-2xl">×</span>
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-6">
                                    {/* User Info */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Information</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Name</label>
                                                <p className="mt-1 text-gray-900">{selectedVerification.userName}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">User Type</label>
                                                <p className="mt-1 capitalize">{selectedVerification.userType}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Verification Type</label>
                                                <p className="mt-1 capitalize">{selectedVerification.verificationType.replace('_', ' ')}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Submitted Date</label>
                                                <p className="mt-1">{new Date(selectedVerification.submittedDate).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Priority</label>
                                                <p className="mt-1">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedVerification.priority)}`}>
                                                        {selectedVerification.priority}
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Current Status</label>
                                                <p className="mt-1">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedVerification.status)}`}>
                                                        {selectedVerification.status.replace('_', ' ')}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Documents */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
                                        <div className="space-y-3">
                                            {selectedVerification.documents.map((doc, idx) => (
                                                <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-2xl">{getDocumentStatusIcon(doc.status)}</span>
                                                        <div>
                                                            <p className="font-medium text-gray-900">{doc.type}</p>
                                                            <p className="text-sm text-gray-500">{doc.url}</p>
                                                        </div>
                                                    </div>
                                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                                                        View Document
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Review Notes */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Review Notes</label>
                                        <textarea
                                            value={reviewNotes}
                                            onChange={(e) => setReviewNotes(e.target.value)}
                                            rows={4}
                                            placeholder="Add notes about this verification review..."
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    {/* Existing Notes */}
                                    {selectedVerification.notes && (
                                        <div className="p-4 bg-gray-50 rounded-lg">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Previous Notes</label>
                                            <p className="text-gray-900">{selectedVerification.notes}</p>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3 pt-4">
                                        <button
                                            onClick={() => handleReview('approve')}
                                            className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                                        >
                                            ✓ Approve Verification
                                        </button>
                                        <button
                                            onClick={() => handleReview('reject')}
                                            className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
                                        >
                                            ✗ Reject Verification
                                        </button>
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

export default AdminVerifications;
