import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';

interface Application {
    id: string;
    candidateName: string;
    candidateEmail: string;
    candidatePhone: string;
    jobTitle: string;
    jobId: string;
    appliedDate: string;
    status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected';
    currentCTC: number;
    expectedCTC: number;
    noticePeriod: number;
    buyoutRequired: boolean;
    buyoutAmount?: number;
    buyoutStatus?: 'pending' | 'approved' | 'in_progress' | 'completed' | 'rejected';
    buyoutType?: 'full' | 'partial' | 'facilitation' | 'none';
    experience: number;
    skills: string[];
    location: string;
    resumeUrl: string;
}

const Applications: React.FC = () => {
    const [selectedStatus, setSelectedStatus] = useState<string>('all');
    const [selectedBuyoutStatus, setSelectedBuyoutStatus] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [showBuyoutModal, setShowBuyoutModal] = useState(false);
    const [buyoutForm, setBuyoutForm] = useState({
        type: 'full' as 'full' | 'partial' | 'facilitation',
        amount: 0,
        terms: '',
    });

    // Dummy applications data
    const [applications] = useState<Application[]>([
        {
            id: 'app1',
            candidateName: 'Rajesh Kumar',
            candidateEmail: 'rajesh.k@email.com',
            candidatePhone: '+91 98765 43210',
            jobTitle: 'Senior Full Stack Developer',
            jobId: 'job1',
            appliedDate: '2024-01-15',
            status: 'interview',
            currentCTC: 1200000,
            expectedCTC: 1800000,
            noticePeriod: 60,
            buyoutRequired: true,
            buyoutAmount: 80000,
            buyoutStatus: 'pending',
            buyoutType: 'full',
            experience: 6,
            skills: ['React', 'Node.js', 'Python', 'AWS', 'MongoDB'],
            location: 'Bangalore',
            resumeUrl: '#',
        },
        {
            id: 'app2',
            candidateName: 'Priya Sharma',
            candidateEmail: 'priya.s@email.com',
            candidatePhone: '+91 98765 43211',
            jobTitle: 'Senior Full Stack Developer',
            jobId: 'job1',
            appliedDate: '2024-01-18',
            status: 'screening',
            currentCTC: 1000000,
            expectedCTC: 1500000,
            noticePeriod: 30,
            buyoutRequired: false,
            experience: 4,
            skills: ['React', 'TypeScript', 'CSS', 'Redux'],
            location: 'Mumbai',
            resumeUrl: '#',
        },
        {
            id: 'app3',
            candidateName: 'Amit Patel',
            candidateEmail: 'amit.p@email.com',
            candidatePhone: '+91 98765 43212',
            jobTitle: 'DevOps Engineer',
            jobId: 'job2',
            appliedDate: '2024-01-20',
            status: 'offer',
            currentCTC: 1400000,
            expectedCTC: 2000000,
            noticePeriod: 90,
            buyoutRequired: true,
            buyoutAmount: 140000,
            buyoutStatus: 'approved',
            buyoutType: 'partial',
            experience: 7,
            skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
            location: 'Pune',
            resumeUrl: '#',
        },
        {
            id: 'app4',
            candidateName: 'Sneha Reddy',
            candidateEmail: 'sneha.r@email.com',
            candidatePhone: '+91 98765 43213',
            jobTitle: 'Senior Full Stack Developer',
            jobId: 'job1',
            appliedDate: '2024-01-22',
            status: 'hired',
            currentCTC: 1100000,
            expectedCTC: 1600000,
            noticePeriod: 60,
            buyoutRequired: true,
            buyoutAmount: 73333,
            buyoutStatus: 'completed',
            buyoutType: 'full',
            experience: 5,
            skills: ['Node.js', 'PostgreSQL', 'Express', 'REST APIs'],
            location: 'Hyderabad',
            resumeUrl: '#',
        },
        {
            id: 'app5',
            candidateName: 'Vikram Singh',
            candidateEmail: 'vikram.s@email.com',
            candidatePhone: '+91 98765 43214',
            jobTitle: 'DevOps Engineer',
            jobId: 'job2',
            appliedDate: '2024-01-25',
            status: 'applied',
            currentCTC: 1300000,
            expectedCTC: 1900000,
            noticePeriod: 60,
            buyoutRequired: false,
            experience: 6,
            skills: ['Jenkins', 'Docker', 'AWS', 'Linux', 'Python'],
            location: 'Bangalore',
            resumeUrl: '#',
        },
        {
            id: 'app6',
            candidateName: 'Kavya Iyer',
            candidateEmail: 'kavya.i@email.com',
            candidatePhone: '+91 98765 43215',
            jobTitle: 'Senior Full Stack Developer',
            jobId: 'job1',
            appliedDate: '2024-01-28',
            status: 'rejected',
            currentCTC: 900000,
            expectedCTC: 1400000,
            noticePeriod: 30,
            buyoutRequired: false,
            experience: 3,
            skills: ['React', 'JavaScript', 'HTML', 'CSS'],
            location: 'Chennai',
            resumeUrl: '#',
        },
    ]);

    // Filter applications
    const filteredApplications = applications.filter((app) => {
        const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
        const matchesBuyoutStatus =
            selectedBuyoutStatus === 'all' ||
            (selectedBuyoutStatus === 'required' && app.buyoutRequired) ||
            (selectedBuyoutStatus === 'not_required' && !app.buyoutRequired) ||
            app.buyoutStatus === selectedBuyoutStatus;
        const matchesSearch =
            searchQuery === '' ||
            app.candidateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesBuyoutStatus && matchesSearch;
    });

    // Stats
    const stats = {
        total: applications.length,
        screening: applications.filter((a) => a.status === 'screening').length,
        interview: applications.filter((a) => a.status === 'interview').length,
        offer: applications.filter((a) => a.status === 'offer').length,
        hired: applications.filter((a) => a.status === 'hired').length,
        buyoutPending: applications.filter((a) => a.buyoutStatus === 'pending').length,
        buyoutApproved: applications.filter((a) => a.buyoutStatus === 'approved').length,
    };

    const getStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            applied: 'bg-gray-100 text-gray-800',
            screening: 'bg-blue-100 text-blue-800',
            interview: 'bg-yellow-100 text-yellow-800',
            offer: 'bg-purple-100 text-purple-800',
            hired: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getBuyoutStatusColor = (status: string) => {
        const colors: Record<string, string> = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            in_progress: 'bg-blue-100 text-blue-800',
            completed: 'bg-emerald-100 text-emerald-800',
            rejected: 'bg-red-100 text-red-800',
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const handleViewDetails = (app: Application) => {
        setSelectedApplication(app);
        setShowModal(true);
    };

    const handleOfferBuyout = (app: Application) => {
        setSelectedApplication(app);
        setBuyoutForm({
            type: 'full',
            amount: app.buyoutAmount || 0,
            terms: '',
        });
        setShowBuyoutModal(true);
    };

    const handleBuyoutSubmit = () => {
        console.log('Buyout offer submitted:', buyoutForm);
        setShowBuyoutModal(false);
    };

    const handleStatusChange = (appId: string, newStatus: Application['status']) => {
        console.log('Status changed:', appId, newStatus);
    };

    return (
        <DashboardLayout
            title="Applications"
            showBackButton={true}
            backTo="/company/dashboard"
            breadcrumbs={[{ label: 'Applications' }]}
        >
            <div className="p-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Applications</h1>
                    <p className="text-gray-600 mt-1">Manage and track candidate applications</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Total</p>
                        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Screening</p>
                        <p className="text-2xl font-bold text-blue-600">{stats.screening}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Interview</p>
                        <p className="text-2xl font-bold text-yellow-600">{stats.interview}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Offer Stage</p>
                        <p className="text-2xl font-bold text-purple-600">{stats.offer}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Hired</p>
                        <p className="text-2xl font-bold text-green-600">{stats.hired}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Buyout Pending</p>
                        <p className="text-2xl font-bold text-orange-600">{stats.buyoutPending}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow">
                        <p className="text-sm text-gray-600">Buyout Approved</p>
                        <p className="text-2xl font-bold text-emerald-600">{stats.buyoutApproved}</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg shadow mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search
                            </label>
                            <input
                                type="text"
                                placeholder="Search by name or job..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Application Status
                            </label>
                            <select
                                value={selectedStatus}
                                onChange={(e) => setSelectedStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Statuses</option>
                                <option value="applied">Applied</option>
                                <option value="screening">Screening</option>
                                <option value="interview">Interview</option>
                                <option value="offer">Offer</option>
                                <option value="hired">Hired</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Buyout Status
                            </label>
                            <select
                                value={selectedBuyoutStatus}
                                onChange={(e) => setSelectedBuyoutStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All</option>
                                <option value="required">Buyout Required</option>
                                <option value="not_required">No Buyout</option>
                                <option value="pending">Pending Approval</option>
                                <option value="approved">Approved</option>
                                <option value="in_progress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Applications List */}
                <div className="space-y-4">
                    {filteredApplications.length === 0 ? (
                        <div className="bg-white p-12 rounded-lg shadow text-center">
                            <p className="text-gray-500 text-lg">No applications found</p>
                        </div>
                    ) : (
                        filteredApplications.map((app) => (
                            <div key={app.id} className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <h3 className="text-xl font-semibold text-gray-900">{app.candidateName}</h3>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(app.status)}`}>
                                                {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                                            </span>
                                            {app.buyoutRequired && app.buyoutStatus && (
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getBuyoutStatusColor(app.buyoutStatus)}`}>
                                                    Buyout: {app.buyoutStatus.replace('_', ' ').charAt(0).toUpperCase() + app.buyoutStatus.slice(1).replace('_', ' ')}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-gray-600 font-medium">{app.jobTitle}</p>
                                        <p className="text-sm text-gray-500 mt-1">Applied on {new Date(app.appliedDate).toLocaleDateString()}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                    <div>
                                        <p className="text-sm text-gray-600">Experience</p>
                                        <p className="font-semibold text-gray-900">{app.experience} years</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Current CTC</p>
                                        <p className="font-semibold text-gray-900">₹{(app.currentCTC / 100000).toFixed(1)}L</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Expected CTC</p>
                                        <p className="font-semibold text-gray-900">₹{(app.expectedCTC / 100000).toFixed(1)}L</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">Notice Period</p>
                                        <p className="font-semibold text-gray-900">{app.noticePeriod} days</p>
                                    </div>
                                </div>

                                {app.buyoutRequired && (
                                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-orange-900">Buyout Required</p>
                                                <p className="text-lg font-bold text-orange-700">₹{app.buyoutAmount?.toLocaleString()}</p>
                                                {app.buyoutType && (
                                                    <p className="text-xs text-orange-600 mt-1">
                                                        Type: {app.buyoutType.charAt(0).toUpperCase() + app.buyoutType.slice(1)}
                                                    </p>
                                                )}
                                            </div>
                                            {app.buyoutStatus === 'pending' && (
                                                <button
                                                    onClick={() => handleOfferBuyout(app)}
                                                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors text-sm font-medium"
                                                >
                                                    Review Buyout
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                <div className="mb-4">
                                    <p className="text-sm text-gray-600 mb-2">Skills</p>
                                    <div className="flex flex-wrap gap-2">
                                        {app.skills.slice(0, 5).map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                        {app.skills.length > 5 && (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm">
                                                +{app.skills.length - 5} more
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleViewDetails(app)}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        View Details
                                    </button>
                                    <select
                                        value={app.status}
                                        onChange={(e) => handleStatusChange(app.id, e.target.value as Application['status'])}
                                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="applied">Applied</option>
                                        <option value="screening">Screening</option>
                                        <option value="interview">Interview</option>
                                        <option value="offer">Offer</option>
                                        <option value="hired">Hired</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                    <a
                                        href={app.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        View Resume
                                    </a>
                                    <a
                                        href={`mailto:${app.candidateEmail}`}
                                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Contact
                                    </a>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Application Details Modal */}
                {showModal && selectedApplication && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">{selectedApplication.candidateName}</h2>
                                        <p className="text-gray-600 mt-1">{selectedApplication.jobTitle}</p>
                                    </div>
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="text-gray-400 hover:text-gray-600 text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Contact Information</h3>
                                        <div className="space-y-2">
                                            <p><span className="font-medium">Email:</span> {selectedApplication.candidateEmail}</p>
                                            <p><span className="font-medium">Phone:</span> {selectedApplication.candidatePhone}</p>
                                            <p><span className="font-medium">Location:</span> {selectedApplication.location}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Professional Details</h3>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Experience</p>
                                                <p className="font-semibold">{selectedApplication.experience} years</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Current CTC</p>
                                                <p className="font-semibold">₹{(selectedApplication.currentCTC / 100000).toFixed(1)}L</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Expected CTC</p>
                                                <p className="font-semibold">₹{(selectedApplication.expectedCTC / 100000).toFixed(1)}L</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Notice Period</p>
                                                <p className="font-semibold">{selectedApplication.noticePeriod} days</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Skills</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedApplication.skills.map((skill, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {selectedApplication.buyoutRequired && (
                                        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                                            <h3 className="text-lg font-semibold text-orange-900 mb-2">Buyout Information</h3>
                                            <div className="space-y-2">
                                                <p><span className="font-medium">Amount:</span> ₹{selectedApplication.buyoutAmount?.toLocaleString()}</p>
                                                <p><span className="font-medium">Status:</span> {selectedApplication.buyoutStatus}</p>
                                                <p><span className="font-medium">Type:</span> {selectedApplication.buyoutType}</p>
                                            </div>
                                        </div>
                                    )}

                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Application Timeline</h3>
                                        <p className="text-sm text-gray-600">Applied on {new Date(selectedApplication.appliedDate).toLocaleDateString()}</p>
                                        <div className="mt-2">
                                            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(selectedApplication.status)}`}>
                                                {selectedApplication.status.charAt(0).toUpperCase() + selectedApplication.status.slice(1)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => setShowModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Close
                                    </button>
                                    <a
                                        href={selectedApplication.resumeUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
                                    >
                                        View Resume
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Buyout Offer Modal */}
                {showBuyoutModal && selectedApplication && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-lg w-full">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold text-gray-900">Buyout Sponsorship</h2>
                                        <p className="text-gray-600 mt-1">{selectedApplication.candidateName}</p>
                                    </div>
                                    <button
                                        onClick={() => setShowBuyoutModal(false)}
                                        className="text-gray-400 hover:text-gray-600 text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Sponsorship Type
                                        </label>
                                        <select
                                            value={buyoutForm.type}
                                            onChange={(e) => setBuyoutForm({ ...buyoutForm, type: e.target.value as 'full' | 'partial' | 'facilitation' })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        >
                                            <option value="full">Full Sponsorship</option>
                                            <option value="partial">Partial Sponsorship</option>
                                            <option value="facilitation">Facilitation Only</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Sponsorship Amount
                                        </label>
                                        <input
                                            type="number"
                                            value={buyoutForm.amount}
                                            onChange={(e) => setBuyoutForm({ ...buyoutForm, amount: Number(e.target.value) })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Terms & Conditions
                                        </label>
                                        <textarea
                                            value={buyoutForm.terms}
                                            onChange={(e) => setBuyoutForm({ ...buyoutForm, terms: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            placeholder="Enter terms and conditions for buyout sponsorship..."
                                        />
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <p className="text-sm text-blue-900">
                                            <span className="font-semibold">Note:</span> The candidate will be notified of your buyout offer and the NBFC partner will process the loan application.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => setShowBuyoutModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleBuyoutSubmit}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Submit Offer
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Applications;
