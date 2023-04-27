import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Auth } from './types';

interface Props {
    permissions: string[];
}

const RequireAuth = ({ permissions }: Props) => {
    const { auth } = useAuth();
    const location = useLocation();

    // the permissions should be an array of strings

    const authData = auth as Auth;

    const path = authData.permissions?.map((permission) => permission);

    return path?.find((permission) => permissions?.includes(permission)) ? (
        <Outlet />
    ) : authData.email ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
