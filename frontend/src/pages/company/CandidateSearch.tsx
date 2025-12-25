import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';
import CandidateOnlineStatus from '../../components/company/CandidateOnlineStatus';
import api from '../../services/api';

interface Candidate {
    id: string;
    full_name: string;
    current_company: string;
    current_designation: string;
    current_ctc: number;
    expected_ctc: number;
    notice_period_days: number;
    experience_years: number;
    skills: string[];
    location: string;
    city: string;
    state: string;
    phone: string;
    buyout_eligible: boolean;
}

const CandidateSearch = () => {
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [experienceFilter, setExperienceFilter] = useState<string>('all');
    const [noticePeriodFilter, setNoticePeriodFilter] = useState<string>('all');
    const [locationFilter, setLocationFilter] = useState<string>('all');
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        try {
            const response = await api.get('/companies/candidates');
            setCandidates(response.data);
        } catch (error) {
            console.error('Failed to fetch candidates:', error);
            setCandidates(dummyCandidates);
        } finally {
            setLoading(false);
        }
    };

    const filteredCandidates = candidates.filter((candidate) => {
        const matchesSearch = candidate.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.current_designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
            candidate.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesExperience = experienceFilter === 'all' ||
            (experienceFilter === '0-3' && candidate.experience_years <= 3) ||
            (experienceFilter === '3-5' && candidate.experience_years > 3 && candidate.experience_years <= 5) ||
            (experienceFilter === '5-8' && candidate.experience_years > 5 && candidate.experience_years <= 8) ||
            (experienceFilter === '8+' && candidate.experience_years > 8);

        const matchesNoticePeriod = noticePeriodFilter === 'all' ||
            (noticePeriodFilter === '30' && candidate.notice_period_days <= 30) ||
            (noticePeriodFilter === '60' && candidate.notice_period_days <= 60) ||
            (noticePeriodFilter === '90' && candidate.notice_period_days <= 90);

        const matchesLocation = locationFilter === 'all' || candidate.city === locationFilter;

        return matchesSearch && matchesExperience && matchesNoticePeriod && matchesLocation;
    });

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const calculateBuyoutAmount = (candidate: Candidate) => {
        const monthlySalary = candidate.current_ctc / 12;
        const dailySalary = monthlySalary / 30;
        return Math.round(dailySalary * candidate.notice_period_days);
    };

    const handleViewProfile = (candidate: Candidate) => {
        setSelectedCandidate(candidate);
    };

    const handleContactCandidate = (candidate: Candidate) => {
        alert(`Contact ${candidate.full_name} at ${candidate.phone}`);
    };

    if (loading) {
        return (
            <DashboardLayout
                title="Search Candidates"
                showBackButton={true}
                backTo="/company/dashboard"
                breadcrumbs={[
                    { label: 'Dashboard', href: '/company/dashboard' },
                    { label: 'Search Candidates' }
                ]}
            >
                <div className="flex items-center justify-center h-64">
                    <div className="text-gray-500">Loading candidates...</div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title="Search Candidates"
            showBackButton={true}
            backTo="/company/dashboard"
            breadcrumbs={[
                { label: 'Dashboard', href: '/company/dashboard' },
                { label: 'Search Candidates' }
            ]}
        >
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Candidate Search</h1>
                <p className="text-gray-600">Find and connect with qualified candidates</p>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Name, role, or skills..."
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
                        <select
                            value={experienceFilter}
                            onChange={(e) => setExperienceFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">All Experience</option>
                            <option value="0-3">0-3 years</option>
                            <option value="3-5">3-5 years</option>
                            <option value="5-8">5-8 years</option>
                            <option value="8+">8+ years</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Notice Period</label>
                        <select
                            value={noticePeriodFilter}
                            onChange={(e) => setNoticePeriodFilter(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="all">Any Notice Period</option>
                            <option value="30">Up to 30 days</option>
                            <option value="60">Up to 60 days</option>
                            <option value="90">Up to 90 days</option>
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
                    Showing <span className="font-semibold">{filteredCandidates.length}</span> candidates
                </p>
            </div>

            {/* Main Content with Sidebar */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Candidates Grid */}
                <div className="lg:col-span-2 space-y-6">
                    {filteredCandidates.length === 0 ? (
                        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No candidates found</h3>
                            <p className="text-gray-600">Try adjusting your filters to see more results</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6">
                            {filteredCandidates.map((candidate) => (
                        <div key={candidate.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{candidate.full_name}</h3>
                                    <p className="text-sm text-gray-600 mb-2">{candidate.current_designation}</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            {candidate.current_company}
                                        </span>
                                    </div>
                                </div>
                                {candidate.buyout_eligible && (
                                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                        Buyout Eligible
                                    </span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                                <div>
                                    <span className="text-gray-600">Experience:</span>
                                    <span className="ml-2 font-medium text-gray-900">{candidate.experience_years} years</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Location:</span>
                                    <span className="ml-2 font-medium text-gray-900">{candidate.city}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Current CTC:</span>
                                    <span className="ml-2 font-medium text-gray-900">{formatCurrency(candidate.current_ctc)}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Expected CTC:</span>
                                    <span className="ml-2 font-medium text-gray-900">{formatCurrency(candidate.expected_ctc)}</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Notice Period:</span>
                                    <span className="ml-2 font-medium text-orange-600">{candidate.notice_period_days} days</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">Buyout Amount:</span>
                                    <span className="ml-2 font-medium text-green-600">
                                        {formatCurrency(calculateBuyoutAmount(candidate))}
                                    </span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="text-sm text-gray-600 mb-2">Skills:</div>
                                <div className="flex flex-wrap gap-2">
                                    {candidate.skills.slice(0, 5).map((skill, index) => (
                                        <span key={index} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                    {candidate.skills.length > 5 && (
                                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                            +{candidate.skills.length - 5} more
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleViewProfile(candidate)}
                                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                                >
                                    View Full Profile
                                </button>
                                <button
                                    onClick={() => handleContactCandidate(candidate)}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                                >
                                    Contact
                                </button>
                            </div>
                        </div>
                    ))}
                        </div>
                    )}
                </div>

                {/* Sidebar - Online Candidates */}
                <div className="lg:col-span-1 space-y-6">
                    <CandidateOnlineStatus compact={true} />
                </div>
            </div>

            {/* Candidate Profile Modal */}
            {selectedCandidate && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6">
                        <div className="flex items-start justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">{selectedCandidate.full_name}</h2>
                                <p className="text-gray-600">{selectedCandidate.current_designation}</p>
                            </div>
                            <button
                                onClick={() => setSelectedCandidate(null)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-600">Current Company:</span>
                                        <span className="ml-2 font-medium">{selectedCandidate.current_company}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Experience:</span>
                                        <span className="ml-2 font-medium">{selectedCandidate.experience_years} years</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Current CTC:</span>
                                        <span className="ml-2 font-medium">{formatCurrency(selectedCandidate.current_ctc)}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Expected CTC:</span>
                                        <span className="ml-2 font-medium">{formatCurrency(selectedCandidate.expected_ctc)}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Notice Period:</span>
                                        <span className="ml-2 font-medium">{selectedCandidate.notice_period_days} days</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-600">Location:</span>
                                        <span className="ml-2 font-medium">{selectedCandidate.city}, {selectedCandidate.state}</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Buyout Information</h3>
                                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                                    <div className="text-sm text-gray-700 mb-2">Estimated Buyout Amount</div>
                                    <div className="text-3xl font-bold text-green-600 mb-2">
                                        {formatCurrency(calculateBuyoutAmount(selectedCandidate))}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Based on {selectedCandidate.notice_period_days} days notice period
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedCandidate.skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    onClick={() => handleContactCandidate(selectedCandidate)}
                                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                                >
                                    Contact Candidate
                                </button>
                                <button
                                    onClick={() => setSelectedCandidate(null)}
                                    className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

// Dummy data
const dummyCandidates: Candidate[] = [
    {
        id: '1',
        full_name: 'Rajesh Kumar',
        current_company: 'ABC Technologies',
        current_designation: 'Senior Software Engineer',
        current_ctc: 1500000,
        expected_ctc: 2000000,
        notice_period_days: 90,
        experience_years: 6,
        skills: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'AWS'],
        location: 'Bangalore',
        city: 'Bangalore',
        state: 'Karnataka',
        phone: '+91-9876543210',
        buyout_eligible: true,
    },
    {
        id: '2',
        full_name: 'Priya Sharma',
        current_company: 'XYZ Solutions',
        current_designation: 'Frontend Developer',
        current_ctc: 1200000,
        expected_ctc: 1600000,
        notice_period_days: 60,
        experience_years: 4,
        skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
        location: 'Mumbai',
        city: 'Mumbai',
        state: 'Maharashtra',
        phone: '+91-9876543211',
        buyout_eligible: true,
    },
    {
        id: '3',
        full_name: 'Amit Patel',
        current_company: 'Tech Innovations',
        current_designation: 'DevOps Engineer',
        current_ctc: 1800000,
        expected_ctc: 2400000,
        notice_period_days: 90,
        experience_years: 7,
        skills: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Jenkins'],
        location: 'Pune',
        city: 'Pune',
        state: 'Maharashtra',
        phone: '+91-9876543212',
        buyout_eligible: true,
    },
    {
        id: '4',
        full_name: 'Sneha Reddy',
        current_company: 'Digital Systems',
        current_designation: 'Backend Developer',
        current_ctc: 1400000,
        expected_ctc: 1900000,
        notice_period_days: 30,
        experience_years: 5,
        skills: ['Node.js', 'MongoDB', 'Express', 'GraphQL', 'Redis'],
        location: 'Hyderabad',
        city: 'Hyderabad',
        state: 'Telangana',
        phone: '+91-9876543213',
        buyout_eligible: true,
    },
];

export default CandidateSearch;
