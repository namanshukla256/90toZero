import { motion } from 'framer-motion';

const HowItWorks = () => {
    const steps = [
        {
            id: 1,
            icon: '👤',
            title: 'Create Your Profile',
            time: '5 minutes',
            description: 'Sign up and complete your professional profile with current role details.',
            status: 'live',
            automated: false,
            details: [
                'Basic info & employment details',
                'Upload salary slips for verification',
                'Quick profile completion',
            ]
        },
        {
            id: 2,
            icon: '🎯',
            title: 'Find Your Path',
            time: '1-5 days',
            description: 'Browse jobs OR apply with existing offer - multiple ways to move forward.',
            status: 'beta',
            automated: false,
            details: [
                'Browse job board with buyout support',
                'Or apply with your current offer',
                'Match with sponsoring companies',
                'See immediate joining opportunities',
            ],
            badge: 'Job Board Beta'
        },
        {
            id: 3,
            icon: '🤝',
            title: 'Company Review',
            time: '2-5 days',
            description: 'Companies review your profile and decide on sponsorship support options.',
            status: 'live',
            automated: false,
            details: [
                'Company assesses role fit',
                'Reviews sponsorship options',
                'Makes offer with terms',
                'Clear timeline provided',
            ]
        },
        {
            id: 4,
            icon: '💰',
            title: 'Financing (If Needed)',
            time: '24-48 hours',
            description: 'Get financing only if needed - with sponsorship reducing your burden.',
            status: 'live',
            automated: true,
            details: [
                'Full sponsorship: Skip this step!',
                'Partial: Finance remaining amount',
                'No sponsorship: Multi-NBFC options',
                'Fast approval from 10.5% p.a.',
            ],
            note: '*Timeline depends on partner approval'
        },
        {
            id: 5,
            icon: '🚀',
            title: 'Start Your New Role',
            time: '1-2 days',
            description: 'Complete buyout payment and join your new company immediately.',
            status: 'live',
            automated: false,
            details: [
                'Funds disbursed to current employer',
                'Buyout processed quickly',
                'Exit formalities completed',
                'Start new role in 10-15 days total',
            ]
        }
    ];

    return (
        <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        📍 Your Journey
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        From signup to new job in as little as <span className="font-bold text-blue-600">10-15 days</span>
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical connecting line (desktop) */}
                    <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-200 via-purple-200 to-blue-200"></div>

                    {/* Steps */}
                    <div className="space-y-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className={`relative grid lg:grid-cols-2 gap-8 items-center ${
                                    index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                                }`}
                            >
                                {/* Content - Left on even, Right on odd */}
                                <div className={`${index % 2 === 0 ? 'lg:text-right lg:pr-12' : 'lg:col-start-2 lg:pl-12'}`}>
                                    <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-100 hover:border-blue-200 transition-all hover:shadow-xl">
                                        {/* Header */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className={`flex items-center gap-3 ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>
                                                <div className="text-4xl">{step.icon}</div>
                                                <div className={index % 2 === 0 ? 'lg:text-right' : ''}>
                                                    <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                                                    <div className="flex items-center gap-2 text-sm mt-1">
                                                        <span className="text-blue-600 font-semibold">⏱️ {step.time}</span>
                                                        {step.automated && (
                                                            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                                                                Automated
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {step.badge && (
                                                <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                    {step.badge}
                                                </span>
                                            )}
                                        </div>

                                        {/* Description */}
                                        <p className={`text-gray-600 mb-4 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                                            {step.description}
                                        </p>

                                        {/* Details */}
                                        <ul className={`space-y-2 ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                                            {step.details.map((detail, i) => (
                                                <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                                                    <span className="text-green-500">✓</span>
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {/* Note */}
                                        {step.note && (
                                            <p className={`text-xs text-gray-500 mt-3 italic ${index % 2 === 0 ? 'lg:text-right' : ''}`}>
                                                {step.note}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Step Number Circle - Center on desktop */}
                                <div className="hidden lg:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-xl border-4 border-white">
                                        {step.id}
                                    </div>
                                </div>

                                {/* Mobile step number */}
                                <div className="lg:hidden absolute -left-4 top-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg">
                                        {step.id}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
