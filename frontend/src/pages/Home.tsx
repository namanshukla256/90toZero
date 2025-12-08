import { Link } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
    const [activeFaq, setActiveFaq] = useState<number | null>(null);

    const faqs = [
        {
            q: "How does the notice period buyout work?",
            a: "You apply for a loan to cover your notice period salary. Once approved, you pay your current employer and join your new company immediately. You repay the loan through EMIs over 6-24 months."
        },
        {
            q: "What is the interest rate on buyout loans?",
            a: "Interest rates typically range from 10.5% to 20% per annum, depending on your profile, CTC, and the NBFC partner. Our calculator gives you exact EMI details."
        },
        {
            q: "How long does the loan approval take?",
            a: "With complete documentation, loan approval typically takes 24-48 hours. Our NBFC partners prioritize employment-backed loans for faster processing."
        },
        {
            q: "Is there any processing fee?",
            a: "Processing fees vary by NBFC partner, typically 1-2% of the loan amount. This will be clearly mentioned during the application process."
        },
        {
            q: "What documents are required?",
            a: "You'll need: Current salary slips (3 months), offer letter from new company, bank statements (3 months), PAN card, Aadhaar, and current employment proof."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-blue-600">90toZero</div>
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">BETA</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6">
                        <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                        <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">How It Works</a>
                        <a href="#benefits" className="text-gray-600 hover:text-gray-900">Benefits</a>
                        <Link to="/calculator" className="text-gray-600 hover:text-gray-900">Calculator</Link>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/login" className="px-4 py-2 text-gray-700 hover:text-gray-900">
                            Login
                        </Link>
                        <Link to="/register" className="btn-primary">
                            Get Started
                        </Link>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
                                🚀 Join Your Dream Job Faster
                            </div>
                            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                From <span className="text-blue-600">90 Days</span><br />
                                to <span className="text-blue-600">Zero</span>
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Skip the notice period wait. Get instant loan approval to buy out your notice period and join your dream company <span className="font-semibold text-gray-900">immediately</span>.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link to="/register" className="btn-primary text-lg px-8 py-4 text-center">
                                    Get Started Free
                                </Link>
                                <Link to="/calculator" className="btn-secondary text-lg px-8 py-4 text-center">
                                    Calculate Buyout Cost
                                </Link>
                            </div>
                            <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span> No hidden charges
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span> Quick approval
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-green-500">✓</span> Flexible EMIs
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
                                <h3 className="text-2xl font-bold mb-6">Live Stats</h3>
                                <div className="space-y-6">
                                    <div>
                                        <div className="text-4xl font-bold mb-1">₹5.2 Cr+</div>
                                        <div className="text-blue-100">Total Loans Disbursed</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold mb-1">450+</div>
                                        <div className="text-blue-100">Successful Buyouts</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold mb-1">85%</div>
                                        <div className="text-blue-100">Approval Rate</div>
                                    </div>
                                    <div>
                                        <div className="text-4xl font-bold mb-1">24-48h</div>
                                        <div className="text-blue-100">Average Processing Time</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By Section */}
            <section className="py-12 bg-gray-50 border-y">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-600 mb-8">Trusted by leading companies and financial institutions</p>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-60">
                        <div className="text-2xl font-bold text-gray-400">TechCorp</div>
                        <div className="text-2xl font-bold text-gray-400">InfoSys</div>
                        <div className="text-2xl font-bold text-gray-400">FinanceHub</div>
                        <div className="text-2xl font-bold text-gray-400">DataMinds</div>
                        <div className="text-2xl font-bold text-gray-400">QuickLoan</div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Three-Way Ecosystem</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Connecting candidates, companies, and financial institutions in a seamless platform
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* For Companies */}
                        <div className="card hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-100">
                            <div className="text-5xl mb-6">🏢</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">For Companies</h3>
                            <p className="text-gray-600 mb-6">
                                Hire top talent immediately without the notice period wait
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Access to pre-vetted candidates</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Reduce time-to-hire by 70%</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Post unlimited job openings</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Priority candidate matching</span>
                                </li>
                            </ul>
                            <Link to="/register?type=company" className="text-blue-600 hover:text-blue-700 font-medium">
                                Register as Company →
                            </Link>
                        </div>

                        {/* For Candidates */}
                        <div className="card hover:shadow-xl transition-shadow border-2 border-blue-200 relative">
                            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                                Most Popular
                            </div>
                            <div className="text-5xl mb-6">💼</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">For Candidates</h3>
                            <p className="text-gray-600 mb-6">
                                Get affordable loans to switch jobs faster
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Loans from 10.5% interest rate</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Flexible EMI: 6, 12, or 24 months</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">24-48 hour approval</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Browse 500+ job openings</span>
                                </li>
                            </ul>
                            <Link to="/register?type=candidate" className="text-blue-600 hover:text-blue-700 font-medium">
                                Register as Candidate →
                            </Link>
                        </div>

                        {/* For NBFCs */}
                        <div className="card hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-100">
                            <div className="text-5xl mb-6">🏦</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900">For NBFCs</h3>
                            <p className="text-gray-600 mb-6">
                                New revenue stream with low-risk employment loans
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Pre-verified borrowers</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Lower default risk with employment backing</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Automated loan management</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-green-500 mt-1">✓</span>
                                    <span className="text-gray-700">Analytics and reporting dashboard</span>
                                </li>
                            </ul>
                            <Link to="/register?type=nbfc" className="text-blue-600 hover:text-blue-700 font-medium">
                                Register as NBFC →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Simple 4-step process to switch jobs faster
                        </p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                                    1
                                </div>
                                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-blue-200"></div>
                            </div>
                            <h4 className="font-bold text-xl mb-3 text-gray-900">Create Account</h4>
                            <p className="text-gray-600">
                                Sign up as a candidate, company, or NBFC. Complete your profile with necessary details.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                                    2
                                </div>
                                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-blue-200"></div>
                            </div>
                            <h4 className="font-bold text-xl mb-3 text-gray-900">Browse & Apply</h4>
                            <p className="text-gray-600">
                                Candidates browse jobs and apply. Companies review applications and make offers.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                                    3
                                </div>
                                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-blue-200"></div>
                            </div>
                            <h4 className="font-bold text-xl mb-3 text-gray-900">Get Loan Approved</h4>
                            <p className="text-gray-600">
                                Apply for buyout loan through our NBFC partners. Get approval within 24-48 hours.
                            </p>
                        </div>

                        <div className="text-center">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                                    4
                                </div>
                            </div>
                            <h4 className="font-bold text-xl mb-3 text-gray-900">Start New Job</h4>
                            <p className="text-gray-600">
                                Pay your current employer and join your new company immediately. Repay via EMI.
                            </p>
                        </div>
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/register" className="btn-primary text-lg px-8 py-4">
                            Start Your Journey
                        </Link>
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section id="benefits" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose 90toZero?</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            The fastest and most affordable way to switch jobs
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">⚡</span>
                            </div>
                            <h4 className="font-bold text-lg mb-2">Lightning Fast</h4>
                            <p className="text-gray-600 text-sm">24-48 hour approval process</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">💰</span>
                            </div>
                            <h4 className="font-bold text-lg mb-2">Affordable</h4>
                            <p className="text-gray-600 text-sm">Interest rates from 10.5% p.a.</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🔒</span>
                            </div>
                            <h4 className="font-bold text-lg mb-2">Secure</h4>
                            <p className="text-gray-600 text-sm">Bank-grade security & encryption</p>
                        </div>

                        <div className="text-center">
                            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-3xl">🎯</span>
                            </div>
                            <h4 className="font-bold text-lg mb-2">Transparent</h4>
                            <p className="text-gray-600 text-sm">No hidden fees or charges</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Calculator CTA */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Calculate Your Buyout Cost</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        See how much it will cost to buy out your notice period and the EMI breakdown
                    </p>
                    <Link to="/calculator" className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors">
                        Try Calculator
                    </Link>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                        <p className="text-xl text-gray-600">Got questions? We've got answers</p>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                                >
                                    <span className="font-semibold text-gray-900">{faq.q}</span>
                                    <span className="text-2xl text-gray-400">
                                        {activeFaq === index ? '−' : '+'}
                                    </span>
                                </button>
                                {activeFaq === index && (
                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                        <p className="text-gray-600">{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">
                        Ready to Make the Switch?
                    </h2>
                    <p className="text-xl text-gray-600 mb-8">
                        Join thousands of professionals who've switched jobs faster with 90toZero
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register" className="btn-primary text-lg px-8 py-4">
                            Get Started Free
                        </Link>
                        <Link to="/login" className="btn-secondary text-lg px-8 py-4">
                            Login to Your Account
                        </Link>
                    </div>
                    <p className="mt-6 text-sm text-gray-500">
                        No credit card required • Free to sign up • Cancel anytime
                    </p>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <div className="text-2xl font-bold mb-4">90toZero</div>
                            <p className="text-gray-400 text-sm">
                                The fastest way to switch jobs by eliminating notice period delays.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">For Users</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><Link to="/register" className="hover:text-white">Sign Up</Link></li>
                                <li><Link to="/login" className="hover:text-white">Login</Link></li>
                                <li><Link to="/calculator" className="hover:text-white">Calculator</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">About Us</a></li>
                                <li><a href="#" className="hover:text-white">Contact</a></li>
                                <li><a href="#" className="hover:text-white">Careers</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
                                <li><a href="#" className="hover:text-white">Cookie Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
                        <p>&copy; 2025 90toZero. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
