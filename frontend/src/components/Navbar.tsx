import { Link } from 'react-router-dom';
import { useAuthStore } from '../store';

const Navbar = () => {
    const { user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
    };

    return (
        <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link to="/" className="flex items-center">
                        <span className="text-2xl font-bold text-blue-600">90toZero</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        {user ? (
                            <>
                                <Link to={`/${user.user_type}/dashboard`} className="text-gray-700 hover:text-blue-600 font-medium">
                                    Dashboard
                                </Link>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm text-gray-600">{user.email}</span>
                                    <button
                                        onClick={handleLogout}
                                        className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                                    Login
                                </Link>
                                <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
