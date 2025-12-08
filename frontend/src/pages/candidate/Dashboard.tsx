import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { candidateService } from '../../services/profile.service';
import { useProfileStore } from '../../store';

const CandidateDashboard = () => {
    const { candidateProfile, setCandidateProfile } = useProfileStore();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            try {
                const profile = await candidateService.getProfile();
                setCandidateProfile(profile);
            } catch (err: any) {
                if (err.response?.status === 404) {
                    // Profile doesn't exist, redirect will happen
                } else {
                    setError('Failed to load profile');
                }
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [setCandidateProfile]);

    if (loading) {
        return (
            <DashboardLayout title="Dashboard">
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500">Loading...</div>
                </div>
            </DashboardLayout>
        );
    }

    if (!candidateProfile) {
        return (
            <DashboardLayout title="Dashboard">
                <div className="card text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
                    <p className="text-gray-600 mb-6">
                        Please complete your profile to access all features
                    </p>
                    <Link to="/candidate/profile/create" className="btn-primary inline-block">
                        Create Profile
                    </Link>
                </div>
            </DashboardLayout>
        );
    }

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <DashboardLayout title="Candidate Dashboard">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                    {error}
                </div>
            )}

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="card">
                    <div className="text-sm text-gray-600 mb-1">Current CTC</div>
                    <div className="text-2xl font-bold text-primary-600">
                        {candidateProfile.current_ctc ? formatCurrency(candidateProfile.current_ctc) : 'Not set'}
                    </div>
                </div>

                <div className="card">
                    <div className="text-sm text-gray-600 mb-1">Notice Period</div>
                    <div className="text-2xl font-bold text-primary-600">
                        {candidateProfile.notice_period_days || 0} days
                    </div>
                </div>

                <div className="card">
                    <div className="text-sm text-gray-600 mb-1">Experience</div>
                    <div className="text-2xl font-bold text-primary-600">
                        {candidateProfile.experience_years || 0} years
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                <div className="card">
                    <h3 className="text-xl font-bold mb-4">Profile Information</h3>
                    <div className="space-y-3">
                        <div>
                            <div className="text-sm text-gray-600">Name</div>
                            <div className="font-medium">{candidateProfile.full_name}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Phone</div>
                            <div className="font-medium">{candidateProfile.phone}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Location</div>
                            <div className="font-medium">
                                {candidateProfile.city}, {candidateProfile.state}
                            </div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Current Company</div>
                            <div className="font-medium">{candidateProfile.current_company || 'N/A'}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-600">Designation</div>
                            <div className="font-medium">{candidateProfile.current_designation || 'N/A'}</div>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-xl font-bold mb-4">Skills</h3>
                    {candidateProfile.skills && candidateProfile.skills.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {candidateProfile.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No skills added yet</p>
                    )}
                </div>
            </div>

            <div className="card mt-6">
                <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
                <div className="grid md:grid-cols-3 gap-4">
                    <Link to="/calculator" className="btn-primary text-center">
                        Calculate Buyout
                    </Link>
                    <button className="btn-secondary" disabled>
                        Browse Jobs (Coming Soon)
                    </button>
                    <button className="btn-secondary" disabled>
                        Apply for Loan (Coming Soon)
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CandidateDashboard;
