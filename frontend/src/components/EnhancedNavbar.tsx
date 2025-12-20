import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '../store';

const EnhancedNavbar = () => {
    const { user, logout } = useAuthStore();
    const location = useLocation();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showResourcesDropdown, setShowResourcesDropdown] = useState(false);
    const [showCompanyDropdown, setShowCompanyDropdown] = useState(false);

    const isHomePage = location.pathname === '/';

    // Smooth scroll handler
    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = 80;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false);
        }
    };

    // Scroll position tracking
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Active section detection
            if (isHomePage) {
                const sections = ['features', 'how-it-works', 'benefits'];
                const scrollPosition = window.scrollY + 120;

                for (const sectionId of sections) {
                    const element = document.getElementById(sectionId);
                    if (element) {
                        const offsetTop = element.offsetTop;
                        const offsetBottom = offsetTop + element.offsetHeight;

                        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                            setActiveSection(sectionId);
                            break;
                        }
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (!target.closest('.user-menu')) {
                setShowUserMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
    };

    const navLinks = [
        { id: 'features', label: 'Features', isSection: true },
        { id: 'how-it-works', label: 'How It Works', isSection: true },
        { id: 'calculator', label: 'Calculator', path: '/calculator', isSection: false },
    ];

    const resourcesLinks = [
        { label: 'Blog', path: '#', icon: '📝', comingSoon: true },
        { label: 'Success Stories', path: '#', icon: '🎉', comingSoon: true },
        { label: 'Help Center', path: '#', icon: '❓', comingSoon: true },
        { label: 'FAQs', path: '/#faq', icon: '💬', comingSoon: false },
    ];

    const companyLinks = [
        { label: 'About Us', path: '#', icon: '🏢', comingSoon: true },
        { label: 'Careers', path: '#', icon: '💼', comingSoon: true },
        { label: 'Contact', path: '/#speak-with-us', icon: '📞', comingSoon: false },
        { label: 'Partner with Us', path: '/register?type=company', icon: '🤝', comingSoon: false },
    ];

    return (
        <>
            <motion.nav
                initial={{ y: 0 }}
                animate={{
                    backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
                    backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
                    boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 0 0 0 rgba(0, 0, 0, 0)',
                }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/50"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center" style={{ height: isScrolled ? '64px' : '80px', transition: 'height 0.3s ease' }}>
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2 group">
                            <motion.span
                                whileHover={{ scale: 1.05 }}
                                className="text-2xl font-bold text-blue-600"
                            >
                                90toZero
                            </motion.span>
                            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded font-semibold">
                                BETA
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-8">
                            {isHomePage && navLinks.filter(link => link.isSection).map((link) => (
                                <button
                                    key={link.id}
                                    onClick={() => scrollToSection(link.id)}
                                    className={`relative text-sm font-medium transition-colors ${
                                        activeSection === link.id
                                            ? 'text-blue-600'
                                            : 'text-gray-700 hover:text-blue-600'
                                    }`}
                                >
                                    {link.label}
                                    {activeSection === link.id && (
                                        <motion.div
                                            layoutId="activeSection"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </button>
                            ))}
                            {navLinks.filter(link => !link.isSection).map((link) => (
                                <Link
                                    key={link.id}
                                    to={link.path!}
                                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Resources Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setShowResourcesDropdown(true)}
                                onMouseLeave={() => setShowResourcesDropdown(false)}
                            >
                                <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                                    Resources
                                    <svg className={`w-4 h-4 transition-transform ${showResourcesDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {showResourcesDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                                        >
                                            {resourcesLinks.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    to={item.path}
                                                    className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <span>{item.icon}</span>
                                                        <span>{item.label}</span>
                                                    </span>
                                                    {item.comingSoon && (
                                                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Soon</span>
                                                    )}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Company Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setShowCompanyDropdown(true)}
                                onMouseLeave={() => setShowCompanyDropdown(false)}
                            >
                                <button className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors flex items-center gap-1">
                                    Company
                                    <svg className={`w-4 h-4 transition-transform ${showCompanyDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                <AnimatePresence>
                                    {showCompanyDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2"
                                        >
                                            {companyLinks.map((item) => (
                                                <Link
                                                    key={item.label}
                                                    to={item.path}
                                                    className="flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                                >
                                                    <span className="flex items-center gap-2">
                                                        <span>{item.icon}</span>
                                                        <span>{item.label}</span>
                                                    </span>
                                                    {item.comingSoon && (
                                                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Soon</span>
                                                    )}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Desktop CTAs */}
                        <div className="hidden md:flex items-center gap-4">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <Link
                                        to={`/${user.user_type}/dashboard`}
                                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                    <div className="relative user-menu">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setShowUserMenu(!showUserMenu);
                                            }}
                                            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                                {user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <svg
                                                className={`w-4 h-4 text-gray-600 transition-transform ${showUserMenu ? 'rotate-180' : ''}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>
                                        <AnimatePresence>
                                            {showUserMenu && (
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                                                >
                                                    <div className="px-4 py-2 border-b border-gray-100">
                                                        <p className="text-sm font-medium text-gray-900">{user.email}</p>
                                                        <p className="text-xs text-gray-500 capitalize">{user.user_type}</p>
                                                    </div>
                                                    <Link
                                                        to={`/${user.user_type}/dashboard`}
                                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        Dashboard
                                                    </Link>
                                                    <button
                                                        onClick={handleLogout}
                                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        Logout
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="relative px-6 py-2.5 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                                    >
                                        Join Beta 🚀
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-6 h-6 text-gray-700"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {isMobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 bg-black/50 z-40 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="fixed top-0 right-0 bottom-0 w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
                        >
                            {/* Close Button */}
                            <div className="flex justify-end p-4 border-b border-gray-200">
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    aria-label="Close menu"
                                >
                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* User Info (if logged in) */}
                            {user && (
                                <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-blue-50 to-purple-50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                                            {user.email.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{user.email}</p>
                                            <p className="text-sm text-gray-600 capitalize">{user.user_type}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Navigation Links */}
                            <div className="py-6">
                                {isHomePage && navLinks.filter(link => link.isSection).map((link) => (
                                    <button
                                        key={link.id}
                                        onClick={() => scrollToSection(link.id)}
                                        className={`w-full text-left px-6 py-4 text-lg font-medium transition-colors ${
                                            activeSection === link.id
                                                ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {link.label}
                                    </button>
                                ))}
                                {navLinks.filter(link => !link.isSection).map((link) => (
                                    <Link
                                        key={link.id}
                                        to={link.path!}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block px-6 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                {user && (
                                    <Link
                                        to={`/${user.user_type}/dashboard`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="block px-6 py-4 text-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                )}
                            </div>

                            {/* Mobile CTAs */}
                            <div className="p-6 border-t border-gray-200 space-y-3">
                                {user ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <>
                                        <Link
                                            to="/login"
                                            className="block w-full px-6 py-3 text-center text-gray-700 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="block w-full px-6 py-3 text-center text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold shadow-lg"
                                        >
                                            Join Beta 🚀
                                        </Link>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default EnhancedNavbar;
