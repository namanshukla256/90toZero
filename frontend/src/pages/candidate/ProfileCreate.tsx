import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { candidateService } from '../../services/profile.service';
import { useProfileStore } from '../../store';
import type { CandidateCreateRequest } from '../../types';

const CandidateProfileCreate = () => {
    const navigate = useNavigate();
    const { setCandidateProfile } = useProfileStore();

    const [formData, setFormData] = useState<CandidateCreateRequest>({
        full_name: '',
        phone: '',
        current_company: '',
        current_designation: '',
        current_ctc: 0,
        notice_period_days: 90,
        skills: [],
        experience_years: 0,
        city: '',
        state: '',
        open_to_buyout: true,
    });

    const [skillInput, setSkillInput] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'number' ? parseFloat(value) : value,
        });
    };

    const handleAddSkill = () => {
        if (skillInput.trim() && !formData.skills?.includes(skillInput.trim())) {
            setFormData({
                ...formData,
                skills: [...(formData.skills || []), skillInput.trim()],
            });
            setSkillInput('');
        }
    };

    const handleRemoveSkill = (skill: string) => {
        setFormData({
            ...formData,
            skills: formData.skills?.filter((s) => s !== skill),
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const profile = await candidateService.createProfile(formData);
            setCandidateProfile(profile);
            navigate('/candidate/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Failed to create profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout title="Create Your Profile">
            <div className="max-w-3xl mx-auto">
                <div className="card">
                    <h2 className="text-2xl font-bold mb-6">Candidate Profile</h2>

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Information */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="full_name" className="label">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="full_name"
                                        name="full_name"
                                        value={formData.full_name}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="label">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="input-field"
                                        placeholder="+91-9876543210"
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

                                <div>
                                    <label htmlFor="state" className="label">
                                        State
                                    </label>
                                    <input
                                        type="text"
                                        id="state"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        className="input-field"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Current Employment */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Current Employment</h3>
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="current_company" className="label">
                                        Current Company
                                    </label>
                                    <input
                                        type="text"
                                        id="current_company"
                                        name="current_company"
                                        value={formData.current_company}
                                        onChange={handleChange}
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="current_designation" className="label">
                                        Designation
                                    </label>
                                    <input
                                        type="text"
                                        id="current_designation"
                                        name="current_designation"
                                        value={formData.current_designation}
                                        onChange={handleChange}
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="current_ctc" className="label">
                                        Current Annual CTC (₹)
                                    </label>
                                    <input
                                        type="number"
                                        id="current_ctc"
                                        name="current_ctc"
                                        value={formData.current_ctc}
                                        onChange={handleChange}
                                        min="0"
                                        step="10000"
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="notice_period_days" className="label">
                                        Notice Period (Days)
                                    </label>
                                    <select
                                        id="notice_period_days"
                                        name="notice_period_days"
                                        value={formData.notice_period_days}
                                        onChange={handleChange}
                                        className="input-field"
                                    >
                                        <option value="30">30 Days</option>
                                        <option value="60">60 Days</option>
                                        <option value="90">90 Days</option>
                                        <option value="120">120 Days</option>
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="experience_years" className="label">
                                        Total Experience (Years)
                                    </label>
                                    <input
                                        type="number"
                                        id="experience_years"
                                        name="experience_years"
                                        value={formData.experience_years}
                                        onChange={handleChange}
                                        min="0"
                                        step="0.5"
                                        className="input-field"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="expected_ctc" className="label">
                                        Expected CTC (₹)
                                    </label>
                                    <input
                                        type="number"
                                        id="expected_ctc"
                                        name="expected_ctc"
                                        value={formData.expected_ctc}
                                        onChange={handleChange}
                                        min="0"
                                        step="10000"
                                        className="input-field"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Skills */}
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Skills</h3>
                            <div className="flex gap-2 mb-2">
                                <input
                                    type="text"
                                    value={skillInput}
                                    onChange={(e) => setSkillInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
                                    className="input-field flex-1"
                                    placeholder="Enter a skill and press Add"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddSkill}
                                    className="btn-secondary"
                                >
                                    Add
                                </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {formData.skills?.map((skill) => (
                                    <span
                                        key={skill}
                                        className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveSkill(skill)}
                                            className="text-primary-600 hover:text-primary-800"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
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

export default CandidateProfileCreate;
