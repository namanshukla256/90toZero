import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';
import api from '../../services/api';

interface Job {
    id: string;
    title: string;
    description: string;
    location: string;
    salary_min: number;
    salary_max: number;
    experience_required: number;
    required_skills: string[];
    buyout_support_type: 'full' | 'partial' | 'facilitation' | 'none';
    max_buyout_amount: number | null;
    job_type: 'full_time' | 'contract';
    is_active: boolean;
    created_at: string;
    applications_count?: number;
}

const Jobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await api.get('/companies/jobs');
            setJobs(response.data);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
            setJobs(dummyJobs);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateJob = () => {
        setEditingJob(null);
        setShowCreateModal(true);
    };

    const handleEditJob = (job: Job) => {
        setEditingJob(job);
        setShowCreateModal(true);
    };

    const handleToggleActive = async (jobId: string, isActive: boolean) => {
        try {
            await api.patch(`/companies/jobs/${jobId}`, { is_active: !isActive });
            setJobs(jobs.map(job => job.id === jobId ? { ...job, is_active: !isActive } : job));
        } catch (error) {
            alert('Failed to update job status');
        }
    };

    const getBuyoutBadge = (type: string) => {
        const badges = {
            full: { text: 'Full Buyout', color: 'bg-green-100 text-green-800' },
            partial: { text: 'Partial Buyout', color: 'bg-blue-100 text-blue-800' },
            facilitation: { text: 'Loan Support', color: 'bg-yellow-100 text-yellow-800' },
            none: { text: 'No Buyout', color: 'bg-gray-100 text-gray-800' },
        };
        const badge = badges[type as keyof typeof badges] || badges.none;
        return <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>{badge.text}</span>;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    if (loading) {
        return (
            <DashboardLayout title="Manage Jobs">
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500">Loading jobs...</div>
                </div>
            </DashboardLayout>
        );
    }

    const activeJobs = jobs.filter(j => j.is_active);
    const inactiveJobs = jobs.filter(j => !j.is_active);

    return (
        <DashboardLayout title="Manage Jobs">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
                    <p className="text-gray-600 mt-1">Create and manage your job openings</p>
                </div>
                <button
                    onClick={handleCreateJob}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Post New Job
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-2xl font-bold text-gray-900">{jobs.length}</div>
                    <div className="text-sm text-gray-600 mt-1">Total Jobs</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-2xl font-bold text-green-600">{activeJobs.length}</div>
                    <div className="text-sm text-gray-600 mt-1">Active Jobs</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-2xl font-bold text-blue-600">
                        {jobs.reduce((sum, j) => sum + (j.applications_count || 0), 0)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">Total Applications</div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="text-2xl font-bold text-purple-600">
                        {jobs.filter(j => j.buyout_support_type !== 'none').length}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">With Buyout Support</div>
                </div>
            </div>

            {/* Active Jobs */}
            {activeJobs.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Jobs ({activeJobs.length})</h2>
                    <div className="space-y-4">
                        {activeJobs.map((job) => (
                            <div key={job.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                                            {getBuyoutBadge(job.buyout_support_type)}
                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                Active
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {job.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                                {job.experience_required}+ years
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                {job.applications_count || 0} applications
                                            </span>
                                            <span>Posted {formatDate(job.created_at)}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-lg font-semibold text-gray-900">
                                            ₹{(job.salary_min / 100000).toFixed(1)}-{(job.salary_max / 100000).toFixed(1)} LPA
                                        </div>
                                        {job.max_buyout_amount && (
                                            <div className="text-sm text-green-600 font-medium">
                                                Buyout up to ₹{(job.max_buyout_amount / 100000).toFixed(1)}L
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        {job.required_skills.slice(0, 5).map((skill, index) => (
                                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                                {skill}
                                            </span>
                                        ))}
                                        {job.required_skills.length > 5 && (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                                                +{job.required_skills.length - 5} more
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => navigate(`/company/jobs/${job.id}/applications`)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                        >
                                            View Applications
                                        </button>
                                        <button
                                            onClick={() => handleEditJob(job)}
                                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleToggleActive(job.id, job.is_active)}
                                            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium hover:bg-orange-200 transition-colors"
                                        >
                                            Deactivate
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Inactive Jobs */}
            {inactiveJobs.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Inactive Jobs ({inactiveJobs.length})</h2>
                    <div className="space-y-4">
                        {inactiveJobs.map((job) => (
                            <div key={job.id} className="bg-gray-50 rounded-lg shadow-sm p-6 opacity-75">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-lg font-semibold text-gray-700">{job.title}</h3>
                                            {getBuyoutBadge(job.buyout_support_type)}
                                            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs font-medium rounded-full">
                                                Inactive
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <span>{job.location}</span>
                                            <span>{job.applications_count || 0} applications</span>
                                            <span>Posted {formatDate(job.created_at)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleToggleActive(job.id, job.is_active)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                                        >
                                            Activate
                                        </button>
                                        <button
                                            onClick={() => handleEditJob(job)}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {jobs.length === 0 && (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                    <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs posted yet</h3>
                    <p className="text-gray-600 mb-4">Create your first job posting to start receiving applications</p>
                    <button
                        onClick={handleCreateJob}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Post Your First Job
                    </button>
                </div>
            )}

            {/* Create/Edit Job Modal - Placeholder */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">
                            {editingJob ? 'Edit Job' : 'Create New Job'}
                        </h2>
                        <p className="text-gray-600 mb-4">Job creation form coming soon...</p>
                        <button
                            onClick={() => setShowCreateModal(false)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

// Dummy data
const dummyJobs: Job[] = [
    {
        id: '1',
        title: 'Senior Full Stack Developer',
        description: 'Looking for an experienced full-stack developer to join our growing team. Work on cutting-edge technologies and build scalable solutions.',
        location: 'Bangalore',
        salary_min: 1500000,
        salary_max: 2500000,
        experience_required: 5,
        required_skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
        buyout_support_type: 'full',
        max_buyout_amount: 400000,
        job_type: 'full_time',
        is_active: true,
        created_at: '2025-01-10T10:00:00Z',
        applications_count: 12,
    },
    {
        id: '2',
        title: 'DevOps Engineer',
        description: 'Join our DevOps team to manage and scale our cloud infrastructure.',
        location: 'Mumbai',
        salary_min: 1200000,
        salary_max: 2000000,
        experience_required: 4,
        required_skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
        buyout_support_type: 'partial',
        max_buyout_amount: 300000,
        job_type: 'full_time',
        is_active: true,
        created_at: '2025-01-12T10:00:00Z',
        applications_count: 8,
    },
    {
        id: '3',
        title: 'Product Manager',
        description: 'Lead product strategy and development for our flagship product.',
        location: 'Bangalore',
        salary_min: 2000000,
        salary_max: 3500000,
        experience_required: 6,
        required_skills: ['Product Strategy', 'Agile', 'Analytics', 'User Research'],
        buyout_support_type: 'facilitation',
        max_buyout_amount: 500000,
        job_type: 'full_time',
        is_active: false,
        created_at: '2024-12-20T10:00:00Z',
        applications_count: 5,
    },
];

export default Jobs;
