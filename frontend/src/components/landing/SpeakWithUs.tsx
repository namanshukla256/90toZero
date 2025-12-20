import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const SpeakWithUs = () => {
    const [selectedType, setSelectedType] = useState<'candidate' | 'company' | 'nbfc'>('candidate');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const userTypes = [
        {
            id: 'candidate' as const,
            label: 'Job Seeker',
            icon: '/images/icons/user-candidate.svg',
            description: 'Looking to switch jobs faster',
            benefits: ['Free consultation', 'Buyout cost estimate', 'Sponsorship opportunities']
        },
        {
            id: 'company' as const,
            label: 'Company',
            icon: '/images/icons/user-company.svg',
            description: 'Want to hire top talent faster',
            benefits: ['Sponsorship ROI analysis', 'Platform demo', 'Custom partnership terms']
        },
        {
            id: 'nbfc' as const,
            label: 'NBFC Partner',
            icon: '/images/icons/user-nbfc.svg',
            description: 'RBI-registered lending partner',
            benefits: ['Portfolio opportunity', 'Integration support', 'Revenue sharing terms']
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, send to API
        console.log('Form submitted:', { ...formData, userType: selectedType });
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', phone: '', message: '' });
        }, 3000);
    };

    return (
        <section id="speak-with-us" className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
                <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-purple-300 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        💬 Let's Talk
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Have Questions? We're Here to Help
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Schedule a free consultation with our team. No commitment required.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    {/* Left: User Type Selection & Benefits */}
                    <div>
                        {/* User Type Tabs */}
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {userTypes.map((type) => (
                                <button
                                    key={type.id}
                                    onClick={() => setSelectedType(type.id)}
                                    className={`p-4 rounded-xl border-2 transition-all text-center ${
                                        selectedType === type.id
                                            ? 'border-blue-600 bg-blue-50 shadow-lg scale-105'
                                            : 'border-gray-200 bg-white hover:border-blue-300'
                                    }`}
                                >
                                    <div className="flex justify-center mb-2">
                                        <img src={type.icon} alt={type.label} className="w-12 h-12" />
                                    </div>
                                    <div className="text-sm font-semibold text-gray-900">{type.label}</div>
                                </button>
                            ))}
                        </div>

                        {/* Selected Type Details */}
                        <AnimatePresence mode="wait">
                            {userTypes.map((type) => (
                                selectedType === type.id && (
                                    <motion.div
                                        key={type.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <img src={type.icon} alt={type.label} className="w-16 h-16" />
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">{type.label}</h3>
                                                <p className="text-gray-600">{type.description}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-6">
                                            <p className="font-semibold text-gray-900">What you'll get:</p>
                                            {type.benefits.map((benefit, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="text-gray-700">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 border border-blue-200">
                                            <p className="text-sm text-gray-700">
                                                <span className="font-semibold">Response time:</span> Within 24 hours
                                            </p>
                                            <p className="text-sm text-gray-700 mt-1">
                                                <span className="font-semibold">Format:</span> Video call or phone
                                            </p>
                                        </div>
                                    </motion.div>
                                )
                            ))}
                        </AnimatePresence>

                        {/* Quick Contact Options */}
                        <div className="mt-8 space-y-4">
                            <a
                                href="mailto:hello@90tozero.com"
                                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                            >
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                                    📧
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">Email Us</div>
                                    <div className="text-sm text-gray-600">hello@90tozero.com</div>
                                </div>
                            </a>
                            <a
                                href="https://wa.me/919999999999"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-md transition-all"
                            >
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-xl">
                                    💬
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">WhatsApp Us</div>
                                    <div className="text-sm text-gray-600">Quick response guaranteed</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-200 sticky top-24">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">Schedule a Consultation</h3>
                        <p className="text-gray-600 mb-6">Fill in your details and we'll get back to you within 24 hours</p>

                        {isSubmitted ? (
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                className="text-center py-12"
                            >
                                <div className="text-6xl mb-4">✅</div>
                                <h4 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h4>
                                <p className="text-gray-600">We'll reach out to you within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="your.email@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        required
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                        placeholder="+91 98765 43210"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Message (Optional)
                                    </label>
                                    <textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                                        placeholder="Tell us what you need help with..."
                                    />
                                </div>

                                <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                                    <p className="text-xs text-gray-700">
                                        <span className="font-semibold">Consulting for:</span> {userTypes.find(t => t.id === selectedType)?.label}
                                    </p>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                                >
                                    Schedule Free Consultation
                                </button>

                                <p className="text-xs text-gray-500 text-center">
                                    We respect your privacy. Your information is secure and will never be shared.
                                </p>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SpeakWithUs;
