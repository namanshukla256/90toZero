import React, { useState, useEffect } from 'react';
import apiClient from '../services/api';

interface ConnectionStatus {
    backend: 'connected' | 'disconnected' | 'loading';
    database: 'connected' | 'disconnected' | 'unknown';
    environment: string;
}

const ConnectionTest: React.FC = () => {
    const [status, setStatus] = useState<ConnectionStatus>({
        backend: 'loading',
        database: 'unknown',
        environment: 'unknown'
    });

    useEffect(() => {
        testConnection();
    }, []);

    const testConnection = async () => {
        try {
            setStatus(prev => ({ ...prev, backend: 'loading' }));

            // Get base URL without /api/v1
            const baseURL = apiClient.defaults.baseURL?.replace('/api/v1', '') || 'http://localhost:8000';

            // Test backend health (direct endpoint)
            const healthResponse = await fetch(`${baseURL}/health`);
            const healthData = await healthResponse.json();

            // Test API endpoint
            const testResponse = await apiClient.get('/test');

            setStatus({
                backend: 'connected',
                database: healthData.database === 'connected' ? 'connected' : 'disconnected',
                environment: healthData.environment || 'unknown'
            });

            console.log('✅ Backend connection successful:', { health: healthData, test: testResponse.data });
        } catch (error) {
            console.error('❌ Connection test failed:', error);
            setStatus({
                backend: 'disconnected',
                database: 'unknown',
                environment: 'unknown'
            });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'connected': return 'text-green-600';
            case 'disconnected': return 'text-red-600';
            case 'loading': return 'text-yellow-600';
            default: return 'text-gray-600';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'connected': return '✅';
            case 'disconnected': return '❌';
            case 'loading': return '⏳';
            default: return '❓';
        }
    };

    return (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-50">
            <div className="text-sm font-medium text-gray-900 mb-2">Connection Status</div>

            <div className="space-y-1 text-xs">
                <div className="flex items-center gap-2">
                    <span>{getStatusIcon(status.backend)}</span>
                    <span>Backend:</span>
                    <span className={getStatusColor(status.backend)}>{status.backend}</span>
                </div>

                <div className="flex items-center gap-2">
                    <span>{getStatusIcon(status.database)}</span>
                    <span>Database:</span>
                    <span className={getStatusColor(status.database)}>{status.database}</span>
                </div>

                <div className="flex items-center gap-2">
                    <span>🌍</span>
                    <span>Environment:</span>
                    <span className="text-blue-600">{status.environment}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span>📡</span>
                    <span>API:</span>
                    <span className="truncate">{apiClient.defaults.baseURL}</span>
                </div>
            </div>

            <button
                onClick={testConnection}
                className="mt-2 w-full px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
            >
                Test Again
            </button>
        </div>
    );
};

export default ConnectionTest;