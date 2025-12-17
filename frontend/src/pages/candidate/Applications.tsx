import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar.tsx';
import api from '../../services/api';

interface Application {
    id: string;
    job_id: string;
    job_title: string;
    company_name: string;
    location: string;
    status: 'applied' | 'screening' | 'interview' | 'offered' | 'accepted' | 'rejected';
    applied_at: string;
    updated_at: string;
    buyout_support_type?: string;
    salary_offered?: number;
}

const Applications = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await api.get('/candidates/applications');
            setApplications(response.data);
        } catch (error) {
            console.error('Failed to fetch applications:', error);
            // Use dummy data if API fails
            setApplications(dummyApplications);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        const colors = {
            applied: 'bg-blue-100 text-blue-800',
            screening: 'bg-yellow-100 text-yellow-800',
            interview: 'bg-purple-100 text-purple-800',
            offered: 'bg-green-100 text-green-800',
            accepted: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    const getStatusText = (status: string) => {
        const texts = {
            applied: 'Applied',
            screening: 'Under Review',
            interview: 'Interview Scheduled',
            offered: 'Offer Received',
            accepted: 'Accepted',
            rejected: 'Not Selected',
        };
        return texts[status as keyof typeof texts] || status;
    };


    const filteredApplications = applications.filter((app) => {
        if (filter === 'all') return true;
        if (filter === 'active') return !['rejected', 'accepted'].includes(app.status);
        return app.status === filter;
    });

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const getTimeline = (status: string) => {
        const stages = [
            { key: 'applied', label: 'Applied' },
            { key: 'screening', label: 'Screening' },
            { key: 'interview', label: 'Interview' },
            { key: 'offered', label: 'Offer' },
            { key: 'accepted', label: 'Accepted' },
        ];

        const currentIndex = stages.findIndex(s => s.key === status);

        return stages.map((stage, index) => ({
            ...stage,
            completed: index <= currentIndex && status !== 'rejected',
            active: stage.key === status,
        }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading applications...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Applications</h1>
                        <p className="text-gray-600">Track your job applications and their status</p>
                    </div>
                    <button
                        onClick={() => navigate('/candidate/jobs')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        Browse More Jobs
                    </button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="text-2xl font-bold text-gray-900">{applications.length}</div>
                        <div className="text-sm text-gray-600 mt-1">Total Applications</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="text-2xl font-bold text-yellow-600">
                            {applications.filter(a => ['applied', 'screening'].includes(a.status)).length}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Under Review</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="text-2xl font-bold text-purple-600">
                            {applications.filter(a => ['interview', 'offered'].includes(a.status)).length}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">In Progress</div>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="text-2xl font-bold text-green-600">
                            {applications.filter(a => a.status === 'offered').length}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Offers Received</div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex gap-2 overflow-x-auto">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All ({applications.length})
                        </button>
                        <button
                            onClick={() => setFilter('active')}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Active ({applications.filter(a => !['rejected', 'accepted'].includes(a.status)).length})
                        </button>
                        <button
                            onClick={() => setFilter('interview')}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${filter === 'interview' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Interview ({applications.filter(a => a.status === 'interview').length})
                        </button>
                        <button
                            onClick={() => setFilter('offered')}
                            className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${filter === 'offered' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Offers ({applications.filter(a => a.status === 'offered').length})
                        </button>
                    </div>
                </div>

                {/* Applications List */}
                {filteredApplications.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No applications yet</h3>
                        <p className="text-gray-600 mb-4">Start applying to jobs to track them here</p>
                        <button
                            onClick={() => navigate('/candidate/jobs')}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                            Browse Jobs
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredApplications.map((application) => (
                            <div key={application.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">{application.job_title}</h3>
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                                {application.company_name}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                {application.location}
                                            </span>
                                            <span>Applied on {formatDate(application.applied_at)}</span>
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
                                        {getStatusText(application.status)}
                                    </span>
                                </div>

                                {/* Progress Timeline */}
                                {application.status !== 'rejected' && (
                                    <div className="mb-4">
                                        <div className="relative">
                                            <div className="flex items-center justify-between">
                                                {getTimeline(application.status).map((stage, index) => (
                                                    <div key={stage.key} className="flex flex-col items-center flex-1 relative">
                                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${stage.completed
                                                                ? 'bg-blue-600 text-white'
                                                                : stage.active
                                                                    ? 'bg-blue-100 text-blue-600 border-2 border-blue-600'
                                                                    : 'bg-gray-200 text-gray-500'
                                                            }`}>
                                                            {stage.completed ? (
                                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                </svg>
                                                            ) : (
                                                                <span className="text-xs font-bold">{index + 1}</span>
                                                            )}
                                                        </div>
                                                        <div className={`text-xs mt-2 font-medium ${stage.completed || stage.active ? 'text-gray-900' : 'text-gray-500'}`}>
                                                            {stage.label}
                                                        </div>
                                                        {index < getTimeline(application.status).length - 1 && (
                                                            <div className={`absolute top-4 left-1/2 w-full h-0.5 ${stage.completed ? 'bg-blue-600' : 'bg-gray-200'}`} style={{ zIndex: 0 }} />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="text-sm text-gray-600">
                                        Last updated: {formatDate(application.updated_at)}
                                    </div>
                                    <div className="flex gap-2">
                                        {application.status === 'offered' && (
                                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors">
                                                Accept Offer
                                            </button>
                                        )}
                                        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

// Dummy data for development
const dummyApplications: Application[] = [
    {
        id: '1',
        job_id: '1',
        job_title: 'Senior Full Stack Developer',
        company_name: 'TechCorp India',
        location: 'Bangalore',
        status: 'interview',
        applied_at: '2025-01-10T10:00:00Z',
        updated_at: '2025-01-15T14:30:00Z',
        buyout_support_type: 'full',
    },
    {
        id: '2',
        job_id: '2',
        job_title: 'DevOps Engineer',
        company_name: 'CloudScale Solutions',
        location: 'Mumbai',
        status: 'offered',
        applied_at: '2025-01-12T10:00:00Z',
        updated_at: '2025-01-16T16:00:00Z',
        buyout_support_type: 'partial',
        salary_offered: 1800000,
    },
    {
        id: '3',
        job_id: '3',
        job_title: 'Frontend Developer',
        company_name: 'DesignHub',
        location: 'Bangalore',
        status: 'screening',
        applied_at: '2025-01-13T10:00:00Z',
        updated_at: '2025-01-14T11:00:00Z',
        buyout_support_type: 'facilitation',
    },
    {
        id: '4',
        job_id: '4',
        job_title: 'Python Backend Developer',
        company_name: 'DataFlow Systems',
        location: 'Hyderabad',
        status: 'applied',
        applied_at: '2025-01-14T10:00:00Z',
        updated_at: '2025-01-14T10:00:00Z',
        buyout_support_type: 'full',
    },
];

export default Applications;
