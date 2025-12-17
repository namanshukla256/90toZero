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
    disbursed: number;
    collected: number;
    outstanding: number;
}

const Analytics: React.FC = () => {
    const [selectedPeriod, setSelectedPeriod] = useState('6m');

    // Key metrics
    const metrics: MetricData[] = [
        { label: 'Total Loans', value: 48, change: 25, changeType: 'increase' },
        { label: 'Active Loans', value: 32, change: 15, changeType: 'increase' },
        { label: 'Portfolio Value', value: '₹42.8L', change: 22, changeType: 'increase' },
        { label: 'Collection Rate', value: '96.5%', change: 3, changeType: 'increase' },
        { label: 'Default Rate', value: '2.1%', change: 0.5, changeType: 'decrease' },
        { label: 'Avg Interest Rate', value: '12.3%', change: 0.2, changeType: 'decrease' },
        { label: 'Revenue (Interest)', value: '₹5.8L', change: 28, changeType: 'increase' },
        { label: 'NPA Ratio', value: '1.8%', change: 0.3, changeType: 'decrease' },
    ];

    // Monthly performance data
    const monthlyData: ChartData[] = [
        { month: 'Aug', disbursed: 380000, collected: 145000, outstanding: 3200000 },
        { month: 'Sep', disbursed: 520000, collected: 168000, outstanding: 3550000 },
        { month: 'Oct', disbursed: 680000, collected: 195000, outstanding: 4035000 },
        { month: 'Nov', disbursed: 450000, collected: 215000, outstanding: 4270000 },
        { month: 'Dec', disbursed: 720000, collected: 238000, outstanding: 4752000 },
        { month: 'Jan', disbursed: 580000, collected: 262000, outstanding: 5070000 },
    ];

    // Loan status distribution
    const loanStatus = [
        { status: 'Active (On-time)', count: 28, percentage: 58.3, color: 'bg-green-500' },
        { status: 'Active (Overdue)', count: 4, percentage: 8.3, color: 'bg-orange-500' },
        { status: 'Closed', count: 15, percentage: 31.3, color: 'bg-gray-400' },
        { status: 'Defaulted', count: 1, percentage: 2.1, color: 'bg-red-500' },
    ];

    // Risk distribution
    const riskDistribution = [
        { risk: 'Low Risk', count: 35, amount: 3150000, percentage: 72.9 },
        { risk: 'Medium Risk', count: 11, amount: 980000, percentage: 22.9 },
        { risk: 'High Risk', count: 2, amount: 150000, percentage: 4.2 },
    ];

    // Top performing loan products
    const loanProducts = [
        { tenure: '12 months', count: 22, totalAmount: 1650000, avgRate: 12.0, defaultRate: 0 },
        { tenure: '15 months', count: 14, totalAmount: 1320000, avgRate: 11.5, defaultRate: 0 },
        { tenure: '18 months', count: 8, totalAmount: 1020000, avgRate: 11.8, defaultRate: 2.1 },
        { tenure: '9 months', count: 4, totalAmount: 290000, avgRate: 13.5, defaultRate: 0 },
    ];

    // Performance indicators
    const performance = {
        portfolioHealth: 94.5,
        avgTicketSize: 89166,
        avgTenure: 13.2,
        totalDisbursed: 4280000,
        totalCollected: 1223000,
        totalOutstanding: 5070000,
        interestEarned: 580000,
        expectedRevenue: 645000,
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
        <DashboardLayout title="Analytics & Reports">
            <div className="p-8">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Analytics & Reports</h1>
                        <p className="text-gray-600 mt-1">Track portfolio performance and revenue</p>
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

                {/* Monthly Performance Chart */}
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Monthly Performance</h2>
                    <div className="flex items-end justify-between h-64 gap-4">
                        {monthlyData.map((data, index) => {
                            const maxDisbursed = getMaxValue(monthlyData, 'disbursed');
                            const maxCollected = getMaxValue(monthlyData, 'collected');
                            return (
                                <div key={index} className="flex-1 flex flex-col items-center">
                                    <div className="w-full flex items-end justify-center gap-1 mb-4 h-48">
                                        <div className="relative flex flex-col items-center group">
                                            <div
                                                className="w-10 bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                                                style={{ height: getBarHeight(data.disbursed, maxDisbursed) }}
                                            />
                                            <div className="absolute -top-10 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                Disbursed: ₹{(data.disbursed / 1000).toFixed(0)}K
                                            </div>
                                        </div>
                                        <div className="relative flex flex-col items-center group">
                                            <div
                                                className="w-10 bg-green-500 rounded-t transition-all hover:bg-green-600"
                                                style={{ height: getBarHeight(data.collected, maxCollected) }}
                                            />
                                            <div className="absolute -top-10 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                Collected: ₹{(data.collected / 1000).toFixed(0)}K
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
                            <span className="text-sm text-gray-700">Disbursed</span>
                        </div>
                        <div className="flex items-center">
                            <div className="w-4 h-4 bg-green-500 rounded mr-2" />
                            <span className="text-sm text-gray-700">Collected</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Loan Status Distribution */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Loan Status Distribution</h2>
                        <div className="space-y-4">
                            {loanStatus.map((item, index) => (
                                <div key={index}>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">{item.status}</span>
                                        <span className="text-sm font-semibold text-gray-900">
                                            {item.count} ({item.percentage.toFixed(1)}%)
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-3">
                                        <div
                                            className={`${item.color} h-3 rounded-full transition-all`}
                                            style={{ width: `${item.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-600">
                                <span className="font-semibold text-gray-900">Total Loans:</span> {loanStatus.reduce((sum, item) => sum + item.count, 0)}
                            </p>
                        </div>
                    </div>

                    {/* Risk Distribution */}
                    <div className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Risk Distribution</h2>
                        <div className="space-y-4">
                            {riskDistribution.map((item, index) => (
                                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-gray-900">{item.risk}</h3>
                                        <span className="text-sm text-gray-600">{item.percentage.toFixed(1)}%</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-600">Loan Count</p>
                                            <p className="font-semibold text-blue-600">{item.count}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-600">Total Amount</p>
                                            <p className="font-semibold text-green-600">₹{(item.amount / 100000).toFixed(1)}L</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Loan Products Performance */}
                <div className="bg-white p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Loan Products Performance</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Tenure</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Loan Count</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Total Amount</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Avg Rate</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Default Rate</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loanProducts.map((product, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{product.tenure}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{product.count}</td>
                                        <td className="px-4 py-3 text-sm font-semibold text-blue-600">
                                            ₹{(product.totalAmount / 100000).toFixed(1)}L
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{product.avgRate}%</td>
                                        <td className="px-4 py-3 text-sm">
                                            <span className={`font-semibold ${product.defaultRate === 0 ? 'text-green-600' : 'text-red-600'}`}>
                                                {product.defaultRate}%
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Portfolio Health Dashboard */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg shadow mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Portfolio Health Score</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Overall Health</p>
                            <p className="text-3xl font-bold text-blue-600">{performance.portfolioHealth}%</p>
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className="bg-blue-600 h-2 rounded-full"
                                    style={{ width: `${performance.portfolioHealth}%` }}
                                />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Avg Ticket Size</p>
                            <p className="text-3xl font-bold text-green-600">₹{(performance.avgTicketSize / 1000).toFixed(0)}K</p>
                            <p className="text-xs text-gray-500 mt-1">Per loan</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Avg Tenure</p>
                            <p className="text-3xl font-bold text-purple-600">{performance.avgTenure}</p>
                            <p className="text-xs text-gray-500 mt-1">Months</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg">
                            <p className="text-sm text-gray-600 mb-1">Collection Efficiency</p>
                            <p className="text-3xl font-bold text-orange-600">
                                {((performance.totalCollected / (performance.totalCollected + performance.totalOutstanding)) * 100).toFixed(1)}%
                            </p>
                            <p className="text-xs text-gray-500 mt-1">On-time payments</p>
                        </div>
                    </div>
                </div>

                {/* Revenue & Profitability */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue & Profitability</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-2">Total Disbursed</p>
                            <p className="text-2xl font-bold text-gray-900">₹{(performance.totalDisbursed / 100000).toFixed(1)}L</p>
                            <p className="text-xs text-gray-500 mt-1">Cumulative disbursement</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-2">Total Collected</p>
                            <p className="text-2xl font-bold text-green-600">₹{(performance.totalCollected / 100000).toFixed(1)}L</p>
                            <p className="text-xs text-gray-500 mt-1">Principal + Interest</p>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4">
                            <p className="text-sm text-gray-600 mb-2">Outstanding</p>
                            <p className="text-2xl font-bold text-blue-600">₹{(performance.totalOutstanding / 100000).toFixed(1)}L</p>
                            <p className="text-xs text-gray-500 mt-1">Pending collection</p>
                        </div>
                        <div className="border border-emerald-200 bg-emerald-50 rounded-lg p-4">
                            <p className="text-sm text-emerald-700 mb-2">Interest Earned</p>
                            <p className="text-2xl font-bold text-emerald-700">₹{(performance.interestEarned / 100000).toFixed(1)}L</p>
                            <p className="text-xs text-emerald-600 mt-1">Revenue to date</p>
                        </div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-900">
                            <span className="font-semibold">Projected Annual Revenue:</span> ₹{(performance.expectedRevenue / 100000).toFixed(1)}L
                            from interest income based on current portfolio
                        </p>
                    </div>
                </div>

                {/* Key Insights */}
                <div className="mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-bold mb-4">Key Insights</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">📈</span>
                            <div>
                                <p className="font-semibold">Strong Portfolio Growth</p>
                                <p className="text-sm text-blue-100">25% increase in loan originations, maintaining quality standards</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">✅</span>
                            <div>
                                <p className="font-semibold">Excellent Collection Rate</p>
                                <p className="text-sm text-blue-100">96.5% on-time collection with minimal defaults</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">💰</span>
                            <div>
                                <p className="font-semibold">Revenue Momentum</p>
                                <p className="text-sm text-blue-100">₹5.8L interest earned with 28% growth trajectory</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-2xl mr-3">🛡️</span>
                            <div>
                                <p className="font-semibold">Low Risk Profile</p>
                                <p className="text-sm text-blue-100">72.9% of portfolio in low-risk category, NPA at 1.8%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Analytics;
