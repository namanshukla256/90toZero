import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../store';
import { authService } from '../services/auth.service';
import type { RegisterRequest } from '../types';
import { UserType } from '../types';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const [formData, setFormData] = useState<RegisterRequest>({
        email: '',
        password: '',
        user_type: UserType.CANDIDATE,
    });
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Validate passwords match
        if (formData.password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        // Validate password strength
        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters long');
            return;
        }
        if (!/[A-Z]/.test(formData.password)) {
            setError('Password must contain at least one uppercase letter');
            return;
        }
        if (!/[0-9]/.test(formData.password)) {
            setError('Password must contain at least one digit');
            return;
        }

        setLoading(true);

        try {
            const response = await authService.register(formData);
            login(response.user, {
                access_token: response.access_token,
                refresh_token: response.refresh_token,
            });

            // Redirect to profile creation based on user type
            switch (response.user.user_type) {
                case 'company':
                    navigate('/company/profile/create');
                    break;
                case 'candidate':
                    navigate('/candidate/profile/create');
                    break;
                case 'nbfc':
                    navigate('/nbfc/profile/create');
                    break;
                default:
                    navigate('/');
            }
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 px-4 py-8">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-primary-600 mb-2">90toZero</h1>
                    <p className="text-gray-600">Notice Period Buyout Platform</p>
                </div>

                <div className="card">
                    <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="user_type" className="label">
                                I am a
                            </label>
                            <select
                                id="user_type"
                                name="user_type"
                                value={formData.user_type}
                                onChange={handleChange}
                                required
                                className="input-field"
                            >
                                <option value={UserType.CANDIDATE}>Candidate (Job Seeker)</option>
                                <option value={UserType.COMPANY}>Company (Hiring)</option>
                                <option value={UserType.NBFC}>NBFC Partner (Lender)</option>
                            </select>
                        </div>

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
                            <p className="text-xs text-gray-500 mt-1">
                                Must be 8+ characters with uppercase and digit
                            </p>
                        </div>

                        <div>
                            <label htmlFor="confirmPassword" className="label">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                            Login here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
