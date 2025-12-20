import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SolutionReveal = () => {
    const steps = [
        {
            id: 1,
            icon: '💰',
            title: 'Get Financing',
            description: 'Secure a loan to cover your notice period salary from RBI-registered NBFCs'
        },
        {
            id: 2,
            icon: '🎯',
            title: 'Buy Your Freedom',
            description: 'Pay your current employer the buyout amount and exit immediately'
        },
        {
            id: 3,
            icon: '📊',
            title: 'Repay Comfortably',
            description: 'Easy EMIs from your new (higher) salary over 6-24 months'
        }
    ];

    const differentiators = [
        'Compare multiple NBFC offers',
        'AI-powered approval predictions',
        'Company sponsorship options',
        'Full transparency, no hidden fees'
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 text-white relative overflow-hidden">
            {/* Animated background patterns */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                </div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Big Reveal Header */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-white/30">
                        <span className="text-xl">💡</span>
                        <span>The Solution</span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-6">
                        Introducing Notice Period
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
                            Buyout Financing
                        </span>
                    </h2>

                    <p className="text-2xl md:text-3xl text-blue-100 max-w-4xl mx-auto font-medium">
                        Pay your current employer. Join your new company immediately.
                        <br />
                        Repay via easy EMIs.
                    </p>
                </motion.div>

                {/* How It Works - 3 Steps */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.15 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* Connecting arrow (not on last item) */}
                            {index < steps.length - 1 && (
                                <div className="hidden md:block absolute top-16 -right-4 z-10">
                                    <svg className="w-8 h-8 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            )}

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all hover:scale-105">
                                {/* Step Number */}
                                <div className="text-sm font-bold text-yellow-300 mb-3">STEP {step.id}</div>

                                {/* Icon */}
                                <div className="text-6xl mb-4">{step.icon}</div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>

                                {/* Description */}
                                <p className="text-blue-100 leading-relaxed">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* The Math That Works */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20 mb-16"
                >
                    <h3 className="text-3xl font-bold text-center mb-8">The Math That Works</h3>

                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        {/* Left: The Example */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                                <span className="text-blue-100">Buyout Amount</span>
                                <span className="text-2xl font-bold">₹2.5L</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                                <span className="text-blue-100">Monthly EMI</span>
                                <span className="text-2xl font-bold text-green-300">₹22K</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white/10 rounded-lg">
                                <span className="text-blue-100">Join Early</span>
                                <span className="text-2xl font-bold text-yellow-300">3 months</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-lg">
                                <span className="font-semibold">New Salary/Month</span>
                                <span className="text-3xl font-bold">₹1.5L</span>
                            </div>
                        </div>

                        {/* Right: The Verdict */}
                        <div className="text-center md:text-left">
                            <div className="text-6xl font-bold mb-4">
                                <span className="text-green-300">Pay ₹22K</span>
                            </div>
                            <div className="text-4xl font-bold mb-6">
                                <span className="text-yellow-300">Earn ₹1.5L?</span>
                            </div>
                            <div className="text-3xl font-black text-white bg-gradient-to-r from-green-500 to-green-600 inline-block px-6 py-3 rounded-lg">
                                That's a No-Brainer! 🚀
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* What Makes Us Different */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center"
                >
                    <h3 className="text-3xl font-bold mb-8">What Makes 90toZero Different</h3>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {differentiators.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
                            >
                                <div className="text-green-300 mb-2">
                                    <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <p className="font-semibold text-white">{feature}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="#features"
                            className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
                        >
                            <span>See Our Features</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </a>

                        <Link
                            to="/calculator"
                            className="inline-flex items-center gap-2 bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg hover:bg-yellow-300 transition-all hover:scale-105 shadow-xl"
                        >
                            <span>Calculate My Scenario</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </Link>
                    </div>

                    <p className="mt-6 text-blue-200 text-sm">
                        ✓ No registration required  •  ✓ See results instantly  •  ✓ Compare all options
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default SolutionReveal;
