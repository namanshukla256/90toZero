import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ThreeWayValue = () => {
    return (
        <section id="value-proposition" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        🤝 Three-Way Ecosystem
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Built for Everyone in the Hiring Ecosystem
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Connecting candidates, companies, and financial institutions for faster, smarter hiring
                    </p>
                </div>

                {/* Value Propositions */}
                <div className="space-y-20">
                    {/* For Candidates */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Visual/Mockup */}
                        <div className="order-2 lg:order-1">
                            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 shadow-xl border-2 border-blue-100">
                                {/* Calculator Mockup */}
                                <div className="bg-white rounded-xl p-6 shadow-lg mb-4">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                        <span className="ml-2 text-sm font-semibold text-gray-700">Buyout Calculator</span>
                                    </div>
                                    
                                    <div className="space-y-4">
                                        <div>
                                            <div className="text-xs text-gray-600 mb-1">Current CTC</div>
                                            <div className="bg-gray-100 rounded-lg p-3 font-semibold text-gray-900">₹12,00,000</div>
                                        </div>
                                        <div>
                                            <div className="text-xs text-gray-600 mb-1">Notice Period (days)</div>
                                            <div className="bg-gray-100 rounded-lg p-3 font-semibold text-gray-900">90 days</div>
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
                                            <div className="text-xs text-blue-600 font-semibold mb-2">YOUR BUYOUT</div>
                                            <div className="text-3xl font-black text-blue-600 mb-1">₹2,50,000</div>
                                            <div className="text-xs text-gray-600">Monthly Salary × 2.5 months</div>
                                        </div>
                                    </div>
                                </div>

                                {/* NBFC Offers Preview */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="text-sm font-semibold text-gray-900 mb-3">Compare 3 NBFC Offers</div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border border-green-200">
                                            <div>
                                                <div className="font-semibold text-gray-900">NBFC Partner A</div>
                                                <div className="text-xs text-gray-600">10.5% p.a. • 12 months</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-green-600">₹22,244</div>
                                                <div className="text-xs text-gray-600">EMI/month</div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <div className="font-semibold text-gray-900">NBFC Partner B</div>
                                                <div className="text-xs text-gray-600">12% p.a. • 12 months</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-gray-700">₹22,550</div>
                                                <div className="text-xs text-gray-600">EMI/month</div>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                            <div>
                                                <div className="font-semibold text-gray-900">NBFC Partner C</div>
                                                <div className="text-xs text-gray-600">14% p.a. • 12 months</div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-gray-700">₹22,909</div>
                                                <div className="text-xs text-gray-600">EMI/month</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <span className="text-2xl">💼</span>
                                <span>For Candidates</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Switch Jobs 80% Faster
                            </h3>
                            <p className="text-xl text-gray-600 mb-6">
                                Get affordable loans to buy out your notice period and join your dream job immediately
                            </p>

                            {/* Key Features */}
                            <div className="grid sm:grid-cols-2 gap-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">⚡</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Instant Calculator</div>
                                        <div className="text-sm text-gray-600">Know exact EMI in 30 seconds</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">🏦</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Multi-NBFC Network</div>
                                        <div className="text-sm text-gray-600">Compare multiple offers</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">💰</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">From 10.5% Interest</div>
                                        <div className="text-sm text-gray-600">Competitive rates, 6-24 months</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">⏱️</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">24-48h Approval</div>
                                        <div className="text-sm text-gray-600">Fast-track processing</div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-6 border border-blue-200">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-black text-blue-600">80%</div>
                                        <div className="text-xs text-gray-600">Faster Switch</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-blue-600">₹4.2L</div>
                                        <div className="text-xs text-gray-600">Avg. Saved</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-blue-600">10.5%</div>
                                        <div className="text-xs text-gray-600">From p.a.</div>
                                    </div>
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/calculator"
                                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition-all hover:scale-105"
                                >
                                    <span>Try Calculator</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </Link>
                                <Link
                                    to="/register?type=candidate"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 font-bold px-6 py-3 rounded-lg transition-all"
                                >
                                    <span>Register as Candidate</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    {/* For Companies */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Content */}
                        <div>
                            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <span className="text-2xl">🏢</span>
                                <span>For Companies</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Hire Top Talent Immediately
                            </h3>
                            <p className="text-xl text-gray-600 mb-6">
                                Stop losing great candidates to notice periods. Sponsor buyouts and secure top talent instantly.
                            </p>

                            {/* Key Features */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">🎯</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Buyout Sponsorship</div>
                                        <div className="text-sm text-gray-600">Fully or partially sponsor candidate buyouts to secure talent</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">⚡</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">70% Faster Hiring</div>
                                        <div className="text-sm text-gray-600">Reduce time-to-hire from 90 days to 10-15 days</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">📊</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Priority Matching</div>
                                        <div className="text-sm text-gray-600">Get matched with pre-vetted candidates ready to join</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">💼</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Unlimited Job Postings</div>
                                        <div className="text-sm text-gray-600">Post as many roles as you need during beta</div>
                                    </div>
                                </div>
                            </div>

                            {/* Sponsorship Options */}
                            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6 border border-green-200">
                                <div className="text-sm font-semibold text-gray-900 mb-3">Sponsorship Models</div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center gap-2">
                                        <span className="text-green-600">●</span>
                                        <span className="text-gray-700"><strong>Full Sponsorship:</strong> Pay entire buyout upfront</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-blue-600">●</span>
                                        <span className="text-gray-700"><strong>Partial Sponsorship:</strong> Share cost with candidate (50/50, 70/30, etc.)</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-purple-600">●</span>
                                        <span className="text-gray-700"><strong>Facilitation Only:</strong> Enable access, candidate pays EMI</span>
                                    </div>
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/register?type=company"
                                    className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg transition-all hover:scale-105"
                                >
                                    <span>Register as Company</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-green-600 border-2 border-green-600 hover:bg-green-50 font-bold px-6 py-3 rounded-lg transition-all"
                                >
                                    <span>Schedule Demo</span>
                                </a>
                            </div>

                            <p className="mt-4 text-sm text-gray-500">
                                🚀 <strong>Early Access Pricing:</strong> Special rates for beta partners
                            </p>
                        </div>

                        {/* Visual/Mockup */}
                        <div>
                            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 shadow-xl border-2 border-green-100">
                                {/* Company Dashboard Mockup */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                        <span className="ml-2 text-sm font-semibold text-gray-700">Company Dashboard</span>
                                    </div>

                                    {/* Pending Buyout Requests */}
                                    <div className="mb-6">
                                        <div className="text-sm font-semibold text-gray-900 mb-3">Pending Buyout Requests (3)</div>
                                        <div className="space-y-3">
                                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <div className="font-semibold text-gray-900">Priya Sharma</div>
                                                        <div className="text-xs text-gray-600">Senior Software Engineer</div>
                                                    </div>
                                                    <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">NEW</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                                    <div>
                                                        <div className="text-gray-600">Buyout Amount</div>
                                                        <div className="font-bold text-gray-900">₹2,50,000</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-600">Notice Period</div>
                                                        <div className="font-bold text-gray-900">90 days</div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="flex-1 bg-green-600 text-white text-xs py-2 rounded font-semibold">
                                                        Approve (100%)
                                                    </button>
                                                    <button className="flex-1 bg-blue-600 text-white text-xs py-2 rounded font-semibold">
                                                        Partial (50%)
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <div className="font-semibold text-gray-900">Rahul Verma</div>
                                                        <div className="text-xs text-gray-600">Product Manager</div>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                                    <div>
                                                        <div className="text-gray-600">Buyout Amount</div>
                                                        <div className="font-bold text-gray-900">₹3,75,000</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-600">Notice Period</div>
                                                        <div className="font-bold text-gray-900">90 days</div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    <button className="flex-1 bg-green-600 text-white text-xs py-2 rounded font-semibold">
                                                        Approve (100%)
                                                    </button>
                                                    <button className="flex-1 bg-blue-600 text-white text-xs py-2 rounded font-semibold">
                                                        Partial (50%)
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-3 text-center">
                                        <div className="bg-green-50 rounded-lg p-3">
                                            <div className="text-xl font-black text-green-600">12</div>
                                            <div className="text-xs text-gray-600">Active Jobs</div>
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-3">
                                            <div className="text-xl font-black text-blue-600">87</div>
                                            <div className="text-xs text-gray-600">Applications</div>
                                        </div>
                                        <div className="bg-purple-50 rounded-lg p-3">
                                            <div className="text-xl font-black text-purple-600">18d</div>
                                            <div className="text-xs text-gray-600">Avg. Hire Time</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* For NBFCs */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="grid lg:grid-cols-2 gap-12 items-center"
                    >
                        {/* Visual/Mockup */}
                        <div className="order-2 lg:order-1">
                            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-xl border-2 border-purple-100">
                                {/* NBFC Dashboard Mockup */}
                                <div className="bg-white rounded-xl p-6 shadow-lg">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                        <span className="ml-2 text-sm font-semibold text-gray-700">NBFC Partner Portal</span>
                                    </div>

                                    {/* Loan Applications */}
                                    <div className="mb-6">
                                        <div className="text-sm font-semibold text-gray-900 mb-3">Recent Applications (5)</div>
                                        <div className="space-y-2">
                                            <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div>
                                                        <div className="font-semibold text-gray-900 text-sm">Amit Patel</div>
                                                        <div className="text-xs text-gray-600">Software Engineer • TCS → Flipkart</div>
                                                    </div>
                                                    <span className="bg-green-200 text-green-800 text-xs px-2 py-1 rounded-full font-semibold">VERIFIED</span>
                                                </div>
                                                <div className="grid grid-cols-3 gap-2 text-xs">
                                                    <div>
                                                        <div className="text-gray-600">Loan Amount</div>
                                                        <div className="font-bold text-gray-900">₹2.5L</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-600">Current CTC</div>
                                                        <div className="font-bold text-gray-900">₹12L</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-gray-600">Credit Score</div>
                                                        <div className="font-bold text-green-600">782</div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="font-semibold text-gray-900 text-sm">Sneha Reddy</div>
                                                        <div className="text-xs text-gray-600">Product Manager • Paytm → Amazon</div>
                                                    </div>
                                                    <span className="bg-yellow-200 text-yellow-800 text-xs px-2 py-1 rounded-full font-semibold">PENDING</span>
                                                </div>
                                            </div>

                                            <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="font-semibold text-gray-900 text-sm">Karan Singh</div>
                                                        <div className="text-xs text-gray-600">Data Analyst • Accenture → Google</div>
                                                    </div>
                                                    <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded-full font-semibold">REVIEWING</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Portfolio Stats */}
                                    <div className="grid grid-cols-3 gap-3 text-center">
                                        <div className="bg-purple-50 rounded-lg p-3">
                                            <div className="text-xl font-black text-purple-600">₹42L</div>
                                            <div className="text-xs text-gray-600">Portfolio Value</div>
                                        </div>
                                        <div className="bg-pink-50 rounded-lg p-3">
                                            <div className="text-xl font-black text-pink-600">0.8%</div>
                                            <div className="text-xs text-gray-600">Default Rate</div>
                                        </div>
                                        <div className="bg-blue-50 rounded-lg p-3">
                                            <div className="text-xl font-black text-blue-600">156</div>
                                            <div className="text-xs text-gray-600">Active Loans</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="order-1 lg:order-2">
                            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                <span className="text-2xl">🏦</span>
                                <span>For NBFCs</span>
                            </div>

                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Low-Risk, High-Quality Loan Portfolio
                            </h3>
                            <p className="text-xl text-gray-600 mb-6">
                                Access pre-verified, employment-backed borrowers with lower default risk than traditional personal loans
                            </p>

                            {/* Key Features */}
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">✅</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Pre-Verified Borrowers</div>
                                        <div className="text-sm text-gray-600">Employment, income, and documents verified before application reaches you</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">📊</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Lower Default Risk</div>
                                        <div className="text-sm text-gray-600">Employment-backed loans with new job offer as collateral</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">⚙️</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Automated Processing</div>
                                        <div className="text-sm text-gray-600">API integration for seamless loan management and disbursement</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">📈</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Analytics Dashboard</div>
                                        <div className="text-sm text-gray-600">Real-time portfolio monitoring and performance insights</div>
                                    </div>
                                </div>
                            </div>

                            {/* Value Props */}
                            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 mb-6 border border-purple-200">
                                <div className="grid grid-cols-2 gap-4 text-center">
                                    <div>
                                        <div className="text-2xl font-black text-purple-600">0.5-1%</div>
                                        <div className="text-xs text-gray-600">Expected Default Rate</div>
                                        <div className="text-xs text-gray-500 mt-1">vs 3-5% personal loans</div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-black text-purple-600">₹2-4L</div>
                                        <div className="text-xs text-gray-600">Avg. Ticket Size</div>
                                        <div className="text-xs text-gray-500 mt-1">6-24 month tenure</div>
                                    </div>
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    to="/register?type=nbfc"
                                    className="inline-flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-lg transition-all hover:scale-105"
                                >
                                    <span>Become a Partner</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center justify-center gap-2 bg-white text-purple-600 border-2 border-purple-600 hover:bg-purple-50 font-bold px-6 py-3 rounded-lg transition-all"
                                >
                                    <span>API Documentation</span>
                                </a>
                            </div>

                            <p className="mt-4 text-sm text-gray-500">
                                🔒 <strong>RBI Registered NBFCs only.</strong> Compliance support included.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ThreeWayValue;
