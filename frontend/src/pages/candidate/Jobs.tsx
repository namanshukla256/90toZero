import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../services/api';

interface Job {
    id: string;
    title: string;
    company_name: string;
    description: string;
    location: string;
    salary_min: number;
    salary_max: number;
    experience_required: number;
    required_skills: string[];
    buyout_support_type: 'full' | 'partial' | 'facilitation' | 'none';
    max_buyout_amount: number | null;
    job_type: string;
    created_at: string;
    is_active: boolean;
}

const Jobs = () => {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState<Job[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [buyoutFilter, setBuyoutFilter] = useState<string>('all');
    const [locationFilter, setLocationFilter] = useState<string>('all');

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await api.get('/candidates/jobs');
            setJobs(response.data);
        } catch (error) {
            console.error('Failed to fetch jobs:', error);
            // Use dummy data if API fails
            setJobs(dummyJobs);
        } finally {
            setLoading(false);
        }
    };

    const applyForJob = async (jobId: string) => {
        try {
            await api.post('/candidates/applications', { job_id: jobId });
            alert('Application submitted successfully!');
            navigate('/candidate/applications');
        } catch (error: any) {
            alert(error.response?.data?.detail || 'Failed to apply. Please try again.');
        }
    };

    const filteredJobs = jobs.filter((job) => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.required_skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesBuyout = buyoutFilter === 'all' ||
            (buyoutFilter === 'supported' && job.buyout_support_type !== 'none') ||
            job.buyout_support_type === buyoutFilter;

        const matchesLocation = locationFilter === 'all' || job.location === locationFilter;

        return matchesSearch && matchesBuyout && matchesLocation;
    });

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

    if (loading) {
        return (
            <DashboardLayout
                title="Browse Jobs"
                showBackButton={true}
                backTo="/candidate"
                breadcrumbs={[{ label: 'Jobs' }]}
            >
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading jobs...</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Browse Jobs"
            showBackButton={true}
            backTo="/candidate"
            breadcrumbs={[{ label: 'Jobs' }]}
        >
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Find Your Next Opportunity</h1>
                <p className="text-gray-600">Discover jobs with buyout support and apply instantly</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Job title, company, or skills..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Buyout Support</label>
                        <select
                            value={buyoutFilter}
                            onChange={(e) => setBuyoutFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Jobs</option>
                            <option value="supported">Any Buyout Support</option>
                            <option value="full">Full Buyout Only</option>
                            <option value="partial">Partial Buyout</option>
                            <option value="facilitation">Loan Facilitation</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <select
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Locations</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Hyderabad">Hyderabad</option>
                            <option value="Pune">Pune</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Results Count */}
            <div className="mb-4">
                <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{filteredJobs.length}</span> jobs
                </p>
            </div>

            {/* Job Listings */}
            <div className="space-y-4">
                {filteredJobs.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
                        <p className="text-gray-600">Try adjusting your filters to see more results</p>
                    </div>
                ) : (
                    filteredJobs.map((job) => (
                        <div key={job.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                                        {getBuyoutBadge(job.buyout_support_type)}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            {job.company_name}
                                        </span>
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
                                <button
                                    onClick={() => applyForJob(job.id)}
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Apply Now
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </DashboardLayout>
    );
};

// Dummy data for development
const dummyJobs: Job[] = [
    {
        id: '1',
        title: 'Senior Full Stack Developer',
        company_name: 'TechCorp India',
        description: 'Looking for an experienced full-stack developer to join our growing team. Work on cutting-edge technologies and build scalable solutions.',
        location: 'Bangalore',
        salary_min: 1500000,
        salary_max: 2500000,
        experience_required: 5,
        required_skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
        buyout_support_type: 'full',
        max_buyout_amount: 400000,
        job_type: 'full_time',
        created_at: '2025-01-10T10:00:00Z',
        is_active: true,
    },
    {
        id: '2',
        title: 'DevOps Engineer',
        company_name: 'CloudScale Solutions',
        description: 'Join our DevOps team to manage and scale our cloud infrastructure. Experience with Kubernetes and CI/CD required.',
        location: 'Mumbai',
        salary_min: 1200000,
        salary_max: 2000000,
        experience_required: 4,
        required_skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Jenkins'],
        buyout_support_type: 'partial',
        max_buyout_amount: 300000,
        job_type: 'full_time',
        created_at: '2025-01-12T10:00:00Z',
        is_active: true,
    },
    {
        id: '3',
        title: 'Frontend Developer',
        company_name: 'DesignHub',
        description: 'Create beautiful and responsive user interfaces using modern frontend technologies. Strong focus on UI/UX.',
        location: 'Bangalore',
        salary_min: 1000000,
        salary_max: 1800000,
        experience_required: 3,
        required_skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'],
        buyout_support_type: 'facilitation',
        max_buyout_amount: 250000,
        job_type: 'full_time',
        created_at: '2025-01-13T10:00:00Z',
        is_active: true,
    },
    {
        id: '4',
        title: 'Python Backend Developer',
        company_name: 'DataFlow Systems',
        description: 'Build robust backend systems and APIs. Work with data pipelines and microservices architecture.',
        location: 'Hyderabad',
        salary_min: 1100000,
        salary_max: 1900000,
        experience_required: 4,
        required_skills: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Kafka'],
        buyout_support_type: 'full',
        max_buyout_amount: 350000,
        job_type: 'full_time',
        created_at: '2025-01-14T10:00:00Z',
        is_active: true,
    },
    {
        id: '5',
        title: 'React Native Developer',
        company_name: 'MobileFirst Inc',
        description: 'Develop cross-platform mobile applications. Experience with React Native and native modules required.',
        location: 'Pune',
        salary_min: 1000000,
        salary_max: 1700000,
        experience_required: 3,
        required_skills: ['React Native', 'JavaScript', 'iOS', 'Android', 'Redux'],
        buyout_support_type: 'partial',
        max_buyout_amount: 200000,
        job_type: 'full_time',
        created_at: '2025-01-15T10:00:00Z',
        is_active: true,
    },
];

export default Jobs;
