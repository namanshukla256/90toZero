import { Link } from 'react-router-dom';
import { useState } from 'react';
import FeatureCarousel from '../components/landing/FeatureCarousel';
import WhySection from '../components/landing/WhySection';
import HowItWorks from '../components/landing/HowItWorks';
import ThreeWayCarousel from '../components/landing/ThreeWayCarousel.tsx';
import LogoMarquee from '../components/landing/LogoMarquee';
import BetaTestimonials from '../components/landing/BetaTestimonials';
import SpeakWithUs from '../components/landing/SpeakWithUs';
import EnhancedNavbar from '../components/EnhancedNavbar';

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
            q: "Will this loan affect my CIBIL score?",
            a: "Checking eligibility doesn't impact your CIBIL score. However, once you formally apply, a credit inquiry will be made. Timely EMI payments will positively impact your credit score."
        },
        {
            q: "Can companies sponsor my buyout?",
            a: "Yes! Companies can fully or partially sponsor your buyout through our platform. Many forward-thinking companies use this to secure top talent faster. Ask your recruiter about sponsorship options."
        },
        {
            q: "What if my loan is rejected?",
            a: "Our platform shows you approval probability before applying. If rejected by one NBFC, you can apply to others. We also suggest alternative solutions like company sponsorship or negotiation support."
        },
        {
            q: "Is there any processing fee?",
            a: "Processing fees vary by NBFC partner, typically 1-2% of the loan amount. This will be clearly mentioned during the application process with no hidden charges."
        },
        {
            q: "Can I repay early without penalty?",
            a: "Most NBFC partners allow early repayment with minimal or no penalty. Check specific terms during application. Early repayment can save you significant interest costs."
        },
        {
            q: "What documents are required?",
            a: "You'll need: Current salary slips (3 months), offer letter from new company, bank statements (3 months), PAN card, Aadhaar, and current employment proof."
        },
        {
            q: "What happens if I don't join the new company?",
            a: "You're still responsible for repaying the loan. We recommend only applying once you're certain about joining. Consider company sponsorship options to reduce personal risk."
        }
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Enhanced Navbar */}
            <EnhancedNavbar />

            {/* Hero Section - Problem-Focused */}
            <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden pt-20">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute top-60 -left-40 w-96 h-96 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
                    <div className="max-w-5xl mx-auto text-center">
                        {/* Beta Badge */}
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-blue-200">
                            <span className="text-lg">🚀</span>
                            <span>Now in Beta - Helping India's Professionals</span>
                        </div>

                        {/* Headline - Problem First */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
                            Your Dream Job
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">Is Waiting</span>
                        </h1>

                        {/* The Problem Statement */}
                        <div className="relative inline-block mb-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-700 mb-2">
                                But <span className="text-red-600 relative">
                                    90 Days Notice Period
                                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 10" fill="none">
                                        <path d="M0 5 Q50 0, 100 5 T200 5" stroke="currentColor" strokeWidth="3" className="text-red-500"/>
                                    </svg>
                                </span>
                            </h2>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-700">
                                Stands in the Way
                            </h2>
                        </div>

                        {/* Problem Validation Stats */}
                        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-10 px-4">
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                                <div className="text-3xl font-black text-red-600 mb-1">45%</div>
                                <div className="text-sm text-gray-700 font-medium">Offers Withdrawn</div>
                            </div>
                            <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-4">
                                <div className="text-3xl font-black text-orange-600 mb-1">75</div>
                                <div className="text-sm text-gray-700 font-medium">Days Avg Wait</div>
                            </div>
                            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4">
                                <div className="text-3xl font-black text-red-600 mb-1">₹4.2L</div>
                                <div className="text-sm text-gray-700 font-medium">Opportunity Lost</div>
                            </div>
                        </div>

                        {/* Empathy Statement */}
                        <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                            We know the frustration. You've landed the perfect role, 
                            <span className="block mt-2 text-gray-900 font-semibold">
                                but your current company's rigid policy is holding you hostage.
                            </span>
                        </p>

                        {/* CTAs - Discovery Focused */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                            <a 
                                href="#problem" 
                                className="group relative bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 hover:shadow-xl inline-flex items-center justify-center gap-2"
                            >
                                <span>See How We Help</span>
                                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                            </a>
                            <Link 
                                to="/register" 
                                className="bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 font-bold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
                            >
                                <span>Join Beta Program</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </div>

                        {/* Trust Indicators - Problem Validation */}
                        <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">For IT, Finance & Consulting Professionals</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">Backed by RBI-Registered NBFCs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Logo Marquee - Social Proof */}
            <LogoMarquee />

            {/* Why 90toZero - Combined Problem + Solution */}
            <WhySection />

            {/* Feature Showcase Carousel */}
            <FeatureCarousel />

            {/* Platform Capabilities - Candidate-Focused */}
            <section id="features" className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            Your Complete Platform
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Everything You Need in One Place
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Find jobs with immediate joining, connect with sponsoring companies, access financing when needed
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Smart Job Board */}
                        <div className="group card hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-100">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-4xl">💼</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Job Board</h3>
                            <p className="text-gray-600 mb-4">
                                Browse roles from companies offering immediate joining support. Filter by sponsorship type and timeline.
                            </p>
                            <div className="inline-block bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                                Coming Soon
                            </div>
                        </div>

                        {/* Company Sponsorship */}
                        <div className="group card hover:shadow-2xl transition-all duration-300 border-2 border-blue-200 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-white">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-4xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Company Sponsorship Match</h3>
                            <p className="text-gray-600 mb-4">
                                Connect with companies willing to sponsor your buyout (full/partial). Win-win for everyone.
                            </p>
                            <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>Top Benefit</span>
                            </div>
                        </div>

                        {/* AI Job Matching */}
                        <div className="group card hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-100">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-4xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Matching</h3>
                            <p className="text-gray-600 mb-4">
                                Get matched with roles that fit your skills AND offer buyout support. Smart recommendations daily.
                            </p>
                            <div className="inline-block bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold">
                                Coming Soon
                            </div>
                        </div>

                        {/* Multi-NBFC Financing */}
                        <div className="group card hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-100">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-4xl">🏦</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Multi-NBFC Financing</h3>
                            <p className="text-gray-600 mb-4">
                                When you need financing, compare offers from multiple partners. Rates from 10.5% with 6-24 month terms.
                            </p>
                            <div className="text-lg font-bold text-blue-600">
                                From 10.5% p.a.
                            </div>
                        </div>

                        {/* Fast Timeline */}
                        <div className="group card hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-blue-100">
                            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 rounded-2xl mb-6 group-hover:scale-110 transition-transform">
                                <span className="text-4xl">⏱️</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">10-15 Day Timeline</h3>
                            <p className="text-gray-600 mb-4">
                                Platform handles everything: Job applications, sponsorships, financing. Start new role 80% faster.
                            </p>
                            <div className="text-sm text-gray-500">
                                vs 60-90 days traditional
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-16 text-center">
                        <Link 
                            to="/register" 
                            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 hover:shadow-xl"
                        >
                            <span>Join Beta Program</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <p className="mt-4 text-sm text-gray-500">
                            Early access • Shape the platform • Priority support
                        </p>
                    </div>
                </div>
            </section>

            {/* Partner Network & Trust Section */}
            <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Section Header */}
                    <div className="text-center mb-16">
                        <div className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                            🚀 Building Our Network
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                            Built for India's Growing Professionals
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Connecting top talent across industries with trusted financial partners
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 mb-16">
                        {/* Target Industries */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="text-3xl">🎯</span>
                                <span>Industries We Serve</span>
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">💻</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Technology & IT</div>
                                        <div className="text-xs text-gray-500">Software, Data, Cloud</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">📊</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Consulting</div>
                                        <div className="text-xs text-gray-500">Strategy, Advisory</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">💳</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Financial Services</div>
                                        <div className="text-xs text-gray-500">Banking, Fintech</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">🏥</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">Healthcare</div>
                                        <div className="text-xs text-gray-500">Pharma, MedTech</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                                    <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">🛍️</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">E-commerce</div>
                                        <div className="text-xs text-gray-500">Retail, Logistics</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors">
                                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                                        <span className="text-xl">✨</span>
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">More Industries</div>
                                        <div className="text-xs text-gray-500">Growing daily</div>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <p className="text-sm text-blue-900">
                                    <span className="font-semibold">Early Access Phase:</span> Actively building partnerships across industries. 
                                    <Link to="/register?type=company" className="text-blue-600 hover:text-blue-700 underline ml-1">
                                        Register your company
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Financial Partners & Trust Badges */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                <span className="text-3xl">🏦</span>
                                <span>NBFC Partners</span>
                            </h3>
                            
                            {/* Partnership Status */}
                            <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200">
                                <div className="flex items-start gap-3">
                                    <svg className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    <div>
                                        <div className="font-semibold text-gray-900 mb-1">Partnering with RBI Registered NBFCs</div>
                                        <div className="text-sm text-gray-600">We're in active discussions with multiple RBI-registered NBFC partners to bring you competitive loan options.</div>
                                    </div>
                                </div>
                            </div>

                            {/* Coming Soon Partners */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-700 font-medium">Partner Announcements</span>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">Coming Soon</span>
                                </div>
                                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <span className="text-gray-700 font-medium">Competitive Rate Offers</span>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-semibold">In Progress</span>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="border-t border-gray-200 pt-6">
                                <h4 className="font-semibold text-gray-900 mb-4">Security & Compliance</h4>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-900">256-bit SSL</div>
                                            <div className="text-xs text-gray-500">Encrypted</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-900">Secure Data</div>
                                            <div className="text-xs text-gray-500">Protected</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-900">RBI Compliant</div>
                                            <div className="text-xs text-gray-500">Partners</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                                        <svg className="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <div>
                                            <div className="text-xs font-semibold text-gray-900">Data Privacy</div>
                                            <div className="text-xs text-gray-500">Compliant</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* NBFC CTA */}
                            <div className="mt-6">
                                <Link 
                                    to="/register?type=nbfc" 
                                    className="block w-full text-center bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all"
                                >
                                    NBFC Partners: Join Our Network →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Trust Bar */}
                    <div className="bg-white rounded-xl p-6 shadow-lg">
                        <div className="flex flex-wrap items-center justify-center gap-8 text-center">
                            <div>
                                <div className="text-2xl font-bold text-blue-600 mb-1">Secure Platform</div>
                                <div className="text-sm text-gray-600">Bank-grade encryption</div>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-gray-300"></div>
                            <div>
                                <div className="text-2xl font-bold text-blue-600 mb-1">RBI Registered</div>
                                <div className="text-sm text-gray-600">NBFC partners only</div>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-gray-300"></div>
                            <div>
                                <div className="text-2xl font-bold text-blue-600 mb-1">Transparent Terms</div>
                                <div className="text-sm text-gray-600">No hidden charges</div>
                            </div>
                            <div className="hidden md:block w-px h-12 bg-gray-300"></div>
                            <div>
                                <div className="text-2xl font-bold text-blue-600 mb-1">Data Protected</div>
                                <div className="text-sm text-gray-600">Your privacy guaranteed</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Three-Way Ecosystem - Simplified Carousel */}
            <ThreeWayCarousel />

            {/* Beta Testimonials */}
            <BetaTestimonials />

            {/* How It Works - Enhanced Timeline */}
            <HowItWorks />

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

            {/* Speak With Us - Consultation */}
            <SpeakWithUs />

            {/* FAQ Section */}
            <section id="faq" className="py-20 bg-white">
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
            <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                </div>
                
                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
                        🎯 Beta Access Open
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Ready to Switch Jobs 80% Faster?
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Join India's first career acceleration platform. Find sponsoring companies and start your new role in 10-15 days.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                        <Link 
                            to="/register" 
                            className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-bold px-8 py-4 rounded-lg text-lg hover:bg-blue-50 transition-all hover:scale-105 shadow-xl"
                        >
                            <span>Join Beta Program</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                        <Link 
                            to="/login" 
                            className="inline-flex items-center justify-center gap-2 bg-transparent text-white font-bold px-8 py-4 rounded-lg text-lg border-2 border-white hover:bg-white/10 transition-all"
                        >
                            <span>Sign In</span>
                        </Link>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Free to join</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-300" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Shape the platform</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                        {/* Brand Column */}
                        <div className="lg:col-span-2">
                            <div className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                90toZero
                            </div>
                            <p className="text-gray-400 text-sm mb-6 max-w-md">
                                India's first career acceleration platform. Switch jobs 80% faster by eliminating notice period delays through smart financing and company sponsorships.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                                    <span className="text-xl">𝕏</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                                    <span className="text-xl">in</span>
                                </a>
                                <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors">
                                    <span className="text-xl">📧</span>
                                </a>
                            </div>
                        </div>

                        {/* Platform Column */}
                        <div>
                            <h4 className="font-semibold mb-4 text-lg">Platform</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><Link to="/register" className="hover:text-white transition-colors">For Candidates</Link></li>
                                <li><Link to="/register" className="hover:text-white transition-colors">For Companies</Link></li>
                                <li><Link to="/register" className="hover:text-white transition-colors">For NBFCs</Link></li>
                                <li><Link to="/calculator" className="hover:text-white transition-colors">Buyout Calculator</Link></li>
                                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                            </ul>
                        </div>

                        {/* Resources Column */}
                        <div>
                            <h4 className="font-semibold mb-4 text-lg">Resources</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Success Stories</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                            </ul>
                        </div>

                        {/* Company Column */}
                        <div>
                            <h4 className="font-semibold mb-4 text-lg">Company</h4>
                            <ul className="space-y-3 text-sm text-gray-400">
                                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Partner with Us</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-gray-800 pt-8">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <div className="text-sm text-gray-400">
                                <p>&copy; 2025 90toZero. All rights reserved.</p>
                            </div>
                            <div className="flex gap-6 text-sm text-gray-400">
                                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                                <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                                <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
                            </div>
                        </div>
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500">
                                🚀 <span className="text-blue-400">Beta Launch</span> • Building the future of job switching in India
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
