import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PlatformFeatures = () => {
    const [activeTab, setActiveTab] = useState<'candidate' | 'company' | 'nbfc'>('candidate');

    const candidateFeatures = [
        {
            icon: '📊',
            title: 'CIBIL Score Dashboard',
            description: 'Track your credit score in real-time with color-coded indicators and detailed breakdowns',
            gradient: 'from-blue-500 to-cyan-500',
            demo: (
                <div className="relative w-full h-48 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 flex items-center justify-center">
                    <div className="relative">
                        <motion.div
                            className="w-32 h-32 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center"
                            animate={{
                                scale: [1, 1.05, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        >
                            <div className="text-center">
                                <div className="text-4xl font-bold text-white">750</div>
                                <div className="text-xs text-white/80">Excellent</div>
                            </div>
                        </motion.div>
                        <motion.div
                            className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-xl"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 360],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                            }}
                        >
                            ✓
                        </motion.div>
                    </div>
                </div>
            )
        },
        {
            icon: '📈',
            title: 'Salary Hike Calculator',
            description: 'Visualize your salary growth with side-by-side comparisons and instant hike percentages',
            gradient: 'from-purple-500 to-pink-500',
            demo: (
                <div className="w-full h-48 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 flex items-center justify-center">
                    <div className="flex items-end gap-4">
                        <div className="flex flex-col items-center">
                            <motion.div
                                className="w-16 bg-gradient-to-t from-blue-500 to-blue-600 rounded-t-lg"
                                initial={{ height: 0 }}
                                animate={{ height: 80 }}
                                transition={{ duration: 1, delay: 0.2 }}
                            />
                            <span className="text-xs text-gray-600 mt-2 font-medium">Current</span>
                            <span className="text-sm font-bold text-gray-900">₹15L</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <motion.div
                                className="w-16 bg-gradient-to-t from-green-500 to-green-600 rounded-t-lg"
                                initial={{ height: 0 }}
                                animate={{ height: 120 }}
                                transition={{ duration: 1, delay: 0.4 }}
                            />
                            <span className="text-xs text-gray-600 mt-2 font-medium">Expected</span>
                            <span className="text-sm font-bold text-gray-900">₹22L</span>
                        </div>
                        <motion.div
                            className="ml-2 px-4 py-2 bg-green-500 text-white rounded-full font-bold"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5, delay: 0.8 }}
                        >
                            +47%
                        </motion.div>
                    </div>
                </div>
            )
        },
        {
            icon: '💬',
            title: 'Real-Time HR Chat',
            description: 'Connect instantly with hiring managers. See who\'s online and start conversations immediately',
            gradient: 'from-green-500 to-emerald-500',
            demo: (
                <div className="w-full h-48 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 flex flex-col justify-between">
                    <div className="flex items-center gap-2 mb-2">
                        <motion.div
                            className="w-2 h-2 bg-green-500 rounded-full"
                            animate={{
                                scale: [1, 1.5, 1],
                                opacity: [1, 0.5, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        />
                        <span className="text-xs font-semibold text-green-700">4 HRs Online</span>
                    </div>
                    <div className="space-y-2">
                        {['Priya', 'Rahul', 'Anjali'].map((name, i) => (
                            <motion.div
                                key={name}
                                className="flex items-center gap-2 bg-white p-2 rounded-lg"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.2 }}
                            >
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {name[0]}
                                </div>
                                <div className="flex-1">
                                    <div className="text-xs font-medium text-gray-900">{name}</div>
                                    <div className="text-xs text-gray-500">Responds in ~5 min</div>
                                </div>
                                <motion.button
                                    className="p-1.5 bg-blue-500 text-white rounded-lg"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                    </svg>
                                </motion.button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            icon: '🔍',
            title: 'Smart Job Sorting',
            description: 'Filter and sort jobs by salary, location, and buyout support. Find your perfect match faster',
            gradient: 'from-orange-500 to-red-500',
            demo: (
                <div className="w-full h-48 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4">
                    <div className="flex gap-2 mb-3">
                        {['Highest Salary', 'Location', 'Buyout Support'].map((filter, i) => (
                            <motion.div
                                key={filter}
                                className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-200"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: i * 0.15 }}
                            >
                                {filter}
                            </motion.div>
                        ))}
                    </div>
                    <div className="space-y-2">
                        {[
                            { title: 'Senior Developer', salary: '₹28L', badge: '🚀 Sponsor' },
                            { title: 'Backend Engineer', salary: '₹22L', badge: '⚡ Quick' },
                            { title: 'Full Stack Dev', salary: '₹20L', badge: '💰 Buyout' }
                        ].map((job, i) => (
                            <motion.div
                                key={job.title}
                                className="bg-white p-2 rounded-lg flex items-center justify-between"
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.5 + i * 0.15 }}
                            >
                                <div>
                                    <div className="text-xs font-semibold text-gray-900">{job.title}</div>
                                    <div className="text-xs text-green-600 font-bold">{job.salary}</div>
                                </div>
                                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">{job.badge}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )
        }
    ];

    const companyFeatures = [
        {
            icon: '👥',
            title: 'Candidates Online Status',
            description: 'See which candidates are currently available and start conversations in real-time',
            gradient: 'from-blue-500 to-indigo-500',
            demo: (
                <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <motion.div
                            className="w-3 h-3 bg-green-500 rounded-full"
                            animate={{
                                scale: [1, 1.4, 1],
                                opacity: [1, 0.6, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        />
                        <span className="text-sm font-bold text-green-700">6 Candidates Online</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {['Rahul V.', 'Priya S.', 'Amit P.', 'Sneha R.'].map((name, i) => (
                            <motion.div
                                key={name}
                                className="bg-white p-2 rounded-lg relative"
                                initial={{ scale: 0, rotate: -10 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: i * 0.15 }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full" />
                                        <motion.div
                                            className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-semibold text-gray-900 truncate">{name}</div>
                                        <div className="text-xs text-gray-500 truncate">Full Stack Dev</div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            icon: '⚡',
            title: 'Instant Candidate Matching',
            description: 'AI-powered matching shows you the best candidates based on your requirements',
            gradient: 'from-purple-500 to-pink-500',
            demo: (
                <div className="w-full h-48 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 flex items-center justify-center">
                    <div className="text-center">
                        <motion.div
                            className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl"
                            animate={{
                                rotate: 360,
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            🎯
                        </motion.div>
                        <div className="text-2xl font-bold text-gray-900 mb-1">95%</div>
                        <div className="text-xs text-gray-600">Match Score</div>
                    </div>
                </div>
            )
        },
        {
            icon: '📊',
            title: 'Hiring Analytics',
            description: 'Track your hiring pipeline, response rates, and buyout sponsorship ROI',
            gradient: 'from-cyan-500 to-blue-500',
            demo: (
                <div className="w-full h-48 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl p-4">
                    <div className="grid grid-cols-3 gap-2">
                        {[
                            { label: 'Active Jobs', value: '8', icon: '📋' },
                            { label: 'Applications', value: '156', icon: '📝' },
                            { label: 'Interviews', value: '24', icon: '🎯' }
                        ].map((stat, i) => (
                            <motion.div
                                key={stat.label}
                                className="bg-white p-3 rounded-lg text-center"
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: i * 0.2 }}
                            >
                                <div className="text-2xl mb-1">{stat.icon}</div>
                                <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                                <div className="text-xs text-gray-500">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            icon: '💬',
            title: 'Direct Messaging',
            description: 'Chat directly with candidates without waiting for email responses',
            gradient: 'from-green-500 to-teal-500',
            demo: (
                <div className="w-full h-48 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4">
                    <div className="space-y-2">
                        <motion.div
                            className="bg-white p-2 rounded-lg rounded-bl-none max-w-[80%]"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                        >
                            <div className="text-xs text-gray-900">Hi! I'd love to discuss the Senior Dev role at your company 👋</div>
                            <div className="text-xs text-gray-400 mt-1">2 min ago</div>
                        </motion.div>
                        <motion.div
                            className="bg-blue-500 text-white p-2 rounded-lg rounded-br-none max-w-[80%] ml-auto"
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <div className="text-xs">Great! Let's schedule a call. Are you available tomorrow?</div>
                            <div className="text-xs text-blue-100 mt-1">Just now</div>
                        </motion.div>
                    </div>
                </div>
            )
        }
    ];

    const nbfcFeatures = [
        {
            icon: '📊',
            title: 'CIBIL Score Analysis',
            description: 'Comprehensive credit analysis with detailed scoring breakdowns and risk assessment',
            gradient: 'from-blue-500 to-purple-500',
            demo: (
                <div className="w-full h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-4">
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Credit Score</div>
                            <div className="text-2xl font-bold text-green-600">750</div>
                            <div className="text-xs text-green-600">Excellent</div>
                        </div>
                        <div className="bg-white p-3 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Risk Level</div>
                            <div className="text-2xl font-bold text-green-600">Low</div>
                            <div className="text-xs text-gray-600">95% approval</div>
                        </div>
                    </div>
                    <motion.div
                        className="mt-3 bg-green-500 text-white p-2 rounded-lg text-center text-xs font-semibold"
                        animate={{
                            scale: [1, 1.05, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                        }}
                    >
                        ✓ Loan Approved - ₹2.5L
                    </motion.div>
                </div>
            )
        },
        {
            icon: '✅',
            title: 'One-Click Loan Approval',
            description: 'Streamlined approval workflow with instant decisions for qualified candidates',
            gradient: 'from-green-500 to-emerald-500',
            demo: (
                <div className="w-full h-48 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 flex items-center justify-center">
                    <div className="text-center">
                        <motion.div
                            className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto mb-3 flex items-center justify-center"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20
                            }}
                        >
                            <motion.div
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                            >
                                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            </motion.div>
                        </motion.div>
                        <div className="text-lg font-bold text-gray-900">Loan Approved</div>
                        <div className="text-xs text-gray-600">in 24 hours</div>
                    </div>
                </div>
            )
        },
        {
            icon: '📈',
            title: 'Application Pipeline',
            description: 'Manage and track all loan applications with real-time status updates',
            gradient: 'from-orange-500 to-red-500',
            demo: (
                <div className="w-full h-48 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4">
                    <div className="space-y-2">
                        {[
                            { status: 'Pending Review', count: 12, color: 'yellow' },
                            { status: 'Approved', count: 45, color: 'green' },
                            { status: 'Disbursed', count: 38, color: 'blue' }
                        ].map((item, i) => (
                            <motion.div
                                key={item.status}
                                className="bg-white p-2 rounded-lg flex items-center justify-between"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: i * 0.2 }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 bg-${item.color}-500 rounded-full`}></div>
                                    <span className="text-xs font-medium text-gray-900">{item.status}</span>
                                </div>
                                <span className="text-sm font-bold text-gray-900">{item.count}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )
        },
        {
            icon: '💰',
            title: 'Quick Disbursement',
            description: 'Fast loan disbursement directly to employers for immediate buyout processing',
            gradient: 'from-purple-500 to-pink-500',
            demo: (
                <div className="w-full h-48 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 flex items-center justify-center">
                    <div className="text-center space-y-2">
                        <motion.div
                            className="text-5xl"
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                        >
                            💸
                        </motion.div>
                        <div className="text-2xl font-bold text-gray-900">₹2.5L</div>
                        <div className="text-xs text-gray-600">Disbursed in 48 hours</div>
                        <motion.div
                            className="inline-block px-3 py-1 bg-green-500 text-white rounded-full text-xs font-semibold"
                            animate={{
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: 0.5
                            }}
                        >
                            Completed ✓
                        </motion.div>
                    </div>
                </div>
            )
        }
    ];

    const features = {
        candidate: candidateFeatures,
        company: companyFeatures,
        nbfc: nbfcFeatures
    };

    const tabConfig = {
        candidate: {
            label: 'For Candidates',
            icon: '👨‍💼',
            color: 'blue',
            description: 'Smart tools to accelerate your job switch'
        },
        company: {
            label: 'For Companies',
            icon: '🏢',
            color: 'purple',
            description: 'Hire top talent faster with intelligent matching'
        },
        nbfc: {
            label: 'For NBFCs',
            icon: '🏦',
            color: 'green',
            description: 'Streamlined loan processing and approvals'
        }
    };

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -right-40 w-96 h-96 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <motion.div
                        className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        ✨ Platform Features
                    </motion.div>
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Built for Everyone in the Ecosystem
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        Real-time features that make job switching seamless for candidates, hiring efficient for companies, and lending secure for NBFCs
                    </motion.p>
                </div>

                {/* Tab Navigation */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-white rounded-full p-1.5 shadow-lg border border-gray-200">
                        {Object.entries(tabConfig).map(([key, config]) => (
                            <button
                                key={key}
                                onClick={() => setActiveTab(key as typeof activeTab)}
                                className={`
                                    relative px-6 py-3 rounded-full font-semibold text-sm transition-all
                                    ${activeTab === key
                                        ? 'text-white'
                                        : 'text-gray-600 hover:text-gray-900'
                                    }
                                `}
                            >
                                {activeTab === key && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className={`absolute inset-0 bg-gradient-to-r ${
                                            config.color === 'blue' ? 'from-blue-500 to-blue-600' :
                                            config.color === 'purple' ? 'from-purple-500 to-purple-600' :
                                            'from-green-500 to-green-600'
                                        } rounded-full`}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    />
                                )}
                                <span className="relative flex items-center gap-2">
                                    <span>{config.icon}</span>
                                    <span>{config.label}</span>
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Tab Description */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center mb-12"
                    >
                        <p className="text-lg text-gray-600 font-medium">
                            {tabConfig[activeTab].description}
                        </p>
                    </motion.div>
                </AnimatePresence>

                {/* Features Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.5 }}
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                    {features[activeTab].map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                        >
                            {/* Demo Section */}
                            <div className="relative overflow-hidden">
                                {feature.demo}
                            </div>

                            {/* Content Section */}
                            <div className="p-6">
                                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl mb-4 text-2xl group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    </motion.div>
                </AnimatePresence>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <a
                        href="/register"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 hover:shadow-xl"
                    >
                        <span>Try These Features Now</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </a>
                    <p className="mt-4 text-sm text-gray-500">
                        Free beta access • No credit card required • Live in 2 minutes
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default PlatformFeatures;
