
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { companyService } from '../../services/profile.service';
import { useProfileStore } from '../../store';
import type { CompanyCreateRequest } from '../../types';
import { CompanySize } from '../../types';

const CompanyProfileCreate = () => {
    const navigate = useNavigate();
    const { setCompanyProfile } = useProfileStore();

    const [formData, setFormData] = useState<CompanyCreateRequest>({
        company_name: '',
        industry: '',
        size: undefined,
        website: '',
        phone: '',
        address: '',
        city: '',
        state: '',
    });

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const profile = await companyService.createProfile(formData);
            setCompanyProfile(profile);
            navigate('/company/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to create profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout
            title="Create Company Profile"
            showBackButton={true}
            backTo="/company/dashboard"
            breadcrumbs={[
                { label: 'Dashboard', href: '/company/dashboard' },
                { label: 'Create Profile' }
            ]}
        >
            <div className="max-w-3xl mx-auto">
                <div className="card">
                    <h2 className="text-2xl font-bold mb-6">Company Information</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="company_name" className="label">
                                    Company Name *
                                </label>
                                <input
                                    type="text"
                                    id="company_name"
                                    name="company_name"
                                    value={formData.company_name}
                                    onChange={handleChange}
                                    required
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label htmlFor="industry" className="label">
                                    Industry
                                </label>
                                <input
                                    type="text"
                                    id="industry"
                                    name="industry"
                                    value={formData.industry}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label htmlFor="size" className="label">
                                    Company Size
                                </label>
                                <select
                                    id="size"
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    className="input-field"
                                >
                                    <option value="">Select Size</option>
                                    <option value={CompanySize.STARTUP}>Startup (1-10)</option>
                                    <option value={CompanySize.SMALL}>Small (11-50)</option>
                                    <option value={CompanySize.MEDIUM}>Medium (51-200)</option>
                                    <option value={CompanySize.LARGE}>Large (201-1000)</option>
                                    <option value={CompanySize.ENTERPRISE}>Enterprise (1000+)</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="website" className="label">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    id="website"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="input-field"
                                    placeholder="https://example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="label">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div>
                                <label htmlFor="city" className="label">
                                    City
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label htmlFor="address" className="label">
                                    Address
                                </label>
                                <input
                                    type="text"
                                    id="address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="input-field"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="btn-primary flex-1"
                            >
                                {loading ? 'Creating Profile...' : 'Create Profile'}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="btn-secondary"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CompanyProfileCreate;
