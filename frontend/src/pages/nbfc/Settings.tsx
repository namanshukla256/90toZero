import React, { useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout.tsx';

interface LoanProduct {
    id: string;
    name: string;
    minAmount: number;
    maxAmount: number;
    minTenure: number;
    maxTenure: number;
    interestRate: number;
    processingFee: number;
    isActive: boolean;
}

interface LendingCriteria {
    minCreditScore: number;
    maxEMIRatio: number; // EMI/Income percentage
    minExperience: number; // years
    minSalary: number;
    requiresEmploymentVerification: boolean;
    requiresOfferLetter: boolean;
    requiresCompanyVerification: boolean;
}

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'products' | 'criteria' | 'general'>('products');

    // Loan Products
    const [loanProducts, setLoanProducts] = useState<LoanProduct[]>([
        {
            id: 'prod1',
            name: 'Standard Notice Period Loan',
            minAmount: 30000,
            maxAmount: 200000,
            minTenure: 6,
            maxTenure: 18,
            interestRate: 12,
            processingFee: 1,
            isActive: true,
        },
        {
            id: 'prod2',
            name: 'Premium Quick Approval',
            minAmount: 50000,
            maxAmount: 300000,
            minTenure: 9,
            maxTenure: 24,
            interestRate: 10.5,
            processingFee: 1.5,
            isActive: true,
        },
        {
            id: 'prod3',
            name: 'Budget Buyout Loan',
            minAmount: 20000,
            maxAmount: 100000,
            minTenure: 6,
            maxTenure: 12,
            interestRate: 14,
            processingFee: 0.5,
            isActive: true,
        },
    ]);

    // Lending Criteria
    const [lendingCriteria, setLendingCriteria] = useState<LendingCriteria>({
        minCreditScore: 650,
        maxEMIRatio: 35,
        minExperience: 2,
        minSalary: 400000,
        requiresEmploymentVerification: true,
        requiresOfferLetter: true,
        requiresCompanyVerification: true,
    });

    // General Settings
    const [generalSettings, setGeneralSettings] = useState({
        autoApprovalEnabled: false,
        autoApprovalCreditScore: 720,
        autoApprovalMaxAmount: 100000,
        reminderDaysBefore: 3,
        overdueGracePeriod: 7,
        defaultThresholdDays: 90,
    });

    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<LoanProduct | null>(null);

    const handleEditProduct = (product: LoanProduct) => {
        setEditingProduct(product);
        setShowProductModal(true);
    };

    const handleSaveProduct = () => {
        console.log('Saving product:', editingProduct);
        setShowProductModal(false);
        setEditingProduct(null);
    };

    const handleToggleProduct = (productId: string) => {
        setLoanProducts(
            loanProducts.map((p) => (p.id === productId ? { ...p, isActive: !p.isActive } : p))
        );
    };

    const handleSaveCriteria = () => {
        console.log('Saving criteria:', lendingCriteria);
    };

    const handleSaveGeneralSettings = () => {
        console.log('Saving general settings:', generalSettings);
    };

    return (
        <DashboardLayout title="Settings & Configuration">
            <div className="p-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">Settings & Configuration</h1>
                    <p className="text-gray-600 mt-1">Manage loan products, criteria, and platform settings</p>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow mb-6">
                    <div className="border-b border-gray-200">
                        <nav className="flex -mb-px">
                            <button
                                onClick={() => setActiveTab('products')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === 'products'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Loan Products
                            </button>
                            <button
                                onClick={() => setActiveTab('criteria')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === 'criteria'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                Lending Criteria
                            </button>
                            <button
                                onClick={() => setActiveTab('general')}
                                className={`px-6 py-4 text-sm font-medium border-b-2 ${activeTab === 'general'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                General Settings
                            </button>
                        </nav>
                    </div>

                    {/* Loan Products Tab */}
                    {activeTab === 'products' && (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-gray-600">Configure your loan products and pricing</p>
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                                    Add New Product
                                </button>
                            </div>

                            <div className="space-y-4">
                                {loanProducts.map((product) => (
                                    <div key={product.id} className="border border-gray-200 rounded-lg p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${product.isActive
                                                                ? 'bg-green-100 text-green-800'
                                                                : 'bg-gray-100 text-gray-800'
                                                            }`}
                                                    >
                                                        {product.isActive ? 'ACTIVE' : 'INACTIVE'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                                            <div>
                                                <p className="text-sm text-gray-600">Loan Amount</p>
                                                <p className="font-semibold text-gray-900">
                                                    ₹{(product.minAmount / 1000).toFixed(0)}K - ₹{(product.maxAmount / 1000).toFixed(0)}K
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Tenure</p>
                                                <p className="font-semibold text-gray-900">
                                                    {product.minTenure} - {product.maxTenure} months
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Interest Rate</p>
                                                <p className="font-semibold text-gray-900">{product.interestRate}% p.a.</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Processing Fee</p>
                                                <p className="font-semibold text-gray-900">{product.processingFee}%</p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <button
                                                onClick={() => handleEditProduct(product)}
                                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                            >
                                                Edit Product
                                            </button>
                                            <button
                                                onClick={() => handleToggleProduct(product.id)}
                                                className={`px-4 py-2 rounded-lg transition-colors font-medium ${product.isActive
                                                        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                        : 'bg-green-600 text-white hover:bg-green-700'
                                                    }`}
                                            >
                                                {product.isActive ? 'Deactivate' : 'Activate'}
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Lending Criteria Tab */}
                    {activeTab === 'criteria' && (
                        <div className="p-6">
                            <p className="text-gray-600 mb-6">Set minimum requirements for loan approval</p>

                            <div className="space-y-6 max-w-2xl">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Minimum Credit Score
                                    </label>
                                    <input
                                        type="number"
                                        value={lendingCriteria.minCreditScore}
                                        onChange={(e) =>
                                            setLendingCriteria({ ...lendingCriteria, minCreditScore: Number(e.target.value) })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">Applications below this score will be auto-rejected</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Maximum EMI/Income Ratio (%)
                                    </label>
                                    <input
                                        type="number"
                                        value={lendingCriteria.maxEMIRatio}
                                        onChange={(e) =>
                                            setLendingCriteria({ ...lendingCriteria, maxEMIRatio: Number(e.target.value) })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">EMI should not exceed this percentage of monthly income</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Minimum Work Experience (years)
                                    </label>
                                    <input
                                        type="number"
                                        value={lendingCriteria.minExperience}
                                        onChange={(e) =>
                                            setLendingCriteria({ ...lendingCriteria, minExperience: Number(e.target.value) })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Minimum Annual Salary (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={lendingCriteria.minSalary}
                                        onChange={(e) =>
                                            setLendingCriteria({ ...lendingCriteria, minSalary: Number(e.target.value) })
                                        }
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Verification Requirements</h3>

                                    <div className="space-y-3">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={lendingCriteria.requiresEmploymentVerification}
                                                onChange={(e) =>
                                                    setLendingCriteria({
                                                        ...lendingCriteria,
                                                        requiresEmploymentVerification: e.target.checked,
                                                    })
                                                }
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Require Employment Verification</span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={lendingCriteria.requiresOfferLetter}
                                                onChange={(e) =>
                                                    setLendingCriteria({ ...lendingCriteria, requiresOfferLetter: e.target.checked })
                                                }
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Require Offer Letter from New Employer</span>
                                        </label>

                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={lendingCriteria.requiresCompanyVerification}
                                                onChange={(e) =>
                                                    setLendingCriteria({
                                                        ...lendingCriteria,
                                                        requiresCompanyVerification: e.target.checked,
                                                    })
                                                }
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm text-gray-700">Require New Company Verification</span>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSaveCriteria}
                                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Save Lending Criteria
                                </button>
                            </div>
                        </div>
                    )}

                    {/* General Settings Tab */}
                    {activeTab === 'general' && (
                        <div className="p-6">
                            <p className="text-gray-600 mb-6">Configure general platform settings</p>

                            <div className="space-y-6 max-w-2xl">
                                <div className="border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Auto Approval Settings</h3>

                                    <div className="space-y-4">
                                        <label className="flex items-center">
                                            <input
                                                type="checkbox"
                                                checked={generalSettings.autoApprovalEnabled}
                                                onChange={(e) =>
                                                    setGeneralSettings({ ...generalSettings, autoApprovalEnabled: e.target.checked })
                                                }
                                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                            />
                                            <span className="ml-2 text-sm font-medium text-gray-700">Enable Auto Approval</span>
                                        </label>

                                        {generalSettings.autoApprovalEnabled && (
                                            <>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Minimum Credit Score for Auto Approval
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={generalSettings.autoApprovalCreditScore}
                                                        onChange={(e) =>
                                                            setGeneralSettings({
                                                                ...generalSettings,
                                                                autoApprovalCreditScore: Number(e.target.value),
                                                            })
                                                        }
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                                        Maximum Auto Approval Amount (₹)
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={generalSettings.autoApprovalMaxAmount}
                                                        onChange={(e) =>
                                                            setGeneralSettings({
                                                                ...generalSettings,
                                                                autoApprovalMaxAmount: Number(e.target.value),
                                                            })
                                                        }
                                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>

                                <div className="border border-gray-200 rounded-lg p-6">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Settings</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Send Reminder Days Before Due Date
                                            </label>
                                            <input
                                                type="number"
                                                value={generalSettings.reminderDaysBefore}
                                                onChange={(e) =>
                                                    setGeneralSettings({ ...generalSettings, reminderDaysBefore: Number(e.target.value) })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Overdue Grace Period (days)
                                            </label>
                                            <input
                                                type="number"
                                                value={generalSettings.overdueGracePeriod}
                                                onChange={(e) =>
                                                    setGeneralSettings({ ...generalSettings, overdueGracePeriod: Number(e.target.value) })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Days after due date before marking as overdue</p>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Default Threshold (days)
                                            </label>
                                            <input
                                                type="number"
                                                value={generalSettings.defaultThresholdDays}
                                                onChange={(e) =>
                                                    setGeneralSettings({
                                                        ...generalSettings,
                                                        defaultThresholdDays: Number(e.target.value),
                                                    })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Days overdue before marking loan as defaulted</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleSaveGeneralSettings}
                                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                >
                                    Save General Settings
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Edit Product Modal */}
                {showProductModal && editingProduct && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-lg max-w-2xl w-full">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">Edit Loan Product</h2>
                                    <button
                                        onClick={() => setShowProductModal(false)}
                                        className="text-gray-400 hover:text-gray-600 text-2xl"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                        <input
                                            type="text"
                                            value={editingProduct.name}
                                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Amount (₹)</label>
                                            <input
                                                type="number"
                                                value={editingProduct.minAmount}
                                                onChange={(e) =>
                                                    setEditingProduct({ ...editingProduct, minAmount: Number(e.target.value) })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Amount (₹)</label>
                                            <input
                                                type="number"
                                                value={editingProduct.maxAmount}
                                                onChange={(e) =>
                                                    setEditingProduct({ ...editingProduct, maxAmount: Number(e.target.value) })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Minimum Tenure (months)
                                            </label>
                                            <input
                                                type="number"
                                                value={editingProduct.minTenure}
                                                onChange={(e) =>
                                                    setEditingProduct({ ...editingProduct, minTenure: Number(e.target.value) })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Maximum Tenure (months)
                                            </label>
                                            <input
                                                type="number"
                                                value={editingProduct.maxTenure}
                                                onChange={(e) =>
                                                    setEditingProduct({ ...editingProduct, maxTenure: Number(e.target.value) })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Interest Rate (% p.a.)
                                            </label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={editingProduct.interestRate}
                                                onChange={(e) =>
                                                    setEditingProduct({ ...editingProduct, interestRate: Number(e.target.value) })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Processing Fee (%)</label>
                                            <input
                                                type="number"
                                                step="0.1"
                                                value={editingProduct.processingFee}
                                                onChange={(e) =>
                                                    setEditingProduct({ ...editingProduct, processingFee: Number(e.target.value) })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-3">
                                    <button
                                        onClick={() => setShowProductModal(false)}
                                        className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSaveProduct}
                                        className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Save Changes
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

export default Settings;
