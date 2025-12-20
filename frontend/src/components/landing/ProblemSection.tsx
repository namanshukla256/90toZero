import { motion } from 'framer-motion';

const ProblemSection = () => {
    const painPoints = [
        {
            id: 1,
            icon: '💔',
            headline: 'Companies Can\'t Wait 3 Months',
            description: 'You got the offer. But they need someone now. The position gets filled by someone with immediate availability.',
            stat: '45% of offers withdrawn',
            gradient: 'from-red-500 to-orange-500'
        },
        {
            id: 2,
            icon: '💸',
            headline: '₹3-5 Lakh Opportunity Cost',
            description: 'Serving notice without joining new role means months without your new higher salary. That\'s real money lost.',
            stat: '₹4.2L avg. lost earnings',
            gradient: 'from-orange-500 to-yellow-500'
        },
        {
            id: 3,
            icon: '⏸️',
            headline: 'Growth Opportunities Delayed',
            description: 'That promotion? That startup role? That international opportunity? All on hold for 90 days. Or gone forever.',
            stat: '75 days avg. in India',
            gradient: 'from-purple-500 to-pink-500'
        },
        {
            id: 4,
            icon: '😰',
            headline: 'Negotiation Nightmare',
            description: 'Trying to negotiate early exit? It strains relationships, damages reputation, and rarely works.',
            stat: '8% success rate',
            gradient: 'from-blue-500 to-purple-500'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <div className="absolute top-20 left-10 w-96 h-96 bg-red-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-red-200"
                    >
                        <span className="text-lg">⚠️</span>
                        <span>The Reality of Indian Job Market</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                    >
                        The Notice Period Trap
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto"
                    >
                        In India, 60-90 day notice periods are standard. For your career, they're catastrophic.
                    </motion.p>
                </div>

                {/* Pain Point Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {painPoints.map((point, index) => (
                        <motion.div
                            key={point.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative group"
                        >
                            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 h-full">
                                {/* Gradient accent bar */}
                                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${point.gradient} rounded-t-2xl`}></div>

                                {/* Icon */}
                                <div className="text-6xl mb-4">{point.icon}</div>

                                {/* Headline */}
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                    {point.headline}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    {point.description}
                                </p>

                                {/* Stat Badge */}
                                <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${point.gradient} text-white px-4 py-2 rounded-lg text-sm font-semibold`}>
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <span>{point.stat}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Comparison Visual */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 md:p-12 text-white shadow-2xl mb-12"
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-8 text-center">
                        The Cost of Waiting: Traditional Notice Period
                    </h3>

                    <div className="grid md:grid-cols-3 gap-8 mb-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-red-400 mb-2">90</div>
                            <div className="text-gray-300">Days Lost</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-red-400 mb-2">₹4.2L</div>
                            <div className="text-gray-300">Opportunity Cost</div>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-red-400 mb-2">45%</div>
                            <div className="text-gray-300">Offers Withdrawn</div>
                        </div>
                    </div>

                    <div className="border-t border-gray-700 pt-8">
                        <p className="text-center text-lg text-gray-300">
                            While you serve notice at your old company, you're not earning at your new salary, 
                            your offer is at risk, and your career is on pause.
                        </p>
                    </div>
                </motion.div>

                {/* Emotional Hook */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center bg-blue-50 rounded-2xl p-8 border-2 border-blue-200"
                >
                    <p className="text-2xl font-semibold text-gray-900 mb-4">
                        You've worked years to build your skills and land that role.
                    </p>
                    <p className="text-xl text-gray-700 mb-6">
                        Don't let outdated policies from 2005 hold you back in 2025.
                    </p>
                    <div className="inline-flex items-center gap-3 text-blue-600 font-semibold text-lg">
                        <span>There's a better way</span>
                        <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ProblemSection;
