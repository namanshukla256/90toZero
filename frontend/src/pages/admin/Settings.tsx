import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';

type TabType = 'fees' | 'workflow' | 'integrations' | 'system';

const AdminSettings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>('fees');
    const [platformFees, setPlatformFees] = useState({
        companySubscriptionBasic: 9999,
        companySubscriptionPremium: 19999,
        companySubscriptionEnterprise: 49999,
        perSuccessfulHireFee: 5000,
        nbfcCommissionRate: 1.5,
        candidateProfileBoost: 999,
    });

    const [workflowSettings, setWorkflowSettings] = useState({
        autoVerifyDocuments: false,
        requireManualApprovalForNBFC: true,
        requireManualApprovalForCompany: true,
        autoApproveLoanUnderAmount: 50000,
        minCreditScoreForAutoApproval: 700,
        maxLoanAmountPerCandidate: 300000,
    });

    const [integrations] = useState([
        { name: 'Razorpay Payment Gateway', status: 'active', apiKey: 'rzp_test_••••••••••••', lastSync: '2024-01-28 10:30' },
        { name: 'CIBIL Credit Bureau', status: 'active', apiKey: 'cib_prod_••••••••••••', lastSync: '2024-01-28 09:45' },
        { name: 'DigiLocker KYC', status: 'active', apiKey: 'dgl_prod_••••••••••••', lastSync: '2024-01-28 08:20' },
        { name: 'SendGrid Email', status: 'active', apiKey: 'sg_prod_••••••••••••', lastSync: '2024-01-28 11:15' },
        { name: 'Twilio SMS', status: 'active', apiKey: 'tw_prod_••••••••••••', lastSync: '2024-01-27 23:50' },
        { name: 'AWS S3 Storage', status: 'active', apiKey: 'aws_prod_••••••••••••', lastSync: '2024-01-28 10:00' },
    ]);

    const [systemSettings, setSystemSettings] = useState({
        maintenanceMode: false,
        allowNewRegistrations: true,
        enableNotifications: true,
        sessionTimeout: 30,
        maxLoginAttempts: 5,
        dataRetentionDays: 365,
    });

    const handleSaveFees = () => {
        console.log('Saving fee settings:', platformFees);
        alert('Fee settings saved successfully!');
    };

    const handleSaveWorkflow = () => {
        console.log('Saving workflow settings:', workflowSettings);
        alert('Workflow settings saved successfully!');
    };

    const handleSaveSystem = () => {
        console.log('Saving system settings:', systemSettings);
        alert('System settings saved successfully!');
    };

    const handleTestIntegration = (integrationName: string) => {
        console.log('Testing integration:', integrationName);
        alert(`Testing ${integrationName}...`);
    };

    const tabs = [
        { id: 'fees' as TabType, label: 'Fees & Commission', icon: '💰' },
        { id: 'workflow' as TabType, label: 'Workflow Rules', icon: '⚙️' },
        { id: 'integrations' as TabType, label: 'Integrations', icon: '🔌' },
        { id: 'system' as TabType, label: 'System Config', icon: '🖥️' },
    ];

    return (
        <DashboardLayout title="Platform Settings">
            <div className="space-y-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Platform Settings</h1>
                    <p className="mt-2 text-gray-600">Configure platform fees, workflows, and integrations</p>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow">
                    <div className="border-b border-gray-200">
                        <div className="flex space-x-1 p-2">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition ${activeTab === tab.id
                                            ? 'bg-blue-50 text-blue-700'
                                            : 'text-gray-600 hover:bg-gray-50'
                                        }`}
                                >
                                    <span>{tab.icon}</span>
                                    <span>{tab.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Fees & Commission Tab */}
                        {activeTab === 'fees' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Company Subscription Plans</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Basic Plan (Monthly)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                                                <input
                                                    type="number"
                                                    value={platformFees.companySubscriptionBasic}
                                                    onChange={(e) => setPlatformFees({ ...platformFees, companySubscriptionBasic: parseInt(e.target.value) })}
                                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">5 job postings included</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Premium Plan (Monthly)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                                                <input
                                                    type="number"
                                                    value={platformFees.companySubscriptionPremium}
                                                    onChange={(e) => setPlatformFees({ ...platformFees, companySubscriptionPremium: parseInt(e.target.value) })}
                                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">15 job postings included</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Enterprise Plan (Monthly)
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                                                <input
                                                    type="number"
                                                    value={platformFees.companySubscriptionEnterprise}
                                                    onChange={(e) => setPlatformFees({ ...platformFees, companySubscriptionEnterprise: parseInt(e.target.value) })}
                                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">Unlimited job postings</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Transaction Fees</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Per Successful Hire Fee
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                                                <input
                                                    type="number"
                                                    value={platformFees.perSuccessfulHireFee}
                                                    onChange={(e) => setPlatformFees({ ...platformFees, perSuccessfulHireFee: parseInt(e.target.value) })}
                                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">Charged when buyout is completed</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                NBFC Commission Rate
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    value={platformFees.nbfcCommissionRate}
                                                    onChange={(e) => setPlatformFees({ ...platformFees, nbfcCommissionRate: parseFloat(e.target.value) })}
                                                    className="w-full pr-8 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                                <span className="absolute right-3 top-2.5 text-gray-500">%</span>
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">Commission on loan disbursement</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Candidate Services</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Profile Boost
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                                                <input
                                                    type="number"
                                                    value={platformFees.candidateProfileBoost}
                                                    onChange={(e) => setPlatformFees({ ...platformFees, candidateProfileBoost: parseInt(e.target.value) })}
                                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">Premium placement in search results</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSaveFees}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                    >
                                        Save Fee Settings
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Workflow Rules Tab */}
                        {activeTab === 'workflow' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Verification Settings</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <h3 className="font-medium text-gray-900">Auto-verify Documents</h3>
                                                <p className="text-sm text-gray-600">Automatically verify documents using AI</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={workflowSettings.autoVerifyDocuments}
                                                    onChange={(e) => setWorkflowSettings({ ...workflowSettings, autoVerifyDocuments: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <h3 className="font-medium text-gray-900">Manual NBFC Approval</h3>
                                                <p className="text-sm text-gray-600">Require admin approval for NBFC registrations</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={workflowSettings.requireManualApprovalForNBFC}
                                                    onChange={(e) => setWorkflowSettings({ ...workflowSettings, requireManualApprovalForNBFC: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <h3 className="font-medium text-gray-900">Manual Company Approval</h3>
                                                <p className="text-sm text-gray-600">Require admin approval for company registrations</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={workflowSettings.requireManualApprovalForCompany}
                                                    onChange={(e) => setWorkflowSettings({ ...workflowSettings, requireManualApprovalForCompany: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Loan Approval Rules</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Auto-approve Loans Under Amount
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                                                <input
                                                    type="number"
                                                    value={workflowSettings.autoApproveLoanUnderAmount}
                                                    onChange={(e) => setWorkflowSettings({ ...workflowSettings, autoApproveLoanUnderAmount: parseInt(e.target.value) })}
                                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">Loans below this amount can be auto-approved</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Min Credit Score for Auto-approval
                                            </label>
                                            <input
                                                type="number"
                                                value={workflowSettings.minCreditScoreForAutoApproval}
                                                onChange={(e) => setWorkflowSettings({ ...workflowSettings, minCreditScoreForAutoApproval: parseInt(e.target.value) })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Minimum CIBIL score required</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Max Loan Amount Per Candidate
                                            </label>
                                            <div className="relative">
                                                <span className="absolute left-3 top-2.5 text-gray-500">₹</span>
                                                <input
                                                    type="number"
                                                    value={workflowSettings.maxLoanAmountPerCandidate}
                                                    onChange={(e) => setWorkflowSettings({ ...workflowSettings, maxLoanAmountPerCandidate: parseInt(e.target.value) })}
                                                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                />
                                            </div>
                                            <p className="mt-1 text-xs text-gray-500">Maximum loan limit per candidate</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSaveWorkflow}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                    >
                                        Save Workflow Settings
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Integrations Tab */}
                        {activeTab === 'integrations' && (
                            <div className="space-y-4">
                                <h2 className="text-xl font-bold text-gray-900 mb-4">Third-Party Integrations</h2>
                                {integrations.map((integration, index) => (
                                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                        <div className="flex-1">
                                            <h3 className="font-medium text-gray-900">{integration.name}</h3>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                <span>API Key: {integration.apiKey}</span>
                                                <span>•</span>
                                                <span>Last sync: {integration.lastSync}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${integration.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                {integration.status}
                                            </span>
                                            <button
                                                onClick={() => handleTestIntegration(integration.name)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                            >
                                                Test
                                            </button>
                                            <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-medium">
                                                Configure
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-600 font-medium">
                                    + Add New Integration
                                </button>
                            </div>
                        )}

                        {/* System Config Tab */}
                        {activeTab === 'system' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Platform Controls</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <h3 className="font-medium text-gray-900">Maintenance Mode</h3>
                                                <p className="text-sm text-gray-600">Platform will be unavailable to users</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={systemSettings.maintenanceMode}
                                                    onChange={(e) => setSystemSettings({ ...systemSettings, maintenanceMode: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <h3 className="font-medium text-gray-900">Allow New Registrations</h3>
                                                <p className="text-sm text-gray-600">Enable new user sign-ups</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={systemSettings.allowNewRegistrations}
                                                    onChange={(e) => setSystemSettings({ ...systemSettings, allowNewRegistrations: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <h3 className="font-medium text-gray-900">Enable Notifications</h3>
                                                <p className="text-sm text-gray-600">Send email and SMS notifications</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={systemSettings.enableNotifications}
                                                    onChange={(e) => setSystemSettings({ ...systemSettings, enableNotifications: e.target.checked })}
                                                    className="sr-only peer"
                                                />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Security Settings</h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Session Timeout (minutes)
                                            </label>
                                            <input
                                                type="number"
                                                value={systemSettings.sessionTimeout}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, sessionTimeout: parseInt(e.target.value) })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Auto-logout after inactivity</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Max Login Attempts
                                            </label>
                                            <input
                                                type="number"
                                                value={systemSettings.maxLoginAttempts}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, maxLoginAttempts: parseInt(e.target.value) })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Lock account after failed attempts</p>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Data Retention (days)
                                            </label>
                                            <input
                                                type="number"
                                                value={systemSettings.dataRetentionDays}
                                                onChange={(e) => setSystemSettings({ ...systemSettings, dataRetentionDays: parseInt(e.target.value) })}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <p className="mt-1 text-xs text-gray-500">Delete old data after this period</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h2 className="text-xl font-bold text-gray-900 mb-4">Danger Zone</h2>
                                    <div className="space-y-3">
                                        <button className="w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium">
                                            Clear Cache & Restart Services
                                        </button>
                                        <button className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
                                            Reset Platform Statistics
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSaveSystem}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                    >
                                        Save System Settings
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default AdminSettings;
