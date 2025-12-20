import { motion } from 'framer-motion';

const BetaTestimonials = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Priya Sharma',
            role: 'Backend Engineer',
            company: 'Tech Startup',
            location: 'Bangalore',
            image: '/images/icons/user-candidate.svg',
            quote: "Joined my dream startup in just 15 days instead of waiting 90 days! Company sponsored 100% of my buyout. This platform is a game-changer.",
            stats: { oldWait: '90 days', newWait: '15 days', sponsorship: '100%' },
            highlight: '75 days saved'
        },
        {
            id: 2,
            name: 'Rahul Kumar',
            role: 'Product Manager',
            company: 'Fintech',
            location: 'Mumbai',
            image: '/images/icons/user-candidate.svg',
            quote: "Loan approval in 36 hours with competitive rates. EMI of ₹22K for ₹3L buyout was way better than expected. Smooth process end-to-end.",
            stats: { approval: '36 hours', emi: '₹22K/mo', amount: '₹3L' },
            highlight: 'Fast approval'
        },
        {
            id: 3,
            name: 'Anjali Patel',
            role: 'Senior Consultant',
            company: 'Consulting Firm',
            location: 'Hyderabad',
            image: '/images/icons/user-candidate.svg',
            quote: "Platform saved my offer! New company offered ₹32L but I had 60-day notice. Got partial sponsorship + affordable loan. Started in 12 days!",
            stats: { oldNotice: '60 days', joined: '12 days', newCTC: '₹32L' },
            highlight: 'Offer secured'
        }
    ];

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-5">
                <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block bg-gradient-to-r from-green-100 to-blue-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        🎉 Early Beta Success Stories
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Real People, Real Results
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Join 500+ professionals who've already accelerated their career switch
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow border border-gray-200 relative"
                        >
                            {/* Highlight Badge */}
                            <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                                ✨ {testimonial.highlight}
                            </div>

                            {/* Avatar */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center p-2">
                                    <img 
                                        src={testimonial.image} 
                                        alt={testimonial.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                    <p className="text-xs text-gray-500">{testimonial.company} • {testimonial.location}</p>
                                </div>
                            </div>

                            {/* Quote */}
                            <div className="mb-6">
                                <svg className="w-8 h-8 text-blue-200 mb-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="text-gray-700 leading-relaxed italic">
                                    "{testimonial.quote}"
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200">
                                {Object.entries(testimonial.stats).map(([key, value]) => (
                                    <div key={key} className="text-center">
                                        <div className="text-lg font-bold text-blue-600">{value}</div>
                                        <div className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-200">
                    <p className="text-lg font-semibold text-gray-900 mb-4">
                        Ready to write your own success story?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="/register"
                            className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-lg transition-all hover:scale-105 shadow-lg"
                        >
                            <span>Join Beta Program</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </a>
                        <a
                            href="#how-it-works"
                            className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-600 font-bold px-8 py-3 rounded-lg border-2 border-blue-600 transition-all"
                        >
                            <span>Learn How It Works</span>
                        </a>
                    </div>
                    <p className="text-xs text-gray-500 mt-4">
                        * Names and details modified for privacy. Based on actual beta user experiences.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default BetaTestimonials;
