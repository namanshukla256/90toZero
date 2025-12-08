// User types
export const UserType = {
    COMPANY: 'company',
    CANDIDATE: 'candidate',
    NBFC: 'nbfc',
    ADMIN: 'admin',
} as const;

export type UserType = typeof UserType[keyof typeof UserType];

export interface User {
    id: string;
    email: string;
    user_type: UserType;
    is_verified: boolean;
    is_active: boolean;
    created_at: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    user_type: UserType;
}

export interface TokenResponse {
    access_token: string;
    refresh_token: string;
    token_type: string;
    user: User;
}

// Company types
export const CompanySize = {
    STARTUP: 'startup',
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    ENTERPRISE: 'enterprise',
} as const;

export type CompanySize = typeof CompanySize[keyof typeof CompanySize];

export interface Company {
    id: string;
    user_id: string;
    company_name: string;
    industry?: string;
    size?: CompanySize;
    gstin?: string;
    cin?: string;
    website?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    verified_at?: string;
    created_at: string;
}

export interface CompanyCreateRequest {
    company_name: string;
    industry?: string;
    size?: CompanySize;
    gstin?: string;
    cin?: string;
    website?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
}

// Candidate types
export interface Candidate {
    id: string;
    user_id: string;
    full_name: string;
    phone: string;
    date_of_birth?: string;
    current_company?: string;
    current_designation?: string;
    current_ctc?: number;
    notice_period_days?: number;
    skills?: string[];
    experience_years?: number;
    highest_education?: string;
    expected_ctc?: number;
    preferred_locations?: string[];
    city?: string;
    state?: string;
    kyc_verified_at?: string;
    created_at: string;
}

export interface CandidateCreateRequest {
    full_name: string;
    phone: string;
    date_of_birth?: string;
    current_company?: string;
    current_designation?: string;
    current_ctc?: number;
    notice_period_days?: number;
    skills?: string[];
    experience_years?: number;
    highest_education?: string;
    expected_ctc?: number;
    preferred_locations?: string[];
    city?: string;
    state?: string;
    open_to_buyout?: boolean;
}

// NBFC types
export interface NBFC {
    id: string;
    user_id: string;
    nbfc_name: string;
    license_number: string;
    website?: string;
    contact_person?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    interest_rate_min?: number;
    interest_rate_max?: number;
    max_loan_amount?: number;
    min_loan_amount?: number;
    verified_at?: string;
    is_active: boolean;
    created_at: string;
}

export interface NBFCCreateRequest {
    nbfc_name: string;
    license_number: string;
    website?: string;
    contact_person?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    interest_rate_min?: number;
    interest_rate_max?: number;
    max_loan_amount?: number;
    min_loan_amount?: number;
}

// Buyout types
export interface BuyoutCalculationRequest {
    current_monthly_salary: number;
    notice_period_days: number;
}

export interface BuyoutCalculationResponse {
    buyout_amount: number;
    notice_period_days: number;
    monthly_salary: number;
    daily_salary: number;
}
