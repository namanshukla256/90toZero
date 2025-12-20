import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const ThreeWayCarousel = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
                <div className="absolute top-40 -left-20 w-96 h-96 bg-blue-200 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 -right-20 w-96 h-96 bg-purple-200 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                        🤝 Three-Way Ecosystem
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Built for Everyone in the Hiring Ecosystem
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        See how our platform creates value for candidates, companies, and financial institutions
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
                        className="three-way-carousel pb-12"
                    >
                        {/* Slide 1: For Candidates - Job Dashboard */}
                        <SwiperSlide>
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="p-8 md:p-12">
                                        <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                            FOR JOB SEEKERS
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                            Find Jobs with Immediate Joining
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-6">
                                            Browse opportunities from companies offering buyout sponsorship. Filter by sponsorship type, industry, and role level.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-3">
                                                <span className="text-blue-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700"><strong>Smart Job Board:</strong> Filter by sponsorship (Full/Partial/Facilitation)</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-blue-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700"><strong>Industry Focus:</strong> Tech, Finance, Consulting, Healthcare, E-commerce</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-blue-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700"><strong>AI Matching:</strong> Get personalized role recommendations daily</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-blue-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700"><strong>Financing Support:</strong> Compare multiple NBFC offers (10.5% from)</span>
                                            </li>
                                        </ul>
                                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                                            <p className="text-sm font-semibold text-gray-900">
                                                🎯 <span className="text-blue-700">Start immediately</span> instead of waiting months in notice period
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 md:p-12 h-full flex items-center justify-center min-h-[500px]">
                                        {/* Job Dashboard Mockup */}
                                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                                            <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                                <span className="ml-2 text-sm font-semibold text-gray-700">Job Dashboard</span>
                                            </div>
                                            
                                            <div className="space-y-3">
                                                {/* Job 1 - Full Sponsorship */}
                                                <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <div className="font-bold text-gray-900">Senior Backend Engineer</div>
                                                            <div className="text-sm text-gray-600">Tech Startup • Bangalore</div>
                                                        </div>
                                                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full">100% Sponsored</span>
                                                    </div>
                                                    <div className="text-lg font-bold text-gray-900 mb-1">₹25-35L CTC</div>
                                                    <div className="text-xs text-green-700">🎉 Company pays full buyout • Join in 2 weeks</div>
                                                </div>

                                                {/* Job 2 - Partial Sponsorship */}
                                                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <div className="font-bold text-gray-900">Product Manager</div>
                                                            <div className="text-sm text-gray-600">Fintech • Mumbai</div>
                                                        </div>
                                                        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-full">50% Sponsored</span>
                                                    </div>
                                                    <div className="text-lg font-bold text-gray-900 mb-1">₹30-40L CTC</div>
                                                    <div className="text-xs text-blue-700">💰 Company pays ₹1.5L • Low EMI for you</div>
                                                </div>

                                                {/* Job 3 - Facilitation */}
                                                <div className="bg-gray-50 border border-gray-300 rounded-lg p-4">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <div className="font-bold text-gray-900">Tech Lead</div>
                                                            <div className="text-sm text-gray-600">Consulting • Hyderabad</div>
                                                        </div>
                                                        <span className="bg-gray-600 text-white text-xs px-2 py-1 rounded-full">Facilitation</span>
                                                    </div>
                                                    <div className="text-lg font-bold text-gray-900 mb-1">₹28-38L CTC</div>
                                                    <div className="text-xs text-gray-700">🏦 Access best loan rates • Platform support</div>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-3 border-t text-center">
                                                <div className="text-xs text-gray-500">152 more jobs with buyout support</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Slide 2: For Companies - Hiring Dashboard */}
                        <SwiperSlide>
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="p-8 md:p-12">
                                        <div className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                            FOR COMPANIES
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                            Hire Top Talent Without Delays
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-6">
                                            Post jobs with buyout sponsorship options. Close candidates faster by removing the biggest hiring friction - notice periods.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-3">
                                                <span className="text-green-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700"><strong>Flexible Sponsorship:</strong> Choose Full (100%), Partial (50-70%), or Facilitation-only models</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-green-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700"><strong>Instant Hiring:</strong> Candidates can join within weeks instead of months</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-green-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700"><strong>Win Talent Wars:</strong> 45% of offers fail due to notice periods - eliminate this risk</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-green-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700"><strong>Industry Agnostic:</strong> Works for Tech, BFSI, Consulting, Healthcare, Retail</span>
                                            </li>
                                        </ul>
                                        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                                            <p className="text-sm font-semibold text-gray-900">
                                                🏆 <span className="text-green-700">Save ₹1-3L per hire</span> by sponsoring vs losing candidates
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8 md:p-12 h-full flex items-center justify-center min-h-[500px]">
                                        {/* Company Dashboard Mockup */}
                                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                                            <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                                <span className="ml-2 text-sm font-semibold text-gray-700">Sponsorship Dashboard</span>
                                            </div>
                                            
                                            <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                                                <div className="bg-blue-50 p-2 rounded">
                                                    <div className="text-2xl font-bold text-blue-600">12</div>
                                                    <div className="text-xs text-gray-600">Active Jobs</div>
                                                </div>
                                                <div className="bg-green-50 p-2 rounded">
                                                    <div className="text-2xl font-bold text-green-600">87</div>
                                                    <div className="text-xs text-gray-600">Applications</div>
                                                </div>
                                                <div className="bg-purple-50 p-2 rounded">
                                                    <div className="text-2xl font-bold text-purple-600">18d</div>
                                                    <div className="text-xs text-gray-600">Avg Hire Time</div>
                                                </div>
                                            </div>

                                            <div className="text-xs font-semibold text-gray-700 mb-3">Pending Buyout Requests</div>
                                            <div className="space-y-3">
                                                {/* Request 1 */}
                                                <div className="border border-gray-200 rounded-lg p-3">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <div className="font-bold text-sm text-gray-900">Priya S. → Backend Eng</div>
                                                            <div className="text-xs text-gray-600">60 days notice • ₹2.1L buyout</div>
                                                        </div>
                                                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">NEW</span>
                                                    </div>
                                                    <div className="flex gap-2 mt-2">
                                                        <button className="flex-1 bg-green-600 text-white text-xs py-2 rounded font-semibold">
                                                            Approve (100%)
                                                        </button>
                                                        <button className="flex-1 bg-blue-600 text-white text-xs py-2 rounded font-semibold">
                                                            Partial (50%)
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Request 2 */}
                                                <div className="border border-gray-200 rounded-lg p-3">
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div>
                                                            <div className="font-bold text-sm text-gray-900">Rahul K. → Product Mgr</div>
                                                            <div className="text-xs text-gray-600">90 days notice • ₹3.2L buyout</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 mt-2">
                                                        <button className="flex-1 bg-green-600 text-white text-xs py-2 rounded font-semibold">
                                                            Approve (100%)
                                                        </button>
                                                        <button className="flex-1 bg-blue-600 text-white text-xs py-2 rounded font-semibold">
                                                            Partial (70%)
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-3 border-t text-center">
                                                <div className="text-xs text-gray-500">Save ₹5.3L by preventing offer withdrawals</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>

                        {/* Slide 3: For NBFCs - Portfolio Dashboard */}
                        <SwiperSlide>
                            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                                <div className="grid md:grid-cols-2 gap-8 items-center">
                                    <div className="p-8 md:p-12">
                                        <div className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                            FOR NBFCs
                                        </div>
                                        <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                            Premium Loan Portfolio with Lower Risk
                                        </h3>
                                        <p className="text-lg text-gray-600 mb-6">
                                            Access pre-verified salaried professionals with stable employment. Lower default rates, better returns, automated processing.
                                        </p>
                                        <ul className="space-y-3 mb-6">
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700"><strong>Pre-Verified Borrowers:</strong> Employment, salary, and credit profiles verified</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700"><strong>Lower Default Risk:</strong> 0.5-1% expected vs 3-5% personal loans</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700"><strong>Quality Ticket Size:</strong> ₹2-4L average, 6-24 month tenure</span>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <span className="text-purple-600 font-bold text-xl">✓</span>
                                                <span className="text-gray-700"><strong>Automated Processing:</strong> Digital underwriting, e-KYC, instant disbursement</span>
                                            </li>
                                        </ul>
                                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                                            <p className="text-sm font-semibold text-gray-900">
                                                💎 <span className="text-purple-700">RBI registration required</span> to join partner network
                                            </p>
                                        </div>
                                    </div>
                                    <div className="bg-gradient-to-br from-purple-100 to-pink-100 p-8 md:p-12 h-full flex items-center justify-center min-h-[500px]">
                                        {/* NBFC Portfolio Dashboard Mockup */}
                                        <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                                            <div className="flex items-center gap-2 mb-4 pb-3 border-b">
                                                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                                                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                                                <div className="w-3 h-3 rounded-full bg-green-400"></div>
                                                <span className="ml-2 text-sm font-semibold text-gray-700">Partner Portal</span>
                                            </div>
                                            
                                            <div className="mb-4 grid grid-cols-3 gap-2 text-center">
                                                <div className="bg-purple-50 p-2 rounded">
                                                    <div className="text-2xl font-bold text-purple-600">₹42L</div>
                                                    <div className="text-xs text-gray-600">Portfolio Value</div>
                                                </div>
                                                <div className="bg-green-50 p-2 rounded">
                                                    <div className="text-2xl font-bold text-green-600">0.8%</div>
                                                    <div className="text-xs text-gray-600">Default Rate</div>
                                                </div>
                                                <div className="bg-blue-50 p-2 rounded">
                                                    <div className="text-2xl font-bold text-blue-600">156</div>
                                                    <div className="text-xs text-gray-600">Active Loans</div>
                                                </div>
                                            </div>

                                            <div className="text-xs font-semibold text-gray-700 mb-3">Recent Applications</div>
                                            <div className="space-y-2">
                                                {/* Application 1 - Verified */}
                                                <div className="bg-green-50 border border-green-300 rounded-lg p-3">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <div>
                                                            <div className="font-bold text-sm text-gray-900">Amit P. • SWE → Sr SWE</div>
                                                            <div className="text-xs text-gray-600">₹2.4L • 12M • CTC: ₹18L → ₹25L</div>
                                                        </div>
                                                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">Verified</span>
                                                    </div>
                                                    <div className="text-xs text-green-700">Credit: 782 • TCS → Startup</div>
                                                </div>

                                                {/* Application 2 - Pending */}
                                                <div className="border border-gray-200 rounded-lg p-3">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <div>
                                                            <div className="font-bold text-sm text-gray-900">Neha S. • PM</div>
                                                            <div className="text-xs text-gray-600">₹3.1L • 18M • CTC: ₹32L</div>
                                                        </div>
                                                        <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">Pending</span>
                                                    </div>
                                                    <div className="text-xs text-gray-600">Credit: 741 • Fintech → BFSI</div>
                                                </div>

                                                {/* Application 3 - Reviewing */}
                                                <div className="border border-gray-200 rounded-lg p-3">
                                                    <div className="flex justify-between items-start mb-1">
                                                        <div>
                                                            <div className="font-bold text-sm text-gray-900">Rajesh M. • Consultant</div>
                                                            <div className="text-xs text-gray-600">₹1.8L • 12M • CTC: ₹22L</div>
                                                        </div>
                                                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">Reviewing</span>
                                                    </div>
                                                    <div className="text-xs text-gray-600">Credit: 698 • Consulting</div>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-3 border-t text-center">
                                                <div className="text-xs text-gray-500">24 more applications this week</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>

                    {/* Custom Navigation Arrows */}
                    <div className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-110 hidden md:block">
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </div>
                    <div className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-xl hover:shadow-2xl transition-all cursor-pointer hover:scale-110 hidden md:block">
                        <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ThreeWayCarousel;
