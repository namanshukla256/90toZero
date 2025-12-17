import React from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';

interface StatCard {
    label: string;
    value: number | string;
    change: number;
    changeType: 'increase' | 'decrease';
    icon: string;
    color: string;
}

interface PendingVerification {
    id: string;
    type: 'company' | 'candidate' | 'nbfc';
    name: string;
    submittedDate: string;
    priority: 'high' | 'medium' | 'low';
}

interface RecentActivity {
    id: string;
    type: string;
    description: string;
    timestamp: string;
    user: string;
}

const AdminDashboard: React.FC = () => {
    // Platform stats
    const stats: StatCard[] = [
        { label: 'Total Users', value: 1247, change: 18, changeType: 'increase', icon: '👥', color: 'bg-blue-500' },
        { label: 'Active Companies', value: 156, change: 12, changeType: 'increase', icon: '🏢', color: 'bg-purple-500' },
        { label: 'Active Candidates', value: 1024, change: 22, changeType: 'increase', icon: '👤', color: 'bg-green-500' },
        { label: 'NBFC Partners', value: 8, change: 2, changeType: 'increase', icon: '🏦', color: 'bg-indigo-500' },
        { label: 'Pending Verifications', value: 34, change: 8, changeType: 'decrease', icon: '⏳', color: 'bg-yellow-500' },
        { label: 'Total Transactions', value: '₹12.4Cr', change: 28, changeType: 'increase', icon: '💰', color: 'bg-emerald-500' },
    ];

    // Pending verifications
    const pendingVerifications: PendingVerification[] = [
        { id: 'v1', type: 'company', name: 'Tech Solutions Pvt Ltd', submittedDate: '2024-01-28', priority: 'high' },
        { id: 'v2', type: 'nbfc', name: 'QuickLoan Finance', submittedDate: '2024-01-27', priority: 'high' },
        { id: 'v3', type: 'candidate', name: 'Priya Sharma', submittedDate: '2024-01-26', priority: 'medium' },
        { id: 'v4', type: 'company', name: 'Digital Marketing Co', submittedDate: '2024-01-25', priority: 'medium' },
        { id: 'v5', type: 'candidate', name: 'Amit Verma', submittedDate: '2024-01-24', priority: 'low' },
    ];

    // Recent activities
    const recentActivities: RecentActivity[] = [
        { id: 'a1', type: 'verification', description: 'Company verified: Innovate Tech Pvt Ltd', timestamp: '10 mins ago', user: 'Admin' },
        { id: 'a2', type: 'transaction', description: 'Loan disbursed: ₹95,000 to Rajesh Kumar', timestamp: '25 mins ago', user: 'NBFC-001' },
        { id: 'a3', type: 'user', description: 'New candidate registered: Sneha Patel', timestamp: '1 hour ago', user: 'System' },
        { id: 'a4', type: 'verification', description: 'KYC approved for Arjun Mehta', timestamp: '2 hours ago', user: 'Admin' },
        { id: 'a5', type: 'transaction', description: 'EMI payment received: ₹26,500', timestamp: '3 hours ago', user: 'Payment Gateway' },
        { id: 'a6', type: 'alert', description: 'Flagged suspicious activity for user ID: USR-1234', timestamp: '4 hours ago', user: 'System' },
    ];

    // System health metrics
    const systemHealth = {
        apiUptime: 99.98,
        avgResponseTime: 145,
        activeConnections: 342,
        databaseHealth: 'healthy',
        paymentGateway: 'operational',
        kycService: 'operational',
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'high': return 'bg-red-100 text-red-800';
            case 'medium': return 'bg-yellow-100 text-yellow-800';
            case 'low': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'company': return '🏢';
            case 'candidate': return '👤';
            case 'nbfc': return '🏦';
            default: return '📄';
        }
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'verification': return '✅';
            case 'transaction': return '💰';
            case 'user': return '👤';
            case 'alert': return '⚠️';
            default: return '📋';
        }
    };

    return (
        <DashboardLayout title="Admin Dashboard">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="mt-2 text-gray-600">Platform overview and system management</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                                    <p className="mt-2 text-3xl font-bold text-gray-900">{stat.value}</p>
                                    <div className="mt-2 flex items-center">
                                        <span className={`text-sm font-medium ${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                                            {stat.changeType === 'increase' ? '↑' : '↓'} {Math.abs(stat.change)}%
                                        </span>
                                        <span className="ml-2 text-sm text-gray-500">vs last month</span>
                                    </div>
                                </div>
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <span className="text-3xl">{stat.icon}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link
                            to="/admin/users"
                            className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-center"
                        >
                            <div className="text-3xl mb-2">👥</div>
                            <div className="font-medium text-gray-900">Manage Users</div>
                        </Link>
                        <Link
                            to="/admin/verifications"
                            className="p-4 border-2 border-gray-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition text-center"
                        >
                            <div className="text-3xl mb-2">✅</div>
                            <div className="font-medium text-gray-900">Verifications</div>
                        </Link>
                        <Link
                            to="/admin/transactions"
                            className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition text-center"
                        >
                            <div className="text-3xl mb-2">💰</div>
                            <div className="font-medium text-gray-900">Transactions</div>
                        </Link>
                        <Link
                            to="/admin/analytics"
                            className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition text-center"
                        >
                            <div className="text-3xl mb-2">📊</div>
                            <div className="font-medium text-gray-900">Analytics</div>
                        </Link>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Pending Verifications */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-bold text-gray-900">Pending Verifications</h2>
                                <Link to="/admin/verifications" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                    View All →
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {pendingVerifications.map((verification) => (
                                    <div key={verification.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                                        <div className="flex items-center gap-3">
                                            <div className="text-2xl">{getTypeIcon(verification.type)}</div>
                                            <div>
                                                <div className="font-medium text-gray-900">{verification.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    Submitted on {new Date(verification.submittedDate).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(verification.priority)}`}>
                                                {verification.priority}
                                            </span>
                                            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                                                Review
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Activities */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                                        <div className="text-xl">{getActivityIcon(activity.type)}</div>
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                                            <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                                                <span>{activity.timestamp}</span>
                                                <span>•</span>
                                                <span>by {activity.user}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Health */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">System Health</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        <div className="text-center">
                            <div className="text-3xl mb-2">⚡</div>
                            <div className="text-2xl font-bold text-gray-900">{systemHealth.apiUptime}%</div>
                            <div className="text-sm text-gray-600">API Uptime</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">⏱️</div>
                            <div className="text-2xl font-bold text-gray-900">{systemHealth.avgResponseTime}ms</div>
                            <div className="text-sm text-gray-600">Avg Response</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">🔗</div>
                            <div className="text-2xl font-bold text-gray-900">{systemHealth.activeConnections}</div>
                            <div className="text-sm text-gray-600">Active Users</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">💾</div>
                            <div className="text-2xl font-bold text-green-600">✓</div>
                            <div className="text-sm text-gray-600">Database</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">💳</div>
                            <div className="text-2xl font-bold text-green-600">✓</div>
                            <div className="text-sm text-gray-600">Payments</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">🔐</div>
                            <div className="text-2xl font-bold text-green-600">✓</div>
                            <div className="text-sm text-gray-600">KYC Service</div>
                        </div>
                    </div>
                </div>

                {/* Alerts */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">⚠️ Alerts & Notifications</h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-white rounded border border-yellow-300">
                            <div>
                                <p className="font-medium text-gray-900">34 verifications pending review</p>
                                <p className="text-sm text-gray-600">8 marked as high priority</p>
                            </div>
                            <Link to="/admin/verifications" className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium">
                                Review
                            </Link>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded border border-orange-300">
                            <div>
                                <p className="font-medium text-gray-900">2 suspicious transactions flagged</p>
                                <p className="text-sm text-gray-600">Requiring immediate attention</p>
                            </div>
                            <Link to="/admin/transactions" className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium">
                                Investigate
                            </Link>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded border border-blue-300">
                            <div>
                                <p className="font-medium text-gray-900">Database backup completed successfully</p>
                                <p className="text-sm text-gray-600">Last backup: 2 hours ago</p>
                            </div>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                                View Logs
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
