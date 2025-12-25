import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface CibilScoreProps {
    score?: number;
    lastUpdated?: string;
    compact?: boolean;
}

const CibilScore = ({ score = 0, lastUpdated, compact = false }: CibilScoreProps) => {
    const [displayScore, setDisplayScore] = useState(0);

    // Animate score counting
    useEffect(() => {
        if (score > 0) {
            let start = 0;
            const duration = 1500; // 1.5 seconds
            const increment = score / (duration / 16); // 60fps

            const timer = setInterval(() => {
                start += increment;
                if (start >= score) {
                    setDisplayScore(score);
                    clearInterval(timer);
                } else {
                    setDisplayScore(Math.floor(start));
                }
            }, 16);

            return () => clearInterval(timer);
        }
    }, [score]);

    const getScoreColor = (score: number) => {
        if (score >= 750) return { bg: 'bg-green-500', text: 'text-green-600', ring: 'ring-green-500' };
        if (score >= 650) return { bg: 'bg-yellow-500', text: 'text-yellow-600', ring: 'ring-yellow-500' };
        return { bg: 'bg-red-500', text: 'text-red-600', ring: 'ring-red-500' };
    };

    const getScoreLabel = (score: number) => {
        if (score >= 750) return 'Excellent';
        if (score >= 700) return 'Good';
        if (score >= 650) return 'Fair';
        if (score >= 600) return 'Average';
        return 'Poor';
    };

    const getScoreDescription = (score: number) => {
        if (score >= 750) return 'You have excellent creditworthiness! You qualify for the best loan rates.';
        if (score >= 700) return 'Good credit score. You qualify for competitive loan rates.';
        if (score >= 650) return 'Fair credit score. You may qualify for standard loan rates.';
        if (score >= 600) return 'Average credit score. Consider improving for better rates.';
        return 'Work on improving your credit score for better loan eligibility.';
    };

    const colors = getScoreColor(score);
    const percentage = (score / 900) * 100;

    if (compact) {
        return (
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                <div className="relative w-16 h-16">
                    <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="#e5e7eb"
                            strokeWidth="6"
                            fill="none"
                        />
                        <motion.circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke="currentColor"
                            strokeWidth="6"
                            fill="none"
                            strokeLinecap="round"
                            className={colors.text}
                            initial={{ strokeDasharray: '0 175.93', strokeDashoffset: 0 }}
                            animate={{
                                strokeDasharray: `${(percentage / 100) * 175.93} 175.93`,
                                strokeDashoffset: 0
                            }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-xl font-bold ${colors.text}`}>
                            {displayScore}
                        </span>
                    </div>
                </div>
                <div className="flex-1">
                    <div className="text-sm font-semibold text-gray-900">CIBIL Score</div>
                    <div className={`text-xs font-medium ${colors.text}`}>{getScoreLabel(score)}</div>
                    {lastUpdated && (
                        <div className="text-xs text-gray-500 mt-1">
                            Updated: {new Date(lastUpdated).toLocaleDateString()}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-gray-200 p-6"
        >
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">CIBIL Score</h3>
                    <p className="text-sm text-gray-600">Your creditworthiness rating</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Verified
                </div>
            </div>

            <div className="flex items-center gap-8 mb-6">
                {/* Circular Progress */}
                <div className="relative w-40 h-40">
                    <svg className="w-40 h-40 transform -rotate-90">
                        <circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="#e5e7eb"
                            strokeWidth="12"
                            fill="none"
                        />
                        <motion.circle
                            cx="80"
                            cy="80"
                            r="70"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="none"
                            strokeLinecap="round"
                            className={colors.text}
                            initial={{ strokeDasharray: '0 439.82', strokeDashoffset: 0 }}
                            animate={{
                                strokeDasharray: `${(percentage / 100) * 439.82} 439.82`,
                                strokeDashoffset: 0
                            }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className={`text-5xl font-bold ${colors.text}`}>
                            {displayScore}
                        </span>
                        <span className="text-sm text-gray-500">out of 900</span>
                    </div>
                </div>

                {/* Score Details */}
                <div className="flex-1">
                    <div className={`inline-flex items-center gap-2 px-4 py-2 ${colors.text} bg-opacity-10 rounded-full mb-4`}>
                        <div className={`w-2 h-2 rounded-full ${colors.bg}`}></div>
                        <span className="text-sm font-semibold">{getScoreLabel(score)}</span>
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed mb-4">
                        {getScoreDescription(score)}
                    </p>
                    {lastUpdated && (
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Last updated: {new Date(lastUpdated).toLocaleDateString('en-IN', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                            })}
                        </div>
                    )}
                </div>
            </div>

            {/* Score Range Indicator */}
            <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium text-gray-600 mb-1">
                    <span>300</span>
                    <span>900</span>
                </div>
                <div className="relative h-3 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute top-0 w-1 h-full bg-white shadow-lg"
                        initial={{ left: '0%' }}
                        animate={{ left: `${percentage}%` }}
                        transition={{ duration: 1.5, ease: 'easeOut' }}
                    >
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                            Your Score
                        </div>
                    </motion.div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span>Excellent</span>
                </div>
            </div>

            {/* Action Button */}
            <button className="mt-6 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg">
                View Detailed Report
            </button>
        </motion.div>
    );
};

export default CibilScore;
