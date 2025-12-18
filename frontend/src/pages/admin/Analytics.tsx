import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';

interface Metric {
    label: string;
    value: number | string;
    change: number;
    changeType: 'increase' | 'decrease';
}

const AdminAnalytics: React.FC = () => {
    const [timeRange, setTimeRange] = useState('last_30_days');

    // Key metrics
    const keyMetrics: Metric[] = [
        { label: 'Total Revenue', value: '₹4.2Cr', change: 32, changeType: 'increase' },
        { label: 'Platform Fees', value: '₹42.5L', change: 28, changeType: 'increase' },
        { label: 'Commission Earned', value: '₹18.6L', change: 35, changeType: 'increase' },
        { label: 'Total Loans Facilitated', value: '₹12.4Cr', change: 45, changeType: 'increase' },
        { label: 'Active Users', value: 1247, change: 18, changeType: 'increase' },
        { label: 'Success Rate', value: '94.2%', change: 5, changeType: 'increase' },
    ];

    // Monthly revenue data (last 6 months)
    const monthlyRevenue = [
        { month: 'Aug', platformFees: 32, commission: 14, total: 46 },
        { month: 'Sep', platformFees: 35, commission: 16, total: 51 },
        { month: 'Oct', platformFees: 38, commission: 17, total: 55 },
        { month: 'Nov', platformFees: 40, commission: 18, total: 58 },
        { month: 'Dec', platformFees: 42, commission: 18, total: 60 },
        { month: 'Jan', platformFees: 42.5, commission: 18.6, total: 61.1 },
    ];

    // User growth data
    const userGrowth = [
        { month: 'Aug', companies: 98, candidates: 756, nbfcs: 5 },
        { month: 'Sep', companies: 112, candidates: 812, nbfcs: 6 },
        { month: 'Oct', companies: 124, candidates: 878, nbfcs: 6 },
        { month: 'Nov', companies: 138, candidates: 924, nbfcs: 7 },
        { month: 'Dec', companies: 148, candidates: 985, nbfcs: 8 },
        { month: 'Jan', companies: 156, candidates: 1024, nbfcs: 8 },
    ];

    // Conversion funnel
    const conversionFunnel = [
        { stage: 'Candidate Registrations', count: 1247, percentage: 100 },
        { stage: 'Profile Completed', count: 1024, percentage: 82.1 },
        { stage: 'Job Applications', count: 856, percentage: 68.6 },
        { stage: 'Loan Applications', count: 428, percentage: 34.3 },
        { stage: 'Loans Approved', count: 324, percentage: 26.0 },
        { stage: 'Successful Hires', count: 298, percentage: 23.9 },
    ];

    // Top performing companies
    const topCompanies = [
        { name: 'Tech Solutions Pvt Ltd', hires: 24, revenue: '₹2.4L', successRate: 96 },
        { name: 'Innovate Tech Pvt Ltd', hires: 18, revenue: '₹1.8L', successRate: 94 },
        { name: 'Digital Hub Inc', hires: 15, revenue: '₹1.5L', successRate: 93 },
        { name: 'Cloud Systems Co', hires: 12, revenue: '₹1.2L', successRate: 92 },
        { name: 'Data Analytics Corp', hires: 10, revenue: '₹1.0L', successRate: 90 },
    ];

    // Top performing NBFCs
    const topNBFCs = [
        { name: 'QuickLoan Finance', loans: 86, volume: '₹6.4Cr', defaultRate: 2.3 },
        { name: 'FastCredit NBFC', loans: 64, volume: '₹4.2Cr', defaultRate: 3.1 },
        { name: 'InstantLoan Partners', loans: 42, volume: '₹1.8Cr', defaultRate: 4.2 },
    ];

    // Platform health metrics
    const platformHealth = {
        verificationRate: 94.2,
        avgTimeToHire: 21,
        loanApprovalRate: 75.7,
        emiCollectionRate: 96.5,
        customerSatisfaction: 4.6,
        platformUptime: 99.98,
    };

    // Geographic distribution
    const geographicDistribution = [
        { region: 'Bangalore', users: 342, percentage: 27.4 },
        { region: 'Mumbai', users: 286, percentage: 22.9 },
        { region: 'Delhi NCR', users: 248, percentage: 19.9 },
        { region: 'Hyderabad', users: 186, percentage: 14.9 },
        { region: 'Pune', users: 124, percentage: 9.9 },
        { region: 'Others', users: 61, percentage: 4.9 },
    ];

    return (
        <DashboardLayout
            title="Platform Analytics"
            showBackButton={true}
            backTo="/admin/dashboard"
            breadcrumbs={[
                { label: 'Dashboard', href: '/admin/dashboard' },
                { label: 'Analytics' }
            ]}
        >
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
                        <p className="mt-2 text-gray-600">Comprehensive insights and performance metrics</p>
                    </div>
                    <select
                        value={timeRange}
                        onChange={(e) => setTimeRange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="last_7_days">Last 7 Days</option>
                        <option value="last_30_days">Last 30 Days</option>
                        <option value="last_3_months">Last 3 Months</option>
                        <option value="last_6_months">Last 6 Months</option>
                        <option value="last_year">Last Year</option>
                    </select>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {keyMetrics.map((metric, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6">
                            <p className="text-sm font-medium text-gray-600">{metric.label}</p>
                            <p className="mt-2 text-3xl font-bold text-gray-900">{metric.value}</p>
                            <div className="mt-2 flex items-center">
                                <span className={`text-sm font-medium ${metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                                    {metric.changeType === 'increase' ? '↑' : '↓'} {Math.abs(metric.change)}%
                                </span>
                                <span className="ml-2 text-sm text-gray-500">vs last period</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Revenue Trend */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend (Last 6 Months)</h2>
                    <div className="space-y-4">
                        {monthlyRevenue.map((data, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">{data.month}</span>
                                    <span className="text-sm font-bold text-gray-900">₹{data.total}L</span>
                                </div>
                                <div className="flex gap-1">
                                    <div
                                        className="bg-blue-500 h-8 rounded flex items-center justify-center text-white text-xs"
                                        style={{ width: `${(data.platformFees / data.total) * 100}%` }}
                                    >
                                        Platform ₹{data.platformFees}L
                                    </div>
                                    <div
                                        className="bg-green-500 h-8 rounded flex items-center justify-center text-white text-xs"
                                        style={{ width: `${(data.commission / data.total) * 100}%` }}
                                    >
                                        Commission ₹{data.commission}L
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Growth */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">User Growth (Last 6 Months)</h2>
                    <div className="space-y-4">
                        {userGrowth.map((data, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">{data.month}</span>
                                    <span className="text-sm font-bold text-gray-900">
                                        {data.companies + data.candidates + data.nbfcs} total users
                                    </span>
                                </div>
                                <div className="flex gap-1">
                                    <div
                                        className="bg-purple-500 h-6 rounded"
                                        style={{ width: `${(data.companies / (data.companies + data.candidates + data.nbfcs)) * 100}%` }}
                                        title={`${data.companies} companies`}
                                    />
                                    <div
                                        className="bg-green-500 h-6 rounded"
                                        style={{ width: `${(data.candidates / (data.companies + data.candidates + data.nbfcs)) * 100}%` }}
                                        title={`${data.candidates} candidates`}
                                    />
                                    <div
                                        className="bg-indigo-500 h-6 rounded"
                                        style={{ width: `${(data.nbfcs / (data.companies + data.candidates + data.nbfcs)) * 100}%` }}
                                        title={`${data.nbfcs} NBFCs`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-purple-500 rounded"></div>
                            <span className="text-gray-600">Companies</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-green-500 rounded"></div>
                            <span className="text-gray-600">Candidates</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 bg-indigo-500 rounded"></div>
                            <span className="text-gray-600">NBFCs</span>
                        </div>
                    </div>
                </div>

                {/* Conversion Funnel */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Conversion Funnel</h2>
                    <div className="space-y-4">
                        {conversionFunnel.map((stage, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">{stage.stage}</span>
                                    <span className="text-sm font-bold text-gray-900">
                                        {stage.count} ({stage.percentage}%)
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-4">
                                    <div
                                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all"
                                        style={{ width: `${stage.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Top Companies */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing Companies</h2>
                        <div className="space-y-4">
                            {topCompanies.map((company, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{company.name}</div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {company.hires} hires • {company.revenue} revenue
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-green-600">{company.successRate}%</div>
                                        <div className="text-xs text-gray-500">Success Rate</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top NBFCs */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Top Performing NBFCs</h2>
                        <div className="space-y-4">
                            {topNBFCs.map((nbfc, index) => (
                                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                    <div className="flex-1">
                                        <div className="font-medium text-gray-900">{nbfc.name}</div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            {nbfc.loans} loans • {nbfc.volume} volume
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-semibold text-green-600">{nbfc.defaultRate}%</div>
                                        <div className="text-xs text-gray-500">Default Rate</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Platform Health */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Platform Health Metrics</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        <div className="text-center">
                            <div className="text-3xl mb-2">✅</div>
                            <div className="text-2xl font-bold text-gray-900">{platformHealth.verificationRate}%</div>
                            <div className="text-sm text-gray-600">Verification Rate</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">⏱️</div>
                            <div className="text-2xl font-bold text-gray-900">{platformHealth.avgTimeToHire}d</div>
                            <div className="text-sm text-gray-600">Avg Time to Hire</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">💼</div>
                            <div className="text-2xl font-bold text-gray-900">{platformHealth.loanApprovalRate}%</div>
                            <div className="text-sm text-gray-600">Loan Approval</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">💰</div>
                            <div className="text-2xl font-bold text-gray-900">{platformHealth.emiCollectionRate}%</div>
                            <div className="text-sm text-gray-600">EMI Collection</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">⭐</div>
                            <div className="text-2xl font-bold text-gray-900">{platformHealth.customerSatisfaction}/5</div>
                            <div className="text-sm text-gray-600">Satisfaction</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl mb-2">⚡</div>
                            <div className="text-2xl font-bold text-gray-900">{platformHealth.platformUptime}%</div>
                            <div className="text-sm text-gray-600">Uptime</div>
                        </div>
                    </div>
                </div>

                {/* Geographic Distribution */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Geographic Distribution</h2>
                    <div className="space-y-4">
                        {geographicDistribution.map((region, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-medium text-gray-700">{region.region}</span>
                                    <span className="text-sm font-bold text-gray-900">
                                        {region.users} users ({region.percentage}%)
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-blue-500 h-3 rounded-full transition-all"
                                        style={{ width: `${region.percentage}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Export Options */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Export Reports</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <button className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
                            📊 Revenue Report
                        </button>
                        <button className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">
                            👥 User Report
                        </button>
                        <button className="px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                            💰 Transaction Report
                        </button>
                        <button className="px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium">
                            📈 Full Analytics
                        </button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminAnalytics;
