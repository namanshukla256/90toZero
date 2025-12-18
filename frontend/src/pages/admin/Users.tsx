import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';

interface User {
    id: string;
    name: string;
    email: string;
    userType: 'company' | 'candidate' | 'nbfc';
    status: 'active' | 'pending' | 'suspended' | 'rejected';
    verificationStatus: 'verified' | 'pending' | 'rejected';
    joinedDate: string;
    lastActive: string;
}

const AdminUsers: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Dummy user data
    const allUsers: User[] = [
        { id: 'u1', name: 'Tech Solutions Pvt Ltd', email: 'hr@techsolutions.com', userType: 'company', status: 'active', verificationStatus: 'verified', joinedDate: '2024-01-15', lastActive: '2 hours ago' },
        { id: 'u2', name: 'Innovate Tech Pvt Ltd', email: 'contact@innovatetech.com', userType: 'company', status: 'active', verificationStatus: 'verified', joinedDate: '2024-01-10', lastActive: '1 day ago' },
        { id: 'u3', name: 'Digital Marketing Co', email: 'info@digitalmarketing.com', userType: 'company', status: 'pending', verificationStatus: 'pending', joinedDate: '2024-01-28', lastActive: '5 hours ago' },
        { id: 'u4', name: 'Startup Hub Inc', email: 'team@startuphub.com', userType: 'company', status: 'suspended', verificationStatus: 'verified', joinedDate: '2023-12-20', lastActive: '7 days ago' },

        { id: 'u5', name: 'Rajesh Kumar', email: 'rajesh.kumar@email.com', userType: 'candidate', status: 'active', verificationStatus: 'verified', joinedDate: '2024-01-20', lastActive: '1 hour ago' },
        { id: 'u6', name: 'Priya Sharma', email: 'priya.sharma@email.com', userType: 'candidate', status: 'active', verificationStatus: 'verified', joinedDate: '2024-01-18', lastActive: '3 hours ago' },
        { id: 'u7', name: 'Arjun Mehta', email: 'arjun.mehta@email.com', userType: 'candidate', status: 'active', verificationStatus: 'verified', joinedDate: '2024-01-22', lastActive: '30 mins ago' },
        { id: 'u8', name: 'Sneha Reddy', email: 'sneha.reddy@email.com', userType: 'candidate', status: 'pending', verificationStatus: 'pending', joinedDate: '2024-01-27', lastActive: '2 hours ago' },
        { id: 'u9', name: 'Amit Verma', email: 'amit.verma@email.com', userType: 'candidate', status: 'active', verificationStatus: 'verified', joinedDate: '2024-01-12', lastActive: '6 hours ago' },
        { id: 'u10', name: 'Neha Gupta', email: 'neha.gupta@email.com', userType: 'candidate', status: 'rejected', verificationStatus: 'rejected', joinedDate: '2024-01-25', lastActive: '2 days ago' },

        { id: 'u11', name: 'QuickLoan Finance', email: 'support@quickloan.com', userType: 'nbfc', status: 'active', verificationStatus: 'verified', joinedDate: '2023-12-01', lastActive: '4 hours ago' },
        { id: 'u12', name: 'FastCredit NBFC', email: 'ops@fastcredit.com', userType: 'nbfc', status: 'active', verificationStatus: 'verified', joinedDate: '2023-11-15', lastActive: '1 day ago' },
        { id: 'u13', name: 'InstantLoan Partners', email: 'info@instantloan.com', userType: 'nbfc', status: 'pending', verificationStatus: 'pending', joinedDate: '2024-01-26', lastActive: '8 hours ago' },
    ];

    // Filter users
    const filteredUsers = allUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || user.userType === filterType;
        const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
        return matchesSearch && matchesType && matchesStatus;
    });

    // Stats
    const stats = {
        total: allUsers.length,
        companies: allUsers.filter(u => u.userType === 'company').length,
        candidates: allUsers.filter(u => u.userType === 'candidate').length,
        nbfcs: allUsers.filter(u => u.userType === 'nbfc').length,
        pending: allUsers.filter(u => u.status === 'pending').length,
        suspended: allUsers.filter(u => u.status === 'suspended').length,
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
            case 'active': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'suspended': return 'bg-red-100 text-red-800';
            case 'rejected': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getVerificationColor = (status: string) => {
        switch (status) {
            case 'verified': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const handleAction = (action: string, userId: string) => {
        console.log(`${action} user:`, userId);
        // In production, make API call to update user status
        alert(`Action: ${action} for user ${userId}`);
    };

    return (
        <DashboardLayout
            title="User Management"
            showBackButton={true}
            backTo="/admin/dashboard"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin/dashboard' },
                { label: 'User Management' }
            ]}
        >
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                    <p className="mt-2 text-gray-600">Manage all platform users and their access</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                        <div className="text-sm text-gray-600">Total Users</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-purple-900">{stats.companies}</div>
                        <div className="text-sm text-purple-700">Companies</div>
                    </div>
                    <div className="bg-green-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-green-900">{stats.candidates}</div>
                        <div className="text-sm text-green-700">Candidates</div>
                    </div>
                    <div className="bg-indigo-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-indigo-900">{stats.nbfcs}</div>
                        <div className="text-sm text-indigo-700">NBFCs</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-yellow-900">{stats.pending}</div>
                        <div className="text-sm text-yellow-700">Pending</div>
                    </div>
                    <div className="bg-red-50 rounded-lg shadow p-4">
                        <div className="text-2xl font-bold text-red-900">{stats.suspended}</div>
                        <div className="text-sm text-red-700">Suspended</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Search Users</label>
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* User Type Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
                            <select
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Types</option>
                                <option value="company">Companies</option>
                                <option value="candidate">Candidates</option>
                                <option value="nbfc">NBFCs</option>
                            </select>
                        </div>

                        {/* Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Status</option>
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="suspended">Suspended</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verification</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="text-2xl mr-3">{getUserTypeIcon(user.userType)}</div>
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                                                {user.userType}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)} capitalize`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getVerificationColor(user.verificationStatus)} capitalize`}>
                                                {user.verificationStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(user.joinedDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user.lastActive}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => setSelectedUser(user)}
                                                    className="text-blue-600 hover:text-blue-900 font-medium"
                                                >
                                                    View
                                                </button>
                                                {user.status === 'pending' && (
                                                    <button
                                                        onClick={() => handleAction('approve', user.id)}
                                                        className="text-green-600 hover:text-green-900 font-medium"
                                                    >
                                                        Approve
                                                    </button>
                                                )}
                                                {user.status === 'active' && (
                                                    <button
                                                        onClick={() => handleAction('suspend', user.id)}
                                                        className="text-orange-600 hover:text-orange-900 font-medium"
                                                    >
                                                        Suspend
                                                    </button>
                                                )}
                                                {user.status === 'suspended' && (
                                                    <button
                                                        onClick={() => handleAction('activate', user.id)}
                                                        className="text-green-600 hover:text-green-900 font-medium"
                                                    >
                                                        Activate
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* No Results */}
                    {filteredUsers.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-5xl mb-4">🔍</div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No users found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                    )}
                </div>

                {/* User Details Modal */}
                {selectedUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-gray-900">User Details</h2>
                                    <button
                                        onClick={() => setSelectedUser(null)}
                                        className="text-gray-400 hover:text-gray-600"
                                    >
                                        <span className="text-2xl">×</span>
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="space-y-6">
                                    {/* Basic Info */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Name</label>
                                                <p className="mt-1 text-gray-900">{selectedUser.name}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Email</label>
                                                <p className="mt-1 text-gray-900">{selectedUser.email}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">User Type</label>
                                                <p className="mt-1 capitalize">{selectedUser.userType}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">User ID</label>
                                                <p className="mt-1 text-gray-900">{selectedUser.id}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Joined Date</label>
                                                <p className="mt-1 text-gray-900">{new Date(selectedUser.joinedDate).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Last Active</label>
                                                <p className="mt-1 text-gray-900">{selectedUser.lastActive}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Status Info */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Account Status</label>
                                                <p className="mt-1">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedUser.status)} capitalize`}>
                                                        {selectedUser.status}
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm font-medium text-gray-600">Verification Status</label>
                                                <p className="mt-1">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getVerificationColor(selectedUser.verificationStatus)} capitalize`}>
                                                        {selectedUser.verificationStatus}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                                        <div className="grid grid-cols-2 gap-3">
                                            <button
                                                onClick={() => handleAction('verify', selectedUser.id)}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                            >
                                                Verify User
                                            </button>
                                            <button
                                                onClick={() => handleAction('suspend', selectedUser.id)}
                                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
                                            >
                                                Suspend User
                                            </button>
                                            <button
                                                onClick={() => handleAction('reset_password', selectedUser.id)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                            >
                                                Reset Password
                                            </button>
                                            <button
                                                onClick={() => handleAction('send_email', selectedUser.id)}
                                                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                                            >
                                                Send Email
                                            </button>
                                            <button
                                                onClick={() => handleAction('view_activity', selectedUser.id)}
                                                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                                            >
                                                View Activity Log
                                            </button>
                                            <button
                                                onClick={() => handleAction('delete', selectedUser.id)}
                                                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                            >
                                                Delete User
                                            </button>
                                        </div>
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

export default AdminUsers;
