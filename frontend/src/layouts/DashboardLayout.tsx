import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';

interface DashboardLayoutProps {
    children: ReactNode;
    title: string;
    showBackButton?: boolean;
    backTo?: string;
    breadcrumbs?: Array<{ label: string; href?: string; }>;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
    children,
    title,
    showBackButton = false,
    backTo,
    breadcrumbs
}) => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleBack = () => {
        if (backTo) {
            navigate(backTo);
        } else {
            navigate(-1);
        }
    };

    const getDashboardPath = () => {
        const userType = user?.user_type;
        if (userType === 'admin') return '/admin/dashboard';
        if (userType === 'company') return '/company/dashboard';
        if (userType === 'candidate') return '/candidate/dashboard';
        if (userType === 'nbfc') return '/nbfc/dashboard';
        return '/';
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-4">
                            {showBackButton ? (
                                <button
                                    onClick={handleBack}
                                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                    Back
                                </button>
                            ) : (
                                <Link
                                    to={getDashboardPath()}
                                    className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
                                >
                                    90toZero
                                </Link>
                            )}
                            <div className="flex items-center gap-2">
                                <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
                                {breadcrumbs && breadcrumbs.length > 0 && (
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        {breadcrumbs.map((crumb, index) => (
                                            <div key={index} className="flex items-center gap-2">
                                                <span className="text-gray-400">/</span>
                                                {crumb.href ? (
                                                    <Link
                                                        to={crumb.href}
                                                        className="hover:text-gray-700 transition-colors"
                                                    >
                                                        {crumb.label}
                                                    </Link>
                                                ) : (
                                                    <span className="text-gray-600">{crumb.label}</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm text-gray-600">{user?.email}</p>
                                <p className="text-xs text-gray-400 capitalize">{user?.user_type}</p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="btn-outline text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;
