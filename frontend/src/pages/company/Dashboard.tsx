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

interface Job {
    id: string;
    title: string;
    applications: number;
    status: 'active' | 'inactive';
    postedDate: string;
}

interface Application {
    id: string;
    candidateName: string;
    jobTitle: string;
    status: string;
    appliedDate: string;
    buyoutRequired: boolean;
}

const CompanyDashboard: React.FC = () => {
    // Stats data
    const stats: StatCard[] = [
        { label: 'Active Jobs', value: 8, change: 15, changeType: 'increase', icon: '📋', color: 'bg-blue-500' },
        { label: 'Total Applications', value: 156, change: 22, changeType: 'increase', icon: '📝', color: 'bg-purple-500' },
        { label: 'Interviews Scheduled', value: 24, change: 12, changeType: 'increase', icon: '🎯', color: 'bg-yellow-500' },
        { label: 'Hires This Month', value: 5, change: 25, changeType: 'increase', icon: '✅', color: 'bg-green-500' },
        { label: 'Buyout Sponsored', value: 18, change: 35, changeType: 'increase', icon: '💰', color: 'bg-orange-500' },
        { label: 'Avg Time to Hire', value: '21 days', change: 28, changeType: 'decrease', icon: '⏱️', color: 'bg-indigo-500' },
    ];

    // Active jobs
    const activeJobs: Job[] = [
        { id: 'job1', title: 'Senior Full Stack Developer', applications: 45, status: 'active', postedDate: '2024-01-10' },
        { id: 'job2', title: 'DevOps Engineer', applications: 32, status: 'active', postedDate: '2024-01-15' },
        { id: 'job3', title: 'Backend Developer', applications: 28, status: 'active', postedDate: '2024-01-18' },
    ];

    // Recent applications
    const recentApplications: Application[] = [
        { id: 'app1', candidateName: 'Rajesh Kumar', jobTitle: 'Senior Full Stack Developer', status: 'interview', appliedDate: '2024-01-28', buyoutRequired: true },
        { id: 'app2', candidateName: 'Priya Sharma', jobTitle: 'DevOps Engineer', status: 'screening', appliedDate: '2024-01-28', buyoutRequired: false },
        { id: 'app3', candidateName: 'Amit Patel', jobTitle: 'Backend Developer', status: 'applied', appliedDate: '2024-01-27', buyoutRequired: true },
        { id: 'app4', candidateName: 'Sneha Reddy', jobTitle: 'Senior Full Stack Developer', status: 'offer', appliedDate: '2024-01-27', buyoutRequired: true },
    ];

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            applied: 'bg-gray-100 text-gray-800',
            screening: 'bg-blue-100 text-blue-800',
            interview: 'bg-yellow-100 text-yellow-800',
            offer: 'bg-purple-100 text-purple-800',
            hired: 'bg-green-100 text-green-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <DashboardLayout title="Company Dashboard">
            <div className="p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Company Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back! Here's your hiring overview</p>
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

                {/* Quick Actions */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Link
                            to="/company/jobs"
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-lg transition-all text-center"
                        >
                            <div className="text-3xl mb-2">📝</div>
                            <p className="font-semibold">Post New Job</p>
                        </Link>
                        <Link
                            to="/company/applications"
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-lg transition-all text-center"
                        >
                            <div className="text-3xl mb-2">📋</div>
                            <p className="font-semibold">View Applications</p>
                        </Link>
                        <Link
                            to="/company/candidates"
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-lg transition-all text-center"
                        >
                            <div className="text-3xl mb-2">🔍</div>
                            <p className="font-semibold">Search Candidates</p>
                        </Link>
                        <Link
                            to="/company/analytics"
                            className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-4 rounded-lg transition-all text-center"
                        >
                            <div className="text-3xl mb-2">📊</div>
                            <p className="font-semibold">View Analytics</p>
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Active Jobs */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Active Jobs</h2>
                            <Link to="/company/jobs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                View All →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {activeJobs.map((job) => (
                                <div key={job.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-semibold text-gray-900">{job.title}</h3>
                                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <p className="text-gray-600">{job.applications} applications</p>
                                        <p className="text-gray-500">Posted {new Date(job.postedDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link
                            to="/company/jobs"
                            className="block mt-4 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-medium"
                        >
                            Manage Jobs
                        </Link>
                    </div>

                    {/* Recent Applications */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
                            <Link to="/company/applications" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                                View All →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentApplications.map((app) => (
                                <div key={app.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{app.candidateName}</h3>
                                            <p className="text-sm text-gray-600">{app.jobTitle}</p>
                                        </div>
                                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(app.status)}`}>
                                            {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs">
                                        <p className="text-gray-500">{new Date(app.appliedDate).toLocaleDateString()}</p>
                                        {app.buyoutRequired && (
                                            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full">Buyout Required</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Link
                            to="/company/applications"
                            className="block mt-4 w-full py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-center font-medium"
                        >
                            View All Applications
                        </Link>
                    </div>
                </div>

                {/* Buyout Impact Card */}
                <div className="mt-8 bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 p-6 rounded-lg shadow">
                    <div className="flex items-start justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Buyout Impact This Month</h2>
                            <p className="text-gray-600 mb-4">Your hiring acceleration through buyout sponsorships</p>
                            <div className="grid grid-cols-3 gap-6">
                                <div>
                                    <p className="text-sm text-gray-600">Sponsored</p>
                                    <p className="text-2xl font-bold text-orange-600">18</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Success Rate</p>
                                    <p className="text-2xl font-bold text-green-600">87%</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Time Saved</p>
                                    <p className="text-2xl font-bold text-blue-600">45%</p>
                                </div>
                            </div>
                        </div>
                        <Link
                            to="/company/analytics"
                            className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium"
                        >
                            View Full Report
                        </Link>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CompanyDashboard;
