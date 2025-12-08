import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';

interface DashboardLayoutProps {
    children: ReactNode;
    title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-8">
                            <Link to="/" className="text-2xl font-bold text-primary-600">
                                90toZero
                            </Link>
                            <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
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
