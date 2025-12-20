import { motion } from 'framer-motion';

const WhySection = () => {
    return (
        <section id="problem" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: The Problem */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            ⚠️ The Problem
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Notice Periods Kill Great Opportunities
                        </h2>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                    <span className="text-lg">💔</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">45% of offers withdrawn</div>
                                    <div className="text-sm text-gray-600">Companies can't wait 90 days</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                                    <span className="text-lg">💸</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">₹4.2L average opportunity cost</div>
                                    <div className="text-sm text-gray-600">Lost earnings during notice period</div>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <span className="text-lg">⏱️</span>
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">75 days average in India</div>
                                    <div className="text-sm text-gray-600">vs 14 days globally</div>
                                </div>
                            </div>
                        </div>

                        <p className="text-lg text-gray-600 italic">
                            "Don't let outdated HR policies from 2005 hold you back in 2025"
                        </p>
                    </motion.div>

                    {/* Right: The Solution */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            ✅ The Solution
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            90toZero: Your Career Acceleration Platform
                        </h2>

                        <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-blue-100 mb-6">
                            <div className="space-y-6">
                                <div>
                                    <div className="text-sm text-gray-600 mb-2">Traditional Notice Period</div>
                                    <div className="bg-red-50 rounded-lg p-4 border-2 border-red-200">
                                        <div className="text-3xl font-black text-red-600">90 Days</div>
                                        <div className="text-sm text-gray-600">Wait, risk, opportunity cost</div>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <svg className="w-8 h-8 mx-auto text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>

                                <div>
                                    <div className="text-sm text-gray-600 mb-2">With 90toZero</div>
                                    <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
                                        <div className="text-3xl font-black text-green-600">10-15 Days</div>
                                        <div className="text-sm text-gray-600">Start earning at new role faster</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex items-center gap-2 text-gray-700">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span><strong>Job board</strong> with immediate joining roles</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span><strong>Company sponsorship</strong> options (full/partial)</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span><strong>Financing support</strong> from 10.5% (when needed)</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span><strong>One platform,</strong> multiple solutions</span>
                            </div>
                        </div>

                        <a
                            href="#features"
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-all hover:scale-105"
                        >
                            <span>Explore Platform Features</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default WhySection;
