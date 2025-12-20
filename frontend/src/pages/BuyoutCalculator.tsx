import { useState } from 'react';
import { Link } from 'react-router-dom';
import { candidateService } from '../services/profile.service';
import type { BuyoutCalculationResponse } from '../types';

const BuyoutCalculator = () => {
    const [monthlySalary, setMonthlySalary] = useState<string>('');
    const [noticeDays, setNoticeDays] = useState<string>('90');
    const [result, setResult] = useState<BuyoutCalculationResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleCalculate = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await candidateService.calculateBuyout({
                current_monthly_salary: parseFloat(monthlySalary),
                notice_period_days: parseInt(noticeDays),
            });
            setResult(response);
        } catch {
            setError('Failed to calculate buyout. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const calculateEMI = (principal: number, rate: number = 12, months: number = 12) => {
        const monthlyRate = rate / 12 / 100;
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
            (Math.pow(1 + monthlyRate, months) - 1);
        return emi;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 py-12 px-4">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8">
                <Link to="/" className="text-primary-600 hover:text-primary-700 font-medium">
                    ← Back to Home
                </Link>
            </div>

            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Buyout Calculator</h1>
                    <p className="text-gray-600">Calculate how much you need to buy out your notice period</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Calculator Form */}
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-6">Enter Your Details</h2>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleCalculate} className="space-y-4">
                            <div>
                                <label htmlFor="salary" className="label">
                                    Current Monthly Salary (₹)
                                </label>
                                <input
                                    type="number"
                                    id="salary"
                                    value={monthlySalary}
                                    onChange={(e) => setMonthlySalary(e.target.value)}
                                    required
                                    min="1"
                                    step="1000"
                                    className="input-field"
                                    placeholder="100000"
                                />
                            </div>

                            <div>
                                <label htmlFor="notice" className="label">
                                    Notice Period (Days)
                                </label>
                                <select
                                    id="notice"
                                    value={noticeDays}
                                    onChange={(e) => setNoticeDays(e.target.value)}
                                    required
                                    className="input-field"
                                >
                                    <option value="30">30 Days</option>
                                    <option value="60">60 Days</option>
                                    <option value="90">90 Days</option>
                                    <option value="120">120 Days</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary w-full"
                            >
                                {loading ? 'Calculating...' : 'Calculate Buyout'}
                            </button>
                        </form>

                        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                            <p className="text-sm text-gray-700">
                                <strong>Formula:</strong> (Monthly Salary ÷ 30) × Notice Period Days
                            </p>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="card">
                        <h2 className="text-2xl font-bold mb-6">Buyout Breakdown</h2>

                        {!result ? (
                            <div className="text-center py-12 text-gray-400">
                                <svg className="w-20 h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <p>Enter your details to see the buyout amount</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="p-6 bg-primary-600 text-white rounded-lg text-center">
                                    <p className="text-sm opacity-90 mb-2">Total Buyout Amount</p>
                                    <p className="text-4xl font-bold">{formatCurrency(result.buyout_amount)}</p>
                                </div>

                                <div className="space-y-3">
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Monthly Salary</span>
                                        <span className="font-semibold">{formatCurrency(result.monthly_salary)}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Daily Salary</span>
                                        <span className="font-semibold">{formatCurrency(result.daily_salary)}</span>
                                    </div>
                                    <div className="flex justify-between py-2 border-b">
                                        <span className="text-gray-600">Notice Period</span>
                                        <span className="font-semibold">{result.notice_period_days} days</span>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                                    <p className="text-sm font-semibold text-gray-700 mb-3">Estimated Monthly EMI</p>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span>6 months @ 12%</span>
                                            <span className="font-semibold">
                                                {formatCurrency(calculateEMI(result.buyout_amount, 12, 6))}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>12 months @ 12%</span>
                                            <span className="font-semibold">
                                                {formatCurrency(calculateEMI(result.buyout_amount, 12, 12))}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span>24 months @ 12%</span>
                                            <span className="font-semibold">
                                                {formatCurrency(calculateEMI(result.buyout_amount, 12, 24))}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Link to="/register" className="btn-primary w-full text-center block">
                                    Apply for Loan
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyoutCalculator;
