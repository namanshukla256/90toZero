const LogoMarquee = () => {
    const companies = [
        { name: 'TCS', logo: '/images/logos/companies/tcs.png' },
        { name: 'Infosys', logo: '/images/logos/companies/infosys.png' },
        { name: 'Wipro', logo: '/images/logos/companies/wipro.png' },
        { name: 'Accenture', logo: '/images/logos/companies/accenture.png' },
        { name: 'Deloitte', logo: '/images/logos/companies/deloitte.png' },
        { name: 'KPMG', logo: '/images/logos/companies/kpmg.png' },
        { name: 'EY', logo: '/images/logos/companies/ey.png' },
        { name: 'PwC', logo: '/images/logos/companies/pwc.png' },
        { name: 'Amazon', logo: '/images/logos/companies/amazon.png' },
        { name: 'Google', logo: '/images/logos/companies/google.png' },
        { name: 'Microsoft', logo: '/images/logos/companies/microsoft.png' },
        { name: 'Flipkart', logo: '/images/logos/companies/flipkart.png' },
        { name: 'Paytm', logo: '/images/logos/companies/paytm.png' },
        { name: 'Zomato', logo: '/images/logos/companies/zomato.png' },
        { name: 'Swiggy', logo: '/images/logos/companies/swiggy.png' },
    ];

    const industries = [
        { name: 'Technology', icon: '/images/icons/technology.svg' },
        { name: 'Consulting', icon: '/images/icons/consulting.svg' },
        { name: 'Finance', icon: '/images/icons/finance.svg' },
        { name: 'Healthcare', icon: '/images/icons/healthcare.svg' },
        { name: 'E-commerce', icon: '/images/icons/ecommerce.svg' },
        { name: 'Banking', icon: '/images/icons/banking.svg' },
        { name: 'Fintech', icon: '/images/icons/fintech.svg' },
        { name: 'Startups', icon: '/images/icons/startups.svg' },
    ];

    return (
        <section className="py-12 bg-gradient-to-r from-gray-50 via-blue-50 to-gray-50 overflow-hidden border-y border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <p className="text-sm font-semibold text-blue-600 mb-2">BUILDING FOR INDIA'S TOP PROFESSIONALS</p>
                    <h3 className="text-xl font-bold text-gray-900">Target Partners & Industries</h3>
                    <p className="text-sm text-gray-500 mt-2">Active discussions with leading companies and NBFCs</p>
                </div>

                {/* Companies Marquee */}
                <div className="relative mb-6">
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 via-blue-50 to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 via-blue-50 to-transparent z-10"></div>
                    
                    <div className="flex overflow-hidden">
                        <div className="flex animate-scroll-left">
                            {[...companies, ...companies].map((company, index) => (
                                <div
                                    key={`${company.name}-${index}`}
                                    className="flex-shrink-0 mx-6 px-8 py-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <img 
                                        src={company.logo} 
                                        alt={company.name}
                                        className="h-8 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                                        onError={(e) => {
                                            // Fallback to text if image not found
                                            e.currentTarget.style.display = 'none';
                                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                                        }}
                                    />
                                    <span className="hidden text-gray-700 font-semibold text-lg whitespace-nowrap">
                                        {company.name}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Industries Marquee */}
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 via-blue-50 to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 via-blue-50 to-transparent z-10"></div>
                    
                    <div className="flex overflow-hidden">
                        <div className="flex animate-scroll-right">
                            {[...industries, ...industries, ...industries].map((industry, index) => (
                                <div
                                    key={`${industry.name}-${index}`}
                                    className="flex-shrink-0 mx-4 px-5 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full border border-blue-200"
                                >
                                    <div className="flex items-center gap-2">
                                        <img 
                                            src={industry.icon} 
                                            alt={industry.name}
                                            className="w-5 h-5 object-contain"
                                        />
                                        <span className="text-blue-700 font-medium text-sm whitespace-nowrap">
                                            {industry.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="text-center mt-6">
                    <p className="text-xs text-gray-500">
                        * Target companies and industries. Partnerships under active development. 
                        <a href="/register?type=company" className="text-blue-600 hover:text-blue-700 underline ml-1">
                            Register your company
                        </a>
                    </p>
                </div>
            </div>

            <style>{`
                @keyframes scroll-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @keyframes scroll-right {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                .animate-scroll-left {
                    animation: scroll-left 30s linear infinite;
                }

                .animate-scroll-right {
                    animation: scroll-right 25s linear infinite;
                }

                .animate-scroll-left:hover,
                .animate-scroll-right:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default LogoMarquee;
