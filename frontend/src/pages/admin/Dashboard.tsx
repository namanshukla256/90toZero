import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';

interface Stats {
    totalUsers: number;
    totalCompanies: number;
    totalCandidates: number;
    totalNBFCs: number;
}

const AdminDashboard = () => {
    const [stats, setStats] = useState<Stats>({
        totalUsers: 0,
        totalCompanies: 0,
        totalCandidates: 0,
        totalNBFCs: 0,
    });

    useEffect(() => {
        // Mock stats - In production, fetch from API
        setStats({
            totalUsers: 156,
            totalCompanies: 42,
            totalCandidates: 98,
            totalNBFCs: 16,
        });
    }, []);

    return (
        <DashboardLayout title="Admin Dashboard">
            <div className="space-y-6">
                {/* Welcome Section */}
                <div className="card">
                    <h2 className="text-2xl font-bold mb-2">Welcome, Admin!</h2>
                    <p className="text-gray-600">
                        Manage and monitor the 90toZero platform
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                        <div className="text-sm font-medium opacity-90">Total Users</div>
                        <div className="text-3xl font-bold mt-2">{stats.totalUsers}</div>
                        <div className="text-xs mt-2 opacity-75">All registered users</div>
                    </div>

                    <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
                        <div className="text-sm font-medium opacity-90">Companies</div>
                        <div className="text-3xl font-bold mt-2">{stats.totalCompanies}</div>
                        <div className="text-xs mt-2 opacity-75">Active employers</div>
                    </div>

                    <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                        <div className="text-sm font-medium opacity-90">Candidates</div>
                        <div className="text-3xl font-bold mt-2">{stats.totalCandidates}</div>
                        <div className="text-xs mt-2 opacity-75">Job seekers</div>
                    </div>

                    <div className="card bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                        <div className="text-sm font-medium opacity-90">NBFC Partners</div>
                        <div className="text-3xl font-bold mt-2">{stats.totalNBFCs}</div>
                        <div className="text-xs mt-2 opacity-75">Loan providers</div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="card">
                    <h3 className="text-xl font-bold mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium">New Company Registration</p>
                                <p className="text-sm text-gray-600">TechCorp Solutions joined</p>
                            </div>
                            <span className="text-xs text-gray-500">2 hours ago</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium">Buyout Request</p>
                                <p className="text-sm text-gray-600">₹1.2L buyout processed</p>
                            </div>
                            <span className="text-xs text-gray-500">5 hours ago</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                                <p className="font-medium">New NBFC Partner</p>
                                <p className="text-sm text-gray-600">QuickFinance registered</p>
                            </div>
                            <span className="text-xs text-gray-500">1 day ago</span>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="card">
                    <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                        <button className="btn-primary" disabled>
                            Manage Users
                        </button>
                        <button className="btn-secondary" disabled>
                            View Reports
                        </button>
                        <button className="btn-secondary" disabled>
                            Platform Settings
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminDashboard;
