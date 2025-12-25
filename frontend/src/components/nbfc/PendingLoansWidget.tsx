import React from 'react';
import { motion } from 'framer-motion';

interface LoanApplication {
  id: string;
  candidateName: string;
  creditScore: number;
  loanAmount: number;
  status: string;
  appliedDate: string;
  riskCategory: string;
}

interface PendingLoansWidgetProps {
  applications: LoanApplication[];
  onViewCibil: (application: LoanApplication) => void;
  onReview: (application: LoanApplication) => void;
  compact?: boolean;
}

const PendingLoansWidget: React.FC<PendingLoansWidgetProps> = ({
  applications,
  onViewCibil,
  onReview,
  compact = false
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 750) return 'text-green-600 bg-green-50';
    if (score >= 650) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getRiskColor = (risk: string) => {
    if (risk === 'low') return 'bg-green-100 text-green-800';
    if (risk === 'medium') return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  if (compact) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-gray-900">Pending Reviews</h3>
          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold rounded-full">
            {applications.length}
          </span>
        </div>
        
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {applications.slice(0, 5).map((app) => (
            <div key={app.id} className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900 truncate">{app.candidateName}</p>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${getScoreColor(app.creditScore)}`}>
                  {app.creditScore}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">₹{(app.loanAmount / 1000).toFixed(0)}K</span>
                <button
                  onClick={() => onReview(app)}
                  className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                >
                  Review →
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {applications.length > 5 && (
          <button className="w-full mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium">
            View all {applications.length} applications →
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Pending Reviews</h2>
            <p className="text-sm text-gray-500">Applications awaiting decision</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-lg font-bold rounded-full">
          {applications.length}
        </span>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((app, index) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{app.candidateName}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Applied {new Date(app.appliedDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRiskColor(app.riskCategory)}`}>
                    {app.riskCategory}
                  </span>
                  <div className={`px-3 py-1 rounded-lg font-bold ${getScoreColor(app.creditScore)}`}>
                    {app.creditScore}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-gray-600">Loan Amount</p>
                  <p className="text-lg font-bold text-gray-900">₹{app.loanAmount.toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-600">Status</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {app.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onViewCibil(app)}
                  className="flex-1 px-3 py-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  CIBIL
                </button>
                <button
                  onClick={() => onReview(app)}
                  className="flex-1 px-3 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Review
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">All Caught Up!</h3>
          <p className="text-sm text-gray-500">No pending loan applications to review</p>
        </div>
      )}
    </div>
  );
};

export default PendingLoansWidget;
