import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoanApprovalModalProps {
  application: {
    id: string;
    candidateName: string;
    loanAmount: number;
    creditScore: number;
    currentCTC: number;
    noticePeriod: number;
    tenure: number;
    riskCategory: string;
  };
  onClose: () => void;
  onApprove: (decision: ApprovalDecision) => void;
  onReject: (reason: string) => void;
}

interface ApprovalDecision {
  interestRate: number;
  approvedAmount: number;
  tenure: number;
  monthlyEMI: number;
  processingFee: number;
  conditions: string[];
  comments: string;
}

const LoanApprovalModal: React.FC<LoanApprovalModalProps> = ({
  application,
  onClose,
  onApprove,
  onReject,
}) => {
  const [decision, setDecision] = useState<'approve' | 'reject' | null>(null);
  const [approvalData, setApprovalData] = useState<ApprovalDecision>({
    interestRate: application.creditScore >= 750 ? 11 : application.creditScore >= 700 ? 12 : application.creditScore >= 650 ? 13 : 14,
    approvedAmount: application.loanAmount,
    tenure: application.tenure,
    monthlyEMI: 0,
    processingFee: Math.round(application.loanAmount * 0.02), // 2% processing fee
    conditions: [],
    comments: '',
  });
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);

  // Calculate EMI
  const calculateEMI = (principal: number, rate: number, tenure: number) => {
    const monthlyRate = rate / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  // Update EMI when values change
  React.useEffect(() => {
    const emi = calculateEMI(approvalData.approvedAmount, approvalData.interestRate, approvalData.tenure);
    setApprovalData(prev => ({ ...prev, monthlyEMI: emi }));
  }, [approvalData.approvedAmount, approvalData.interestRate, approvalData.tenure]);

  const availableConditions = [
    'Salary slip verification required',
    'Bank statement for last 6 months',
    'Employer verification letter',
    'Address proof and identity proof',
    'Co-applicant/Guarantor required',
    'Post-dated cheques (PDC) required',
    'Auto-debit mandate setup',
    'Life insurance coverage mandatory',
  ];

  const rejectionReasons = [
    'Credit score below minimum threshold',
    'Insufficient income to support EMI',
    'Unstable employment history',
    'Existing loan obligations too high',
    'Negative credit history/defaults',
    'Unable to verify employment',
    'Incomplete or incorrect documentation',
    'High debt-to-income ratio',
  ];

  const toggleCondition = (condition: string) => {
    if (selectedConditions.includes(condition)) {
      setSelectedConditions(selectedConditions.filter(c => c !== condition));
    } else {
      setSelectedConditions([...selectedConditions, condition]);
    }
  };

  const handleApprove = () => {
    onApprove({
      ...approvalData,
      conditions: selectedConditions,
    });
  };

  const handleReject = () => {
    if (rejectionReason.trim()) {
      onReject(rejectionReason);
    }
  };

  const totalRepayment = approvalData.monthlyEMI * approvalData.tenure;
  const totalInterest = totalRepayment - approvalData.approvedAmount;
  const emiToIncomeRatio = ((approvalData.monthlyEMI / (application.currentCTC / 12)) * 100).toFixed(1);

  const getRiskColor = () => {
    if (application.riskCategory === 'low') return 'bg-green-100 text-green-800 border-green-300';
    if (application.riskCategory === 'medium') return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    return 'bg-red-100 text-red-800 border-red-300';
  };

  const getRecommendedRate = () => {
    if (application.creditScore >= 750) return '11-12%';
    if (application.creditScore >= 700) return '12-13%';
    if (application.creditScore >= 650) return '13-14%';
    return '14-16%';
  };

  return (
    <AnimatePresence>
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
          className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-blue-600 p-6 rounded-t-2xl z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Loan Application Review</h2>
                <p className="text-blue-100">{application.candidateName}</p>
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
            {/* Application Summary */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Application Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Loan Amount</p>
                  <p className="text-xl font-bold text-gray-900">₹{(application.loanAmount / 1000).toFixed(0)}K</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Credit Score</p>
                  <p className={`text-xl font-bold ${
                    application.creditScore >= 750 ? 'text-green-600' :
                    application.creditScore >= 650 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {application.creditScore}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Annual CTC</p>
                  <p className="text-xl font-bold text-gray-900">₹{(application.currentCTC / 100000).toFixed(1)}L</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Risk Category</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${getRiskColor()}`}>
                    {application.riskCategory}
                  </span>
                </div>
              </div>
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Recommended Interest Rate:</strong> {getRecommendedRate()} based on credit profile
                </p>
              </div>
            </div>

            {/* Decision Selector */}
            {!decision && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setDecision('approve')}
                  className="p-6 bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-xl transition-all group"
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-green-700">Approve Loan</p>
                  <p className="text-sm text-gray-600 mt-1">Set terms and conditions</p>
                </button>
                <button
                  onClick={() => setDecision('reject')}
                  className="p-6 bg-red-50 hover:bg-red-100 border-2 border-red-200 rounded-xl transition-all group"
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-red-700">Reject Loan</p>
                  <p className="text-sm text-gray-600 mt-1">Provide rejection reason</p>
                </button>
              </div>
            )}

            {/* Approval Form */}
            {decision === 'approve' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Approval Terms
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Approved Amount */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Approved Amount (₹)
                      </label>
                      <input
                        type="number"
                        value={approvalData.approvedAmount}
                        onChange={(e) => setApprovalData({ ...approvalData, approvedAmount: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        min={10000}
                        max={application.loanAmount}
                        step={1000}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Requested: ₹{(application.loanAmount / 1000).toFixed(0)}K
                      </p>
                    </div>

                    {/* Interest Rate */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Interest Rate (% p.a.)
                      </label>
                      <input
                        type="number"
                        value={approvalData.interestRate}
                        onChange={(e) => setApprovalData({ ...approvalData, interestRate: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        min={8}
                        max={24}
                        step={0.5}
                      />
                      <p className="text-xs text-gray-500 mt-1">Recommended: {getRecommendedRate()}</p>
                    </div>

                    {/* Tenure */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tenure (months)
                      </label>
                      <select
                        value={approvalData.tenure}
                        onChange={(e) => setApprovalData({ ...approvalData, tenure: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        <option value={6}>6 months</option>
                        <option value={9}>9 months</option>
                        <option value={12}>12 months</option>
                        <option value={15}>15 months</option>
                        <option value={18}>18 months</option>
                        <option value={24}>24 months</option>
                      </select>
                    </div>

                    {/* Processing Fee */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Processing Fee (₹)
                      </label>
                      <input
                        type="number"
                        value={approvalData.processingFee}
                        onChange={(e) => setApprovalData({ ...approvalData, processingFee: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        min={0}
                        step={100}
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Standard: 2% (₹{Math.round(approvalData.approvedAmount * 0.02)})
                      </p>
                    </div>
                  </div>

                  {/* Loan Summary */}
                  <div className="mt-6 p-4 bg-white rounded-lg border border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-3">Loan Summary</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Monthly EMI</p>
                        <p className="text-lg font-bold text-green-600">₹{approvalData.monthlyEMI.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Interest</p>
                        <p className="text-lg font-bold text-gray-900">₹{totalInterest.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Total Repayment</p>
                        <p className="text-lg font-bold text-gray-900">₹{totalRepayment.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">EMI/Income Ratio</p>
                        <p className={`text-lg font-bold ${parseFloat(emiToIncomeRatio) > 40 ? 'text-red-600' : 'text-green-600'}`}>
                          {emiToIncomeRatio}%
                        </p>
                      </div>
                    </div>
                    {parseFloat(emiToIncomeRatio) > 40 && (
                      <p className="text-xs text-red-600 mt-2 flex items-start gap-1">
                        <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        High EMI-to-income ratio. Consider requiring additional guarantor.
                      </p>
                    )}
                  </div>

                  {/* Conditions */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Terms & Conditions
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {availableConditions.map((condition, index) => (
                        <label
                          key={index}
                          className="flex items-start gap-2 p-3 bg-white rounded-lg border border-gray-200 hover:border-green-300 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={selectedConditions.includes(condition)}
                            onChange={() => toggleCondition(condition)}
                            className="mt-0.5 w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">{condition}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Comments */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Internal Comments (Optional)
                    </label>
                    <textarea
                      value={approvalData.comments}
                      onChange={(e) => setApprovalData({ ...approvalData, comments: e.target.value })}
                      placeholder="Add any internal notes or special instructions..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setDecision(null)}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleApprove}
                    disabled={selectedConditions.length === 0}
                    className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approve Loan Application
                  </button>
                </div>
              </motion.div>
            )}

            {/* Rejection Form */}
            {decision === 'reject' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    Rejection Reason
                  </h3>

                  <div className="space-y-3 mb-4">
                    {rejectionReasons.map((reason, index) => (
                      <label
                        key={index}
                        className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-red-300 cursor-pointer transition-colors"
                      >
                        <input
                          type="radio"
                          name="rejection"
                          value={reason}
                          checked={rejectionReason === reason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          className="mt-0.5 w-4 h-4 text-red-600 border-gray-300 focus:ring-red-500"
                        />
                        <span className="text-sm text-gray-700">{reason}</span>
                      </label>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Comments (Optional)
                    </label>
                    <textarea
                      value={approvalData.comments}
                      onChange={(e) => setApprovalData({ ...approvalData, comments: e.target.value })}
                      placeholder="Provide additional context for the rejection..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>

                  <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-gray-700 flex items-start gap-2">
                      <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                      <span>
                        The candidate will receive a rejection notification. Consider providing constructive feedback to help them improve their eligibility in the future.
                      </span>
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setDecision(null)}
                    className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleReject}
                    disabled={!rejectionReason}
                    className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Confirm Rejection
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoanApprovalModal;
