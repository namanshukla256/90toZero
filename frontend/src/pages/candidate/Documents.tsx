import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import api from '../../services/api';

interface Document {
    id: string;
    document_type: string;
    file_name: string;
    file_url: string;
    verified: boolean;
    uploaded_at: string;
    file_size?: number;
}

const Documents = () => {
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [selectedType, setSelectedType] = useState<string>('');

    const documentTypes = [
        { value: 'aadhar', label: 'Aadhaar Card', required: true },
        { value: 'pan', label: 'PAN Card', required: true },
        { value: 'resume', label: 'Resume/CV', required: true },
        { value: 'salary_slip', label: 'Salary Slips (Last 3 months)', required: true },
        { value: 'offer_letter', label: 'New Job Offer Letter', required: false },
        { value: 'bank_statement', label: 'Bank Statements', required: false },
        { value: 'current_company_id', label: 'Current Company ID', required: false },
        { value: 'address_proof', label: 'Address Proof', required: false },
        { value: 'photo', label: 'Passport Size Photo', required: false },
    ];

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        try {
            const response = await api.get('/candidates/documents');
            setDocuments(response.data);
        } catch (error) {
            console.error('Failed to fetch documents:', error);
            // Use dummy data if API fails
            setDocuments(dummyDocuments);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, documentType: string) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size should be less than 5MB');
            return;
        }

        // Validate file type
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedTypes.includes(file.type)) {
            alert('Only PDF and image files (JPEG, PNG) are allowed');
            return;
        }

        setUploading(true);
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('document_type', documentType);

            const response = await api.post('/candidates/documents', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            setDocuments([...documents, response.data]);
            alert('Document uploaded successfully!');
            setSelectedType('');
        } catch (error: any) {
            alert(error.response?.data?.detail || 'Failed to upload document');
        } finally {
            setUploading(false);
        }
    };

    const handleDeleteDocument = async (documentId: string) => {
        if (!confirm('Are you sure you want to delete this document?')) return;

        try {
            await api.delete(`/candidates/documents/${documentId}`);
            setDocuments(documents.filter(doc => doc.id !== documentId));
            alert('Document deleted successfully');
        } catch (error: any) {
            alert(error.response?.data?.detail || 'Failed to delete document');
        }
    };

    const getDocumentIcon = (type: string) => {
        const isPDF = type.includes('pdf') || type.includes('resume') || type.includes('offer');
        return isPDF ? (
            <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
            </svg>
        ) : (
            <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
        );
    };

    const formatFileSize = (bytes: number | undefined) => {
        if (!bytes) return 'N/A';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const getUploadedDocTypes = () => {
        return documents.map(doc => doc.document_type);
    };

    const getMissingRequiredDocs = () => {
        const uploadedTypes = getUploadedDocTypes();
        return documentTypes
            .filter(type => type.required && !uploadedTypes.includes(type.value))
            .map(type => type.label);
    };

    const getCompletionPercentage = () => {
        const requiredDocs = documentTypes.filter(type => type.required);
        const uploadedRequired = requiredDocs.filter(type =>
            getUploadedDocTypes().includes(type.value)
        );
        return (uploadedRequired.length / requiredDocs.length) * 100;
    };

    if (loading) {
        return (
            <DashboardLayout
                title="My Documents"
                showBackButton={true}
                backTo="/candidate/dashboard"
                breadcrumbs={[{ label: 'Documents' }]}
            >
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        <p className="text-gray-600">Loading documents...</p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    const missingDocs = getMissingRequiredDocs();

    return (
        <DashboardLayout
            title="My Documents"
            showBackButton={true}
            backTo="/candidate/dashboard"
            breadcrumbs={[{ label: 'Documents' }]}
        >
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Document Management</h1>
                <p className="text-gray-600">Upload and manage your profile documents</p>
            </div>

            {/* Progress Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-900">Document Verification Progress</h2>
                    <span className="text-2xl font-bold text-blue-600">{getCompletionPercentage().toFixed(0)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                    <div
                        className="bg-blue-600 h-3 rounded-full transition-all"
                        style={{ width: `${getCompletionPercentage()}%` }}
                    />
                </div>
                {missingDocs.length > 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-yellow-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                            <div className="flex-1">
                                <div className="font-medium text-yellow-900 mb-1">Missing Required Documents</div>
                                <div className="text-sm text-yellow-800">
                                    Please upload: {missingDocs.join(', ')}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {missingDocs.length === 0 && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-medium text-green-900">All required documents uploaded!</span>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Upload Section */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Document</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Document Type
                                </label>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="">Select document type...</option>
                                    {documentTypes.map((type) => (
                                        <option
                                            key={type.value}
                                            value={type.value}
                                            disabled={getUploadedDocTypes().includes(type.value)}
                                        >
                                            {type.label} {type.required && '*'}
                                            {getUploadedDocTypes().includes(type.value) && ' (Uploaded)'}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {selectedType && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Choose File
                                    </label>
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">PDF, PNG, JPG (max 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".pdf,.png,.jpg,.jpeg"
                                            onChange={(e) => handleFileUpload(e, selectedType)}
                                            disabled={uploading}
                                        />
                                    </label>
                                </div>
                            )}

                            {uploading && (
                                <div className="flex items-center justify-center py-4">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                    <span className="ml-2 text-gray-600">Uploading...</span>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-200">
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Upload Guidelines</h3>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>• File size should be less than 5MB</li>
                                <li>• Supported formats: PDF, PNG, JPG</li>
                                <li>• Documents should be clear and readable</li>
                                <li>• All details should be visible</li>
                                <li>• Upload color scans, not photocopies</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Documents List */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Uploaded Documents ({documents.length})</h2>

                        {documents.length === 0 ? (
                            <div className="text-center py-12">
                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents uploaded yet</h3>
                                <p className="text-gray-600">Upload your documents to get started with verification</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {documents.map((doc) => (
                                    <div
                                        key={doc.id}
                                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow"
                                    >
                                        <div className="flex items-center gap-4 flex-1">
                                            {getDocumentIcon(doc.document_type)}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h3 className="font-medium text-gray-900 truncate">
                                                        {documentTypes.find(t => t.value === doc.document_type)?.label || doc.document_type}
                                                    </h3>
                                                    {doc.verified && (
                                                        <span className="flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                            </svg>
                                                            Verified
                                                        </span>
                                                    )}
                                                    {!doc.verified && (
                                                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                                                            Pending Review
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                                    <span>{doc.file_name}</span>
                                                    <span>•</span>
                                                    <span>{formatFileSize(doc.file_size)}</span>
                                                    <span>•</span>
                                                    <span>Uploaded {formatDate(doc.uploaded_at)}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 ml-4">
                                            <a
                                                href={doc.file_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="View document"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </a>
                                            <button
                                                onClick={() => handleDeleteDocument(doc.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete document"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

// Dummy data for development
const dummyDocuments: Document[] = [
    {
        id: '1',
        document_type: 'resume',
        file_name: 'resume_rajesh_kumar.pdf',
        file_url: '#',
        verified: true,
        uploaded_at: '2025-01-10T10:00:00Z',
        file_size: 245760,
    },
    {
        id: '2',
        document_type: 'aadhar',
        file_name: 'aadhar_card.pdf',
        file_url: '#',
        verified: true,
        uploaded_at: '2025-01-10T10:15:00Z',
        file_size: 512000,
    },
    {
        id: '3',
        document_type: 'pan',
        file_name: 'pan_card.jpg',
        file_url: '#',
        verified: false,
        uploaded_at: '2025-01-10T10:30:00Z',
        file_size: 180000,
    },
];

export default Documents;
