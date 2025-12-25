import React from 'react';
import { motion } from 'framer-motion';

interface CibilDetailedViewProps {
  score: number;
  candidateName: string;
  onClose: () => void;
}

interface CreditHistoryItem {
  month: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
}

interface CreditAccount {
  type: string;
  bank: string;
  status: string;
  balance: number;
  limit?: number;
  opened: string;
  lastPayment: string;
}

interface CreditInquiry {
  institution: string;
  date: string;
  purpose: string;
}

const CibilDetailedView: React.FC<CibilDetailedViewProps> = ({ score, candidateName, onClose }) => {
  // Mock CIBIL history data (last 6 months)
  const creditHistory: CreditHistoryItem[] = [
    { month: 'Aug 2024', score: 735, trend: 'up' },
    { month: 'Sep 2024', score: 740, trend: 'up' },
    { month: 'Oct 2024', score: 738, trend: 'down' },
    { month: 'Nov 2024', score: 745, trend: 'up' },
    { month: 'Dec 2024', score: 748, trend: 'up' },
    { month: 'Jan 2025', score: score, trend: score > 748 ? 'up' : 'down' },
  ];

  // Mock credit accounts
  const creditAccounts: CreditAccount[] = [
    {
      type: 'Credit Card',
      bank: 'HDFC Bank',
      status: 'Active',
      balance: 45000,
      limit: 200000,
      opened: 'Jan 2021',
      lastPayment: 'On Time'
    },
    {
      type: 'Personal Loan',
      bank: 'ICICI Bank',
      status: 'Active',
      balance: 180000,
      opened: 'Jun 2023',
      lastPayment: 'On Time'
    },
    {
      type: 'Auto Loan',
      bank: 'Axis Bank',
      status: 'Closed',
      balance: 0,
      opened: 'Mar 2020',
      lastPayment: 'Paid Off'
    },
  ];

  // Mock credit inquiries
  const creditInquiries: CreditInquiry[] = [
    { institution: 'HDFC Bank', date: '15 Dec 2024', purpose: 'Credit Card' },
    { institution: 'Bajaj Finserv', date: '03 Nov 2024', purpose: 'Personal Loan' },
  ];

  // Calculate metrics
  const utilizationRate = Math.round((45000 / 200000) * 100); // Credit card utilization
  const activeAccounts = creditAccounts.filter(a => a.status === 'Active').length;
  const totalDebt = creditAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const creditAge = '4 years 2 months';
  const paymentHistory = 98; // % on-time payments

  const getScoreColor = () => {
    if (score >= 750) return 'text-green-600';
    if (score >= 650) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = () => {
    if (score >= 750) return 'bg-green-100';
    if (score >= 650) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getScoreRating = () => {
    if (score >= 750) return { rating: 'Excellent', description: 'Very low credit risk' };
    if (score >= 700) return { rating: 'Good', description: 'Low credit risk' };
    if (score >= 650) return { rating: 'Fair', description: 'Moderate credit risk' };
    if (score >= 600) return { rating: 'Poor', description: 'High credit risk' };
    return { rating: 'Very Poor', description: 'Very high credit risk' };
  };

  const scoreRating = getScoreRating();
  const maxScore = 900;
  const minScore = 300;
  const scorePercentage = ((score - minScore) / (maxScore - minScore)) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 p-6 rounded-t-2xl z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">CIBIL Detailed Report</h2>
              <p className="text-blue-100">{candidateName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Main Score Card */}
          <div className={`${getScoreBgColor()} border-2 ${getScoreColor().replace('text-', 'border-')} rounded-xl p-6`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Score Circle */}
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg className="transform -rotate-90 w-48 h-48">
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                      fill="none"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="88"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 88}`}
                      strokeDashoffset={`${2 * Math.PI * 88 * (1 - scorePercentage / 100)}`}
                      className={getScoreColor()}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-5xl font-bold ${getScoreColor()}`}>{score}</span>
                    <span className="text-sm text-gray-600 mt-1">out of {maxScore}</span>
                  </div>
                </div>
                <div className="text-center mt-4">
                  <p className={`text-xl font-bold ${getScoreColor()}`}>{scoreRating.rating}</p>
                  <p className="text-sm text-gray-600">{scoreRating.description}</p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Payment History</span>
                    <span className="text-lg font-bold text-green-600">{paymentHistory}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${paymentHistory}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Excellent track record</p>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">Credit Utilization</span>
                    <span className="text-lg font-bold text-blue-600">{utilizationRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${utilizationRate}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">₹45,000 used of ₹2,00,000 limit</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Active Accounts</p>
                    <p className="text-2xl font-bold text-gray-900">{activeAccounts}</p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-xs text-gray-600 mb-1">Total Debt</p>
                    <p className="text-2xl font-bold text-gray-900">₹{(totalDebt / 100000).toFixed(1)}L</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="text-xs text-gray-600 mb-1">Credit Age</p>
                  <p className="text-lg font-bold text-gray-900">{creditAge}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Score History */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
              Credit Score History (6 Months)
            </h3>
            <div className="space-y-3">
              {creditHistory.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm font-medium text-gray-600 w-24">{item.month}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-8 relative overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full flex items-center px-3"
                      style={{ width: `${((item.score - minScore) / (maxScore - minScore)) * 100}%` }}
                    >
                      <span className="text-xs font-bold text-white">{item.score}</span>
                    </div>
                  </div>
                  <div className="w-16 text-right">
                    {item.trend === 'up' && (
                      <span className="inline-flex items-center text-green-600 text-xs font-medium">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        Up
                      </span>
                    )}
                    {item.trend === 'down' && (
                      <span className="inline-flex items-center text-red-600 text-xs font-medium">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Down
                      </span>
                    )}
                    {item.trend === 'stable' && (
                      <span className="inline-flex items-center text-gray-600 text-xs font-medium">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                        Stable
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credit Accounts */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Credit Accounts ({creditAccounts.length})
            </h3>
            <div className="space-y-4">
              {creditAccounts.map((account, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-gray-900">{account.type}</p>
                      <p className="text-sm text-gray-600">{account.bank}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      account.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {account.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Balance</p>
                      <p className="font-semibold text-gray-900">
                        {account.balance === 0 ? 'Paid Off' : `₹${(account.balance / 1000).toFixed(0)}K`}
                      </p>
                    </div>
                    {account.limit && (
                      <div>
                        <p className="text-gray-600">Limit</p>
                        <p className="font-semibold text-gray-900">₹{(account.limit / 100000).toFixed(1)}L</p>
                      </div>
                    )}
                    <div>
                      <p className="text-gray-600">Opened</p>
                      <p className="font-semibold text-gray-900">{account.opened}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Last Payment</p>
                      <p className={`font-semibold ${account.lastPayment === 'On Time' || account.lastPayment === 'Paid Off' ? 'text-green-600' : 'text-red-600'}`}>
                        {account.lastPayment}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Credit Inquiries */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Recent Credit Inquiries
            </h3>
            <div className="space-y-3">
              {creditInquiries.map((inquiry, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{inquiry.institution}</p>
                      <p className="text-xs text-gray-600">{inquiry.purpose}</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{inquiry.date}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-4 flex items-start gap-2">
              <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Multiple credit inquiries in a short time may negatively impact credit score
            </p>
          </div>

          {/* Risk Assessment */}
          <div className={`${getScoreBgColor()} border-2 ${getScoreColor().replace('text-', 'border-')} rounded-xl p-6`}>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Risk Assessment Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-gray-900">Positive Factors</span>
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Excellent payment history</li>
                  <li>• Low credit utilization</li>
                  <li>• Long credit history</li>
                  <li>• Diverse credit mix</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-gray-900">Watch Areas</span>
                </div>
                <ul className="space-y-1 text-sm text-gray-700">
                  <li>• Recent credit inquiries</li>
                  <li>• Active personal loan</li>
                </ul>
              </div>
              <div className="bg-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold text-gray-900">Recommendation</span>
                </div>
                <p className="text-sm text-gray-700">
                  {score >= 750 ? 'Low risk - Approve with standard terms' :
                   score >= 700 ? 'Moderate risk - Consider with competitive rates' :
                   score >= 650 ? 'Higher risk - Approve with adjusted terms' :
                   'High risk - Requires additional collateral'}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Close Report
            </button>
            <button className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF Report
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CibilDetailedView;
