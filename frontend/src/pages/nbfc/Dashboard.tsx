import DashboardLayout from '../../layouts/DashboardLayout';

const NBFCDashboard = () => {
    return (
        <DashboardLayout title="NBFC Dashboard">
            <div className="card text-center py-12">
                <h2 className="text-2xl font-bold mb-4">NBFC Dashboard</h2>
                <p className="text-gray-600 mb-6">
                    Welcome to your NBFC dashboard. Features coming soon!
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                    <button className="btn-primary" disabled>
                        Review Applications (Coming Soon)
                    </button>
                    <button className="btn-secondary" disabled>
                        Loan Portfolio (Coming Soon)
                    </button>
                    <button className="btn-secondary" disabled>
                        Analytics (Coming Soon)
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default NBFCDashboard;
