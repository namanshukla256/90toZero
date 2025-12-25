import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface SalaryHikeGraphProps {
    currentSalary: number;
    newSalary: number;
    compact?: boolean;
}

const SalaryHikeGraph = ({ currentSalary, newSalary, compact = false }: SalaryHikeGraphProps) => {
    const [animatedHike, setAnimatedHike] = useState(0);
    
    const hikePercentage = ((newSalary - currentSalary) / currentSalary) * 100;
    const isPositive = hikePercentage > 0;
    
    // Format currency for Indian Rupees
    const formatCurrency = (amount: number) => {
        if (amount >= 10000000) {
            return `₹${(amount / 10000000).toFixed(2)}Cr`;
        } else if (amount >= 100000) {
            return `₹${(amount / 100000).toFixed(1)}L`;
        }
        return `₹${(amount / 1000).toFixed(0)}K`;
    };

    // Animate percentage counting
    useEffect(() => {
        let start = 0;
        const duration = 1000;
        const increment = hikePercentage / (duration / 16);

        const timer = setInterval(() => {
            start += increment;
            if ((increment > 0 && start >= hikePercentage) || (increment < 0 && start <= hikePercentage)) {
                setAnimatedHike(hikePercentage);
                clearInterval(timer);
            } else {
                setAnimatedHike(start);
            }
        }, 16);

        return () => clearInterval(timer);
    }, [hikePercentage]);

    if (compact) {
        return (
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                <div className="flex items-center justify-between mb-3">
                    <div className="text-sm font-semibold text-gray-700">Salary Hike</div>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full font-bold text-sm ${
                            isPositive 
                                ? 'bg-green-600 text-white' 
                                : 'bg-red-600 text-white'
                        }`}
                    >
                        {isPositive ? '↑' : '↓'} {Math.abs(animatedHike).toFixed(1)}%
                    </motion.div>
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Current</span>
                        <span className="font-semibold text-gray-900">{formatCurrency(currentSalary)}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                        <span className="text-gray-600">Expected</span>
                        <span className="font-semibold text-green-600">{formatCurrency(newSalary)}</span>
                    </div>
                </div>

                {/* Mini Bar Chart */}
                <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                                className="h-full bg-gray-400"
                                initial={{ width: '0%' }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                        </div>
                        <span className="text-xs text-gray-500 w-12 text-right">{formatCurrency(currentSalary)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex-1 bg-green-200 rounded-full h-2 overflow-hidden">
                            <motion.div
                                className="h-full bg-green-600"
                                initial={{ width: '0%' }}
                                animate={{ width: `${Math.min((newSalary / currentSalary) * 100, 150)}%` }}
                                transition={{ duration: 1, delay: 0.4 }}
                            />
                        </div>
                        <span className="text-xs text-green-600 font-medium w-12 text-right">{formatCurrency(newSalary)}</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-lg border border-gray-200 p-6"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-1">Salary Growth</h3>
                    <p className="text-sm text-gray-600">Expected increase if selected</p>
                </div>
                <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', duration: 0.8 }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold ${
                        isPositive 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                            : 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
                    }`}
                >
                    <span className="text-2xl">{isPositive ? '↑' : '↓'}</span>
                    <span className="text-xl">{Math.abs(animatedHike).toFixed(1)}%</span>
                </motion.div>
            </div>

            {/* Bar Chart Comparison */}
            <div className="space-y-4 mb-6">
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Current Salary</span>
                        <span className="text-lg font-bold text-gray-900">{formatCurrency(currentSalary)}</span>
                    </div>
                    <div className="relative h-10 bg-gray-100 rounded-lg overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-400 to-gray-500 flex items-center justify-end pr-3"
                            initial={{ width: '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                        >
                            <span className="text-white text-sm font-semibold">Current CTC</span>
                        </motion.div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-600">Expected Salary</span>
                        <span className="text-lg font-bold text-green-600">{formatCurrency(newSalary)}</span>
                    </div>
                    <div className="relative h-10 bg-green-50 rounded-lg overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-end pr-3"
                            initial={{ width: '0%' }}
                            animate={{ width: `${Math.min((newSalary / currentSalary) * 100, 100)}%` }}
                            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.3 }}
                        >
                            <span className="text-white text-sm font-semibold">New CTC</span>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <div>
                    <div className="text-xs text-gray-600 mb-1">Annual Increase</div>
                    <div className="text-lg font-bold text-green-600">
                        {formatCurrency(newSalary - currentSalary)}
                    </div>
                </div>
                <div>
                    <div className="text-xs text-gray-600 mb-1">Monthly Increase</div>
                    <div className="text-lg font-bold text-blue-600">
                        {formatCurrency((newSalary - currentSalary) / 12)}
                    </div>
                </div>
            </div>

            {/* Growth Indicator */}
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 text-sm text-green-700">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">
                        {isPositive ? 'Great career move!' : 'Consider negotiating higher'}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default SalaryHikeGraph;
