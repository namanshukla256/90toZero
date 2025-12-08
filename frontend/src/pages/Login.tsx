import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import { authService } from '../services/auth.service';
import type { LoginRequest } from '../types';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const [formData, setFormData] = useState<LoginRequest>({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authService.login(formData);
            login(response.user, {
                access_token: response.access_token,
                refresh_token: response.refresh_token,
            });

            // Redirect based on user type
            switch (response.user.user_type) {
                case 'company':
                    navigate('/company/dashboard');
                    break;
                case 'candidate':
                    navigate('/candidate/dashboard');
                    break;
                case 'nbfc':
                    navigate('/nbfc/dashboard');
                    break;
                case 'admin':
                    navigate('/admin/dashboard');
                    break;
                default:
                    navigate('/');
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary-600 mb-2">90toZero</h1>
                    <p className="text-gray-600">Notice Period Buyout Platform</p>
                </div>

                <div className="card">
                    <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="label">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="input-field"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="label">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="input-field"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-primary-600 hover:text-primary-700 font-medium">
                            Register here
                        </Link>
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-gray-500">
                    <p className="font-semibold mb-2">🧪 Demo Accounts:</p>
                    <p className="mt-1">👑 Admin: admin@90tozero.com / Admin123</p>
                    <p>🏢 Company: demo.company@90tozero.com / Company123</p>
                    <p>👨‍💼 Candidate: demo.candidate@90tozero.com / Candidate123</p>
                    <p>🏦 NBFC: demo.nbfc@90tozero.com / NBFC123</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
