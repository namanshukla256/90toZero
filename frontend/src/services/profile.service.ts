import apiClient from './api';
import type {
    Company,
    CompanyCreateRequest,
    Candidate,
    CandidateCreateRequest,
    NBFC,
    NBFCCreateRequest,
    BuyoutCalculationRequest,
    BuyoutCalculationResponse,
} from '../types';

// Company Service
export const companyService = {
    createProfile: async (data: CompanyCreateRequest): Promise<Company> => {
        const response = await apiClient.post<Company>('/companies/profile', data);
        return response.data;
    },

    getProfile: async (): Promise<Company> => {
        const response = await apiClient.get<Company>('/companies/profile');
        return response.data;
    },

    updateProfile: async (data: Partial<CompanyCreateRequest>): Promise<Company> => {
        const response = await apiClient.put<Company>('/companies/profile', data);
        return response.data;
    },
};

// Candidate Service
export const candidateService = {
    createProfile: async (data: CandidateCreateRequest): Promise<Candidate> => {
        const response = await apiClient.post<Candidate>('/candidates/profile', data);
        return response.data;
    },

    getProfile: async (): Promise<Candidate> => {
        const response = await apiClient.get<Candidate>('/candidates/profile');
        return response.data;
    },

    updateProfile: async (data: Partial<CandidateCreateRequest>): Promise<Candidate> => {
        const response = await apiClient.put<Candidate>('/candidates/profile', data);
        return response.data;
    },

    calculateBuyout: async (data: BuyoutCalculationRequest): Promise<BuyoutCalculationResponse> => {
        const response = await apiClient.post<BuyoutCalculationResponse>(
            '/candidates/calculate-buyout',
            data
        );
        return response.data;
    },
};

// NBFC Service
export const nbfcService = {
    createProfile: async (data: NBFCCreateRequest): Promise<NBFC> => {
        const response = await apiClient.post<NBFC>('/nbfc/profile', data);
        return response.data;
    },

    getProfile: async (): Promise<NBFC> => {
        const response = await apiClient.get<NBFC>('/nbfc/profile');
        return response.data;
    },

    updateProfile: async (data: Partial<NBFCCreateRequest>): Promise<NBFC> => {
        const response = await apiClient.put<NBFC>('/nbfc/profile', data);
        return response.data;
    },
};
