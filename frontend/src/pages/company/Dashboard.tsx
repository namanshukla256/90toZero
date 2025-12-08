import DashboardLayout from '../../layouts/DashboardLayout';

const CompanyDashboard = () => {
    return (
        <DashboardLayout title="Company Dashboard">
            <div className="card text-center py-12">
                <h2 className="text-2xl font-bold mb-4">Company Dashboard</h2>
                <p className="text-gray-600 mb-6">
                    Welcome to your company dashboard. Features coming soon!
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                    <button className="btn-primary" disabled>
                        Post Job (Coming Soon)
                    </button>
                    <button className="btn-secondary" disabled>
                        View Applications (Coming Soon)
                    </button>
                    <button className="btn-secondary" disabled>
                        Manage Buyouts (Coming Soon)
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CompanyDashboard;
