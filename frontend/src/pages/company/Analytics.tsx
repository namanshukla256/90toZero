import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';

interface MetricData {
    label: string;
    value: number | string;
    change: number;
    changeType: 'increase' | 'decrease';
}

interface ChartData {
    month: string;
    hires: number;
    applications: number;
    buyoutSponsored: number;
}

const Analytics: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('6m');

    // Key metrics
    const metrics: MetricData[] = [
        { label: 'Total Hires', value: 24, change: 15, changeType: 'increase' },
        { label: 'Time to Hire', value: '21 days', change: 28, changeType: 'decrease' },
        { label: 'Cost per Hire', value: '₹45,000', change: 18, changeType: 'decrease' },
        { label: 'Buyout Success Rate', value: '87%', change: 12, changeType: 'increase' },
        { label: 'Total Applications', value: 156, change: 22, changeType: 'increase' },
        { label: 'Offer Acceptance', value: '92%', change: 8, changeType: 'increase' },
        { label: 'Buyout Sponsored', value: 18, change: 35, changeType: 'increase' },
        { label: 'Cost Savings', value: '₹12.4L', change: 42, changeType: 'increase' },
    ];

    // Hiring trend data
    const hiringTrend: ChartData[] = [
        { month: 'Aug', hires: 3, applications: 18, buyoutSponsored: 2 },
        { month: 'Sep', hires: 4, applications: 22, buyoutSponsored: 3 },
        { month: 'Oct', hires: 5, applications: 28, buyoutSponsored: 4 },
        { month: 'Nov', hires: 3, applications: 25, buyoutSponsored: 2 },
        { month: 'Dec', hires: 5, applications: 32, buyoutSponsored: 4 },
        { month: 'Jan', hires: 4, applications: 31, buyoutSponsored: 3 },
    ];

    // Job performance data
    const jobPerformance = [
        { title: 'Senior Full Stack Developer', applications: 45, interviews: 12, hires: 3, buyoutRate: '75%' },
        { title: 'DevOps Engineer', applications: 32, interviews: 8, hires: 2, buyoutRate: '50%' },
        { title: 'Product Manager', applications: 28, interviews: 6, hires: 1, buyoutRate: '100%' },
        { title: 'Backend Developer', applications: 22, interviews: 5, hires: 2, buyoutRate: '50%' },
        { title: 'Frontend Developer', applications: 29, interviews: 7, hires: 2, buyoutRate: '50%' },
    ];

    // Source analysis
    const sourceAnalysis = [
        { source: 'Direct Applications', count: 78, percentage: 50 },
        { source: 'Referrals', count: 31, percentage: 20 },
        { source: 'LinkedIn', count: 28, percentage: 18 },
        { source: 'Job Portals', count: 19, percentage: 12 },
    ];

    // Buyout impact
    const buyoutImpact = {
        totalBuyouts: 18,
        totalAmount: 1420000,
        avgBuyout: 78889,
        timeReduction: 45,
        costSavings: 1240000,
        successRate: 87,
    };

    // ROI calculation
    const roiData = {
        totalInvestment: 1420000,
        timeSaved: 810, // hours
        productivityGain: 2340000,
        costSavings: 1240000,
        totalReturn: 3580000,
        roi: 152,
    };

    const getChangeColor = (changeType: 'increase' | 'decrease') => {
        return changeType === 'increase' ? 'text-green-600' : 'text-red-600';
    };

    const getChangeIcon = (changeType: 'increase' | 'decrease') => {
        return changeType === 'increase' ? '↑' : '↓';
    };

    const getMaxValue = (data: ChartData[], key: keyof Omit<ChartData, 'month'>) => {
        return Math.max(...data.map((d) => d[key]));
    };

    const getBarHeight = (value: number, maxValue: number) => {
        return `${(value / maxValue) * 100}%`;
    };

    return (
        <DashboardLayout
            title="Analytics & Insights"
            showBackButton={true}
            backTo="/company/dashboard"
            breadcrumbs={[
                { label: 'Dashboard', href: '/company/dashboard' },
                { label: 'Analytics' }
            ]}
        >
            <div className="p-8">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Analytics & Insights</h1>
                        <p className="text-gray-600 mt-1">Track hiring performance and ROI</p>
                    </div>
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="1m">Last Month</option>
                        <option value="3m">Last 3 Months</option>
                        <option value="6m">Last 6 Months</option>
                        <option value="1y">Last Year</option>
                    </select>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {metrics.map((metric, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow">
                            <p className="text-sm text-gray-600 mb-1">{metric.label}</p>
                            <div className="flex items-end justify-between">
                                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                                <div className={`flex items-center text-sm font-semibold ${getChangeColor(metric.changeType)}`}>
                                    <span className="mr-1">{getChangeIcon(metric.changeType)}</span>
                                    <span>{metric.change}%</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Hiring Trend Chart */}
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Hiring Trend</h2>
                    <div className="flex items-end justify-between h-64 gap-4">
                        {hiringTrend.map((data, index) => {
                            const maxHires = getMaxValue(hiringTrend, 'hires');
                            const maxApps = getMaxValue(hiringTrend, 'applications');
                            return (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div className="w-full flex items-end justify-center gap-1 mb-4 h-48">
                                        <div className="relative flex flex-col items-center group">
                                            <div
                                                className="w-8 bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                                                style={{ height: getBarHeight(data.applications, maxApps) }}
                                            />
                                            <div className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                Applications: {data.applications}
                                            </div>
                                        </div>
                                        <div className="relative flex flex-col items-center group">
                                            <div
                                                className="w-8 bg-green-500 rounded-t transition-all hover:bg-green-600"
                                                style={{ height: getBarHeight(data.hires, maxHires) }}
                                            />
                                            <div className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                Hires: {data.hires}
                                            </div>
                                        </div>
                                        <div className="relative flex flex-col items-center group">
                                            <div
                                                className="w-8 bg-purple-500 rounded-t transition-all hover:bg-purple-600"
                                                style={{ height: getBarHeight(data.buyoutSponsored, maxHires) }}
                                            />
                                            <div className="absolute -top-8 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                Buyout: {data.buyoutSponsored}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700">{data.month}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex justify-center gap-6 mt-6">
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-blue-500 rounded mr-2" />
                            <span className="text-sm text-gray-700">Applications</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-500 rounded mr-2" />
                            <span className="text-sm text-gray-700">Hires</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-purple-500 rounded mr-2" />
                            <span className="text-sm text-gray-700">Buyout Sponsored</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Job Performance */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Job Performance</h2>
                        <div className="space-y-4">
                            {jobPerformance.map((job, index) => (
                                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                                    <h3 className="font-semibold text-gray-900 mb-2">{job.title}</h3>
                                    <div className="grid grid-cols-4 gap-2 text-sm">
                                        <div>
                                            <p className="text-gray-600">Applications</p>
                                            <p className="font-semibold text-blue-600">{job.applications}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Interviews</p>
                                            <p className="font-semibold text-yellow-600">{job.interviews}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Hires</p>
                                            <p className="font-semibold text-green-600">{job.hires}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Buyout Rate</p>
                                            <p className="font-semibold text-purple-600">{job.buyoutRate}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Source Analysis */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Application Sources</h2>
                        <div className="space-y-4">
                            {sourceAnalysis.map((source, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">{source.source}</span>
                                        <span className="text-sm font-semibold text-gray-900">
                                            {source.count} ({source.percentage}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                            style={{ width: `${source.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-gray-900">Total Applications:</span> 156
                            </p>
                        </div>
                    </div>
                </div>

                {/* Buyout Impact Analysis */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Buyout Impact Analysis</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Total Buyouts Sponsored</p>
                            <p className="text-3xl font-bold text-purple-600">{buyoutImpact.totalBuyouts}</p>
                            <p className="text-xs text-gray-500 mt-1">Average: ₹{(buyoutImpact.avgBuyout / 1000).toFixed(0)}K</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Total Investment</p>
                            <p className="text-3xl font-bold text-blue-600">₹{(buyoutImpact.totalAmount / 100000).toFixed(1)}L</p>
                            <p className="text-xs text-gray-500 mt-1">In buyout assistance</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Success Rate</p>
                            <p className="text-3xl font-bold text-green-600">{buyoutImpact.successRate}%</p>
                            <p className="text-xs text-gray-500 mt-1">Candidates hired successfully</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Time Reduction</p>
                            <p className="text-3xl font-bold text-orange-600">{buyoutImpact.timeReduction}%</p>
                            <p className="text-xs text-gray-500 mt-1">Faster hiring with buyout</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Cost Savings</p>
                            <p className="text-3xl font-bold text-emerald-600">₹{(buyoutImpact.costSavings / 100000).toFixed(1)}L</p>
                            <p className="text-xs text-gray-500 mt-1">vs traditional hiring</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Avg Time to Hire</p>
                            <p className="text-3xl font-bold text-indigo-600">21 days</p>
                            <p className="text-xs text-gray-500 mt-1">With buyout support</p>
                        </div>
                    </div>
                </div>

                {/* ROI Dashboard */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Return on Investment (ROI)</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-2">Total Investment</p>
                            <p className="text-2xl font-bold text-gray-900">₹{(roiData.totalInvestment / 100000).toFixed(1)}L</p>
                            <p className="text-xs text-gray-500 mt-1">In buyout sponsorships</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-2">Time Saved</p>
                            <p className="text-2xl font-bold text-blue-600">{roiData.timeSaved} hrs</p>
                            <p className="text-xs text-gray-500 mt-1">Reduced recruitment time</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-2">Productivity Gain</p>
                            <p className="text-2xl font-bold text-green-600">₹{(roiData.productivityGain / 100000).toFixed(1)}L</p>
                            <p className="text-xs text-gray-500 mt-1">Early candidate joining</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-2">Cost Savings</p>
                            <p className="text-2xl font-bold text-emerald-600">₹{(roiData.costSavings / 100000).toFixed(1)}L</p>
                            <p className="text-xs text-gray-500 mt-1">Reduced hiring costs</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-2">Total Return</p>
                            <p className="text-2xl font-bold text-purple-600">₹{(roiData.totalReturn / 100000).toFixed(1)}L</p>
                            <p className="text-xs text-gray-500 mt-1">Combined value generated</p>
                        </div>
                        <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
                            <p className="text-sm text-emerald-700 mb-2">Overall ROI</p>
                            <p className="text-3xl font-bold text-emerald-700">{roiData.roi}%</p>
                            <p className="text-xs text-emerald-600 mt-1">Return on investment</p>
                        </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-900">
                            <span className="font-semibold">Analysis:</span> For every ₹1 invested in buyout sponsorships,
                            you generate ₹{(roiData.totalReturn / roiData.totalInvestment).toFixed(2)} in value through
                            faster hiring, reduced costs, and improved productivity.
                        </p>
                    </div>
                </div>

                {/* Key Insights */}
                <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Key Insights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">📈</span>
                            <div>
                                <p className="font-semibold">Hiring Velocity Improved</p>
                                <p className="text-sm text-blue-100">Average time-to-hire reduced by 45% with buyout support</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">💰</span>
                            <div>
                                <p className="font-semibold">Cost Efficiency</p>
                                <p className="text-sm text-blue-100">₹12.4L saved in recruitment and lost productivity costs</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">✅</span>
                            <div>
                                <p className="font-semibold">High Success Rate</p>
                                <p className="text-sm text-blue-100">87% of buyout-sponsored candidates successfully onboarded</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🎯</span>
                            <div>
                                <p className="font-semibold">Quality Pipeline</p>
                                <p className="text-sm text-blue-100">92% offer acceptance rate with competitive buyout packages</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Analytics;
