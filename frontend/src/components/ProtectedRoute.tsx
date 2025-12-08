import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { UserType } from '../types';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedUserTypes?: UserType[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedUserTypes }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedUserTypes && user && !allowedUserTypes.includes(user.user_type)) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
