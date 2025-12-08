import { create } from 'zustand';
import type { User, Company, Candidate, NBFC } from '../types';
import { authService } from '../services/auth.service';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    login: (user: User, tokens: { access_token: string; refresh_token: string }) => void;
    logout: () => void;
    checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: authService.getStoredUser(),
    isAuthenticated: authService.isAuthenticated(),
    isLoading: false,

    setUser: (user) => set({ user, isAuthenticated: !!user }),

    setLoading: (loading) => set({ isLoading: loading }),

    login: (user, tokens) => {
        localStorage.setItem('access_token', tokens.access_token);
        localStorage.setItem('refresh_token', tokens.refresh_token);
        localStorage.setItem('user', JSON.stringify(user));
        set({ user, isAuthenticated: true });
    },

    logout: () => {
        authService.logout();
        set({ user: null, isAuthenticated: false });
    },

    checkAuth: () => {
        const user = authService.getStoredUser();
        const isAuthenticated = authService.isAuthenticated();
        set({ user, isAuthenticated });
    },
}));

interface ProfileState {
    companyProfile: Company | null;
    candidateProfile: Candidate | null;
    nbfcProfile: NBFC | null;

    // Actions
    setCompanyProfile: (profile: Company | null) => void;
    setCandidateProfile: (profile: Candidate | null) => void;
    setNBFCProfile: (profile: NBFC | null) => void;
    clearProfiles: () => void;
}

export const useProfileStore = create<ProfileState>((set) => ({
    companyProfile: null,
    candidateProfile: null,
    nbfcProfile: null,

    setCompanyProfile: (profile) => set({ companyProfile: profile }),
    setCandidateProfile: (profile) => set({ candidateProfile: profile }),
    setNBFCProfile: (profile) => set({ nbfcProfile: profile }),

    clearProfiles: () => set({
        companyProfile: null,
        candidateProfile: null,
        nbfcProfile: null,
    }),
}));
