import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const FeatureCarousel = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        ⚡ What Makes Us Different
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Platform Features That Set Us Apart
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Not just another loan platform. See the intelligent features that make job switching faster and smarter.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={{
                            nextEl: '.swiper-button-next-custom',
                            prevEl: '.swiper-button-prev-custom',
                        }}
                        pagination={{ 
                            clickable: true,
                            bulletActiveClass: 'swiper-pagination-bullet-active',
                        }}
                        autoplay={{
                            delay: 7000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        loop={true}
                        className="feature-carousel pb-12"
                    >
                        {/* Slide 1: Smart Multi-NBFC Comparison Engine */}
                        <SwiperSlide>
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="p-8 md:p-12">
                                        <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                            COMPARISON ENGINE
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                            Smart Multi-NBFC Comparison
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-6">
                                            One application → Multiple competitive offers. Our intelligent matching engine connects you with the best NBFC partners for your profile.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-3">
                                                <span className="text-green-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Compare interest rates, processing fees & tenure options</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-green-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Single credit inquiry for all applications</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-green-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Real-time approval timelines from each partner</span>
                                            </li>
                                        </ul>
                                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                                            <p className="text-sm font-semibold text-gray-900">
                                                💡 <span className="text-green-700">Best rates guaranteed</span> - Get the most competitive deal
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8 md:p-12 h-full flex items-center justify-center min-h-[500px]">
                                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                                            <div className="text-sm font-semibold text-gray-700 mb-4">Comparison Results for ₹2.5L Loan</div>
                                            <div className="space-y-3">
                                                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-bold text-gray-900">NBFC Partner A</span>
                                                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">Best Rate</span>
                                                    </div>
                                                    <div className="text-2xl font-bold text-green-600 mb-1">10.5% p.a.</div>
                                                    <div className="text-sm text-gray-600">EMI: ₹22,100/mo • 12M • Fee: 1%</div>
                                                </div>
                                                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-bold text-gray-900">NBFC Partner B</span>
                                                    </div>
                                                    <div className="text-2xl font-bold text-gray-700 mb-1">12.5% p.a.</div>
                                                    <div className="text-sm text-gray-600">EMI: ₹22,450/mo • 12M • Fee: 2%</div>
                                                </div>
                                                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-bold text-gray-900">NBFC Partner C</span>
                                                    </div>
                                                    <div className="text-2xl font-bold text-gray-700 mb-1">14.0% p.a.</div>
                                                    <div className="text-sm text-gray-600">EMI: ₹22,800/mo • 12M • Fee: 1.5%</div>
                                                </div>
                                            </div>
                                            <div className="mt-4 text-center text-sm text-gray-500">
                                                💰 Save ₹8,400 by choosing the best offer
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Slide 2: Instant Pre-Approval Simulator */}
                        <SwiperSlide>
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="p-8 md:p-12">
                                        <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                            AI POWERED
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                            Instant Pre-Approval Simulator
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-6">
                                            Know your chances before you apply. Our AI analyzes your profile and predicts approval probability with each NBFC partner.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-3">
                                                <span className="text-blue-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Zero CIBIL score impact before application</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-blue-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">AI checks CTC, employer reputation & credit profile</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-blue-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Get approval probability in 30 seconds</span>
                                            </li>
                                        </ul>
                                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                                            <p className="text-sm font-semibold text-gray-900">
                                                🎯 <span className="text-blue-700">Apply with confidence</span> - No surprise rejections
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 md:p-12 h-full flex items-center justify-center min-h-[500px]">
                                        <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
                                            <div className="text-center mb-6">
                                                <div className="text-sm font-semibold text-gray-700 mb-4">Your Approval Probability</div>
                                                <div className="relative w-48 h-48 mx-auto">
                                                    <svg className="transform -rotate-90 w-48 h-48">
                                                        <circle cx="96" cy="96" r="80" stroke="#e5e7eb" strokeWidth="16" fill="none" />
                                                        <circle cx="96" cy="96" r="80" stroke="#2563eb" strokeWidth="16" fill="none"
                                                            strokeDasharray="502.4" strokeDashoffset="75.36" strokeLinecap="round" />
                                                    </svg>
                                                    <div className="absolute inset-0 flex items-center justify-center">
                                                        <div className="text-center">
                                                            <div className="text-5xl font-bold text-blue-600">87%</div>
                                                            <div className="text-sm text-gray-600">Likely</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">✓ CTC Range</span>
                                                    <span className="font-semibold text-green-600">Excellent</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">✓ Employer Rating</span>
                                                    <span className="font-semibold text-green-600">Verified</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">✓ Credit Profile</span>
                                                    <span className="font-semibold text-green-600">Good</span>
                                                </div>
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="text-gray-600">✓ Documentation</span>
                                                    <span className="font-semibold text-yellow-600">Pending</span>
                                                </div>
                                            </div>
                                            <button className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
                                                Proceed with Application
                                            </button>
                                            <p className="text-xs text-center text-gray-500 mt-3">
                                                No CIBIL impact until you submit
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Slide 3: Intelligent EMI Optimizer */}
                        <SwiperSlide>
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="p-8 md:p-12">
                                        <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                            SMART PLANNING
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                            Intelligent EMI Optimizer
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-6">
                                            Customize your repayment to match your new salary. Visualize different scenarios and optimize for lowest total interest.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Adjust tenure and see total interest instantly</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Calculate savings on early repayment</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Balloon payment options for future bonuses</span>
                                            </li>
                                        </ul>
                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                                            <p className="text-sm font-semibold text-gray-900">
                                                📊 <span className="text-purple-700">Smart recommendations</span> - ₹2.5L loan → Save ₹15K by optimizing
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 md:p-12 h-full flex items-center justify-center min-h-[500px]">
                                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                                            <div className="text-sm font-semibold text-gray-700 mb-4">Optimize Your EMI</div>
                                            <div className="mb-6">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-600">Tenure</span>
                                                    <span className="font-semibold text-gray-900">12 months</span>
                                                </div>
                                                <input type="range" min="6" max="24" defaultValue="12" className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer" />
                                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                    <span>6m</span>
                                                    <span>12m</span>
                                                    <span>24m</span>
                                                </div>
                                            </div>
                                            <div className="bg-gradient-to-r from-purple-50 to-white rounded-lg p-4 mb-4 border-2 border-purple-200">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="text-sm text-gray-600">Monthly EMI</span>
                                                    <span className="text-2xl font-bold text-purple-600">₹22,100</span>
                                                </div>
                                                <div className="flex justify-between items-center text-sm">
                                                    <span className="text-gray-600">Total Interest</span>
                                                    <span className="font-semibold text-gray-900">₹15,200</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2 mb-4">
                                                <div className="bg-gray-50 rounded-lg p-3 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">6 months tenure</span>
                                                        <span className="text-green-600 font-semibold">Save ₹8,500</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500">EMI: ₹42,800/mo</div>
                                                </div>
                                                <div className="bg-gray-50 rounded-lg p-3 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">24 months tenure</span>
                                                        <span className="text-red-600 font-semibold">+₹12,400 interest</span>
                                                    </div>
                                                    <div className="text-xs text-gray-500">EMI: ₹11,800/mo</div>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="flex-1 bg-white border-2 border-purple-600 text-purple-600 font-semibold py-2 rounded-lg text-sm hover:bg-purple-50 transition-colors">
                                                    Add Bonus Payment
                                                </button>
                                                <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg text-sm transition-colors">
                                                    Apply Plan
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Slide 4: Company Buyout Sponsorship Portal */}
                        <SwiperSlide>
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="p-8 md:p-12">
                                        <div className="inline-block bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                            FOR COMPANIES
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                            Buyout Sponsorship Portal
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-6">
                                            Win talent wars by removing the biggest hiring friction. Companies can partially or fully sponsor candidate buyouts.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-3">
                                                <span className="text-orange-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Set flexible sponsorship budgets & policies</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-orange-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Approve candidates with one click</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-orange-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Track ROI on faster hiring & reduced dropouts</span>
                                            </li>
                                        </ul>
                                        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-4 rounded-lg border border-orange-200">
                                            <p className="text-sm font-semibold text-gray-900">
                                                🏆 <span className="text-orange-700">Game changer</span> - "Your top candidate has 90 days notice? Not anymore."
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-orange-100 to-yellow-100 p-8 md:p-12 h-full flex items-center justify-center min-h-[500px]">
                                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="text-sm font-semibold text-gray-700">Sponsorship Requests</div>
                                                <span className="bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full font-semibold">3 Pending</span>
                                            </div>
                                            <div className="space-y-4">
                                                <div className="border-2 border-orange-200 bg-orange-50 rounded-lg p-4">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <div className="font-bold text-gray-900">Priya Sharma</div>
                                                            <div className="text-xs text-gray-600">Senior Frontend Developer</div>
                                                        </div>
                                                        <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">Urgent</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                                                        <div>
                                                            <div className="text-gray-600 text-xs">Buyout Amount</div>
                                                            <div className="font-semibold text-gray-900">₹2.8L</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-gray-600 text-xs">Notice Period</div>
                                                            <div className="font-semibold text-gray-900">90 days</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                                                            Sponsor 100%
                                                        </button>
                                                        <button className="flex-1 bg-white border border-orange-300 text-orange-700 text-sm font-semibold py-2 rounded-lg hover:bg-orange-50 transition-colors">
                                                            Sponsor 50%
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className="border border-gray-200 rounded-lg p-4">
                                                    <div className="flex items-start justify-between mb-3">
                                                        <div>
                                                            <div className="font-bold text-gray-900">Rahul Verma</div>
                                                            <div className="text-xs text-gray-600">Product Manager</div>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-gray-600 mb-3">
                                                        Buyout: ₹3.2L • 60 days notice
                                                    </div>
                                                    <button className="w-full bg-gray-100 text-gray-700 text-sm font-semibold py-2 rounded-lg hover:bg-gray-200 transition-colors">
                                                        Review Application
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-4 pt-4 border-t border-gray-200">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-600">Monthly Budget Used</span>
                                                    <span className="font-semibold text-gray-900">₹4.5L / ₹10L</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                                    <div className="bg-orange-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Slide 5: Real-Time Application Tracking */}
                        <SwiperSlide>
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="p-8 md:p-12">
                                        <div className="inline-block bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                            FULL TRANSPARENCY
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                            Real-Time Application Tracking
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-6">
                                            No black box. Know exactly where your application stands with live status updates and estimated timelines.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-3">
                                                <span className="text-teal-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Track application status with each NBFC partner</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-teal-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Real-time notifications on status changes</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-teal-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Estimated approval & disbursement dates</span>
                                            </li>
                                        </ul>
                                        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-200">
                                            <p className="text-sm font-semibold text-gray-900">
                                                📱 <span className="text-teal-700">Always informed</span> - SMS & email updates at every step
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-teal-100 to-cyan-100 p-8 md:p-12 h-full flex items-center justify-center min-h-[500px]">
                                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                                            <div className="flex items-center justify-between mb-6">
                                                <div className="text-sm font-semibold text-gray-700">Application #BYT-45821</div>
                                                <span className="bg-yellow-100 text-yellow-700 text-xs px-3 py-1 rounded-full font-semibold">In Review</span>
                                            </div>
                                            <div className="relative">
                                                {/* Timeline */}
                                                <div className="space-y-6">
                                                    <div className="flex gap-4">
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                                                            <div className="w-0.5 h-12 bg-green-600"></div>
                                                        </div>
                                                        <div className="flex-1 pt-1">
                                                            <div className="font-semibold text-gray-900">Application Submitted</div>
                                                            <div className="text-xs text-gray-500">Dec 18, 2:30 PM</div>
                                                            <div className="text-sm text-gray-600 mt-1">Documents uploaded successfully</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
                                                            <div className="w-0.5 h-12 bg-green-600"></div>
                                                        </div>
                                                        <div className="flex-1 pt-1">
                                                            <div className="font-semibold text-gray-900">Document Verification</div>
                                                            <div className="text-xs text-gray-500">Dec 19, 11:00 AM</div>
                                                            <div className="text-sm text-gray-600 mt-1">All documents verified ✓</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                                                                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                                            </div>
                                                            <div className="w-0.5 h-12 bg-gray-300"></div>
                                                        </div>
                                                        <div className="flex-1 pt-1">
                                                            <div className="font-semibold text-gray-900">NBFC Credit Review</div>
                                                            <div className="text-xs text-yellow-700 font-semibold">In Progress</div>
                                                            <div className="text-sm text-gray-600 mt-1">Est. completion: Dec 20, 5:00 PM</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm">4</div>
                                                            <div className="w-0.5 h-12 bg-gray-300"></div>
                                                        </div>
                                                        <div className="flex-1 pt-1">
                                                            <div className="font-semibold text-gray-500">Final Approval</div>
                                                            <div className="text-xs text-gray-400">Pending</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-4">
                                                        <div className="flex flex-col items-center">
                                                            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm">5</div>
                                                        </div>
                                                        <div className="flex-1 pt-1">
                                                            <div className="font-semibold text-gray-500">Loan Disbursement</div>
                                                            <div className="text-xs text-gray-400">Pending</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Slide 6: Automated Document Intelligence */}
                        <SwiperSlide>
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="p-8 md:p-12">
                                        <div className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                            AI VERIFICATION
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                            Automated Document Intelligence
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-6">
                                            Smart document verification in minutes, not days. AI extracts data, verifies authenticity, and flags issues instantly.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-3">
                                                <span className="text-indigo-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Auto-extract salary from payslips & offer letters</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-indigo-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Verify authenticity & detect discrepancies</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-indigo-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700">Upload once, apply to multiple NBFCs</span>
                                            </li>
                                        </ul>
                                        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 rounded-lg border border-indigo-200">
                                            <p className="text-sm font-semibold text-gray-900">
                                                ⚡ <span className="text-indigo-700">10x faster</span> - Upload once. Verified instantly. Applied everywhere.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-8 md:p-12 h-full flex items-center justify-center min-h-[500px]">
                                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                                            <div className="text-sm font-semibold text-gray-700 mb-4">Document Verification Status</div>
                                            <div className="space-y-4">
                                                <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl">📄</span>
                                                            <span className="font-semibold text-gray-900">Salary Slips (3)</span>
                                                        </div>
                                                        <span className="text-green-600 font-bold">✓</span>
                                                    </div>
                                                    <div className="text-xs text-green-700 font-semibold mb-1">Verified in 12 seconds</div>
                                                    <div className="text-sm text-gray-700 bg-white rounded p-2 mt-2">
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Avg. Monthly Salary:</span>
                                                            <span className="font-semibold">₹85,000</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl">💼</span>
                                                            <span className="font-semibold text-gray-900">Offer Letter</span>
                                                        </div>
                                                        <span className="text-green-600 font-bold">✓</span>
                                                    </div>
                                                    <div className="text-xs text-green-700 font-semibold mb-1">Verified in 8 seconds</div>
                                                    <div className="text-sm text-gray-700 bg-white rounded p-2 mt-2">
                                                        <div className="flex justify-between mb-1">
                                                            <span className="text-gray-600">New CTC:</span>
                                                            <span className="font-semibold">₹18 LPA</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-600">Company:</span>
                                                            <span className="font-semibold">TechCorp India</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-2xl">🏦</span>
                                                            <span className="font-semibold text-gray-900">Bank Statements</span>
                                                        </div>
                                                        <span className="text-green-600 font-bold">✓</span>
                                                    </div>
                                                    <div className="text-xs text-green-700 font-semibold">Verified in 15 seconds</div>
                                                </div>
                                            </div>
                                            <div className="mt-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-4 text-center">
                                                <div className="text-sm font-semibold mb-1">All Documents Verified ✓</div>
                                                <div className="text-xs opacity-90">Ready to submit to NBFCs</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    {/* Custom Navigation Buttons */}
                    <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                {/* Bottom CTA */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">Ready to experience these features?</p>
                    <Link 
                        to="/register" 
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all hover:scale-105 hover:shadow-2xl"
                    >
                        Join Beta Program
                        <span className="text-2xl">🚀</span>
                    </Link>
                    <p className="mt-3 text-sm text-gray-500">
                        <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-semibold mr-2">BETA ACCESS</span>
                        Be among the first to use these features
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FeatureCarousel;
