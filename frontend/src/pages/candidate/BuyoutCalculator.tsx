import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.tsx';

interface CalculationResult {
    buyout_amount: number;
    notice_period_days: number;
    monthly_salary: number;
    daily_salary: number;
}

interface EMICalculation {
    emi: number;
    totalInterest: number;
    totalAmount: number;
}

const BuyoutCalculatorPage = () => {
    const navigate = useNavigate();
    const [monthlySalary, setMonthlySalary] = useState<string>('');
    const [noticeDays, setNoticeDays] = useState<string>('90');
    const [result, setResult] = useState<CalculationResult | null>(null);
    const [selectedTenure, setSelectedTenure] = useState<number>(12);

    const calculateBuyout = () => {
        if (!monthlySalary || parseFloat(monthlySalary) <= 0) {
            alert('Please enter a valid monthly salary');
            return;
        }

        const salary = parseFloat(monthlySalary);
        const days = parseInt(noticeDays);
        const dailySalary = salary / 30;
        const buyoutAmount = dailySalary * days;

        setResult({
            buyout_amount: Math.round(buyoutAmount),
            notice_period_days: days,
            monthly_salary: salary,
            daily_salary: Math.round(dailySalary),
        });
    };

    const calculateEMI = (principal: number, tenure: number, interestRate: number = 12): EMICalculation => {
        const monthlyRate = interestRate / (12 * 100);
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
            (Math.pow(1 + monthlyRate, tenure) - 1);
        const totalAmount = emi * tenure;
        const totalInterest = totalAmount - principal;

        return {
            emi: Math.round(emi),
            totalInterest: Math.round(totalInterest),
            totalAmount: Math.round(totalAmount),
        };
    };

    const tenureOptions = [6, 12, 18, 24, 36];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Buyout Calculator</h1>
                    <p className="text-gray-600">Calculate your notice period buyout amount and EMI estimates</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-6">Your Details</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Monthly Salary (₹)
                                </label>
                                <input
                                    type="number"
                                    value={monthlySalary}
                                    onChange={(e) => setMonthlySalary(e.target.value)}
                                    placeholder="e.g., 100000"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Notice Period (Days)
                                </label>
                                <select
                                    value={noticeDays}
                                    onChange={(e) => setNoticeDays(e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="30">30 days (1 month)</option>
                                    <option value="60">60 days (2 months)</option>
                                    <option value="90">90 days (3 months)</option>
                                </select>
                            </div>

                            <button
                                onClick={calculateBuyout}
                                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                            >
                                Calculate Buyout
                            </button>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-6">
                        {result && (
                            <>
                                {/* Buyout Amount Card */}
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                                    <h3 className="text-lg font-medium mb-2 opacity-90">Total Buyout Amount</h3>
                                    <div className="text-4xl font-bold mb-4">₹{result.buyout_amount.toLocaleString('en-IN')}</div>
                                    <div className="space-y-1 text-sm opacity-90">
                                        <div className="flex justify-between">
                                            <span>Daily Salary:</span>
                                            <span className="font-semibold">₹{result.daily_salary.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Notice Period:</span>
                                            <span className="font-semibold">{result.notice_period_days} days</span>
                                        </div>
                                    </div>
                                </div>

                                {/* EMI Calculator */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Loan EMI Options</h3>
                                    <p className="text-sm text-gray-600 mb-4">Interest Rate: 12% per annum</p>

                                    {/* Tenure Selector */}
                                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                                        {tenureOptions.map((tenure) => (
                                            <button
                                                key={tenure}
                                                onClick={() => setSelectedTenure(tenure)}
                                                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${selectedTenure === tenure
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                    }`}
                                            >
                                                {tenure} months
                                            </button>
                                        ))}
                                    </div>

                                    {/* EMI Details */}
                                    {tenureOptions.map((tenure) => {
                                        const emiCalc = calculateEMI(result.buyout_amount, tenure);
                                        return selectedTenure === tenure ? (
                                            <div key={tenure} className="space-y-4">
                                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                                    <div className="text-sm text-green-800 mb-1">Monthly EMI</div>
                                                    <div className="text-3xl font-bold text-green-900">
                                                        ₹{emiCalc.emi.toLocaleString('en-IN')}
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                        <div className="text-sm text-gray-600 mb-1">Total Interest</div>
                                                        <div className="text-xl font-semibold text-gray-900">
                                                            ₹{emiCalc.totalInterest.toLocaleString('en-IN')}
                                                        </div>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-lg p-4">
                                                        <div className="text-sm text-gray-600 mb-1">Total Repayment</div>
                                                        <div className="text-xl font-semibold text-gray-900">
                                                            ₹{emiCalc.totalAmount.toLocaleString('en-IN')}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Affordability Check */}
                                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                                    <div className="flex items-start gap-2">
                                                        <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                                        </svg>
                                                        <div className="flex-1">
                                                            <div className="text-sm font-medium text-blue-900 mb-1">EMI to Income Ratio</div>
                                                            <div className="text-sm text-blue-800">
                                                                {((emiCalc.emi / result.monthly_salary) * 100).toFixed(1)}% of your monthly salary
                                                                {(emiCalc.emi / result.monthly_salary) < 0.3 && (
                                                                    <span className="ml-2 text-green-600 font-medium">✓ Affordable</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : null;
                                    })}
                                </div>

                                {/* Action Buttons */}
                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Ready to proceed?</h3>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => navigate('/candidate/jobs')}
                                            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                        >
                                            Browse Jobs with Buyout Support
                                        </button>
                                        <button
                                            onClick={() => navigate('/candidate/dashboard')}
                                            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                                        >
                                            Back to Dashboard
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}

                        {!result && (
                            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                                <p className="text-gray-500">Enter your details to calculate buyout amount and EMI options</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Information Section */}
                <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">How it works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">1</span>
                                <h4 className="font-medium text-gray-900">Calculate Buyout</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                                Enter your salary and notice period to get accurate buyout amount and EMI estimates
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">2</span>
                                <h4 className="font-medium text-gray-900">Browse Jobs</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                                Find companies offering buyout assistance and apply for positions matching your skills
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full text-sm font-bold">3</span>
                                <h4 className="font-medium text-gray-900">Get Funded</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                                Apply for low-interest loans through our NBFC partners and join your new company immediately
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyoutCalculatorPage;
