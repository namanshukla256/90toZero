import { motion } from 'framer-motion';

const UseCaseScenarios = () => {
    const scenarios = [
        {
            id: 1,
            icon: '💻',
            title: 'The IT Professional',
            persona: 'Senior Software Engineer → Startup Role',
            problem: 'Landed a dream job at a high-growth startup, but 90-day notice period threatens the offer.',
            solution: 'Company offered 50% buyout sponsorship + financing for remaining ₹1.25L',
            outcome: 'Joined in 2 weeks. Now earning ₹1.5L/month with only ₹11K/month EMI for 12 months.',
            savings: 'Started new salary 3 months early = ₹4.5L opportunity saved',
            gradient: 'from-blue-500 to-cyan-500',
            borderColor: 'border-blue-200'
        },
        {
            id: 2,
            icon: '🚀',
            title: 'The Career Switcher',
            persona: 'Marketing Manager → Product Manager',
            problem: 'After months of prep, landed a PM role. 60-day notice period put offer at risk.',
            solution: 'Used platform to compare 3 NBFC offers. Got best rate at 11.5% for ₹1.6L buyout.',
            outcome: 'Transitioned careers immediately. PM salary ₹1.2L/month (50% jump), EMI ₹14K.',
            savings: 'Secured rare career pivot. No gap, no lost opportunity.',
            gradient: 'from-purple-500 to-pink-500',
            borderColor: 'border-purple-200'
        },
        {
            id: 3,
            icon: '📈',
            title: 'The Manager Promotion',
            persona: 'Team Lead → Engineering Manager',
            problem: 'Received managerial offer at top tech company. 90-day wait made them reconsider candidate.',
            solution: 'Company fully sponsored ₹3.75L buyout to secure talent. Zero financing needed.',
            outcome: 'Joined as EM immediately. New package: ₹2.5L/month (67% increase).',
            savings: 'No cost to candidate. Lifetime earnings gain: ₹15L+ per year.',
            gradient: 'from-orange-500 to-red-500',
            borderColor: 'border-orange-200'
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-40 -left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 -right-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        <span>🎯</span>
                        <span>Real Scenarios, Real Solutions</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        See How 90toZero Works
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        These aren't testimonials (we're in beta!). These are realistic scenarios showing how notice period buyouts work for different professionals.
                    </p>
                </div>

                {/* Problem → Solution → Outcome Summary */}
                <div className="mb-16 bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">⚠️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Problem</h3>
                            <p className="text-gray-600">
                                Long notice periods (60-90 days) kill great job opportunities. Companies can't wait. Offers get withdrawn.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">💡</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Solution</h3>
                            <p className="text-gray-600">
                                Affordable buyout financing from RBI-registered NBFCs. Apply online, get approved in 24-48h, pay your employer, join immediately.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🎉</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Outcome</h3>
                            <p className="text-gray-600">
                                Switch jobs 80% faster. Repay via easy EMIs. Start earning at your new role while paying off the loan.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Scenario Cards */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {scenarios.map((scenario, index) => (
                        <motion.div
                            key={scenario.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`bg-white rounded-2xl overflow-hidden shadow-lg border-2 ${scenario.borderColor} hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                        >
                            {/* Card Header with Gradient */}
                            <div className={`bg-gradient-to-r ${scenario.gradient} p-6 text-white`}>
                                <div className="text-5xl mb-4">{scenario.icon}</div>
                                <h3 className="text-2xl font-bold mb-2">{scenario.title}</h3>
                                <p className="text-sm opacity-90">{scenario.persona}</p>
                            </div>

                            {/* Card Body */}
                            <div className="p-6">
                                {/* Problem */}
                                <div className="mb-4">
                                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                        The Challenge
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed text-sm">
                                        {scenario.problem}
                                    </p>
                                </div>

                                {/* Solution */}
                                <div className="mb-4 bg-blue-50 rounded-lg p-4">
                                    <h4 className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                                        How 90toZero Helped
                                    </h4>
                                    <p className="text-gray-700 leading-relaxed text-sm">
                                        {scenario.solution}
                                    </p>
                                </div>

                                {/* Outcome */}
                                <div className="mb-4 bg-green-50 rounded-lg p-4">
                                    <h4 className="text-xs font-semibold text-green-700 uppercase tracking-wide mb-2">
                                        ✅ The Result
                                    </h4>
                                    <p className="text-gray-900 font-semibold leading-relaxed text-sm mb-2">
                                        {scenario.outcome}
                                    </p>
                                    <p className="text-gray-600 text-xs italic">
                                        {scenario.savings}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Beta Message */}
                <div className="mt-12 text-center">
                    <div className="inline-flex items-center gap-2 bg-yellow-50 text-yellow-800 px-4 py-3 rounded-lg text-sm border border-yellow-200">
                        <span className="text-lg">💬</span>
                        <span className="font-medium">
                            Real testimonials coming soon! We're in beta and building our community of early switchers.
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UseCaseScenarios;
